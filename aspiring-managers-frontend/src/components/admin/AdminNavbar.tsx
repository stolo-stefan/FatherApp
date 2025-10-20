import { Link, useNavigate } from "react-router-dom";
import { logoutAdmin } from "@/services/auth";

/**
 * Admin Navbar
 * - Left: "Admin Dashboard" link → /admin
 * - Right: Logout button
 * - Uses project colors:
 *   Navbar: #333333
 *   Text: #FFFFFF
 *   Hover accent: #A4DE02
 */
export default function AdminNavbar() {
  const navigate = useNavigate();

  async function handleLogout() {
    await logoutAdmin();
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-[#333333] shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Left: Dashboard link */}
        <Link
          to="/admin"
          className="text-white font-semibold text-lg tracking-wide hover:text-[#A4DE02] transition-colors"
        >
          Admin Dashboard
        </Link>

        {/* Right: Logout button */}
        <button
          onClick={handleLogout}
          className="bg-[#E6E6E6] text-[#2A3A4E] font-medium px-4 py-2 rounded-lg
                     hover:bg-[#A4DE02] hover:text-white transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
