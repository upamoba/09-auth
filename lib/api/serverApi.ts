import { cookies } from 'next/headers';
import { apiClient } from '../../app/api/api';
import type { User } from '@/types/user';
import type { Note, NoteTag } from '@/types/note';

async function cookieHeader(): Promise<string> {
  const store = await cookies();
  const pairs = store.getAll().map((ck) => `${ck.name}=${ck.value}`);
  return pairs.join('; ');
}

export async function serverGetMe(): Promise<User | null> {
  try {
    const { data } = await apiClient.get<User>('/users/me', {
      headers: { cookie: await cookieHeader() },
    });
    return data;
  } catch {
    return null;
  }
}

type NotesQuery = {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag | 'All';
};

export async function serverFetchNotes(params: NotesQuery = {}): Promise<Note[]> {
  const { page = 1, perPage = 12, search, tag } = params;

  const query: Record<string, unknown> = { page, perPage };
  if (search) query.search = search;
  if (tag && tag !== 'All') query.tag = tag;

  const { data } = await apiClient.get<Note[]>('/notes', {
    params: query,
    headers: { cookie: await cookieHeader() },
  });
  return data;
}

export async function serverFetchNoteById(id: string): Promise<Note> {
  const { data } = await apiClient.get<Note>(`/notes/${id}`, {
    headers: { cookie: await cookieHeader() },
  });
  return data;
}