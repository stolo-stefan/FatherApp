# Visitor endpoints

This document describes the routes currently registered in `Program.cs` that can be called without authentication. No bearer token or session cookie is required. Admin login is included because the login request itself is unauthenticated, although valid admin credentials are required for success.

Paths are relative to the backend origin. JSON request bodies use `Content-Type: application/json`. JSON property names use camelCase. Dates are ISO 8601 strings; examples are illustrative. GET requests below have no request body or required query parameters. Route parameters marked `{id:int}` or `{courseId:int}` must be integers.

The responses below describe the handlers' explicit outcomes. Invalid/missing JSON bodies can also produce framework binding errors (such as `400`), and an unsupported request content type can produce `415`. Unexpected infrastructure failures can produce server errors.

## Route index

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/ping` | Check that the application responds. |
| POST | `/api/user/sign-up` | Subscribe an email address to the newsletter. |
| GET | `/api/user/blogs` | List visible blog summaries. |
| GET | `/api/blogs/visible` | List visible blog summaries (same data as `/api/user/blogs`). |
| GET | `/api/blogs/summary/{id:int}` | Read one blog summary by ID. |
| GET | `/api/blogs/detailed/{id:int}` | Read one blog with its media. |
| GET | `/api/user/courses/{id:int}` | Read one course by ID. |
| GET | `/api/user/courses/latest` | Read the next course by start date. |
| GET | `/api/user/courses/thank-you` | Read the next course, including its WhatsApp link. |
| POST | `/api/courses/{courseId:int}/enroll/free` | Enroll in a free course. |
| POST | `/api/courses/{courseId:int}/enroll/paid` | Register a paid enrollment awaiting payment. |
| POST | `/api/admin/auth/login` | Authenticate an administrator and issue a JWT. |
| GET, HEAD | `/media/{filePath}` | Retrieve a publicly served media file. |

## Health check

### GET `/ping`

Returns a basic application response and writes a log entry. It does not explicitly check database or email health.

**Input:** None.

**Response:** `200 OK` with the JSON string `"pong"`.

## Newsletter

### POST `/api/user/sign-up`

Creates a user record or marks an existing user as subscribed. Attempts to add the contact to GetResponse; failures from that integration are logged without failing the subscription. Queues a welcome email when the user's welcome-email flag has not yet been set, then marks it as sent/queued.

**JSON body:**

```json
{
  "email": "visitor@example.com"
}
```

`email` must be a nonblank string. The handler does not explicitly validate email syntax.

**Responses:**

| Status | Body |
| --- | --- |
| `200 OK` | Empty body. |
| `400 Bad Request` | JSON string `"An email must be provided"`. |
| `400 Bad Request` | JSON string `"Already applied to the news - letter"` when already subscribed. |

## Blogs

### GET `/api/user/blogs`

**Input:** None.

**Response:** `200 OK` with an array of **BlogSummary** objects (schema below), filtered to `isVisible: true` and ordered by `datePosted` descending. Returns `[]` when no visible blogs exist. No pagination is implemented.

### GET `/api/blogs/visible`

**Input:** None.

**Response:** `200 OK` with the same **BlogSummary** array, visibility filter, and ordering as `/api/user/blogs`. Returns `[]` when no visible blogs exist.

### GET `/api/blogs/summary/{id:int}`

**Input:** Blog ID in the path, for example `/api/blogs/summary/5`.

**Responses:** `200 OK` with a **BlogSummary** object, or `404 Not Found` with an empty body when the blog does not exist.

This lookup does not filter by `isVisible`; a visitor who knows the ID can retrieve a hidden blog too.

### GET `/api/blogs/detailed/{id:int}`

**Input:** Blog ID in the path, for example `/api/blogs/detailed/5`.

**Responses:** `200 OK` with a **BlogDetail** object, or `404 Not Found` with an empty body when the blog does not exist. Media entries are ordered by media ID ascending.

This lookup also does not filter by `isVisible`.

### Blog response schemas

**BlogSummary** (despite the name, includes the full `content` field):

```json
{
  "id": 5,
  "title": "Preparing for management",
  "content": "Full article content",
  "datePosted": "2026-11-18T10:00:00Z",
  "summary": "A short introduction to management.",
  "isVisible": true,
  "slug": "preparing-for-management"
}
```

**BlogDetail:**

```json
{
  "id": 5,
  "title": "Preparing for management",
  "content": "Full article content",
  "datePosted": "2026-11-18T10:00:00Z",
  "isVisible": true,
  "media": [
    {
      "id": 12,
      "path": "/media/blogs/5/example.png",
      "kind": 0,
      "viewUrl": "/media/blogs/5/example.png",
      "originalFileName": "example.png",
      "contentType": "image/png",
      "sizeBytes": 20480
    }
  ],
  "slug": "preparing-for-management"
}
```

`media` can be empty. `kind` is serialized numerically: `0` = image, `1` = video. `originalFileName` and `contentType` can be `null`. With the current filesystem storage service, `viewUrl` is normally relative to the backend origin; an already absolute stored URL is preserved.

## Courses

### GET `/api/user/courses/{id:int}`

**Input:** Course ID in the path, for example `/api/user/courses/3`.

**Responses:** `200 OK` with a **Course** object (schema below), or `404 Not Found` with an empty body when the course does not exist.

This lookup can return past courses. Its `nrOfSeats` is the configured total capacity, without subtracting enrollments.

### GET `/api/user/courses/latest`

**Input:** None.

Selects the course with the earliest `startDate` on or after today's date in UTC. Despite the route name, this is the next course by start date, rather than the most recently created course.

**Response when a course exists:** `200 OK`:

```json
{
  "hasCourse": true,
  "course": {
    "id": 3,
    "title": "Management workshop",
    "description": "Workshop description",
    "startDate": "2026-12-10T09:00:00Z",
    "earlierDate": "2026-12-01T00:00:00Z",
    "nrOfSeats": 15,
    "isFree": false,
    "currency": "EUR",
    "priceInCents": 15000
  }
}
```

Here `nrOfSeats` subtracts all enrollment records, including cancelled ones, from total capacity. The current implementation returns `1` when the enrollment count meets or exceeds capacity.

**Response when no qualifying course exists:** `200 OK`:

```json
{
  "hasCourse": false,
  "message": "Sorry, there is no course posted yet."
}
```

### GET `/api/user/courses/thank-you`

**Input:** None. No enrollment ID or proof of enrollment is required.

Selects the same next course as `/api/user/courses/latest`. Returns `200 OK` with `{ "hasCourse": true, "course": ... }`. The nested course contains all **Course** fields plus a string `whatsappLink`, for example `"https://chat.whatsapp.com/example"`.

Here `nrOfSeats` is total capacity minus all enrollment records, including cancelled ones, without the minimum-of-one behavior in `/latest`; it can be zero or negative. If no qualifying course exists, returns the same `200 OK` `hasCourse: false` message as `/latest`.

### Course response schema

**Course:**

```json
{
  "id": 3,
  "title": "Management workshop",
  "description": "Workshop description",
  "startDate": "2026-12-10T09:00:00Z",
  "earlierDate": "2026-12-01T00:00:00Z",
  "nrOfSeats": 20,
  "isFree": false,
  "currency": "EUR",
  "priceInCents": 15000
}
```

`earlierDate` is the cutoff used for early payment enrollment. `priceInCents` is an integer amount in minor currency units (for example, `15000` EUR cents = EUR 150). Seat-count semantics vary by endpoint as described above.

## Enrollment

### POST `/api/courses/{courseId:int}/enroll/free`

Enrolls a visitor in a free course, creating or reusing a user by email. On success, starts background work to add the contact to GetResponse and queue a confirmation email.

**Input:** Course ID in the path and this JSON body:

```json
{
  "name": "Alex Example",
  "email": "alex@example.com",
  "phoneNumber": "+40712345678",
  "participationChoice": "online",
  "courseSource": "website"
}
```

| Field | Type | Validation/behavior |
| --- | --- | --- |
| `name` | string | Required, nonblank; trimmed. |
| `email` | string | Required, nonblank; trimmed and lowercased. No explicit email-format validation. |
| `phoneNumber` | string | Optional in service logic; blank/null input is accepted and passed through phone normalization. Use international format with `+` to preserve the value. |
| `participationChoice` | string | Optional in service logic; trimmed, with blank/null normalized to an empty string. No enumerated values enforced. |
| `courseSource` | string | Optional in service logic; trimmed, with blank/null normalized to an empty string. No enumerated values enforced. |

**Success:** `200 OK`:

```json
{
  "enrollmentId": 42,
  "status": "enrolled"
}
```

**Errors:**

| Status | JSON string body |
| --- | --- |
| `400 Bad Request` | `"Missing required fields."` for blank name/email. |
| `400 Bad Request` | `"This endpoint enrolls only free courses."` for a paid course. |
| `404 Not Found` | `"Course not found."` |
| `409 Conflict` | `"Already enrolled."` for an existing non-cancelled enrollment, or a database update failure mapped to that outcome. |

The handler also maps a full-course outcome to `409` with `"Course is full."`, but the free-course capacity check is currently commented out in the service. Free enrollment therefore does not currently enforce seat capacity. The handler has fallback `400` responses `"Invalid input."` / `"Could not enroll."` for other service outcomes.

### POST `/api/courses/{courseId:int}/enroll/paid`

Registers an enrollment with `pending` status, reserving a seat while payment awaits confirmation. Creates or reuses a user by email and sends a pending-payment email. This endpoint does not collect payment or return a checkout URL.

**Input:** Course ID in the path and this JSON body:

```json
{
  "name": "Alex Example",
  "email": "alex@example.com",
  "phoneNumber": "+40712345678",
  "teamSize": "5",
  "participationChoice": "online",
  "courseSource": "website",
  "paymentChoice": 2
}
```

| Field | Type | Validation/behavior |
| --- | --- | --- |
| `name` | string | Required, nonblank. Trimmed when used to create/update the user's name. |
| `email` | string | Required, nonblank; trimmed and lowercased. No explicit email-format validation. |
| `phoneNumber` | string | No nonblank validation; normalized before storage. International `+` format is preserved. |
| `teamSize` | string | Declared in the request DTO but currently neither used nor persisted by the service. |
| `participationChoice` | string | No nonblank validation or enumerated values enforced; saved in form answers. |
| `courseSource` | string | No nonblank validation or enumerated values enforced; saved in form answers. |
| `paymentChoice` | integer | Required value `1`, `2`, or `3`; see below. |

Payment choices: `1` = early payment (current UTC time must be strictly before `earlierDate`); `2` = payment by the start date (as described in the email); `3` = installments. Only choice `1` has a date-window check in this service.

**Success:** `200 OK`:

```json
{
  "enrollmentId": 43,
  "status": "pending"
}
```

**Errors:**

| Status | JSON string body |
| --- | --- |
| `400 Bad Request` | `"Invalid input."` (including blank name/email). |
| `400 Bad Request` | `"This endpoint is for paid courses only."` for a free course. |
| `400 Bad Request` | `"PaymentChoice must be 1, 2 or 3."` |
| `400 Bad Request` | `"Early payment window is closed."` |
| `404 Not Found` | `"Course not found."` |
| `409 Conflict` | `"Course is full."` when non-cancelled enrollments meet/exceed capacity. |
| `409 Conflict` | `"Already enrolled."` for an existing non-cancelled enrollment, or a database update failure mapped to that outcome. |

The capacity check occurs before the duplicate check, so an already-enrolled caller can receive `"Course is full."` if the course is full.

## Admin login

### POST `/api/admin/auth/login`

Validates an existing admin user's email and BCrypt password, then issues a signed JWT.

**JSON body:**

```json
{
  "email": "admin@example.com",
  "password": "your-password"
}
```

Both fields must be nonblank. Email is trimmed and lowercased for lookup; the account must have the `admin` role.

**Success:** `200 OK`:

```json
{
  "token": "<JWT>",
  "exp": "2026-11-18T12:00:00Z"
}
```

`exp` is the UTC expiration timestamp determined by configured token lifetime. The actual handler returns `exp`, even though an unused response DTO names this field `expiresAt`.

**Errors:**

| Status | Body |
| --- | --- |
| `400 Bad Request` | `{ "message": "Email and Password are required." }` |
| `401 Unauthorized` | Empty body for an unknown/non-admin email or incorrect password. |
| `500 Internal Server Error` | Problem Details JSON with `detail: "Login failed during token creation."` if token creation fails. |

## Public media files

### GET / HEAD `/media/{filePath}`

Serves existing files from the configured `Storage:RootPath` directory, falling back to the backend's `media` directory. This static-file middleware runs before authentication.

**Input:** Relative file path, for example `/media/blogs/5/example.png`. No body is required. GET requests can use range/conditional headers for streaming or caching.

**Responses:** `200 OK` with the file bytes and a content type inferred from the file extension; HEAD returns headers without file bytes. Depending on range/conditional headers, the middleware can also return `206 Partial Content`, `304 Not Modified`, or `416 Range Not Satisfiable`. Missing files or unsupported file extensions normally fall through to `404 Not Found`. This is file access, not a directory listing or upload API.

## Scope and source references

- `/api/email/newsletter/subscribe` is defined in `Endpoints/EmailEndpoints.cs` but is **not registered** in `Program.cs`, so it is not an available visitor route.
- `/api/courses` course-management endpoints require `AdminOnly`. The two enrollment routes use a separate group with the same prefix and do not inherit that authorization requirement.
- Admin-management endpoints, blog mutations, `/api/blogs/all`, blog media-management endpoints, admin logout, and admin `/me` require `AdminOnly` and are excluded from this visitor reference.
- Route registration and static files: `Program.cs`.
- Authentication policy: `Services/Infrastructure/ServiceCollectionExtensions_AuthAndDb.cs` (no fallback policy requiring authentication).
- Public handlers: `Endpoints/NormalUserEndpoints.cs`, `Endpoints/BlogEndpoints.cs`, `Endpoints/EnrollmentEndpoints.cs`, `Endpoints/AuthEndpoints.cs`.
- Payloads and response shapes: `DTOs/NormalUserDtos`, `DTOs/BlogDtos`, `DTOs/MediaDtos/ReadMediaDto.cs`, `DTOs/AdminDtos/CourseDtos`, and `DTOs/AuthDtos/Authentication.cs`.
- Filtering, enrollment validation, and side effects: `Services/NormalUserServices/NormalUserService.cs`, `Services/BlogServices/BlogServices.cs`, `Services/CourseServices/CourseService.cs`, and `Services/EnrollmentServices/CourseEnrollmentService.cs`.
