import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import type { JSX } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const isExpired = useAuthStore((s) => s.isExpired);
    const location = useLocation();

    if (!isAuthenticated || isExpired()) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
    return children;
}