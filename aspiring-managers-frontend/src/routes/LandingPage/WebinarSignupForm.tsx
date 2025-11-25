// src/features/webinar/WebinarSignupForm.tsx
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { enrollFreeCourse, type FreeCourseFormDto } from "@/services/enrollment"

type Banner =
  | { type: "error"; msg: string }
  | { type: "success"; msg: string }
  | { type: "info"; msg: string }
  | null

interface WebinarSignupFormProps {
  courseId: number | null
}

export default function WebinarSignupForm({ courseId }: WebinarSignupFormProps) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [participationChoice, setParticipationChoice] = useState("")
  const [courseSource, setCourseSource] = useState("")
  const [gdpr, setGdpr] = useState(false)
  const [banner, setBanner] = useState<Banner>(null)
  const [loading, setLoading] = useState(false)

  function isValidEmail(val: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setBanner(null)

    const problems: string[] = []

    if (!courseId) {
      problems.push("Deocamdată nu există un webinar activ pentru înscriere.")
    }
    if (!firstName.trim()) problems.push("Te rog completează prenumele.")
    if (!lastName.trim()) problems.push("Te rog completează numele.")
    if (!isValidEmail(email)) problems.push("Te rog introdu o adresă de email validă.")
    if (!phone.trim()) problems.push("Te rog introdu numărul de telefon.")
    if (!gdpr) problems.push("Trebuie să îți dai acordul pentru GDPR și T&C.")

    if (problems.length) {
      setBanner({ type: "error", msg: problems.join(" ") })
      return
    }

    const payload: FreeCourseFormDto = {
      FirstName: firstName.trim(),
      LastName: lastName.trim(),
      Email: email.trim(),
      PhoneNumber: phone.trim(),
      ParticipationChoice: participationChoice.trim(),
      CourseSource: courseSource.trim() || "Webinar Landing Page",
    }

    try {
      setLoading(true)
      if (!courseId) throw new Error("Missing courseId")

      const res = await enrollFreeCourse(courseId, payload)

      if (res.Status && typeof res.Status === "string" && res.Status.toLowerCase().includes("already")) {
        setBanner({
          type: "info",
          msg: "Ești deja înscris pentru acest webinar. Verifică emailul pentru detalii.",
        })
      } else {
        setBanner({
          type: "success",
          msg: "Înscriere realizată cu succes! Vei primi detaliile webinarului pe email.",
        })
        setFirstName("")
        setLastName("")
        setEmail("")
        setPhone("")
        setParticipationChoice("")
        setCourseSource("")
        setGdpr(false)
      }
    } catch (err) {
      setBanner({
        type: "error",
        msg: "Nu am putut finaliza înscrierea. Te rugăm să încerci din nou.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-[var(--am-bg-light)] border border-[var(--am-border-gray)] rounded-xl p-4 space-y-4"
    >
      {banner && (
        <Alert
          className="text-sm"
          variant={banner.type === "error" ? "destructive" : banner.type === "info" ? "default" : undefined}
        >
          <AlertTitle>
            {banner.type === "error" && "Verifică formularul"}
            {banner.type === "success" && "Succes"}
            {banner.type === "info" && "Informație"}
          </AlertTitle>
          <AlertDescription>{banner.msg}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--am-text-muted)]">Prenume</label>
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Introdu prenumele"
            disabled={loading}
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--am-text-muted)]">Nume</label>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Introdu numele"
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--am-text-muted)]">Email</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Introdu emailul"
          disabled={loading}
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--am-text-muted)]">Telefon</label>
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Introdu numărul de telefon"
          disabled={loading}
        />
      </div>

      {/* <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--am-text-muted)]">
          De ce vrei să participi la webinar?
        </label>
        <Input
          value={participationChoice}
          onChange={(e) => setParticipationChoice(e.target.value)}
          placeholder="Ex: vreau să fiu mai sigur pe mine ca manager"
          disabled={loading}
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--am-text-muted)]">
          De unde ai aflat de acest webinar?
        </label>
        <Input
          value={courseSource}
          onChange={(e) => setCourseSource(e.target.value)}
          placeholder="LinkedIn, recomandare, Facebook etc."
          disabled={loading}
        />
      </div> */}

      <label className="flex items-start gap-2 text-xs text-[var(--am-text-muted)] leading-tight">
        <Checkbox
          checked={gdpr}
          onCheckedChange={(v) => setGdpr(Boolean(v))}
          disabled={loading}
        />
        <span>
          Sunt de acord cu GDPR și T&amp;C și cu trimiterea de mesaje informative, marketing și
          remindere pentru webinar.
        </span>
      </label>

      <Button
        type="submit"
        className="w-full bg-[var(--am-primary-teal)] hover:bg-[var(--am-navbar-dark)] text-white font-semibold mt-2"
        disabled={loading}
      >
        {loading ? "Se procesează…" : "ÎNSCRIE-TE LA WEBINAR"}
      </Button>
    </form>
  )
}
