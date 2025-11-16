// src/routes/FreeCourseEnrollPage.tsx

import { useEffect, useState, type FormEvent } from "react";
import { useParams } from "react-router-dom";
import { readCourse, type ReadCourseDto } from "@/services/course";
import { enrollFreeCourse } from "@/services/enrollment";
import SiteHeader from "@/components/layout/SiteHeader";

type EnrollForm = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  heardFrom: string;       // select value
  heardFromOther: string;  // text if "Other"
};

export default function FreeCourseEnrollPage() {
  const { id } = useParams();
  const courseId = Number(id);

  const [course, setCourse] = useState<ReadCourseDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [form, setForm] = useState<EnrollForm>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    heardFrom: "",
    heardFromOther: "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function load() {
      if (!courseId || Number.isNaN(courseId)) {
        setLoadError("Invalid course id.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setLoadError(null);
        const dto = await readCourse(courseId);
        setCourse(dto);
      } catch (err: any) {
        const status = err?.response?.status;
        if (status === 404) {
          setLoadError("Course not found.");
        } else {
          setLoadError("Could not load course details.");
        }
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [courseId]);

  function fmtDate(iso: string | undefined) {
    if (!iso) return "-";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "-";
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validate(): string | null {
    if (!form.firstName.trim()) return "Please enter your first name.";
    if (!form.lastName.trim()) return "Please enter your last name.";
    if (!form.email.trim()) return "Please enter your email.";

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(form.email.trim())) return "Please enter a valid email address.";

    return null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(false);

    const err = validate();
    if (err) {
      setFormError(err);
      return;
    }

    setFormError(null);

    if (!courseId || Number.isNaN(courseId)) {
      setFormError("Invalid course id.");
      return;
    }

    // Build CourseSource from select + optional "Other" text
    let courseSource: string;

    if (!form.heardFrom) {
      courseSource = "";
    } else if (form.heardFrom === "Other") {
      courseSource = form.heardFromOther.trim() || "Other";
    } else {
      courseSource = form.heardFrom;
    }

    const payload = {
      FirstName: form.firstName.trim(),
      LastName: form.lastName.trim(),
      Email: form.email.trim(),
      PhoneNumber: form.phoneNumber.trim(),
      ParticipationChoice: "",
      CourseSource: courseSource,
    };

    try {
      await enrollFreeCourse(courseId, payload);
      setSubmitted(true);
    } catch (error: any) {
      const backendMsg = error?.response?.data;
      setFormError(
        typeof backendMsg === "string"
          ? backendMsg
          : "Could not enroll right now. Please try again."
      );
      setSubmitted(false);
    }
  }

  return (
    <>
      <SiteHeader />

      {/* Full-page background in one color */}
      <main className="bg-[var(--am-bg-light)] min-h-screen mt-20">
        <section className="flex justify-center pb-16">
          <div className="w-full max-w-4xl bg-[var(--am-white)] border border-[var(--am-border-gray)] rounded-2xl shadow-sm p-6 sm:p-8">
            {loading ? (
              <div className="py-16 text-center text-[var(--am-text-muted)]">
                Loading course…
              </div>
            ) : loadError || !course ? (
              <div className="py-16 text-center text-red-600">
                {loadError ?? "Course not found."}
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-5">
                {/* Left: course details */}
                <div className="md:col-span-2 space-y-4">
                  <span className="inline-flex items-center rounded-full bg-[var(--am-accent-green)] text-[var(--am-white)] px-3 py-1 text-xs font-semibold">
                    Free session
                  </span>

                  <h1 className="text-2xl sm:text-3xl font-bold text-[var(--am-text-dark)]">
                    {course.title}
                  </h1>

                  <p className="text-sm text-[var(--am-text-muted)]">
                    Start date{" "}
                    <span className="font-semibold text-[var(--am-text-dark)]">
                      {fmtDate(course.startDate || course.earlierDate)}
                    </span>
                  </p>

                  {course.description && (
                    <p className="text-sm leading-relaxed text-[var(--am-text-muted)]">
                      {course.description}
                    </p>
                  )}

                  <div className="text-xs text-[var(--am-text-muted)] border-t border-[var(--am-border-gray)] pt-3">
                    No payment required – your spot will be reserved once you
                    submit this form.
                  </div>
                </div>

                {/* Right: enrollment form */}
                <div className="md:col-span-3">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-xl font-semibold text-[var(--am-text-dark)]">
                      Reserve your spot
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1">
                        <label
                          className="text-sm font-medium text-[var(--am-text-dark)]"
                          htmlFor="firstName"
                        >
                          First name<span className="text-red-500">*</span>
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          value={form.firstName}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-[var(--am-border-gray)] px-3 py-2 text-sm text-[var(--am-text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--am-primary-teal)]"
                          placeholder="Alex"
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          className="text-sm font-medium text-[var(--am-text-dark)]"
                          htmlFor="lastName"
                        >
                          Last name<span className="text-red-500">*</span>
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-[var(--am-border-gray)] px-3 py-2 text-sm text-[var(--am-text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--am-primary-teal)]"
                          placeholder="Popescu"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label
                        className="text-sm font-medium text-[var(--am-text-dark)]"
                        htmlFor="email"
                      >
                        Email<span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-[var(--am-border-gray)] px-3 py-2 text-sm text-[var(--am-text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--am-primary-teal)]"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div className="space-y-1">
                      <label
                        className="text-sm font-medium text-[var(--am-text-dark)]"
                        htmlFor="phoneNumber"
                      >
                        Phone (optional)
                      </label>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-[var(--am-border-gray)] px-3 py-2 text-sm text-[var(--am-text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--am-primary-teal)]"
                        placeholder="+40…"
                      />
                    </div>

                    {/* How did you hear about us? */}
                    <div className="space-y-1">
                      <label
                        className="text-sm font-medium text-[var(--am-text-dark)]"
                        htmlFor="heardFrom"
                      >
                        How did you hear about this webinar?{" "}
                        <span className="text-[var(--am-text-muted)] text-xs">
                          (optional)
                        </span>
                      </label>

                      <select
                        id="heardFrom"
                        name="heardFrom"
                        value={form.heardFrom}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-[var(--am-border-gray)] bg-[var(--am-white)] px-3 py-2 text-sm text-[var(--am-text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--am-primary-teal)]"
                      >
                        <option value="">Select…</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Facebook">Facebook</option>
                        <option value="TikTok">TikTok</option>
                        <option value="Google">Google</option>
                        <option value="Recommendation">Recommendation</option>
                        <option value="Other">Other</option>
                      </select>

                      {form.heardFrom === "Other" && (
                        <input
                          id="heardFromOther"
                          name="heardFromOther"
                          value={form.heardFromOther}
                          onChange={handleChange}
                          className="mt-2 w-full rounded-lg border border-[var(--am-border-gray)] px-3 py-2 text-sm text-[var(--am-text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--am-primary-teal)]"
                          placeholder="Please specify…"
                        />
                      )}
                    </div>

                    {formError && (
                      <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        {formError}
                      </p>
                    )}

                    {submitted && !formError && (
                      <p className="text-sm text-[var(--am-accent-green)] bg-[#f3fae6] border border-[var(--am-accent-green)]/40 rounded-lg px-3 py-2">
                        You’re enrolled for this free session. We’ll email you
                        the next steps.
                      </p>
                    )}

                    <button
                      type="submit"
                      className="mt-2 inline-flex items-center justify-center rounded-lg bg-[var(--am-primary-teal)] px-4 py-2.5 text-sm font-semibold text-[var(--am-white)] hover:brightness-110 transition-colors"
                    >
                      Confirm my free seat
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* <SiteFooter /> */}
    </>
  );
}
