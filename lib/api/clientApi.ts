import { apiClient } from '@/lib/api/api';
import type { User } from '@/types/user';
import type { Note, NoteTag } from '@/types/note';

export type FetchNotesResponse = {
  data: Note[];
  totalPages: number;
  page: number;
  perPage: number;
};

// ---- Auth ----
export async function clientRegister(payload: { email: string; password: string }): Promise<User> {
  const { data } = await apiClient.post<User>('/auth/register', payload);
  return data;
}

export async function clientLogin(payload: { email: string; password: string }): Promise<User> {
  const { data } = await apiClient.post<User>('/auth/login', payload);
  return data;
}

export async function clientLogout(): Promise<void> {
  await apiClient.post('/auth/logout', {});
}

export async function clientSession(): Promise<User | null> {
  try {
    const { data } = await apiClient.get<User | null>('/auth/session');
    return data ?? null; 
  } catch {
    return null;
  }
}

// ---- Users ----
export async function clientGetMe(): Promise<User> {
  const { data } = await apiClient.get<User>('/users/me');
  return data;
}

export async function clientUpdateMe(payload: { username: string }): Promise<User> {
  const { data } = await apiClient.patch<User>('/users/me', payload);
  return data;
}

// ---- Notes ----
export async function clientFetchNotes(params: {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag | 'All';
}): Promise<FetchNotesResponse> {
  const { data } = await apiClient.get<FetchNotesResponse>('/notes', { params });
  return data;
}

export async function clientFetchNoteById(id: string): Promise<Note> {
  const { data } = await apiClient.get<Note>(`/notes/${id}`);
  return data;
}

export async function clientCreateNote(payload: { title: string; content: string; tag: NoteTag }): Promise<Note> {
  const { data } = await apiClient.post<Note>('/notes', payload);
  return data;
}

export async function clientDeleteNote(id: string): Promise<Note> {
  const { data } = await apiClient.delete<Note>(`/notes/${id}`);
  return data;
}



