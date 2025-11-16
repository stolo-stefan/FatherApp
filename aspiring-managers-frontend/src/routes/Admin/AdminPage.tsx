import { useNavigate } from "react-router-dom";
import AdminNavbar from "@/components/admin/AdminNavbar";

/**
 * Admin Dashboard Page
 * - Buttons stacked vertically in the center
 * - Uses official project colors:
 *   Primary Teal (#2B6A70), Accent Green (#A4DE02),
 *   Text (#2A3A4E), Background (#F9F9F6)
 */
export default function AdminDashboardPage() {
  const navigate = useNavigate();

  return (
    <>
      <AdminNavbar />
      <section
        aria-label="Admin dashboard"
        className="flex flex-col items-center justify-center min-h-[80vh] text-[#2A3A4E]"
      >
        {/* Buttons container */}
        <div className="flex flex-col gap-6 w-full max-w-sm">
          {/* Subscribed Users */}
          <button
            onClick={() => navigate("/admin/subscribers")}
            className="rounded-2xl bg-white border border-[#E6E6E6] px-6 py-4 text-left shadow-sm
                      hover:border-[#2B6A70] hover:shadow-md transition-all"
          >
            <div className="text-sm font-semibold opacity-70 mb-1">Manage</div>
            <div className="text-lg font-bold">Subscribed Users</div>
            <div className="mt-3 inline-block bg-[#2B6A70] text-white px-3 py-1 rounded-full text-xs">
              View & Export
            </div>
          </button>

          {/* Blogs */}
          <button
            onClick={() => navigate("/admin/blogs")}
            className="rounded-2xl bg-[#2B6A70] text-white px-6 py-4 text-left shadow-sm
                      hover:bg-[#24595E] hover:shadow-md transition-all"
          >
            <div className="text-sm font-medium opacity-90 mb-1">Manage</div>
            <div className="text-lg font-bold">Blogs</div>
            <div className="mt-3 inline-block bg-[#A4DE02] text-[#2A3A4E] px-3 py-1 rounded-full text-xs font-semibold">
              Manage Posts
            </div>
          </button>

          {/* Courses */}
          <button
            onClick={() => navigate("/admin/courses")}
            className="rounded-2xl bg-white border border-[#E6E6E6] px-6 py-4 text-left shadow-sm
                      hover:border-[#A4DE02] hover:shadow-md transition-all"
          >
            <div className="text-sm font-semibold opacity-70 mb-1">Manage</div>
            <div className="text-lg font-bold">Courses</div>
            <div className="mt-3 inline-block bg-[#A4DE02] text-[#2A3A4E] px-3 py-1 rounded-full text-xs font-semibold">
              Schedule & Edit
            </div>
          </button>
        </div>
      </section>
    </>
  );
}
