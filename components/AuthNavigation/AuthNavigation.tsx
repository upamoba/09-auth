'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { clientLogout } from '@/lib/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const clear = useAuthStore((s) => s.clear);

  const onLogout = async () => {
    try {
      await clientLogout();
    } finally {
      clear();
      router.push('/sign-in');
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <li className={css.navigationItem}>
          <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
            Login
          </Link>
        </li>
        <li className={css.navigationItem}>
          <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
            Sign up
          </Link>
        </li>
      </>
    );
  }

  return (
    <>
      <li className={css.navigationItem}>
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
          Profile
        </Link>
      </li>

      <li className={css.navigationItem}>
        <p className={css.userEmail}>{user?.email ?? 'User'}</p>
        <button onClick={onLogout} className={css.logoutButton}>
          Logout
        </button>
      </li>
    </>
  );
}
