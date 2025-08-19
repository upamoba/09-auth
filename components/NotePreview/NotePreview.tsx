'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '../../lib/api/api';
import type { Note } from '../../types/note';
import styles from './NotePreview.module.css';

interface Props { noteId: string; }

export default function NotePreview({ noteId }: Props) {
  const { data, isLoading, isError } = useQuery<Note, Error>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false
  });

  if (isLoading) return <p>Loading…</p>;
  if (isError || !data) return <p>Could not load note.</p>;

  return (
    <div className={styles.container}>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <small>{new Date(data.createdAt).toLocaleString()}</small>
    </div>
  );
}