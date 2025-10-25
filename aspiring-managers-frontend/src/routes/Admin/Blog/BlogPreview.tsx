import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogDetailed, setBlogVisible, type BlogDetailDto } from "@/services/blog";//setBlogNonVisible
import { mediaUrl } from "@/lib/url";
import AdminNavbar from "@/components/admin/AdminNavbar";

function isImageKind(k: 0 | 1 | "Image" | "Video") {
  return k === 0 || k === "Image";
}
function decodeSlashes(v: string) {
  return v.replaceAll("/t", "\t").replaceAll("/n", "\n");
}

export default function AdminBlogPreviewPage() {
  const { id } = useParams();               // /admin/blogs/:id/preview
  const blogId = useMemo(() => Number(id), [id]);
  const navigate = useNavigate();

  const [blog, setBlog] = useState<BlogDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [saving, setSaving] = useState<"invisible" | "visible" | null>(null);
  const [showCancel, setShowCancel] = useState(false);
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const data = await getBlogDetailed(blogId);
        if (alive) setBlog(data);
      } catch {
        setErr("Failed to load blog preview.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [blogId]);

  // async function saveInvisible() {
  //   try {
  //     setSaving("invisible");
  //     await setBlogNonVisible(blogId);
  //     navigate("/admin/blogs");
  //   } catch {
  //     setErr("Failed to save as invisible.");
  //   } finally {
  //     setSaving(null);
  //   }
  // }

  async function saveAndPost() {
    try {
      setSaving("visible");
      await setBlogVisible(blogId);
      navigate("/admin/blogs");
    } catch {
      setErr("Failed to save & post.");
    } finally {
      setSaving(null);
    }
  }

  if (loading) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center bg-[var(--am-bg-light)]">
        <div className="text-[var(--am-text-muted)]">Loading preview…</div>
      </section>
    );
  }
  if (err || !blog) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center bg-[var(--am-bg-light)]">
        <div className="text-red-600">{err ?? "Not found."}</div>
      </section>
    );
  }

  return (
    <>
    <AdminNavbar />
    <section className="min-h-[80vh] flex items-center justify-center bg-[var(--am-bg-light)]">
      <div className="w-full max-w-3xl bg-[var(--am-white)] border border-[var(--am-border-gray)] rounded-2xl shadow-sm p-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-[var(--am-text-dark)] mb-4 text-center">
            {blog.title}
        </h1>

        {/* Content */}
        <div className="text-[var(--am-text-dark)]/90 whitespace-pre-wrap leading-relaxed mb-6 text-left">
            {decodeSlashes(blog.content)}
        </div>

        {/* Media strip */}
        <div className="mb-8 flex justify-center">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            {blog.media.length === 0 ? (
              <div className="text-sm text-[var(--am-text-muted)]">No media attached.</div>
            ) : (
              blog.media.map((m) =>
                isImageKind(m.kind) ? (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setZoomSrc(mediaUrl(m.url))}
                    title="Click to zoom"
                    className="shrink-0 rounded-lg border border-[var(--am-border-gray)] overflow-hidden bg-[var(--am-bg-light)]"
                  >
                    <div className="w-40 h-40 flex items-center justify-center bg-[var(--am-bg-light)]">
                      <img
                        src={mediaUrl(m.url)}
                        alt={`Media ${m.id}`}
                        className="max-w-full max-h-full object-contain block"
                      />
                    </div>
                  </button>
                ) : (
                  <div
                    key={m.id}
                    className="w-40 h-40 shrink-0 rounded-lg border border-[var(--am-border-gray)] overflow-hidden bg-[var(--am-bg-light)] flex items-center justify-center text-xs text-[var(--am-text-muted)]"
                  >
                    Video
                  </div>
                )
              )
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setShowCancel(true)}
            className="rounded-lg bg-[var(--am-gray-light)] text-[var(--am-text-dark)] font-medium px-4 py-2 hover:brightness-95"
          >
            Cancel
          </button>

          {/* <button
            onClick={saveInvisible}
            disabled={saving !== null}
            className="rounded-lg bg-[var(--am-primary-teal)] text-[var(--am-white)] font-medium px-4 py-2 hover:brightness-110 disabled:opacity-60"
          >
            {saving === "invisible" ? "Saving…" : "Save (Invisible)"}
          </button> */}

          <button
            onClick={saveAndPost}
            disabled={saving !== null}
            className="rounded-lg bg-[var(--am-accent-green)] text-[var(--am-white)] font-medium px-4 py-2 hover:brightness-110 disabled:opacity-60"
          >
            {saving === "visible" ? "Posting…" : "Save & Post"}
          </button>
        </div>
      </div>

      {/* Cancel modal */}
      {showCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="w-full max-w-md rounded-2xl bg-[var(--am-white)] border border-[var(--am-border-gray)] shadow-lg p-6 text-left">
            <h3 className="text-lg font-semibold text-[var(--am-text-dark)] mb-2">
              Discard preview?
            </h3>
            <p className="text-sm text-[var(--am-text-muted)] mb-6">
              Cancelling won’t post the blog and returns you to Blogs.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCancel(false)}
                className="rounded-lg bg-[var(--am-gray-light)] text-[var(--am-text-dark)] px-4 py-2 hover:brightness-95"
              >
                Go Back
              </button>
              <button
                onClick={() => navigate("/admin/blogs")}
                className="rounded-lg bg-[var(--am-primary-teal)] text-white px-4 py-2 hover:brightness-110"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Zoom modal */}
      {zoomSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setZoomSrc(null)}
          role="dialog"
          aria-modal="true"
        >
          <img
            src={zoomSrc}
            alt="Zoomed"
            className="max-w-[95vw] max-h-[90vh] object-contain shadow-2xl rounded-lg"
          />
        </div>
      )}
    </section>
    </>
  );
}
