import type { Metadata } from 'next';
import css from './ProfilePage.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { serverGetMe } from '@/lib/api/serverApi';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Profile | NoteHub',
  description: 'Your personal profile page in NoteHub.',
  openGraph: {
    title: 'Profile | NoteHub',
    description: 'Your personal profile page in NoteHub.',
    url: `${SITE_URL}/profile`,
    images: [{ url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' }],
  },
};

export default async function ProfilePage() {
  const user = await serverGetMe();
  const username = user?.username ?? '_';
  const email = user?.email ?? '_';
  const avatarSrc = (user?.avatar && user.avatar.trim() !== '') ? user.avatar : 'https://i.pravatar.cc/120?img=3';
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>Edit Profile</Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
         src={avatarSrc}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username:{username}</p>
          <p>Email:{email}</p>
        </div>
      </div>
    </main>
  );  
}