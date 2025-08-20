'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { clientFetchNoteById } from '@/lib/api/clientApi';
import Modal from '@/components/Modal/Modal';
import styles from './NotePreview.module.css';
import type { Note } from '@/types/note';

export default function NotePreviewModal() {
  const router = useRouter();
  const params = useParams();
  const raw = params.id;
  const noteId = Array.isArray(raw) ? raw[0] : raw;
   const { data: note, isLoading, isError } = useQuery<Note, Error>({
    queryKey: ['note', noteId],
    queryFn: () => clientFetchNoteById(noteId!),
   enabled: !!noteId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
   if (!noteId){ return null; }

  return (
    <Modal onClose={() => router.back()}>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong.</p>}
      {note && (
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={styles.content}>{note.content}</p>
          <p className={styles.date}>
            {new Date(note.createdAt).toLocaleString()}
          </p>
        </div>
      )}
    </Modal>
  );
}