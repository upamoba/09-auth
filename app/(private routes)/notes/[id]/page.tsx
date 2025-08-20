import type { Metadata } from 'next';
import { clientFetchNoteById } from '@/lib/api/clientApi';
import NoteDetailsClient from './NoteDetails.client';


const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://notehub-yourname.vercel.app';
type PageProps = { params: Promise <{ id: string }> };
export async function generateMetadata({ params}:{params:Promise< {id: string}>
 }): Promise<Metadata> {
  const {id} = await params;
  try {
    const note = await clientFetchNoteById(id);
    const title = `${note.title} | NoteHub`;
    const description  =(note.content || '').trim().slice(0, 140) || 'Note details.';
  
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${siteUrl}/notes/${id}`,
        images: [{ url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' }],
      },
    };
  } catch {
    const title = 'Note details | NoteHub';
    const description = 'Note details are not available.';;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${siteUrl}/notes/${id}`,
        images: [{ url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' }],
      },
    };
  }
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const { id } = await params;
  return <NoteDetailsClient noteId={id} />;
}
