# Admin blog endpoints and database behavior

This reference describes the current blog-management implementation, including requests, responses, validation, database changes, file storage, and newsletter notifications. It is based on the registered routes, services, entities, and EF Core migration snapshot in this repository; it is not a live database inspection.

## Calling the API

All paths are relative to the backend origin. Protected routes require:

```http
Authorization: Bearer <admin-jwt>
```

Obtain the token through `POST /api/admin/auth/login` with an existing admin's email/password; see `visitorEndpoints.md`. The `AdminOnly` policy requires the `admin` role. Protected routes normally return `401 Unauthorized` for missing/invalid credentials and `403 Forbidden` for an authenticated principal without that role.

Send JSON bodies with `Content-Type: application/json`; upload files as `multipart/form-data`. JSON properties use camelCase. Dates in examples are illustrative ISO 8601 timestamps. `{id:int}`, `{blogId:int}`, and `{mediaId:int}` are integer route parameters. No endpoint below requires query parameters.

| Method | Route | Authorization | Purpose |
| --- | --- | --- | --- |
| POST | `/api/blogs/` | AdminOnly | Create a hidden blog and queue newsletter announcements. |
| GET | `/api/blogs/all` | AdminOnly | List all blogs, both visible and hidden. |
| GET | `/api/blogs/visible` | Public | List visible blogs. |
| GET | `/api/blogs/summary/{id:int}` | Public | Read one summary, including full content. |
| GET | `/api/blogs/detailed/{id:int}` | Public | Read one blog with media metadata and URLs. |
| PUT | `/api/blogs/{id:int}` | AdminOnly | Update selected fields, including visibility. |
| PUT | `/api/blogs/visible/{id:int}` | AdminOnly | Set visibility to true. |
| PUT | `/api/blogs/non-visible/{id:int}` | AdminOnly | Set visibility to false. |
| DELETE | `/api/blogs/{id:int}` | AdminOnly | Delete the blog, related media rows, and its local media folder. |
| POST | `/api/blogs/{blogId:int}/media/` | AdminOnly | Upload one or more files. |
| GET | `/api/blogs/{blogId:int}/media/` | AdminOnly | List media belonging to a blog. |
| DELETE | `/api/blogs/{blogId:int}/media/{mediaId:int}` | AdminOnly | Delete one media item and its local file. |

The public read routes are included because an admin editor can use them too. Individual summary/detail lookups do **not** check visibility: hidden blogs remain retrievable by ID. `/media/...` file access is also public, including files attached to hidden blogs.

## What is stored

The app uses EF Core with MySQL. The tables and SQL types below come from `Migrations/EntityContextModelSnapshot.cs`.

### `Blogs` table

| Column | SQL type | Stored value / source |
| --- | --- | --- |
| `Id` | `int`, primary key, auto increment | Database-generated blog ID. |
| `Title` | required `longtext` | Request title, preserved without trimming. |
| `Content` | required `longtext` | Request content string, preserved as supplied. No server-side rich-text conversion or HTML sanitization is implemented in the blog service. |
| `Summary` | required `longtext` | Request summary, preserved as supplied. |
| `DatePosted` | `datetime(6)` | `DateTime.UtcNow` at creation; publishing and editing do not reset it. MySQL stores no timezone offset in this column. |
| `IsVisible` | `tinyint(1)` | Initially `false`; changed by update/visibility routes. |
| `Slug` | required `longtext` | Generated from the title at creation and whenever a non-null title is supplied in an update. |

There is no author/admin ID, updated-at timestamp, separate published-at timestamp, view counter, or revision history in this entity. There is no unique constraint on title or slug. `Blog.Media` is an EF navigation collection, not a column containing file bytes or JSON.

**Slug generation:** remove characters outside `A-Z`, `a-z`, `0-9`, Unicode range `\u00C0-\u017F`, and whitespace; trim; replace each literal space with `-`; call `.ToLower()`. Example: `"Management: First Steps!"` becomes `"management-first-steps"`. Consecutive spaces can produce consecutive hyphens; tabs/newlines are not replaced by the literal-space replacement. Empty and duplicate slugs are possible. No API in this group looks up blogs by slug.

### `Medias` table

