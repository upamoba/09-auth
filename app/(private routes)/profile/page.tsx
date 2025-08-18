import type { Metadata } from 'next';
import css from './Profile.module.css';
import Link from 'next/link';
import Image from 'next/image';

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

export default function ProfilePage() {
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>Edit Profile</Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
         src="https://i.pravatar.cc/120?img=3"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: your_username</p>
          <p>Email: your_email@example.com</p>
        </div>
      </div>
    </main>
  );  
}