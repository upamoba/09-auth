'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { clientLogout, clientSession } from '../../lib/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

const PRIVATE_PREFIXES = ['/notes', '/profile'];

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const setUser = useAuthStore((s) => s.setUser);
  const clear = useAuthStore((s) => s.clear);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const user = await clientSession();
        if (cancelled) return;

        if (user) {
          setUser(user);
        } else if (PRIVATE_PREFIXES.some((p) => pathname.startsWith(p))) {
        
          await clientLogout().catch(() => {});
          clear();
          router.replace('/sign-in');
          return;
        }
      } finally {
        if (!cancelled) setChecking(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [pathname, setUser, clear, router]);

  if (checking) return <p style={{ padding: 24 }}>Loading…</p>;

  return <>{children}</>;
}