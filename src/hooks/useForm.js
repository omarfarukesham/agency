import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Small form helper: values, per-field errors shown after blur or submit,
 * and an async-aware submit handler with a submitting flag.
 */
export function useForm({ initialValues, validate, onSubmit }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const pendingFocus = useRef(null)

  useEffect(() => {
    if (submitting || !pendingFocus.current) return
    const { formElement, name } = pendingFocus.current
    pendingFocus.current = null
    formElement.querySelector(`[name="${name}"]`)?.focus()
  }, [submitting])

  const setValue = useCallback(
    (name, value) => {
      setValues((prev) => {
        const next = { ...prev, [name]: value }
        setErrors((prevErrors) => {
          if (!prevErrors[name]) return prevErrors
          const fresh = validate ? validate(next) : {}
          const copy = { ...prevErrors }
          if (fresh[name]) copy[name] = fresh[name]
          else delete copy[name]
          return copy
        })
        return next
      })
    },
    [validate],
  )

  const handleChange = useCallback(
    (event) => {
      const { name, type, value, checked } = event.target
      setValue(name, type === 'checkbox' ? checked : value)
    },
    [setValue],
  )

  const handleBlur = useCallback(
    (event) => {
      const { name } = event.target
      setTouched((prev) => ({ ...prev, [name]: true }))
      const fresh = validate ? validate(values) : {}
      setErrors((prev) => {
        const copy = { ...prev }
        if (fresh[name]) copy[name] = fresh[name]
        else delete copy[name]
        return copy
      })
    },
    [validate, values],
  )

  /** Shows errors that came from outside the form, such as a server's field validation. */
  const setFieldErrors = useCallback((fieldErrors) => {
    setErrors((prev) => ({ ...prev, ...fieldErrors }))
    setTouched((prev) => ({ ...prev, ...Object.fromEntries(Object.keys(fieldErrors).map((key) => [key, true])) }))
  }, [])

  const handleSubmit = useCallback(
    async (event) => {
      event?.preventDefault()
      const formElement = event?.currentTarget
      const fresh = validate ? validate(values) : {}
      setErrors(fresh)
      setTouched(Object.fromEntries(Object.keys(values).map((key) => [key, true])))
      const invalid = Object.keys(fresh)
      if (invalid.length > 0) {
        // Move focus to the first field that needs attention.
        formElement?.querySelector?.(`[name="${invalid[0]}"]`)?.focus()
        return
      }
      setSubmitting(true)
      try {
        await onSubmit(values, {
          // For server-side errors: show them on the fields and focus the first one
          // once the form is enabled again (a disabled field can't take focus).
          setFieldErrors: (fieldErrors) => {
            setFieldErrors(fieldErrors)
            const first = Object.keys(fieldErrors)[0]
            if (first && formElement) pendingFocus.current = { formElement, name: first }
          },
        })
      } finally {
        setSubmitting(false)
      }
    },
    [onSubmit, setFieldErrors, validate, values],
  )

  const reset = useCallback(
    (nextValues = initialValues) => {
      setValues(nextValues)
      setErrors({})
      setTouched({})
    },
    [initialValues],
  )

  /** Props for an input/select/textarea bound to `name`. */
  const field = (name) => {
    const error = touched[name] ? errors[name] : undefined
    return {
      id: name,
      name,
      value: values[name] ?? '',
      onChange: handleChange,
      onBlur: handleBlur,
      'aria-invalid': error ? 'true' : undefined,
      'aria-describedby': error ? `${name}-error` : undefined,
    }
  }

  const errorFor = (name) => (touched[name] ? errors[name] : undefined)

  return {
    values,
    errors,
    submitting,
    field,
    errorFor,
    setValue,
    setFieldErrors,
    handleSubmit,
    reset,
  }
}
