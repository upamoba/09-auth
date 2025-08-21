import './globals.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import {  ReactNode } from 'react';
import TanStackProvider from '../components/TanStackProvider/TanStackProvider';
import { Roboto } from 'next/font/google';
import type { Metadata } from 'next';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

const roboto = Roboto({
  subsets: ['latin','latin-ext'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://notehub-yourname.vercel.app';
export const metadata: Metadata = {
  title: 'NoteHub simple notes manager',
  description: 'NoteHub is a simple and efficient application for writing,browsing and organizing your personal notes.', 
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'NoteHub - simple notes manager',
    description: 'Write, browse and organize your personal notes with NoteHub.',
    url: siteUrl,
    images: [ 
      {url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'},
    ],type:'website',

    },
  };
  export default function RootLayout({children, modal}: { children: ReactNode; modal: ReactNode; }) {
    return (
      <html lang="uk">
        <body className={roboto.variable} suppressHydrationWarning>
          <TanStackProvider>
            <AuthProvider>
            <Header />
            {children}
            <Footer />
            {modal}
            </AuthProvider>
          </TanStackProvider>
        </body>
      </html> 
    );
  }