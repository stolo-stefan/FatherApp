// src/routes/admin/AdminCreateCoursePage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { createCourse, type CreateCourseDto } from "@/services/course";

export default function AdminCreateCoursePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<CreateCourseDto>({
    title: "",
    description: "",
    startDate: "",
    earlierDate: "",
    nrOfSeats: 0,
    isFree: false,
    priceInCents: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField<K extends keyof CreateCourseDto>(key: K, value: CreateCourseDto[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // basic validation
    if (!form.title.trim()) return setError("Title is required.");
    if (!form.description.trim()) return setError("Description is required.");
    if (!form.earlierDate || !form.startDate) return setError("Both dates are required.");
    if (new Date(form.earlierDate) > new Date(form.startDate))
      return setError("Enrollment opens (EarlierDate) must be before StartDate.");
    if (!form.isFree && (!form.priceInCents || form.priceInCents < 0))
      return setError("Price must be >= 0.");
    if (form.nrOfSeats <= 0) return setError("Number of seats must be > 0.");

    setLoading(true);
    try {
      // enforce price = 0 for free courses
      const payload: CreateCourseDto = {
        ...form,
        priceInCents: form.isFree ? 0 : form.priceInCents,
      };
      await createCourse(payload);
      navigate("/admin/courses");
    } catch (err) {
      console.error(err);
      setError("Failed to create course.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AdminNavbar />
      <section className="min-h-[80vh] flex items-center justify-center bg-[var(--am-bg-light)]">
        <div className="w-full max-w-2xl bg-[var(--am-white)] border border-[var(--am-border-gray)] rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[var(--am-text-dark)] mb-6">Create New Course</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g., Leadership Essentials"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                placeholder="Write a short description..."
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                className="w-full min-h-[100px] rounded-lg border border-[var(--am-border-gray)] bg-[var(--am-white)] p-2 text-sm text-[var(--am-text-dark)] focus:outline-none"
                required
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="earlierDate">Earlier Date</Label>
                <Input
                  id="earlierDate"
                  type="date"
                  value={form.earlierDate}
                  onChange={(e) => updateField("earlierDate", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={form.startDate}
                  onChange={(e) => updateField("startDate", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Seats */}
            <div>
              <Label htmlFor="nrOfSeats">Number of Seats</Label>
              <Input
                id="nrOfSeats"
                type="number"
                min="1"
                value={form.nrOfSeats}
                onChange={(e) => updateField("nrOfSeats", parseInt(e.target.value || "0", 10))}
                required
              />
            </div>

            {/* Price / Free toggle */}
            <div className="flex items-center gap-3">
              <Checkbox
                id="isFree"
                checked={form.isFree}
                onCheckedChange={(checked) => updateField("isFree", Boolean(checked))}
              />
              <Label htmlFor="isFree">This course is free</Label>
            </div>

            {!form.isFree && (
              <div>
                <Label htmlFor="priceInCents">Price (in cents)</Label>
                <Input
                  id="priceInCents"
                  type="number"
                  min="0"
                  value={form.priceInCents}
                  onChange={(e) =>
                    updateField("priceInCents", parseInt(e.target.value || "0", 10))
                  }
                  required
                />
              </div>
            )}

            {/* Submit */}
            <div className="pt-4 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/courses")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-[var(--am-primary-teal)] text-[var(--am-white)] hover:brightness-110"
              >
                {loading ? "Saving..." : "Create Course"}
              </Button>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}
          </form>
        </div>
      </section>
    </>
  );
}