| Column | SQL type | Stored value / source |
| --- | --- | --- |
| `Id` | `int`, primary key, auto increment | Database-generated media ID. |
| `BlogId` | `int`, indexed foreign key | Owning `Blogs.Id`. |
| `Url` | required `longtext` | Public path such as `/media/blogs/5/<guid>.png`. |
| `OriginalFileName` | nullable `longtext` | Original uploaded filename from `IFormFile.FileName`. |
| `ContentType` | nullable `longtext` | Uploaded MIME type from `IFormFile.ContentType`. |
| `SizeBytes` | `bigint` | Uploaded file length. |
| `StorageProvider` | required `longtext` | Set to `"Local"` for uploads. |
| `Kind` | `int` | `0` = image, `1` = video; chosen from the MIME type. |

One blog has many media rows. `BlogId` is required and deleting a blog cascades to its media rows. There is no media ordering column, caption, alt text, or thumbnail field; lists are ordered by media ID.

**File bytes are stored on disk**, under `Storage:RootPath`, or `<backend>/media` when unset:

```text
<storage-root>/blogs/5/<guid>.png
```

The filename is a new GUID in `N` format (32 hex characters) plus the original extension. The original name is kept only as metadata. Uploads append new media rows; they do not replace an existing file with the same original name.

`path` and `viewUrl` in read responses are derived from `Medias.Url`; they are not additional database columns. With the registered filesystem storage service, these are normally the same origin-relative URL. Despite older SAS-related comments/DTOs, the active implementation does not issue expiring signed links. Existing absolute URLs are preserved when constructing `viewUrl`.

## Create a blog

### POST `/api/blogs/`

**Authorization:** AdminOnly.

**Request:**

```json
{
  "title": "Management: First Steps!",
  "content": "<p>The full article goes here.</p>",
  "summary": "Practical advice for new managers."
}
```

`title`, `content`, and `summary` are strings in `CreateBlogDto`. The converter explicitly rejects blank/null `title` and `content`. Although its error message also mentions summary, it does not explicitly reject blank summary. Summary is required by the database model: an empty string can be stored, while a null value can fail when saving. No application length limit or title/slug uniqueness check is implemented.

**Processing and database writes:**

1. Build a `Blog` from the three strings, generate `Slug`, set `DatePosted` to current UTC time, and force `IsVisible = false`.
2. Insert one row into `Blogs` and save it to get the generated `Id`. No media rows are created. The request DTO has no media, date, ID, slug, or visibility field for callers to set.
3. Read email addresses from `Users` where `IsNewsLetterSub` is true. This does not modify those user records.
4. Queue one announcement per recipient. Subject: `New post: <title>`. The HTML includes an HTML-encoded title and summary, plus a link to `https://aspiringmanagers.ro/blogs/{id}`.
5. Return the newly created entity.

Announcements are queued **even though the blog is hidden**. Publishing later does not queue another announcement. Creation is saved before recipients are fetched or emails are queued; a subsequent failure does not roll back the inserted blog. Retrying creation can create another blog and another set of announcements.

**Success:** `201 Created`, with `Location: /blogs/5` and this entity-shaped body:

```json
{
  "id": 5,
  "title": "Management: First Steps!",
  "content": "<p>The full article goes here.</p>",
  "summary": "Practical advice for new managers.",
  "media": [],
  "datePosted": "2026-11-18T10:00:00Z",
  "isVisible": false,
  "slug": "management-first-steps"
}
```

The `Location` header omits `/api` and is not the API's detailed-read route. Use `/api/blogs/detailed/5` to read the created blog through the API.

**Explicit errors:**

| Status | JSON string body |
| --- | --- |
| `400 Bad Request` | `"Title, content and summary fields are mandatory"` when title/content validation fails. |
| `400 Bad Request` | `"Failed to create blog: <exception message>"` when creation/conversion/database saving throws inside the service. |

The newsletter work happens outside that service's exception handler; failures there can become server errors after insertion.

**Email persistence:** `ChannelEmailQueue` is an in-memory channel processed by a background worker. There is no database outbox, blog-announcement delivery record, or retry mechanism in this queue. A `201` response confirms creation and the queueing attempt, not successful delivery to every recipient. A process termination can lose queued work.

## Read blogs

All read operations below leave the database unchanged.

### GET `/api/blogs/all`

**Authorization:** AdminOnly. **Body:** None.

