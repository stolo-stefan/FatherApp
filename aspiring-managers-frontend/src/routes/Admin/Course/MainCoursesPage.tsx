import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { deleteCourse, listCourses, type ReadCourseDto } from "@/services/course";

type SortBy = "title" | "start" | "price";
type SortDir = "asc" | "desc";
type PriceFilter = "all" | "free" | "paid";

export default function AdminCoursesPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<ReadCourseDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [sortBy, setSortBy] = useState<SortBy>("start");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [q, setQ] = useState("");

  async function refresh() {
    try {
      setLoading(true);
      const data = await listCourses();
      setCourses(data);
      setError(null);
    } catch {
      setError("Failed to load courses.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  const filteredSorted = useMemo(() => {
    let rows = [...courses];

    if (q.trim()) {
      const needle = q.trim().toLowerCase();
      rows = rows.filter(
        (r) =>
          r.title.toLowerCase().includes(needle) ||
          (r.description ?? "").toLowerCase().includes(needle)
      );
    }

    if (priceFilter !== "all") {
      rows =
        priceFilter === "free"
          ? rows.filter((r) => r.isFree || r.priceInCents === 0)
          : rows.filter((r) => !r.isFree && r.priceInCents > 0);
    }

    rows.sort((a, b) => {
      let res = 0;
      if (sortBy === "title") {
        const av = a.title.toLowerCase();
        const bv = b.title.toLowerCase();
        res = av < bv ? -1 : av > bv ? 1 : 0;
      } else if (sortBy === "start") {
        const ad = new Date(a.startDate || a.earlierDate).getTime();
        const bd = new Date(b.startDate || b.earlierDate).getTime();
        res = ad - bd;
      } else {
        const ap = a.isFree ? 0 : a.priceInCents ?? 0;
        const bp = b.isFree ? 0 : b.priceInCents ?? 0;
        res = ap - bp;
      }
      return sortDir === "asc" ? res : -res;
    });

    return rows;
  }, [courses, q, priceFilter, sortBy, sortDir]);

  function toggleSort(next: SortBy) {
    if (sortBy === next) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortBy(next);
      setSortDir("asc");
    }
  }

  function fmtDate(iso?: string) {
    if (!iso) return "-";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "-";
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }

  function fmtPrice(c: ReadCourseDto) {
    if (c.isFree || (c.priceInCents ?? 0) === 0) return "Free";
    const val = (c.priceInCents ?? 0) / 100;
    try {
      return val.toLocaleString(undefined, {
        style: "currency",
        currency: c.currency || "EUR",
        maximumFractionDigits: 2,
      });
    } catch {
      return `${val.toFixed(2)} ${c.currency || ""}`.trim();
    }
  }

  // --- NEW: helpers for share link ---
  function buildShareUrl(c: ReadCourseDto) {
    const base = "https://aspiringmanagers.ro";
    const suffix =
      c.isFree || c.priceInCents === 0 ? "enroll-free" : "enroll-paid";
    return `${base}/courses/${c.id}/${suffix}`;
  }

  async function handleShare(c: ReadCourseDto) {
    const url = buildShareUrl(c);
    try {
      await navigator.clipboard.writeText(url);
      alert("Share link copied to clipboard.");
    } catch {
      // Fallback for older browsers
      window.prompt("Copy this link:", url);
    }
  }

  return (
    <>
      <AdminNavbar />
      <section
        aria-label="Admin Courses"
        className="min-h-[80vh] flex items-center justify-center bg-[var(--am-bg-light)]"
      >
        <div className="w-full max-w-5xl bg-[var(--am-white)] border border-[var(--am-border-gray)] rounded-2xl shadow-sm p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
            <h2 className="text-2xl font-bold text-[var(--am-text-dark)]">
              Courses
            </h2>

            <div className="sm:ml-auto flex flex-col sm:flex-row gap-3">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search courses…"
                className="rounded-lg border border-[var(--am-border-gray)] bg-[var(--am-white)] px-3 py-2 text-sm text-[var(--am-text-dark)] focus:outline-none"
              />

              <label
                className="text-sm text-[var(--am-text-muted)] sm:self-center"
                htmlFor="priceFilter"
              >
                Price:
              </label>
              <select
                id="priceFilter"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value as PriceFilter)}
                className="rounded-lg border border-[var(--am-border-gray)] bg-[var(--am-white)] px-3 py-2 text-sm text-[var(--am-text-dark)] focus:outline-none"
              >
                <option value="all">All</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>

              <button
                onClick={() => navigate("/admin/courses/new")}
                className="rounded-lg bg-[var(--am-primary-teal)] text-[var(--am-white)] font-medium px-4 py-2 transition-colors hover:brightness-110"
              >
                + Create New Course
              </button>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="py-16 text-center text-[var(--am-text-muted)]">
              Loading…
            </div>
          ) : error ? (
            <div className="py-16 text-center text-red-600">{error}</div>
          ) : filteredSorted.length === 0 ? (
            <div className="py-16 text-center text-[var(--am-text-muted)]">
              No courses found.
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
                        Title{" "}
                        {sortBy === "title" && (
                          <span>{sortDir === "asc" ? "▲" : "▼"}</span>
                        )}
                      </button>
                    </th>
                    <th className="py-3 px-3">
                      <button
                        onClick={() => toggleSort("start")}
                        className="flex items-center gap-2 text-sm font-semibold hover:underline"
                      >
                        Start{" "}
                        {sortBy === "start" && (
                          <span>{sortDir === "asc" ? "▲" : "▼"}</span>
                        )}
                      </button>
                    </th>
                    <th className="py-3 px-3">
                      <button
                        onClick={() => toggleSort("price")}
                        className="flex items-center gap-2 text-sm font-semibold hover:underline"
                      >
                        Price{" "}
                        {sortBy === "price" && (
                          <span>{sortDir === "asc" ? "▲" : "▼"}</span>
                        )}
                      </button>
                    </th>
                    <th className="py-3 px-3 text-sm font-semibold">Seats</th>
                    <th className="py-3 px-3 text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSorted.map((c) => (
                    <tr
                      key={c.id}
                      className="border-b border-[var(--am-border-gray)] hover:bg-[var(--am-bg-light)]"
                    >
                      <td className="py-3 px-3">
                        <div className="font-medium text-[var(--am-text-dark)]">
                          {c.title}
                        </div>
                        <div className="text-xs text-[var(--am-text-muted)] line-clamp-1">
                          {c.description}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-[var(--am-text-muted)]">
                        {fmtDate(c.startDate || c.earlierDate)}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                            c.isFree || c.priceInCents === 0
                              ? "bg-[var(--am-accent-green)] text-[var(--am-white)]"
                              : "bg-[var(--am-gray-light)] text-[var(--am-text-dark)]"
                          }`}
                          title={c.currency}
                        >
                          {fmtPrice(c)}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-[var(--am-text-dark)] font-medium">
                          {c.nrOfSeats ?? 0}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              navigate(`/admin/courses/${c.id}/enrolled`)
                            }
                            className="rounded-md border border-[var(--am-border-gray)] px-3 py-1.5 text-sm hover:bg-[var(--am-bg-light)]"
                          >
                            View
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/admin/courses/${c.id}/edit`)
                            }
                            className="rounded-md bg-[var(--am-primary-teal)] text-[var(--am-white)] px-3 py-1.5 text-sm hover:brightness-110"
                          >
                            Edit
                          </button>
                          {/* NEW Share button */}
                          <button
                            onClick={() => handleShare(c)}
                            className="rounded-md border border-[var(--am-border-gray)] px-3 py-1.5 text-sm text-[var(--am-text-dark)] hover:bg-[var(--am-bg-light)]"
                          >
                            Share
                          </button>
                          <button
                            onClick={async () => {
                              const ok = confirm(
                                `Are you sure you want to delete "${c.title}"?`
                              );
                              if (!ok) return;

                              try {
                                const res = await deleteCourse(c.id);
                                if (res) {
                                  await refresh();
                                } else {
                                  alert("Failed to delete course.");
                                }
                              } catch {
                                alert("Failed to delete course.");
                              }
                            }}
                            className="rounded-md bg-red-500 text-white px-3 py-1.5 text-sm hover:brightness-110"
                          >
                            Delete
                          </button>
                        </div>
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
