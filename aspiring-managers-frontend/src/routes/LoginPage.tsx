import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginAdmin } from "@/services/auth";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as any)?.from?.pathname || "/admin";

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        setErr(null);
        try {
            await loginAdmin(email, password);
            navigate(from, { replace: true });
        } catch (e: any) {
            setErr(e?.response?.status === 401 ? "Invalid credentials" : "Login failed");
        }
    }

    return (
        <div className="p-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <form onSubmit={onSubmit} className="space-y-3">
            <input
            className="border p-2 w-full rounded"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
            />
            <input
            className="border p-2 w-full rounded"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            />
            {err && <div className="text-red-600 text-sm">{err}</div>}
            <button className="border p-2 rounded w-full font-semibold" type="submit">
            Sign in
            </button>
        </form>
        </div>
    );
}