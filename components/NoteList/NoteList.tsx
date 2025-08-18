'use client';
import React, { FC } from 'react';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../lib/api';
import type { Note } from '../../types/note';
import styles from './NoteList.module.css';

interface Props { notes: Note[]; }
const NoteList: FC<Props> = ({ notes }) => {
  const qc = useQueryClient();
  const mut = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notes'], exact: false })
  });

  return (
    <ul className={styles.list}>
      {notes.map(n => (
        <li key={n.id} className={styles.listItem}>
          <h2>{n.title}</h2>
          <p>{n.content}</p>
          <div className={styles.footer}>
            <span className={styles.tag}>{n.tag}</span>
            <Link href={`/notes/${n.id}`} className={styles.link}>
              View details
            </Link>
            <button onClick={() => mut.mutate(n.id)} className={styles.button}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default NoteList;