import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { subscribeNewsletter } from "@/services/newsletter";

type Banner =
  | { type: "error"; msg: string }
  | { type: "success"; msg: string }
  | { type: "info"; msg: string }
  | null;

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [banner, setBanner] = useState<Banner>(null);
  const [loading, setLoading] = useState(false);

  function isValidEmail(val: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBanner(null); // clear any previous banner

    // client-side validation
    const problems: string[] = [];
    if (!isValidEmail(email)) problems.push("Please enter a valid email address.");
    if (!agree) problems.push("You must acknowledge the Terms & Conditions.");
    if (problems.length) {
      setBanner({ type: "error", msg: problems.join(" ") });
      return;
    }

    try {
      setLoading(true);
      await subscribeNewsletter({ email: email.trim() });

      // success → clear previous errors and show success
      setBanner({ type: "success", msg: "You're in! Please check your inbox for our welcome email." });
      setEmail("");
      setAgree(false);
    } catch (err: any) {
      // Handle “already subscribed” coming from backend (400 + string message)
      const status = err?.response?.status;
      const data = err?.response?.data;

      if (status === 400) {
        const text = typeof data === "string" ? data : "You’re already subscribed.";
        const looksLikeAlready =
          /already/i.test(text) || /newsletter/i.test(text) || /applied/i.test(text);
        if (looksLikeAlready) {
          setBanner({ type: "info", msg: "You’re already subscribed — thanks!" });
        } else {
          setBanner({ type: "error", msg: text });
        }
      } else {
        setBanner({ type: "error", msg: "Failed to subscribe to newsletter." });
      }
    } finally {
      setLoading(false);
    }
  }

  // Clear messages when user edits fields (prevents a stale error from lingering)
  function onEmailChange(v: string) {
    setEmail(v);
    if (banner) setBanner(null);
  }
  function onAgreeChange(v: boolean) {
    setAgree(v);
    if (banner) setBanner(null);
  }

  return (
    <section className="bg-white py-16 border-b flex justify-center">
      <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
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

        <form onSubmit={onSubmit} className="flex flex-col items-center md:items-start gap-4 w-full">
          {banner && (
            <Alert
              className="w-full max-w-sm"
              // map our banner types to shadcn variants
              variant={banner.type === "error" ? "destructive" : banner.type === "info" ? "default" : undefined}
            >
              <AlertTitle>
                {banner.type === "error" && "Check the form"}
                {banner.type === "success" && "Success"}
                {banner.type === "info" && "Heads up"}
              </AlertTitle>
              <AlertDescription>{banner.msg}</AlertDescription>
            </Alert>
          )}

          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="w-full max-w-sm border-[#D9D9D9]"
            aria-invalid={banner?.type === "error" && !isValidEmail(email) ? true : undefined}
            disabled={loading}
          />

          <label className="flex items-start gap-2 text-sm text-[#353535]/80 leading-tight w/full max-w-sm">
            <Checkbox
              id="agree"
              checked={agree}
              onCheckedChange={(v) => onAgreeChange(Boolean(v))}
              disabled={loading}
            />
            <span>
              I acknowledge the privacy information on the{" "}
              <a href="#" className="underline text-[#284B63] hover:text-[#3C6E71]">
                Terms & Conditions
              </a>{" "}
              page.
            </span>
          </label>

          <div className="w-full max-w-sm flex justify-center md:justify-start">
            <Button
              type="submit"
              className="w-full bg-[#3C6E71] hover:bg-[#284B63] text-white mt-2"
              disabled={loading}
            >
              {loading ? "Subscribing…" : "Subscribe"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