Returns `200 OK` with an array of **BlogSummary** objects, including both visible and hidden blogs, ordered by `DatePosted` descending. Returns `[]` when empty. No pagination, search, or hidden-only filter is implemented. The code comment saying "List non-visible blogs" does not match the actual all-blogs query.

### GET `/api/blogs/visible`

**Authorization:** Public. **Body:** None.

Returns `200 OK` with a **BlogSummary** array filtered to `IsVisible = true`, ordered by `DatePosted` descending. Returns `[]` when empty. `/api/user/blogs` exposes an equivalent visible-summary list.

### GET `/api/blogs/summary/{id:int}`

**Authorization:** Public. **Body:** None. **Path input:** Blog ID.

Looks up the blog by ID without a visibility filter. Returns `200 OK` with **BlogSummary**, or `404 Not Found` with no body. The service includes media in its database query, but media is not part of the summary response.

### GET `/api/blogs/detailed/{id:int}`

**Authorization:** Public. **Body:** None. **Path input:** Blog ID.

Loads the blog and its media without a visibility filter. Returns `200 OK` with **BlogDetail**, or `404 Not Found` with no body. Media is ordered by ID ascending and each stored URL is converted to a read URL. The response deliberately has no `summary` field; use the summary endpoint when loading that field for an editor.

### Read response shapes

**BlogSummary** contains the full content as well as the short summary:

```json
{
  "id": 5,
  "title": "Management: First Steps!",
  "content": "<p>The full article goes here.</p>",
  "datePosted": "2026-11-18T10:00:00Z",
  "summary": "Practical advice for new managers.",
  "isVisible": false,
  "slug": "management-first-steps"
}
```

**BlogDetail** uses `BlogDetailDto`, rather than the older `ReadDetailedBlogDto`:

```json
{
  "id": 5,
  "title": "Management: First Steps!",
  "content": "<p>The full article goes here.</p>",
  "datePosted": "2026-11-18T10:00:00Z",
  "isVisible": false,
  "media": [
    {
      "id": 12,
      "path": "/media/blogs/5/0123456789abcdef0123456789abcdef.png",
      "kind": 0,
      "viewUrl": "/media/blogs/5/0123456789abcdef0123456789abcdef.png",
      "originalFileName": "cover.png",
      "contentType": "image/png",
      "sizeBytes": 20480
    }
  ],
  "slug": "management-first-steps"
}
```

`media` can be empty. `originalFileName` and `contentType` can be null according to the response model. `kind` is a numeric enum (`0` image, `1` video). The media entry shape above is also the **MediaRead** shape used by the upload and media-list endpoints.

## Edit a blog

### PUT `/api/blogs/{id:int}`

**Authorization:** AdminOnly. **Path input:** Blog ID.

Although the HTTP method is PUT, this handler implements partial updates. All four DTO fields are nullable; omitted or null values leave their current database values unchanged.

**Example request:**

```json
{
  "title": "Management: Next Steps!",
  "content": "<p>Updated article.</p>",
  "summary": "Updated short description.",
  "isVisible": true
}
```

| Supplied non-null field | Database effect |
| --- | --- |
| `title` | Overwrites `Title` and regenerates `Slug` using the same title-to-slug rules as creation. |
| `content` | Overwrites `Content` as supplied. |
| `summary` | Overwrites `Summary` as supplied. |
| `isVisible` | Overwrites `IsVisible`; `false` is applied as a real value. |

This update path does not run creation validation: empty strings can overwrite title, content, or summary. An empty title produces an empty slug. `{}` is accepted and returns success for an existing blog. Null cannot be used to clear a column; use an empty string to clear a text value. Fields such as ID, slug, date, and media are not update DTO fields.

The service finds the blog, applies the non-null values, and calls `SaveChangesAsync`. It does not change `DatePosted`, edit media, or send emails. Setting visibility to its existing value is accepted here, unlike the dedicated visibility routes.

**Responses:** `200 OK` with JSON string `"Updated."`, or `404 Not Found` with an empty body if the blog does not exist. The handler does not catch persistence exceptions or explicitly return validation `400` responses.

## Change visibility

### PUT `/api/blogs/visible/{id:int}`

**Authorization:** AdminOnly. **Body:** None. **Path input:** Blog ID.

Finds the blog and, if currently hidden, changes only `Blogs.IsVisible` to true and saves. This makes it appear in visible-blog lists. No publish timestamp or notification is stored, and no email is sent.

