import { useEffect, useMemo, useState } from "react";
import { readUserDetails, type EnrolledUserDto } from "@/services/course";

type Props = {
  courseId: number;
  userId: number | null;
  open: boolean;
  onClose: () => void;
};

function paymentChoiceLabel(n?: number) {
  switch (n) {
    case 0: return "Free";
    case 1: return "Pending";
    case 2: return "Enrolled";
    case 3: return "Cancelled";
    default: return "—";
  }
}

function statusBadgeClass(status?: string) {
  const s = (status || "").toLowerCase();
  if (s === "enrolled") return "bg-[var(--am-accent-green)] text-[var(--am-white)]";
  if (s === "pending")  return "bg-[var(--am-gray-light)] text-[var(--am-text-dark)]";
  if (s === "cancelled")return "bg-red-100 text-red-700";
  return "bg-[var(--am-gray-light)] text-[var(--am-text-dark)]";
}

export default function EnrolledUserDetails({ courseId, userId, open, onClose }: {
  courseId: number;
  userId: number | null;
  open: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<EnrolledUserDto | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!open || !userId) return;
      setLoading(true);
      setError(null);
      setDetails(null);
      try {
        const data = await readUserDetails(courseId, userId);
        if (!cancelled) setDetails(data);
      } catch {
        if (!cancelled) setError("Failed to load user details.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [open, userId, courseId]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-lg mx-4 rounded-2xl border border-[var(--am-border-gray)] bg-[var(--am-white)] shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--am-border-gray)]">
          <h3 className="text-lg font-semibold text-[var(--am-text-dark)]">Enrolled User Details</h3>
          <button onClick={onClose} className="rounded-md border border-[var(--am-border-gray)] px-2 py-1 text-sm hover:bg-[var(--am-bg-light)]">Close</button>
        </div>

        <div className="px-5 py-4">
          {loading ? (
            <div className="text-[var(--am-text-muted)] py-10 text-center">Loading…</div>
          ) : error ? (
            <div className="text-red-600 py-10 text-center">{error}</div>
          ) : !details ? (
            <div className="text-[var(--am-text-muted)] py-10 text-center">No data.</div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              <span className="text-sm text-[var(--am-text-muted)]">First name</span>
              <span className="col-span-2 text-[var(--am-text-dark)]">{details.firstName || "—"}</span>

              <span className="text-sm text-[var(--am-text-muted)]">Last name</span>
              <span className="col-span-2 text-[var(--am-text-dark)]">{details.lastName || "—"}</span>

              <span className="text-sm text-[var(--am-text-muted)]">Email</span>
              <span className="col-span-2 text-[var(--am-text-dark)]">{details.email || "—"}</span>

              <span className="text-sm text-[var(--am-text-muted)]">Phone</span>
              <span className="col-span-2 text-[var(--am-text-dark)]">{details.phoneNumber || "—"}</span>

              <span className="text-sm text-[var(--am-text-muted)]">Participation</span>
              <span className="col-span-2 text-[var(--am-text-dark)]">{details.participationChoice || "—"}</span>

              <span className="text-sm text-[var(--am-text-muted)]">Source</span>
              <span className="col-span-2 text-[var(--am-text-dark)]">{details.courseSource || "—"}</span>

              <span className="text-sm text-[var(--am-text-muted)]">Status</span>
              <span className="col-span-2">
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadgeClass(details.status)}`}>
                  {details.status || "—"}
                </span>
              </span>

              <span className="text-sm text-[var(--am-text-muted)]">Payment</span>
              <span className="col-span-2 text-[var(--am-text-dark)]">
                {paymentChoiceLabel(details.paymentChoice)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
