import { http } from "@/services/http";
import { useAuthStore } from "@/store/authStore";

type LoginResponse = { token: string; expiresAt: string };
//type WhoAmI = { id: string; email: string; role: string };

export async function loginAdmin(email: string, password: string) {
    const res = await http.post<LoginResponse>(
        "/admin/auth/login", 
        { 
            email, 
            password 
        });
    const { token, expiresAt } = res.data;
    useAuthStore.getState().login(token, expiresAt);

    // Optionally retrieve user profile (requires token)
    //   const me = await whoAmI().catch(() => null);
    //   if (me) useAuthStore.getState().setUser(me);
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