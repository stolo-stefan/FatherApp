import { Outlet } from "react-router-dom";
import AdminNavbar from "@/components/admin/AdminNavbar";

/**
 * Wraps all admin routes
 * Background color: #F9F9F6 (light)
 */
export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#F9F9F6]">
      <AdminNavbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
