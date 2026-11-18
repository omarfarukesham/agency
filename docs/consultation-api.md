# Consultation request API

Backend contract for the **Book a Free Consultation** form on the Techsphere64 website (`/contact`).
Every "Book a Free Consultation" and "Discuss this package" button on the site leads to this form.

The website is a static React app with no backend. It needs **one public endpoint** that accepts the form as JSON.
A machine-readable version of this contract is in [`consultation-api.openapi.yaml`](consultation-api.openapi.yaml) (OpenAPI 3.1).

---

## Endpoint

```
POST /api/v1/enquiries
Content-Type: application/json
Accept: application/json
```

- **No authentication.** It is a public form, so protect it with rate limiting (see [Spam and abuse](#spam-and-abuse)).
- The browser calls it directly from the website, so **CORS is required** (see [CORS](#cors)).

## Request body

| Field          | Type   | Required | Rules                                               |
| -------------- | ------ | -------- | --------------------------------------------------- |
| `name`         | string | yes      | 1–100 characters after trimming                     |
| `email`        | string | yes      | Valid email address, max 254 characters             |
| `businessName` | string | yes      | 1–150 characters after trimming                     |
| `projectType`  | string | yes      | One of the [project types](#allowed-values) exactly |
| `budget`       | string | yes      | One of the [budget ranges](#allowed-values) exactly |
| `message`      | string | yes      | 20–5,000 characters after trimming                  |
| `submittedAt`  | string | yes      | ISO 8601 date-time from the visitor's clock         |

Notes:

- The frontend applies the same rules before sending, so a valid visitor never hits a validation error. The backend must still validate everything, because anyone can call the endpoint directly.
- `submittedAt` comes from the visitor's device. Treat it as informational only and record your own server timestamp.
- **Ignore unknown fields** instead of rejecting them, so the frontend can add optional fields later without breaking anything.

### Allowed values

These are the exact strings the form sends. They are defined in the frontend in `src/data/agencyContent.js`
(`projectTypes` and `budgetRanges`). If those lists change, this list must change too.

**`projectType`**

- `Business website`
- `Website + lead automation`
- `Workflow automation`
- `Social media management`
- `Website + social media`
- `Something else / not sure yet`

**`budget`**

- `Under $500`
- `$500 – $1,000`
- `$1,000 – $2,500`
- `$2,500+`
- `Not sure yet`

> ⚠️ The two middle budget ranges use an **en dash** (`–`, U+2013) with spaces on both sides, not a hyphen (`-`).
> Compare strings exactly, and make sure the database column and connection use UTF-8.

### Example request

```http
POST /api/v1/enquiries HTTP/1.1
Host: api.example.com
Content-Type: application/json
Accept: application/json
Origin: https://www.example.com

{
  "name": "Jordan Lee",
  "email": "jordan@example.com",
  "businessName": "Lee Home Services",
  "projectType": "Website + lead automation",
  "budget": "$500 – $1,000",
  "message": "We run a small cleaning company and want a website with online quote requests.",
  "submittedAt": "2026-11-18T14:32:05.120Z"
}
```

## Responses

The frontend currently treats **any 2xx as success** and **any other status as failure**. On failure the visitor sees
"We could not send your message. Please check your connection and try again." and their input is kept so they can retry.

### `201 Created`: enquiry saved

```json
{
  "id": "3f6c2a9e-8b1d-4c47-9a52-0d7e5f1b2c34",
  "status": "received",
  "createdAt": "2026-11-18T14:32:05.874Z"
}
```

The frontend does not read the body today, but please return it. It is useful for logs and support.

### Errors

All errors use the same shape:

```json
{
  "error": "validation_failed",
  "message": "One or more fields are invalid.",
  "fields": {
    "email": "Enter a valid email address.",
    "message": "Use at least 20 characters."
  }
}
```

| Status | `error`             | When                                                         |
| ------ | ------------------- | ------------------------------------------------------------ |
| 400    | `invalid_json`      | Body is missing, not JSON, or larger than 32 KB              |
| 415    | `unsupported_media` | `Content-Type` is not `application/json`                     |
| 422    | `validation_failed` | A field breaks the rules above (`fields` lists each problem) |
| 429    | `rate_limited`      | Too many requests; include a `Retry-After` header            |
| 500    | `server_error`      | Anything unexpected; never expose stack traces               |

`fields` is only present on 422.

## CORS

The website calls the API from the visitor's browser. Because the request is JSON, the browser sends an
`OPTIONS` preflight first. The API must answer it.

| Header                         | Value                                                                    |
| ------------------------------ | ------------------------------------------------------------------------ |
| `Access-Control-Allow-Origin`  | The website's production origin(s), plus `http://localhost:5173` for dev |
| `Access-Control-Allow-Methods` | `POST, OPTIONS`                                                          |
| `Access-Control-Allow-Headers` | `Content-Type, Accept`                                                   |
| `Access-Control-Max-Age`       | `86400`                                                                  |

Do not use `*` in production. No cookies or credentials are sent.

## What the backend should do

1. **Validate and normalise.** Trim all strings and lowercase the email.
2. **Save the enquiry** (suggested table below).
3. **Notify the Techsphere64 team** by email with all fields. The recipient address is to be decided.
4. *Optional:* send the visitor a short acknowledgement email.
5. **Respond quickly.** Send emails in the background (queue or async job) so the form doesn't wait on the mail provider. Target under 2 seconds.

If saving succeeds but an email fails, still return `201` and retry the email in the background. The enquiry
must never be lost.

### Suggested table

```sql
CREATE TABLE enquiries (
  id                  UUID PRIMARY KEY,
  name                VARCHAR(100)  NOT NULL,
  email               VARCHAR(254)  NOT NULL,
  business_name       VARCHAR(150)  NOT NULL,
  project_type        VARCHAR(60)   NOT NULL,
  budget              VARCHAR(30)   NOT NULL,
  message             TEXT          NOT NULL,
  client_submitted_at TIMESTAMPTZ,              -- from the request; informational
  created_at          TIMESTAMPTZ   NOT NULL DEFAULT now(),
  status              VARCHAR(20)   NOT NULL DEFAULT 'new',  -- new | contacted | closed
  ip_hash             VARCHAR(64),              -- hashed, for rate limiting and abuse checks
  user_agent          VARCHAR(500)
);

CREATE INDEX enquiries_created_at_idx ON enquiries (created_at DESC);
```

## Spam and abuse

- **Rate limit** per IP, for example 5 requests per 10 minutes, returning `429`.
- **Limit the body size** to 32 KB.
- Log rejected requests without storing their message text.
- A CAPTCHA (such as Cloudflare Turnstile) or a hidden honeypot field can be added later. Both need a small frontend change, so agree the field name first.

## Privacy

The form collects personal data (name, email, business, free text). Visitors include people in the EU (Sweden),
so keep a retention policy, restrict who can read the table, and be ready to delete a person's data on request.

## Connecting the frontend

Once the endpoint is live, the only frontend change is one setting in `src/data/agencyContent.js`:

```js
enquiryEndpoint: 'https://api.example.com/api/v1/enquiries',
```

Until it is set, the form runs in preview mode and nothing is delivered.

## Optional later

Each of these needs a frontend change as well. Agree the details before building.

- **Meta Conversions API.** The site already sends a `Lead` event through the Meta Pixel in the browser.
  The backend could also send `Lead` server-side, which ad blockers can't stop. To avoid counting a lead twice,
  the frontend would generate an `eventId`, pass it to the Pixel and include it in this request, and the backend
  would send the same value as `event_id`. The Meta access token must stay on the server.
- **Ad attribution.** Optional `pageUrl` and `utm` fields (`source`, `medium`, `campaign`) so each enquiry shows which ad or post it came from.
- **Field-level errors.** The frontend could show the `fields` messages from a `422` next to each input instead of the generic error.
