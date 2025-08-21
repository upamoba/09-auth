import { apiClient } from '@/lib/api/api';
import type { User } from '@/types/user';
import type { Note, NoteTag } from '@/types/note';

export type FetchNotesResponse = {
  notes: Note[];
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

export async function clientSession(): Promise<boolean> {
  const { data } = await apiClient.get<{ success: boolean }>('/auth/session');
  return !!data?.success;
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
    const page = params.page ?? 1;
  const perPage = params.perPage ?? 12;

  const { data } = await apiClient.get<{ notes: Note[]; totalPages: number }>('/notes', {
    params: {
      page,
      perPage,
      ...(params.search ? { search: params.search } : {}),
      ...(params.tag && params.tag !== 'All' ? { tag: params.tag } : {}),
    },
  });

  return {
    notes: data?.notes ?? [],
    totalPages: data?.totalPages ?? 1,
    page,
    perPage,
  };
}
//   const { data } = await apiClient.get<FetchNotesResponse>('/notes', { params });
//   return data;
// }

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



