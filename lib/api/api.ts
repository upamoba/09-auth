import axios from 'axios';
import type { Note, NoteTag } from '../../types/note';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
const key = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
if (!key) throw new Error('NEXT_PUBLIC_NOTEHUB_TOKEN is not defined.');
axios.defaults.headers.common['Authorization'] = `Bearer ${key}`;


export type FilterTag = NoteTag | 'All';

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: FilterTag;
}

export interface FetchNotesResponse {
  data: Note[];
  totalPages: number;
  page: number;
  perPage: number;
}

interface RawFetchNotes {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
 
  const params: {
    page: number;
    perPage: number;
    search?: string;
    tag?: NoteTag;
  } = { page, perPage };

  if (search) {
    params.search = search;
  }
 
  if (tag && tag !== 'All') {
    params.tag = tag;
  }

  const r = await axios.get<RawFetchNotes>('/notes', { params });
  return {
    page,
    perPage,
    data: r.data.notes,
    totalPages: r.data.totalPages,
  };
};
export const fetchNoteById = async (id: string): Promise<Note> => {
  const r = await axios.get<Note>(`/notes/${id}`);
  return r.data;
};
export const createNote = async (payload: {
  title: string;
  content: string;
  tag: NoteTag;
}): Promise<Note> => {
  const r = await axios.post<Note>('/notes', payload);
  return r.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const r = await axios.delete<Note>(`/notes/${id}`);
  return r.data;
};
