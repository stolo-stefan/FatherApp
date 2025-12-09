// src/features/webinar/WebinarSignupForm.tsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
//import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { enrollFreeCourse, type FreeCourseFormDto } from "@/services/enrollment"
import { CountdownPretty } from "@/components/home/CountdownPretty"

type Banner =
  | { type: "error"; msg: string }
  | { type: "success"; msg: string }
  | { type: "info"; msg: string }
  | null

interface WebinarSignupFormProps {
  courseId: number | null
  numberOfSeats?: number | null
  targetDate?: Date | null
}

function isValidPhone(phone: string) {
  // Accept +40 or 0040 followed by 7–10 digits
  return /^(\+40|0040)\d{7,10}$/.test(phone)
}

export default function NewSignUpForm({
  courseId,
  numberOfSeats,
  targetDate
}: WebinarSignupFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [participationChoice, setParticipationChoice] = useState("")
  const [courseSource, setCourseSource] = useState("")
  //const [gdpr, setGdpr] = useState(false)
  const [banner, setBanner] = useState<Banner>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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
    // if (!gdpr) {
    //   problems.push("Trebuie să îți dai acordul pentru GDPR și T&C.")
    // }

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
        res.status &&
        typeof res.status === "string" &&
        (res.status.toLowerCase() == "pending" ||
          res.status.toLowerCase() == "rejected")
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
        //setGdpr(false)
      }
      if (res.status === "enrolled") {
        navigate("/thank-you", {
          state: {
            courseId,
            enrollmentId: res.enrollmentId,
          },
        })
      }
    } catch (err: any) {
      // vezi toată eroarea, doar pentru debugging
      console.log("Enroll error:", err)

      // 1) Dacă e Axios error și status 409 => deja înscris
      const status = err?.response?.status

      if (status === 409) {
        setBanner({
          type: "info",
          msg: "Ești deja înscris la acest webinar. Verifică emailul pentru detalii.",
        })
        return
      }

      // 2) Fallback – alte erori
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
      className="bg-[var(--am-white)] border border-[var(--am-border-gray)] rounded-2xl px-5 py-6 md:px-7 md:py-7 space-y-4 shadow-sm"
    >
      {/* Top text like in screenshot */}
      <p className="text-sm md:text-base font-semibold text-[var(--am-text-dark)]">
        Webinar live,{" "}
        <span className="text-[#FF8A3D] font-semibold">gratuit</span>, pentru
        cei care vor să învețe cum să treacă rapid de la nesiguranță la
        încredere în noul rol de manager.
      </p>

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

      {/* Câmpuri – full width, unul sub altul, ca în screenshot */}
      <div className="space-y-3">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Cum te numești?"
          disabled={loading}
          className="h-12 md:h-14 text-base rounded-xl bg-[var(--am-bg-light)] border-[var(--am-border-gray)]"
        />
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Adresa ta de email?"
          disabled={loading}
          className="h-12 md:h-14 text-base rounded-xl bg-[var(--am-bg-light)] border border-[var(--am-border-gray)]"
        />
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Numărul tău de telefon?"
          disabled={loading}
          className="h-12 md:h-14 text-base rounded-xl bg-[var(--am-bg-light)] border border-[var(--am-border-gray)]"
        />
      </div>

      {/* Text mic sub telefon */}
      {/* <p className="text-[11px] md:text-xs text-[var(--am-text-muted)] leading-snug">
        *Doar dacă vrei să faci parte din comunitatea de Whatsapp Aspiring
        Managers
      </p> */}

      {/* GDPR checkbox */}
      {/* <label className="flex items-start gap-2 text-[11px] md:text-xs text-[var(--am-text-muted)] leading-tight">
        <Checkbox
          checked={gdpr}
          onCheckedChange={(v) => setGdpr(Boolean(v))}
          disabled={loading}
        />
        <span>
          Sunt de acord cu GDPR și T&amp;C și cu trimiterea de mesaje
          informative, marketing și remindere pentru webinar.
        </span>
      </label> */}

      {/* Buton mare portocaliu, cu 2 linii de text */}
      <Button
        type="submit"
        className="w-full h-12 md:h-14 bg-[#FF8A3D] hover:bg-[#E6772D] text-white font-semibold rounded-xl mt-1 shadow-md"
        disabled={loading}
      >
        {loading ? (
          "Se procesează…"
        ) : (
          <div className="flex flex-col items-center leading-tight">
            <span className="text-sm md:text-base font-semibold">
              Înscrie-te la webinarul gratuit
            </span>
            <span className="text-[11px] md:text-xs font-normal">
              {numberOfSeats != null
                ? `${numberOfSeats} locuri disponibile`
                : "Locuri disponibile"}
            </span>
          </div>
        )}
      </Button>

      {/* Placeholder pentru countdown – vei pune CountdownPretty aici */}
      <div >
        {targetDate ? (
          <CountdownPretty targetDate={targetDate} />
        ) : (
          <span className="mt-3 h-16 rounded-xl border border-dashed border-[var(--am-border-gray)] bg-[var(--am-bg-light)] flex items-center justify-center text-[11px] md:text-xs uppercase tracking-wide text-[var(--am-text-muted)]">Detaliile despre ora webinarului urmează</span>
        )}
      </div>
    </form>
  )
}
