'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import styles from './NoteDetails.module.css';
import type { Note } from '../../../types/note';


export interface NoteDetailsClientProps {
  noteId: string;
}

export default function NoteDetailsClient({ noteId }: NoteDetailsClientProps) {
  const { data: note, isLoading, isError } = useQuery<Note, Error>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  if (isLoading) return <p>Loading, please wait...</p>
  if (isError || !note) return <p>Something went wrong.</p>

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{note.title}</h2>
      </div>
      <p className={styles.content}>{note.content}</p>
      <p className={styles.date}>
        {new Date(note.createdAt).toLocaleString()}
      </p>
    </div>
  )
}
