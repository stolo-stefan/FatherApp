import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "@/services/blog";
import AdminNavbar from "@/components/admin/AdminNavbar";

/**
 * /admin/blogs/new
 * - Centered form: Title (input), Summary (textarea), Content (textarea)
 * - Textareas accept Tab and Enter; on submit they are encoded with "/t" and "/n"
 * - Cancel opens a confirm modal
 * - Save & Continue posts to /api/blogs ("/blogs" via http base)
 *
 * Colors: use CSS vars, e.g. var(--am-*)
 */
export default function AdminBlogCreatePage() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showCancelModal, setShowCancelModal] = useState(false);

    const summaryRef = useRef<HTMLTextAreaElement | null>(null);
    const contentRef = useRef<HTMLTextAreaElement | null>(null);

    // Insert a literal TAB character at caret (so user can type tabs)
    function insertTab(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Tab") {
        e.preventDefault();
        const el = e.currentTarget;
        const start = el.selectionStart ?? 0;
        const end = el.selectionEnd ?? 0;
        const next = el.value.slice(0, start) + "\t" + el.value.slice(end);
        const setter = el === summaryRef.current ? setSummary : setContent;
        setter(next);
        // restore caret after the tab
        requestAnimationFrame(() => {
            el.selectionStart = el.selectionEnd = start + 1;
        });
        }
    }

    // Convert actual \n and \t to "/n" and "/t" for sending
    function encodeSlashes(value: string) {
        return value.replaceAll("\t", "/t").replaceAll("\n", "/n");
    }

    async function onSave() {
        try {
            setSaving(true);
            setError(null);

            const dto = {
                title: encodeSlashes(title.trim()),
                summary: encodeSlashes(summary.trim()),
                content: encodeSlashes(content.trim()),
            };

            const res = await createBlog(dto);

            if(res?.id){
                navigate(`/admin/blogs/${res.id}/media`);
            } else {
                navigate("/admin/blogs");
            }
        } catch (e) {
            setError("Failed to create blog. Please try again.");
        } finally {
            setSaving(false);
        }
    }

    return (
    <>
        <AdminNavbar />
        <section
        aria-label="Create Blog"
        className="min-h-[80vh] flex items-center justify-center bg-[var(--am-bg-light)]"
        >
        <div className="w-full max-w-3xl bg-[var(--am-white)] border border-[var(--am-border-gray)] rounded-2xl shadow-sm p-6">
            <h1 className="text-2xl font-bold text-[var(--am-text-dark)] text-center mb-6">
            Create New Blog
            </h1>

            {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-2 text-sm">
                {error}
            </div>
            )}

            {/* Form (centered stack) */}
            <div className="flex flex-col gap-4">
            {/* Title */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--am-text-dark)]">
                Title
                </label>
                <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
                className="rounded-lg border border-[var(--am-border-gray)] bg-[var(--am-white)] px-3 py-2 text-[var(--am-text-dark)] focus:outline-none"
                />
                <p className="text-xs text-[var(--am-text-muted)]">
                Tabs/enters will be saved as “/t” and “/n”.
                </p>
            </div>

            {/* Summary */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--am-text-dark)]">
                Summary
                </label>
                <textarea
                ref={summaryRef}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                onKeyDown={insertTab}
                rows={5}
                placeholder="Short summary..."
                className="rounded-lg border border-[var(--am-border-gray)] bg-[var(--am-white)] px-3 py-2 text-[var(--am-text-dark)] focus:outline-none"
                />
                <p className="text-xs text-[var(--am-text-muted)]">
                Press <kbd className="px-1 py-0.5 border rounded">Tab</kbd> to insert a tab.  
                On save, tabs/newlines encode to “/t” and “/n”.
                </p>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--am-text-dark)]">
                Content
                </label>
                <textarea
                ref={contentRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={insertTab}
                rows={10}
                placeholder="Write your blog content..."
                className="rounded-lg border border-[var(--am-border-gray)] bg-[var(--am-white)] px-3 py-2 text-[var(--am-text-dark)] focus:outline-none"
                />
                <p className="text-xs text-[var(--am-text-muted)]">
                Tab inserts “\t”, Enter inserts a newline.  
                We’ll send them as “/t” and “/n”.
                </p>
            </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex items-center justify-end gap-3">
            <button
                onClick={() => setShowCancelModal(true)}
                className="rounded-lg bg-[var(--am-gray-light)] text-[var(--am-text-dark)] font-medium px-4 py-2 hover:brightness-95"
            >
                Cancel
            </button>
            <button
                disabled={saving || !title.trim()}
                onClick={onSave}
                className="rounded-lg bg-[var(--am-primary-teal)] text-white font-medium px-4 py-2 hover:brightness-110 disabled:opacity-60"
            >
                {saving ? "Saving..." : "Save & Continue"}
            </button>
            </div>
        </div>

        {/* Cancel modal */}
        {showCancelModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="w-full max-w-md rounded-2xl bg-[var(--am-white)] border border-[var(--am-border-gray)] shadow-lg p-6">
                <h3 className="text-lg font-semibold text-[var(--am-text-dark)] mb-2">
                Discard this blog?
                </h3>
                <p className="text-sm text-[var(--am-text-muted)] mb-6">
                Cancelling will not save the blog.
                </p>
                <div className="flex justify-end gap-3">
                <button
                    onClick={() => setShowCancelModal(false)}
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
