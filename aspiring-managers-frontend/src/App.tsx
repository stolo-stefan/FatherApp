import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute";

// admin pages
import HomePage from "./routes/HomePage";
import LoginPage from "./routes/LoginPage";
import AdminPage from "./routes/Admin/AdminPage";
import MainBlogPage from "./routes/Admin/Blog/MainBlogPage";
import AdminBlogCreatePage from "./routes/Admin/Blog/CreateNewBlogPage";
import AdminBlogMediaPage from "./routes/Admin/Blog/Media";


export default function App() {
  return (
    <Routes>
      {/* public */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />

      {/* admin (protected) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/blogs"
        element={
          <ProtectedRoute>
            <MainBlogPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/blogs/new"
        element={
          <ProtectedRoute>
            <AdminBlogCreatePage />
          </ProtectedRoute>
        }
      />
      <Route path="/admin/blogs/:id/media" 
      element={
        <ProtectedRoute>
          <AdminBlogMediaPage />
        </ProtectedRoute>
      } 
      />
    </Routes>
  );
}
