// authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = { id: string; email: string; role: string } | null;
type AuthState = {
  token: string | null;
  expiresAt: string | null; // epoch ms as string
  user: User;
  login: (token: string, expMs: string) => void;
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
      login: (token, expMs) => set({ token, expiresAt: expMs }),
      setUser: (u) => set({ user: u }),
      logout: () => set({ token: null, expiresAt: null, user: null }),
      isExpired: () => {
        const exp = Number(get().expiresAt ?? 0);
        return !exp || exp <= Date.now();
      },
    }),
    { name: "am-auth", partialize: (s) => ({ token: s.token, expiresAt: s.expiresAt, user: s.user }) }
  )
);
