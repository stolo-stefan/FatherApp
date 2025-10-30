// ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import type { JSX } from "react";

function useAuthHydrated() {
  const [hydrated, setHydrated] = useState((useAuthStore as any).persist?.hasHydrated?.() ?? false);
  useEffect(() => (useAuthStore as any).persist?.onFinishHydration?.(() => setHydrated(true)), []);
  return hydrated;
}

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const hydrated = useAuthHydrated();
  const token = useAuthStore((s) => s.token);
  const isExpired = useAuthStore((s) => s.isExpired);
  const location = useLocation();

  if (!hydrated) return null; // or a spinner
  const authed = !!token && !isExpired();
  if (!authed) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
}
