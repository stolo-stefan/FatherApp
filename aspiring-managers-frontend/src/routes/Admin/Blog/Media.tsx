import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  listMedia,
  deleteMedia,
  uploadMedia,
  type ReadMediaDto,
} from "@/services/media";
import { mediaUrl } from "@/lib/url";
import AdminNavbar from "@/components/admin/AdminNavbar";

/**
 * /admin/blogs/media?id=<blogId>
 * Layout:
 * - Left: 2/3 width (Upload, Save & Continue, Cancel)
 * - Right: 1/3 width (existing media, stacked tiles with delete "X")
 * Colors: var(--am-*)
 */
export default function AdminBlogMediaPage() {

        function isImageKind(k: ReadMediaDto["kind"]) {
            return k === 0 || k === "Image";
        }
        function isVideoKind(k: ReadMediaDto["kind"]) {
            return k === 1 || k === "Video";
        }

    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    // Read blog id from ?id=... (preferred)
    const searchId = useMemo(() => {
        const q = new URLSearchParams(location.search);
        const v = q.get("id");
        return v ? Number(v) : undefined;
    }, [location.search]);

    // Optional: support /admin/blogs/:id/media
    const paramId = params.id ? Number(params.id) : undefined;

    const blogId = searchId ?? paramId;

    const [media, setMedia] = useState<ReadMediaDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);
    const [showCancel, setShowCancel] = useState(false);
    const [uploading, setUploading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

        async function refresh() {
            if (!blogId || Number.isNaN(blogId)) return;
            try {
                setLoading(true);
                setErr(null);
                const list = await listMedia(blogId);
                setMedia(list);
            } catch {
                setErr("Failed to load media.");
            } finally {
                setLoading(false);
            }
        }

        useEffect(() => {
            if (!blogId) {
                setLoading(false);
                setErr("Missing or invalid blog id.");
                return;
            }
            refresh();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [blogId]);

        async function handleDelete(mId: number) {
            if (!blogId) return;
            try {
                await deleteMedia(blogId, mId);
                setMedia((prev) => prev.filter((m) => m.id !== mId));
            } catch {
            // simple inline error; you can add a toast here if you have one
                alert("Failed to delete media.");
            }
        }

        async function handleUpload(files: FileList | null) {
            if (!files || files.length === 0 || !blogId) 
                return;
            try {
                setUploading(true);
                await uploadMedia(blogId, files);
                await refresh();
            } catch {
                alert("Upload failed. Ensure multipart/form-data and try again.");
            } finally {
                setUploading(false);
            if (fileInputRef.current) 
                fileInputRef.current.value = "";
            }
        }

        return (
            <>
            <AdminNavbar />
            <section className="min-h-[80vh] flex items-stretch justify-center bg-[var(--am-bg-light)]">
            <div className="w-full max-w-6xl flex gap-6 p-6">
                {/* Left: 2/3 controls */}
                <div className="basis-2/3 bg-[var(--am-white)] border border-[var(--am-border-gray)] rounded-2xl shadow-sm p-6 flex flex-col">
                <h1 className="text-2xl font-bold text-[var(--am-text-dark)] mb-1">
                    Blog Media
                </h1>
                <p className="text-sm text-[var(--am-text-muted)] mb-6">
                    Blog ID: {blogId ?? "—"}
                </p>

                <div className="flex flex-col gap-3 max-w-xs">
                    {/* Upload */}
                    <button
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-lg bg-[var(--am-primary-teal)] text-white font-medium px-4 py-2 hover:brightness-110 disabled:opacity-60"
                    disabled={!blogId || uploading}
                    >
                    {uploading ? "Uploading..." : "Upload Media"}
                    </button>
                    <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleUpload(e.currentTarget.files)}
                    />

                    {/* Save & Continue (decide next step route later) */}
                    <button
                    onClick={() => navigate(`/admin/blogs/${blogId}/preview`)}
                    className="rounded-lg bg-[var(--am-accent-green)] text-[var(--am-white)] font-medium px-4 py-2 hover:brightness-110"
                    >
                    Save & Continue
                    </button>

                    {/* Cancel */}
                    <button
                    onClick={() => setShowCancel(true)}
                    className="rounded-lg bg-[var(--am-gray-light)] text-[var(--am-text-dark)] font-medium px-4 py-2 hover:brightness-95"
                    >
                    Cancel
                    </button>
                </div>

                <div className="mt-8 text-[var(--am-text-muted)] text-sm">
                    Upload images or videos. Uploaded files will show on the right. You can delete any item with the
                    <span className="mx-1 inline-flex items-center justify-center h-5 w-5 rounded-sm border border-[var(--am-border-gray)]">×</span>
                    button.
                </div>
                </div>

                {/* Right: 1/3 media list */}
                <aside className="basis-1/3 bg-[var(--am-white)] border border-[var(--am-border-gray)] rounded-2xl shadow-sm p-4">
                <h2 className="text-lg font-semibold text-[var(--am-text-dark)] mb-3">Existing Media</h2>

                {loading ? (
                    <div className="py-10 text-center text-[var(--am-text-muted)]">Loading…</div>
                ) : err ? (
                    <div className="py-10 text-center text-red-600">{err}</div>
                ) : media.length === 0 ? (
                    <div className="py-10 text-center text-[var(--am-text-muted)]">No media uploaded yet.</div>
                ) : (
                    <div className="overflow-y-auto max-h-[70vh] pr-1">
                    <ul className="flex flex-col gap-3">
                        {media.map((m) => (
                        <li
                            key={m.id}
                            className="relative rounded-lg border border-[var(--am-border-gray)] overflow-hidden"
                        >
                            {/* Delete 'X' button */}
                            <button
                            onClick={() => handleDelete(m.id)}
                            title="Delete"
                            className="absolute top-2 right-2 h-7 w-7 flex items-center justify-center rounded-md
                                        bg-[var(--am-white)]/90 border border-[var(--am-border-gray)]
                                        hover:bg-red-50 hover:text-red-600"
                            >
                            ×
                            </button>

                            {/* Media preview */}
                            {isImageKind(m.kind) || m.contentType?.startsWith("image/") ? (
                            <img
                                src={mediaUrl(m.url)}
                                alt={m.originalFileName ?? `Media ${m.id}`}
                                className="block w-full h-auto max-h-[250px] object-contain bg-[var(--am-bg-light)]"
                            />
                            ) : isVideoKind(m.kind) || m.contentType?.startsWith("video/") ? (
                            <video
                                src={mediaUrl(m.url)}
                                className="block w-full h-auto max-h-[250px] object-contain bg-[var(--am-bg-light)]"
                                controls
                            />
                            ) : (
                            <div className="w-full aspect-video flex items-center justify-center text-[var(--am-text-muted)] text-sm">
                                Unsupported media
                            </div>
                            )}

                            <div className="px-3 py-2 text-xs text-[var(--am-text-muted)] flex justify-between">
                            <span title={m.originalFileName ?? ""}>
                                {m.originalFileName ?? `#${m.id}`}
                            </span>
                            <span>{Math.round(m.sizeBytes / 1024)} KB</span>
                            </div>
                        </li>
                        ))}
                    </ul>
                    </div>
                )}
                </aside>
            </div>

            {/* Cancel modal */}
            {showCancel && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                <div className="w-full max-w-md rounded-2xl bg-[var(--am-white)] border border-[var(--am-border-gray)] shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-[var(--am-text-dark)] mb-2">
                    Discard media step?
                    </h3>
                    <p className="text-sm text-[var(--am-text-muted)] mb-6">
                    Cancelling will not save uploaded media for this blog.
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
            </section>
            </>
        );
}
