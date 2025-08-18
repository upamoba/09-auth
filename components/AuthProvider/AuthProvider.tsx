'use client';

import { useEffect, useState } from 'react';
import { clientLogout, clientSession } from '../../lib/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true);
  const { setUser, clearIsAuthenticated } = useAuthStore();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const user = await clientSession();
        if (!cancelled) {
          if (user) setUser(user);
          else clearIsAuthenticated();
        }
      } catch {
        if (!cancelled) {
          clearIsAuthenticated();
          await clientLogout().catch(() => {});
        }
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();
    return () => { cancelled = true; };
  }, [setUser, clearIsAuthenticated]);

  if (checking) return <p style={{ padding: 16 }}>Checking session…</p>;
  return <>{children}</>;
}
