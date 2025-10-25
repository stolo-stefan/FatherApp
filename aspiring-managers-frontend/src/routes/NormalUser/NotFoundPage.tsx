// src/routes/NotFoundPage.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--am-bg-light)] text-center px-6">
      <h1 className="text-6xl font-bold text-[var(--am-primary-teal)] mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-[var(--am-text-dark)] mb-2">
        Page Not Found
      </h2>
      <p className="text-[var(--am-text-muted)] mb-6 max-w-md">
        The page you’re looking for is a work in progress, sorry.
      </p>
      <Link to="/">
        <Button className="bg-[var(--am-primary-teal)] hover:bg-[var(--am-accent-green)] text-[var(--am-white)] px-6 py-2 rounded-lg transition">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
}
