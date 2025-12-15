import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  readEnrolledUsers,
  deleteEnrolledUser,
  type EnrolledSummaryPerCourseDto,
} from "@/services/course"
import EnrolledUserDetails from "./EnrolledUserDetails"

export default function AdminEnrolledUsersPage() {
  const { courseId: courseIdParam } = useParams()
  const courseId = Number(courseIdParam)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [users, setUsers] = useState<EnrolledSummaryPerCourseDto[]>([])
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const [deletingId, setDeletingId] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!courseId || Number.isNaN(courseId)) {
        setError("Invalid course id.")
        return
      }

      try {
        setLoading(true)
        setError(null)
        const data = await readEnrolledUsers(courseId)
        if (!cancelled) setUsers(data)
      } catch {
        if (!cancelled) setError("Failed to load enrolled users.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [courseId])

  function openDetails(userId: number) {
    setSelectedUserId(userId)
    setDetailsOpen(true)
  }

  async function onDelete(u: EnrolledSummaryPerCourseDto) {
    const ok = window.confirm(
      `Ești sigur că vrei să-l ștergi pe utilizatorul cu:\n\nEmail: ${u.email}\nStatus: ${u.status}\nID: ${u.id}\n\nAceastă acțiune nu poate fi anulată.`
    )
    if (!ok) return

    try {
      setDeletingId(u.id)
      setError(null)

      const res = await deleteEnrolledUser(courseId, u.id)

      if (res === true) {
        setUsers((prev) => prev.filter((x) => x.id !== u.id))
        // if the deleted one is open in modal, close it
        if (selectedUserId === u.id) {
          setDetailsOpen(false)
          setSelectedUserId(null)
        }
      } else {
        setError("Nu am putut șterge utilizatorul.")
      }
    } catch {
      setError("Nu am putut șterge utilizatorul.")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <section className="min-h-[80vh] bg-[var(--am-bg-light)] px-4 py-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[var(--am-text-dark)]">
            Enrolled Users
          </h1>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-2 text-sm">
            {error}
          </div>
        )}

        <div className="rounded-2xl border border-[var(--am-border-gray)] bg-[var(--am-white)] shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--am-bg-light)]">
              <tr className="text-left">
                <th className="px-4 py-3 font-semibold text-[var(--am-text-dark)]">
                  Email
                </th>
                <th className="px-4 py-3 font-semibold text-[var(--am-text-dark)]">
                  Status
                </th>
                <th className="px-4 py-3 font-semibold text-[var(--am-text-dark)]">
                  Details
                </th>
                <th className="px-4 py-3 font-semibold text-[var(--am-text-dark)]">
                  Delete
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-10 text-center text-[var(--am-text-muted)]"
                  >
                    Loading…
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-10 text-center text-[var(--am-text-muted)]"
                  >
                    No enrolled users.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr
                    key={u.id}
                    className="border-t border-[var(--am-border-gray)]"
                  >
                    <td className="px-4 py-3 text-[var(--am-text-dark)]">
                      {u.email}
                    </td>
                    <td className="px-4 py-3 text-[var(--am-text-dark)]">
                      {u.status}
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => openDetails(u.id)}
                      >
                        View
                      </Button>
                    </td>

                    {/* ✅ New Delete column */}
                    <td className="px-4 py-3">
                      <Button
                        type="button"
                        variant="destructive"
                        disabled={deletingId === u.id}
                        onClick={() => onDelete(u)}
                      >
                        {deletingId === u.id ? "Deleting..." : "Delete"}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details modal (existing component you pasted) */}
      <EnrolledUserDetails
        courseId={courseId}
        userId={selectedUserId}
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
    </section>
  )
}
