import styles from './not-found.module.css';
import type { Metadata } from 'next';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://notehub-yourname.vercel.app';
export const metadata: Metadata = {
  title: '404 - Page not found | NoteHub',
  description: 'Page not found. Unfortunately, such a page does not exist.',
  openGraph: {
    title: '404 - Page not found | NoteHub',
    description: 'Page not found. Unfortunately, such a page does not exist.',
    url: `${siteUrl}/404`,
    images: [{ url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' }],
  },
};

export default function NotFound() {
  return (
    <main className={styles.root}>
      <h1 className={styles.title}>404 - Page not found</h1>
      <p className={styles.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </main>
  );
}