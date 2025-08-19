import { fetchNotes,} from '@/lib/api/api'
import type { FilterTag } from '@/types/note';
import NotesClient from './Notes.client'
import type { Metadata } from 'next';

const siteUrl =process.env.NEXT_PUBLIC_SITE_URL ?? 'https://notehub-yourname.vercel.app';
type PageProps ={params:Promise<{ slug?: string[] }>;};
const ALLOWED = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as const;
const asFilterTag = (raw?: string): FilterTag =>
  ALLOWED.includes((raw ?? 'All') as FilterTag) ? ((raw ?? 'All') as FilterTag) : 'All';
const humanize = (tag?: string) => tag && tag !== '' ? `“${tag}”` : 'All notes';

export async function generateMetadata({
  params,}:{params: Promise<{slug: string[]}>}):Promise<Metadata>{
const { slug } = await params;
const tag = slug?.[0]  ?? 'All'; 
const title =`Notes - ${humanize(tag)} | NoteHub`;
const description = `Browse notes filtered by ${humanize(tag)} in NoteHub.`;
const url = tag && tag !== 'All' ? `${siteUrl}/notes/filter/${tag}` : `${siteUrl}/notes/filter/All`;

return{
title,description,
openGraph:{
  title,description,url,
  images:[{ url:'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'}],
},
};
}

export default async function FilteredNotesPage({ params }: PageProps) {
  const { slug } = await params;
  const filterTag: FilterTag = asFilterTag(slug?.[0]);
  const initialData = await fetchNotes({
    page: 1,
    perPage: 12,
    tag: filterTag,
    search: '',
  });
  return <NotesClient initialData={initialData} filterTag={filterTag} />;
}


