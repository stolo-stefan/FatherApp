import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listBlogs, type BlogSummary } from "@/services/blog";
import AdminNavbar from "@/components/admin/AdminNavbar";
import BlogActionsMenu from "@/components/blog/BlogActionsMenu";

type SortBy = "date" | "title";
type SortDir = "asc" | "desc";
type VisibilityFilter = "all" | "visible" | "hidden";

/**
 * Admin Blogs Page
 * - Centered vertically & horizontally
 * - Uses project color variables (--am-*)
 * - Features sorting by Title/Date and filtering by Visibility
 */
export default function AdminBlogsPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogSummary[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [visibility, setVisibility] = useState<VisibilityFilter>("all");

  async function refresh() {
    try {
      setLoading(true);
      const data = await listBlogs();
      setBlogs(data);
    } catch {
      setError("Failed to load blogs.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await listBlogs();
        setBlogs(data);
      } catch {
        setError("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredSorted = useMemo(() => {
    let rows = [...blogs];

    // Filtering by visibility
    if (visibility !== "all") {
      const target = visibility === "visible";
      rows = rows.filter((r) => r.isVisible === target);
    }

    // Sorting logic
    rows.sort((a, b) => {
      if (sortBy === "title") {
        const av = a.title.toLowerCase();
        const bv = b.title.toLowerCase();
        const res = av < bv ? -1 : av > bv ? 1 : 0;
        return sortDir === "asc" ? res : -res;
      } else {
        const ad = new Date(a.datePosted).getTime();
        const bd = new Date(b.datePosted).getTime();
        return sortDir === "asc" ? ad - bd : bd - ad;
      }
    });

    return rows;
  }, [blogs, sortBy, sortDir, visibility]);

  function toggleSort(next: SortBy) {
    if (sortBy === next) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(next);
      setSortDir("asc");
    }
  }

  return (
    <>
        <AdminNavbar />
        <section
        aria-label="Admin Blogs"
        className="min-h-[80vh] flex items-center justify-center bg-[var(--am-bg-light)]"
        >
        <div className="w-full max-w-5xl bg-[var(--am-white)] border border-[var(--am-border-gray)] rounded-2xl shadow-sm p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
            <h2 className="text-2xl font-bold text-[var(--am-text-dark)]">Blogs</h2>

            <div className="sm:ml-auto flex items-center gap-3">
                {/* Filter */}
                <label
                className="text-sm text-[var(--am-text-muted)]"
                htmlFor="visFilter"
                >
                Visibility:
                </label>
                <select
                id="visFilter"
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as VisibilityFilter)}
                className="rounded-lg border border-[var(--am-border-gray)] bg-[var(--am-white)] px-3 py-2 text-sm text-[var(--am-text-dark)] focus:outline-none"
                >
                <option value="all">All</option>
                <option value="visible">Visible</option>
                <option value="hidden">Hidden</option>
                </select>

                {/* Create New Blog */}
                <button
                onClick={() => navigate("/admin/blogs/new")}
                className="rounded-lg bg-[var(--am-primary-teal)] text-[var(--am-white)] font-medium px-4 py-2 transition-colors hover:brightness-110"
                >
                + Create New Blog
                </button>
            </div>
            </div>

            {/* Content Area */}
            {loading ? (
            <div className="py-16 text-center text-[var(--am-text-muted)]">
                Loading...
            </div>
            ) : error ? (
            <div className="py-16 text-center text-red-600">{error}</div>
            ) : filteredSorted.length === 0 ? (
            <div className="py-16 text-center text-[var(--am-text-muted)]">
                No blogs found.
            </div>
            ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-[var(--am-border-gray)] text-[var(--am-text-muted)]">
                    <th className="py-3 px-3">
                        <button
                        onClick={() => toggleSort("title")}
                        className="flex items-center gap-2 text-sm font-semibold hover:underline"
                        >
                        Title
                        {sortBy === "title" && (
                            <span>{sortDir === "asc" ? "▲" : "▼"}</span>
                        )}
                        </button>
                    </th>
                    <th className="py-3 px-3">
                        <button
                        onClick={() => toggleSort("date")}
                        className="flex items-center gap-2 text-sm font-semibold hover:underline"
                        >
                        Date Posted
                        {sortBy === "date" && (
                            <span>{sortDir === "asc" ? "▲" : "▼"}</span>
                        )}
                        </button>
                    </th>
                    <th className="py-3 px-3 text-sm font-semibold">Visibility</th>
                    <th className="py-3 px-3 text-sm font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSorted.map((b) => (
                    <tr
                        key={b.id}
                        className="border-b border-[var(--am-border-gray)] hover:bg-[var(--am-bg-light)]"
                    >
                        <td className="py-3 px-3">
                        <div className="font-medium text-[var(--am-text-dark)]">
                            {b.title}
                        </div>
                        </td>
                        <td className="py-3 px-3 text-[var(--am-text-muted)]">
                        {new Date(b.datePosted).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-3">
                        <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                            b.isVisible
                                ? "bg-[var(--am-accent-green)] text-[var(--am-white)]"
                                : "bg-[var(--am-gray-light)] text-[var(--am-text-dark)]"
                            }`}
                        >
                            {b.isVisible ? "Visible" : "Hidden"}
                        </span>
                        </td>
                        <td className="py-3 px-3">
                        <BlogActionsMenu
                            blogId={b.id}
                            onView={() => navigate(`/admin/blogs/${b.id}/preview`)}
                            onEdit={() => navigate(`/admin/blogs/${b.id}/edit`)}
                            onDelete={() => refresh()}
                            onSetVisibility={() =>refresh()}
                        />
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
        </div>
        </section>
    </>
  );
}