| Status | JSON string body |
| --- | --- |
| `200 OK` | `"Updated to visible"` |
| `404 Not Found` | `"No blog with this id exists"` |
| `400 Bad Request` | `"Blog is already visible"` |

### PUT `/api/blogs/non-visible/{id:int}`

**Authorization:** AdminOnly. **Body:** None. **Path input:** Blog ID.

Finds the blog and, if currently visible, changes only `Blogs.IsVisible` to false and saves. It disappears from visible lists, but ID-based reads and static media access remain available. No email is sent.

| Status | JSON string body |
| --- | --- |
| `200 OK` | `"Updated to non-visible"` |
| `404 Not Found` | `"No blog with this id exists"` |
| `400 Bad Request` | `"Blog is already non-visible"` |

## Upload media

### POST `/api/blogs/{blogId:int}/media/`

**Authorization:** AdminOnly. **Path input:** Existing blog ID.

**Request:** Multipart form data containing one or more file parts. The handler reads `form.Files`, so there is no required file field name; `files` is a suitable convention. Ordinary text form fields are not used. When using browser `FormData`, let the browser set the content type and boundary.

```javascript
const form = new FormData();
form.append("files", imageFile);
form.append("files", videoFile);

const response = await fetch(`${apiOrigin}/api/blogs/5/media/`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}` },
  body: form
});
```

**Validation and configured limits:**

| Category | Allowed MIME types | Per-file service limit |
| --- | --- | --- |
| Image | `image/png`, `image/jpeg`, `image/webp` | 10,485,760 bytes (10 MiB) |
| Video | `video/mp4`, `video/webm`, `video/quicktime` | 524,288,000 bytes (500 MiB) |

The allowlist compares the reported content type; the service does not inspect file signatures or enforce an extension-to-MIME match. Empty files are not explicitly rejected. Multipart body parsing is configured with a 629,145,600-byte (600 MiB) limit; hosting/server/proxy request limits can reject requests earlier. A configured service cap is not a guarantee that the host accepts a request of that size.

**Processing and persistence:**

1. Verify the blog exists.
2. For each file, validate its content type and size, then write it to `<storage-root>/blogs/{blogId}/{guid}{extension}`.
3. Build one `Media` entity per file with `BlogId`, URL, original filename, byte length, content type, `StorageProvider = "Local"`, and numeric `Kind`.
4. After all files have been written, add all media entities and save them to `Medias` in one `SaveChangesAsync` call.
5. Return projected **MediaRead** objects. No `Blogs` field, timestamp, content string, or visibility flag is changed.

Files are written before media rows are saved. A later file's validation failure or a database failure can therefore leave earlier files on disk without corresponding media rows. The implementation has no cleanup/rollback spanning filesystem writes and database changes.

Uploading a file does not automatically insert its URL into `Blogs.Content` or select a cover image. The frontend decides how to display the returned media. If it embeds a URL in content, that content must be saved separately through the blog update route.

**Success:** `201 Created`, with `Location: /blogs/5/media` and a **MediaRead** array (even for a single file). The Location omits `/api`; use `/api/blogs/5/media/` for API listing.

**Explicit errors:** all return `400 Bad Request` with a JSON string:

| Condition | Body |
| --- | --- |
| Request is not form content | `"multipart/form-data required."` |
| No uploaded files | `"No files provided."` |
| Blog ID does not exist | `"Blog not found."` (400, not 404) |
| MIME type is not allowed | `"Unsupported content type: <type>"` |
| File exceeds the image cap | `"File too large. Max image size is 10485760 bytes."` |
| File exceeds the video cap | `"File too large. Max video size is 524288000 bytes."` |

The handler checks `HasFormContentType`, then reads the form before entering its upload `try/catch`. Form parsing, request-size, I/O, or database failures are not all converted into these string responses; the catch only handles `InvalidOperationException` raised during upload/projection.

## List media

### GET `/api/blogs/{blogId:int}/media/`

**Authorization:** AdminOnly. **Body:** None. **Path input:** Blog ID.

Queries `Medias` where `BlogId` matches, orders by media ID ascending, and constructs a **MediaRead** array. Returns `200 OK` with that array, or `[]` if there are no media rows. It does not separately check whether the blog exists, so a nonexistent blog also returns `200 OK` with `[]`.

No database rows or files are modified.

## Delete one media item

### DELETE `/api/blogs/{blogId:int}/media/{mediaId:int}`

**Authorization:** AdminOnly. **Body:** None. **Path inputs:** Owning blog ID and media ID.

1. Find a `Medias` row matching **both** IDs. A media ID belonging to a different blog does not match.
2. Attempt to delete the file identified by `Medias.Url` from local storage.
3. Remove the media row and save database changes.

**Responses:** `204 No Content` on success, or `404 Not Found` with an empty body when no matching row exists.

The filesystem service returns false for an already missing file, a non-local URL, or a path outside its `/media` URL prefix; the media service ignores that boolean and still deletes the row. An actual file-deletion exception prevents the database removal. Conversely, if database saving fails after file deletion, the row can remain while its file is gone.

The blog itself is preserved. This operation does not rewrite `Blogs.Content`, so manually embedded references to the deleted file remain in the article text.

## Delete a blog

### DELETE `/api/blogs/{id:int}`

**Authorization:** AdminOnly. **Body:** None. **Path input:** Blog ID.

1. Look up the blog. If found, delete its `Blogs` row and save; the configured foreign-key cascade deletes its related `Medias` rows.
2. Call storage cleanup for prefix `blogs/{id}`. The filesystem service deletes files recursively under that folder and removes the folder. This cleanup runs even if the blog lookup failed.
3. Return `204 No Content` if the blog existed, otherwise `404 Not Found` with no body. The count of removed files is not returned.

This is a permanent delete; there is no soft-delete flag, archive, or restore endpoint. `Users` and newsletter subscriptions are not changed, and no deletion email is sent.

Database deletion happens before folder cleanup, with no combined transaction. If cleanup throws, the request can fail after blog/media rows have already been removed, leaving files on disk. Cascade deletion alone removes metadata, not file bytes. Whole-blog cleanup only targets the local `blogs/{id}` folder; it does not delete external/CDN resources referenced by URLs.

## Suggested editor sequence

1. Load `/api/blogs/all` to populate the admin list.
2. For an existing blog, read its summary for title/content/summary/visibility, and its detailed response or media list for attachments.
3. Create a blog to obtain its ID, remembering that creation immediately queues subscriber announcements while storing the blog as hidden.
4. Upload media using that ID. If embedding media URLs in the article, save the updated content with `PUT /api/blogs/{id}`.
5. Set visibility using the update route or dedicated visibility route. Publishing does not trigger another announcement.
6. Delete individual media through their own route, or delete the blog to remove its rows and local folder.

These steps are separate requests and are not one atomic operation. A later failure does not automatically undo successful earlier steps.

## General response notes and source map

Invalid JSON/missing bodies, invalid parameter binding, and unsupported JSON content types can yield framework errors such as `400` or `415` before a handler runs. Unhandled storage/database failures can produce server errors. Exact framework-generated error bodies depend on the runtime/environment; the endpoint-specific tables above describe explicit application responses.

| Concern | Source |
| --- | --- |
| Route registration, public static files, storage registration | `Program.cs` |
| Blog handlers and newsletter announcements | `Endpoints/BlogEndpoints.cs` |
| Media handlers | `Endpoints/MediaEndpoints.cs` |
| Blog CRUD, visibility filters, DTO projection | `Services/BlogServices/BlogServices.cs` |
| Creation validation and slug algorithm | `DTOs/BlogDtos/BlogConverter.cs` |
| Request and response DTOs | `DTOs/BlogDtos/*.cs`, `DTOs/MediaDtos/ReadMediaDto.cs` |
| Blog/media entities | `Entities/Blog.cs`, `Entities/Media.cs` |
| Relationship and cascade configuration | `Data/EntityContext.cs` |
| SQL table/column definitions | `Migrations/EntityContextModelSnapshot.cs` |
| File validation, persistence, deletion | `Services/MediaServices/MediaService.cs` |
| MIME/size policy | `Services/StorageServices/MediaOptions.cs` |
| Multipart limit and service registration | `Services/AppServiceExtensions.cs` |
| Local paths, file operations, read URLs | `Services/StorageServices/FileSystemStorageServices.cs` |
| In-memory email queue | `Services/Email/ChannelEmailQueue.cs` |
| JWT validation and AdminOnly policy | `Services/Infrastructure/ServiceCollectionExtensions_AuthAndDb.cs` |
