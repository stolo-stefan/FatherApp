import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute";

// admin pages
import HomePage from "./routes/HomePage";
import LoginPage from "./routes/LoginPage";
import AdminPage from "./routes/Admin/AdminPage";
import MainBlogPage from "./routes/Admin/Blog/MainBlogPage";
import AdminBlogCreatePage from "./routes/Admin/Blog/CreateNewBlogPage";
import AdminBlogMediaPage from "./routes/Admin/Blog/Media";
import AdminBlogPreviewPage from "./routes/Admin/Blog/BlogPreview";
import BlogReadPage from "./routes/NormalUser/BlogReadPage";
import NotFoundPage from "./routes/NormalUser/NotFoundPage";


export default function App() {
  return (
    <Routes>
      {/* public */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/blog/:id" element={<BlogReadPage />} />
      <Route path="*" element={<NotFoundPage />} />

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
      <Route 
        path="/admin/blogs/:id/media" 
        element={
          <ProtectedRoute>
            <AdminBlogMediaPage />
          </ProtectedRoute>
      }
      /> 
      <Route 
        path="/admin/blogs/:id/preview" 
        element={
          <ProtectedRoute>
            <AdminBlogPreviewPage />
          </ProtectedRoute>
      }
      />
    </Routes>
  );
}
