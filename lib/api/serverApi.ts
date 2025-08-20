import { cookies } from 'next/headers';
import { apiClient } from '../../lib/api/api';
import type { User } from '@/types/user';
import type { Note, NoteTag } from '@/types/note';
import type { AxiosResponse } from 'axios';
import type { FetchNotesResponse } from './clientApi';

async function cookieHeader(): Promise<string> {
  const store = await cookies();
  return store.getAll().map((ck) => `${ck.name}=${ck.value}`).join('; ');
}

export async function serverSession(): Promise<AxiosResponse<{ success: boolean }>> {
 const res = await apiClient.get<{ success: boolean }>('/auth/session', {
    headers: { cookie: await cookieHeader() },
    validateStatus: () => true, 
  });
  return res;
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

export async function serverFetchNotes(params: NotesQuery = {}): Promise<FetchNotesResponse> {

  const { page = 1, perPage = 12, search, tag } = params;
  const query: Record<string, unknown> = { page, perPage };
  if (search) query.search = search;
  if (tag && tag !== 'All') query.tag = tag;

  const res = await apiClient.get<FetchNotesResponse>('/notes', {
    params: query,
    headers: { cookie: await cookieHeader() },
  });
  return res.data;
}

export async function serverFetchNoteById(id: string): Promise<Note> {
  const { data } = await apiClient.get<Note>(`/notes/${id}`, {
    headers: { cookie: await cookieHeader() },
  });
  return data;
}

export async function serverCreateNote(payload: {
  title: string;
  content: string;
  tag: NoteTag;
}): Promise<Note> {
  const { data } = await apiClient.post<Note>('/notes', payload, {
    headers: { cookie: await cookieHeader() },
  });
  return data;
}

export async function serverDeleteNote(id: string): Promise<Note> {
  const { data } = await apiClient.delete<Note>(`/notes/${id}`, {
    headers: { cookie: await cookieHeader() },
  });
  return data;
}