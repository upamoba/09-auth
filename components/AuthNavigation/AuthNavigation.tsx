'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { clientLogout } from '@/lib/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
  const router = useRouter();
  const{ user, isAuthenticated, clearIsAuthenticated } = useAuthStore();

  const onLogout = async () => {
    try {
      await clientLogout();
    } finally {
      clearIsAuthenticated();
      router.replace('/sign-in');
    }
  };
   return (
    <>
      {isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <Link href="/profile" prefetch={false} className={css.navigationLink}>
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email ?? 'User'}</p>
            <button className={css.logoutButton} onClick={onLogout}>Logout</button>
          </li>
        </>
      ) : (
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
      )}
    </>
  );
}

//   if (!isAuthenticated) {
//     return (
//       <>
//         <li className={css.navigationItem}>
//           <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
//             Login
//           </Link>
//         </li>
//         <li className={css.navigationItem}>
//           <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
//             Sign up
//           </Link>
//         </li>
//       </>
//     );
//   }

//   return (
//     <>
//       <li className={css.navigationItem}>
//         <Link href="/profile" prefetch={false} className={css.navigationLink}>
//           Profile
//         </Link>
//       </li>

//       <li className={css.navigationItem}>
//         <p className={css.userEmail}>{user?.email ?? 'User'}</p>
//         <button onClick={onLogout} className={css.logoutButton}>
//           Logout
//         </button>
//       </li>
//     </>
//   );
// }
