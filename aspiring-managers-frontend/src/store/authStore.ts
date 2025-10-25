import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = { id: string; email: string; role: string } | null;

type AuthState = {
  token: string | null;
  expiresAt: string | null; // ISO from backend
  user: User;
  isAuthenticated: boolean;
  login: (token: string, expiresAt: string) => void;
  setUser: (u: User) => void;
  logout: () => void;
  isExpired: () => boolean;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      expiresAt: null,
      user: null,
      isAuthenticated: false,
      login: (token, expiresAt) =>
        set({ token, expiresAt, isAuthenticated: true }),
      setUser: (u) => set({ user: u }),
      logout: () => set({ token: null, expiresAt: null, user: null, isAuthenticated: false }),
      isExpired: () => {
        const exp = get().expiresAt;
        if (!exp) return true;
        return new Date(exp).getTime() <= Date.now();
      },
    }),
    { name: "am-auth" }
  )
);