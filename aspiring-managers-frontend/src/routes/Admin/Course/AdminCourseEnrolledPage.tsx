// in AdminCourseEnrolledPage.tsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { readEnrolledUsers, type EnrolledSummaryPerCourseDto } from "@/services/course";
import EnrolledUserDetails from "./EnrolledUserDetails";

export default function AdminCourseEnrolledPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<EnrolledSummaryPerCourseDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");

  const [openDetails, setOpenDetails] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  async function refresh() {
    if (!courseId) return;
    try {
      setLoading(true);
      const data = await readEnrolledUsers(Number(courseId));
      setRows(data ?? []);
      setError(null);
    } catch {
      setError("Failed to load enrollments.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, [courseId]);

  const filtered = useMemo(() => {
    if (!q.trim()) return rows;
    const n = q.trim().toLowerCase();
    return rows.filter(r => r.email.toLowerCase().includes(n) || r.status.toLowerCase().includes(n));
  }, [rows, q]);

  function onRowClick(userId: number) {
    setSelectedUserId(userId);
    setOpenDetails(true);
  }

  return (
    <>
      <AdminNavbar />
      <section className="min-h-[80vh] flex items-center justify-center bg-[var(--am-bg-light)]">
        <div className="w-full max-w-5xl bg-[var(--am-white)] border border-[var(--am-border-gray)] rounded-2xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
            <h2 className="text-2xl font-bold text-[var(--am-text-dark)]">Enrolled Users</h2>
            <div className="sm:ml-auto flex gap-3">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by email or status…"
                className="rounded-lg border border-[var(--am-border-gray)] bg-[var(--am-white)] px-3 py-2 text-sm text-[var(--am-text-dark)] focus:outline-none"
              />
              <button
                onClick={() => navigate("/admin/courses")}
                className="rounded-lg border border-[var(--am-border-gray)] px-4 py-2 text-sm hover:bg-[var(--am-bg-light)]"
              >
                Back
              </button>
            </div>
          </div>

          {loading ? (
            <div className="py-16 text-center text-[var(--am-text-muted)]">Loading…</div>
          ) : error ? (
            <div className="py-16 text-center text-red-600">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-[var(--am-text-muted)]">No enrollments yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--am-border-gray)] text-[var(--am-text-muted)]">
                    <th className="py-3 px-3 text-sm font-semibold">ID</th>
                    <th className="py-3 px-3 text-sm font-semibold">Email</th>
                    <th className="py-3 px-3 text-sm font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u, i) => (
                    <tr
                      key={Number.isFinite(u.id) ? `u-${u.id}` : `u-fallback-${u.email}-${i}`}
                      className="border-b border-[var(--am-border-gray)] hover:bg-[var(--am-bg-light)] cursor-pointer"
                      onClick={() => onRowClick(u.id)}
                    >
                      <td className="py-3 px-3">{u.id}</td>
                      <td className="py-3 px-3 text-[var(--am-text-dark)]">{u.email}</td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                          (u.status || "").toLowerCase() === "enrolled"
                            ? "bg-[var(--am-accent-green)] text-[var(--am-white)]"
                            : "bg-[var(--am-gray-light)] text-[var(--am-text-dark)]"
                        }`}>
                          {u.status || "—"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <EnrolledUserDetails
        courseId={Number(courseId)}
        userId={selectedUserId}
        open={openDetails}
        onClose={() => setOpenDetails(false)}
      />
    </>
  );
}
