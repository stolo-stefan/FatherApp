import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function isValidEmail(val: string) {
    // lightweight email check
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const problems: string[] = []
    if (!isValidEmail(email)) problems.push("Please enter a valid email address.")
    if (!agree) problems.push("You must acknowledge the Terms & Conditions.")
    if (problems.length) {
      setError(problems.join(" "))
      return
    }
    setError(null)
    // TODO: send to your API here
    // e.g., await fetch("/api/newsletter", { method:"POST", body: JSON.stringify({ email }) })
  }

  return (
    <section className="bg-white py-16 border-b flex justify-center">
      {/* Centered container */}
      <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT — Text Content */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-[#284B63] mb-4">
            Join the Aspiring Managers Community
          </h2>
          <p className="text-[#353535]/90 mb-4 leading-relaxed">
            Short, practical insights to level up your management skills — straight to your inbox.
          </p>
          <p className="text-[#353535]/90 leading-relaxed">
            Join <strong>10,000+</strong> early-career managers already learning with us.
          </p>
        </div>

        {/* RIGHT — Form */}
        <form onSubmit={onSubmit} className="flex flex-col items-center md:items-start gap-4 w-full">
          {/* Error alert */}
          {error && (
            <Alert variant="destructive" className="w-full max-w-sm">
              <AlertTitle>Check the form</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Email */}
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full max-w-sm border-[#D9D9D9]"
            aria-invalid={!!error && !isValidEmail(email)}
          />

          {/* Checkbox */}
          <label className="flex items-start gap-2 text-sm text-[#353535]/80 leading-tight w-full max-w-sm">
            <Checkbox
              id="agree"
              checked={agree}
              onCheckedChange={(v) => setAgree(Boolean(v))}
            />
            <span>
              I acknowledge the privacy information on the{" "}
              <a href="#" className="underline text-[#284B63] hover:text-[#3C6E71]">
                Terms & Conditions
              </a>{" "}
              page.
            </span>
          </label>

          {/* Button centered under input */}
          <div className="w-full max-w-sm flex justify-center md:justify-start">
            <Button type="submit" className="w-full bg-[#3C6E71] hover:bg-[#284B63] text-white mt-2">
              Subscribe
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
