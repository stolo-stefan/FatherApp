import { Route } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute";

import LoginPage from "../routes/LoginPage"; // admin login
import AdminPage from "../routes/Admin/AdminPage"; // admin dashboard
import MainBlogPage from "../routes/Admin/Blog/MainBlogPage"; // admin toate blogurile create
import AdminBlogCreatePage from "../routes/Admin/Blog/CreateNewBlogPage"; // admin create blog
import AdminBlogMediaPage from "../routes/Admin/Blog/Media"; // admin blog poze
import AdminBlogPreviewPage from "../routes/Admin/Blog/BlogPreview"; // admin blog
import AdminCoursesPage from "../routes/Admin/Course/MainCoursesPage"; // admin view courses
import AdminCreateCoursePage from "../routes/Admin/Course/CreateNewCoursePage"; // admin create course
import AdminCourseEnrolledPage from "../routes/Admin/Course/AdminCourseEnrolledPage"; // admin cine s-a inrolat si cu ce date la curs
import AdminCourseEditPage from "../routes/Admin/Course/AdminCourseEditPage"; // admin edit curs

const adminRoutes = (
        <>
            <Route path="/login" element={<LoginPage />} />
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
                }
            />
            <Route 
                path="/admin/courses/new"
                element = {
                <ProtectedRoute>
                <AdminCreateCoursePage />
                </ProtectedRoute>
                }
            />
            <Route 
                path="/admin/courses/:id/edit" 
                element={
                    <ProtectedRoute>
                    <AdminCourseEditPage />
                    </ProtectedRoute>
                }
            />
            <Route 
                path="/admin/courses/:courseId/enrolled"
                element = {
                <ProtectedRoute>
                    <AdminCourseEnrolledPage />
                </ProtectedRoute>
                }
            />
        </>
);

export default adminRoutes;