import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute";

// admin pages
import LoginPage from "./routes/LoginPage";
import AdminPage from "./routes/Admin/AdminPage";
import MainBlogPage from "./routes/Admin/Blog/MainBlogPage";
import AdminBlogCreatePage from "./routes/Admin/Blog/CreateNewBlogPage";
import AdminBlogMediaPage from "./routes/Admin/Blog/Media";
import AdminBlogPreviewPage from "./routes/Admin/Blog/BlogPreview";
import BlogReadPage from "./routes/NormalUser/BlogReadPage";
import NotFoundPage from "./routes/NormalUser/NotFoundPage";
import AdminCoursesPage from "./routes/Admin/Course/MainCoursesPage";
import AdminCreateCoursePage from "./routes/Admin/Course/CreateNewCoursePage";
import AdminCourseEnrolledPage from "./routes/Admin/Course/AdminCourseEnrolledPage";
import FreeCourseEnrollPage from "./routes/NormalUser/Enrollment/FreeCourseEnrollPage";
//mport WebinarPage from "./routes/LandingPage/WebinarPage";
import NewLandingPage from "./routes/LandingPage/new/NewLandingPage";
import WebinarThankYouPage from "./routes/LandingPage/WebinarThankYouPage";
import AdminCourseEditPage from "./routes/Admin/Course/AdminCourseEditPage";
import Home from "./routes/Home";
import ScrollToTop from "./components/ScrollToTop";
import About from "./routes/About";
import B2B from "./routes/B2B";
import Program from "./routes/Program";
import MentorshipHour from "./routes/MentorshipHour";


export default function App() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      {/* public */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/webinar" element={<NewLandingPage />} />
      <Route path="/blog/:id" element={<BlogReadPage />} />
      <Route path="/courses/:id/enroll-free" element={<FreeCourseEnrollPage  />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/thank-you" element={<WebinarThankYouPage/>}></Route>

      <Route path="/despre-mine" element={<About />} />
      <Route path="/cursuri-management-b2b" element={<B2B />} />
      <Route path="/program-mentorat" element={<Program />} />
      <Route path="/ora-de-mentorat" element={<MentorshipHour />} />

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
      <Route 
        path="/admin/courses"
        element = {
        <ProtectedRoute>
          <AdminCoursesPage />
        </ProtectedRoute>
        }/>
      <Route 
        path="/admin/courses/new"
        element = {
        <ProtectedRoute>
          <AdminCreateCoursePage />
        </ProtectedRoute>
        }/>
      <Route 
      path="/admin/courses/:id/edit" 
      element={
        <ProtectedRoute>
          <AdminCourseEditPage />
        </ProtectedRoute>
        }/>
        <Route 
          path="/admin/courses/:courseId/enrolled"
          element = {
          <ProtectedRoute>
            <AdminCourseEnrolledPage />
          </ProtectedRoute>
        }/>
    </Routes>
    </>
  );
}
