import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import AdminNavbar from "@/components/admin/AdminNavbar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  updateCourse,
  type UpdateCourseDto,
  type ReadCourseDto,
} from "@/services/course"
import { http } from "@/services/http"

type EditCourseForm = {
  title: string
  description: string
  startDate: string // datetime-local
  nrOfSeats: number
  isFree: boolean
  currency: string
  priceInCents: number

  // NEW – intentionally NOT coming from ReadCourseDto
  getResponseToken: string
  whatsappLink: string
}

function toDateTimeLocalValue(iso: string) {
  if (!iso) return ""
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`
}

function toIsoFromLocal(local: string) {
  return local ? local : ""
}

export default function AdminUpdateCoursePage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const courseId = Number(id)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [original, setOriginal] = useState<ReadCourseDto | null>(null)

  const [form, setForm] = useState<EditCourseForm>({
    title: "",
    description: "",
    startDate: "",
    nrOfSeats: 1,
    isFree: false,
    currency: "EUR",
    priceInCents: 0,

    // empty on purpose
    getResponseToken: "",
    whatsappLink: "",
  })

  function updateField<K extends keyof EditCourseForm>(
    key: K,
    value: EditCourseForm[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        setError(null)

        const { data } = await http.get<ReadCourseDto>(`/courses/${courseId}`)

        setOriginal(data)
        setForm((prev) => ({
          ...prev,
          title: data.title,
          description: data.description,
          startDate: toDateTimeLocalValue(data.startDate),
          nrOfSeats: data.nrOfSeats,
          isFree: data.isFree,
          currency: data.currency,
          priceInCents: data.priceInCents,
          // token + link intentionally NOT set
        }))
      } catch {
        setError("Failed to load course.")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [courseId])

  // enforce price = 0 for free courses
  useEffect(() => {
    if (form.isFree) {
      setForm((p) => ({ ...p, priceInCents: 0 }))
    }
  }, [form.isFree])

  function buildPatchDto(): UpdateCourseDto {
    const o = original
    const nextStartIso = toIsoFromLocal(form.startDate)

    return {
      title: form.title !== o?.title ? form.title : null,
      description: form.description !== o?.description ? form.description : null,
      startDate: nextStartIso !== o?.startDate ? nextStartIso : null,
      nrOfSeats: form.nrOfSeats !== o?.nrOfSeats ? form.nrOfSeats : null,
      isFree: form.isFree !== o?.isFree ? form.isFree : null,
      currency:
        form.currency !== o?.currency
          ? form.currency.trim().toUpperCase()
          : null,
      priceInCents:
        (form.isFree ? 0 : form.priceInCents) !== o?.priceInCents
          ? form.isFree
            ? 0
            : form.priceInCents
          : null,

      // sent only if admin fills them
      getResponseToken: form.getResponseToken.trim() || null,
      whatsappLink: form.whatsappLink.trim() || null,
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!form.title.trim()) return setError("Title is required.")
    if (!form.description.trim()) return setError("Description is required.")
    if (!form.startDate) return setError("Start date is required.")
    if (form.nrOfSeats <= 0) return setError("Seats must be > 0.")
    if (!form.isFree && form.priceInCents <= 0)
      return setError("Paid courses must have price > 0.")

    setSaving(true)
    try {
      await updateCourse(courseId, buildPatchDto())
      navigate("/admin/courses")
    } catch {
      setError("Failed to update course.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <AdminNavbar />
      <section className="min-h-[80vh] flex items-center justify-center bg-[var(--am-bg-light)]">
        <div className="w-full max-w-2xl bg-[var(--am-white)] border border-[var(--am-border-gray)] rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[var(--am-text-dark)] mb-6">
            Update Course
          </h2>

          {loading ? (
            <p className="text-sm text-[var(--am-text-muted)]">Loading…</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label>Title</Label>
                <Input value={form.title} onChange={(e) => updateField("title", e.target.value)} />
              </div>

              <div>
                <Label>Description</Label>
                <textarea
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  className="w-full min-h-[100px] rounded-lg border border-[var(--am-border-gray)] p-2"
                />
              </div>

              <div>
                <Label>Start Date</Label>
                <Input
                  type="datetime-local"
                  value={form.startDate}
                  onChange={(e) => updateField("startDate", e.target.value)}
                />
              </div>

              <div>
                <Label>Number of Seats</Label>
                <Input
                  type="number"
                  min="1"
                  value={form.nrOfSeats}
                  onChange={(e) => updateField("nrOfSeats", Number(e.target.value))}
                />
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  checked={form.isFree}
                  onCheckedChange={(v) => updateField("isFree", Boolean(v))}
                />
                <Label>This course is free</Label>
              </div>

              {!form.isFree && (
                <>
                  <div>
                    <Label>Currency</Label>
                    <Input
                      value={form.currency}
                      onChange={(e) => updateField("currency", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Price (cents)</Label>
                    <Input
                      type="number"
                      min="1"
                      value={form.priceInCents}
                      onChange={(e) =>
                        updateField("priceInCents", Number(e.target.value))
                      }
                    />
                  </div>
                </>
              )}

              {/* OPTIONAL fields */}
              <div>
                <Label>GetResponse List Token (optional)</Label>
                <Input
                  value={form.getResponseToken}
                  onChange={(e) =>
                    updateField("getResponseToken", e.target.value)
                  }
                  placeholder="Leave empty to keep existing"
                />
              </div>

              <div>
                <Label>WhatsApp Group Link (optional)</Label>
                <Input
                  value={form.whatsappLink}
                  onChange={(e) => updateField("whatsappLink", e.target.value)}
                  placeholder="Leave empty to keep existing"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <Button variant="outline" type="button" onClick={() => navigate("/admin/courses")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Update Course"}
                </Button>
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}
            </form>
          )}
        </div>
      </section>
    </>
  )
}
