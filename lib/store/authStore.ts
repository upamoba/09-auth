'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/user';

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clear: () => void;
  setAuthenticated: (val: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      setAuthenticated: (val) => set({ isAuthenticated: val, user: val ? null : null }),
      clear: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'auth-store' }
  )
);
