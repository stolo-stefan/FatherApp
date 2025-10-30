import { http } from "@/services/http";
import { useAuthStore } from "@/store/authStore";

type LoginResponse = { token: string; expiresAt: string };
//type WhoAmI = { id: string; email: string; role: string };

export async function loginAdmin(email: string, password: string) {
    const res = await http.post<LoginResponse>("/admin/auth/login", { email, password });
    const { token, exp, expiresAt } = res.data as any;

    // normalize: accept ISO, unix seconds, or ms
    const raw = expiresAt ?? exp;
    const toMs =
        typeof raw === "number" ? (raw > 10_000_000_000 ? raw : raw * 1000)
        : !Number.isNaN(Number(raw)) ? (Number(raw) > 10_000_000_000 ? Number(raw) : Number(raw) * 1000)
        : new Date(raw).getTime();

    useAuthStore.getState().login(token, String(toMs));
    return res.data; // <-- IMPORTANT
}


    // export async function whoAmI(): Promise<WhoAmI> {
    //   const res = await http.get<WhoAmI>("/admin/auth/me");
    //   return res.data;
    // }

export async function logoutAdmin() {
    try {
        await http.post("/admin/auth/logout"); // optional; JWT is stateless
    } finally {
        useAuthStore.getState().logout();
    }
}