'use client';

import { useEffect, useState } from 'react';
import { clientLogout, clientSession,clientGetMe } from '../../lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true);
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);
 useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const ok = await clientSession();
        if (!alive) return;
        if (!ok) {
          clearIsAuthenticated();
          return;
        }
        const me = await clientGetMe().catch(() => null);
        if (!alive) return;
        if (me) setUser(me);
        else clearIsAuthenticated();
      } catch {
        if (alive) {
          clearIsAuthenticated();
          await clientLogout().catch(() => {});
        }
      } finally {
        if (alive) setChecking(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [setUser, clearIsAuthenticated]);
  if (checking) return <p style={{ padding: 16 }}>Checking session…</p>;
  return <>{children}</>;
}
