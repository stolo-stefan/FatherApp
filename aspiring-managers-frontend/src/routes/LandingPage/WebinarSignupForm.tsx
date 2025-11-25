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

function isValidPhone(phone: string) {
  // Accept +40 or 0040 followed by 7–10 digits
  return /^(\+40|0040)\d{7,10}$/.test(phone)
}

export default function WebinarSignupForm({ courseId }: WebinarSignupFormProps) {
  const [name, setName] = useState("")
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

    if (!name.trim()) {
      problems.push("Te rog completează numele.")
    }
    if (!email.trim() || !isValidEmail(email)) {
      problems.push("Te rog introdu o adresă de email validă.")
    }
    if (!phone.trim()) {
      problems.push("Te rog introdu numărul de telefon.")
    } else if (!isValidPhone(phone.trim())) {
      problems.push("Telefonul trebuie să aibă prefix (e.g. +40).")
    }
    if (!gdpr) {
      problems.push("Trebuie să îți dai acordul pentru GDPR și T&C.")
    }

    if (problems.length) {
      setBanner({ type: "error", msg: problems.join(" ") })
      return
    }

    const payload: FreeCourseFormDto = {
      Name: name.trim(),
      Email: email.trim(),
      PhoneNumber: phone.trim(),
      ParticipationChoice: participationChoice.trim(),
      CourseSource: courseSource.trim() || "Webinar Landing Page",
    }

    try {
      setLoading(true)
      if (!courseId) throw new Error("Missing courseId")

      const res = await enrollFreeCourse(courseId, payload)

      if (
        res.Status &&
        typeof res.Status === "string" &&
        res.Status.toLowerCase().includes("already")
      ) {
        setBanner({
          type: "info",
          msg: "Ești deja înscris pentru acest webinar. Verifică emailul pentru detalii.",
        })
      } else {
        setBanner({
          type: "success",
          msg: "Înscriere realizată cu succes! Vei primi detaliile webinarului pe email.",
        })
        setName("")
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
      className="bg-[var(--am-bg-light)] border border-[var(--am-border-gray)] rounded-xl p-4 md:p-6 space-y-4"
    >
      {banner && (
        <Alert
          className="text-sm"
          variant={
            banner.type === "error"
              ? "destructive"
              : banner.type === "info"
              ? "default"
              : undefined
          }
        >
          <AlertTitle>
            {banner.type === "error" && "Verifică formularul"}
            {banner.type === "success" && "Succes"}
            {banner.type === "info" && "Informație"}
          </AlertTitle>
          <AlertDescription>{banner.msg}</AlertDescription>
        </Alert>
      )}

      {/* Nume + Email pe același rând (desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nume"
          disabled={loading}
          className="h-12 md:h-14 text-base rounded-lg bg-white"
        />
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          disabled={loading}
          className="h-12 md:h-14 text-base rounded-lg bg-white"
        />
      </div>

      {/* Telefon – rând separat, full width */}
      <Input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Telefon"
        disabled={loading}
        className="h-12 md:h-14 text-base rounded-lg bg-white"
      />

      {/* Câmpurile extra, dacă le re-activezi mai târziu */}
      {/*
      <Input
        value={participationChoice}
        onChange={(e) => setParticipationChoice(e.target.value)}
        placeholder="De ce vrei să participi la webinar?"
        disabled={loading}
        className="h-12 md:h-14 text-base rounded-lg bg-white"
      />

      <Input
        value={courseSource}
        onChange={(e) => setCourseSource(e.target.value)}
        placeholder="De unde ai aflat de webinar? (LinkedIn, recomandare, Facebook etc.)"
        disabled={loading}
        className="h-12 md:h-14 text-base rounded-lg bg-white"
      />
      */}

      <label className="flex items-start gap-2 text-xs md:text-sm text-[var(--am-text-muted)] leading-tight">
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
        className="w-full h-12 md:h-14 text-sm md:text-lg bg-[var(--am-primary-teal)] hover:bg-[var(--am-navbar-dark)] text-white font-semibold rounded-lg mt-2"
        disabled={loading}
      >
        {loading ? "Se procesează…" : "ÎNSCRIE-TE LA WEBINAR"}
      </Button>
    </form>
  )
}
