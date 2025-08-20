'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '@/types/note';
import { clientCreateNote} from '@/lib/api/clientApi';
import {useNoteStore,initialDraft } from '@/lib/store/noteStore';
import styles from './NoteForm.module.css';


const NoteForm: React.FC = () => {
  const router = useRouter();
  const qc = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteStore();
  const [submitting, setSubmitting] = useState(false);
  const mut = useMutation<Note, Error, typeof initialDraft>({
    mutationFn: (payload) => clientCreateNote(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notes'], exact: false });
      clearDraft();
      router.back();
    },
  });
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await mut.mutateAsync(draft);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          className={styles.input}
          value={draft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
          minLength={3}
          maxLength={50}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          className={styles.textarea}
          value={draft.content}
          onChange={(e) => setDraft({ content: e.target.value })}
          maxLength={500}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          className={styles.select}
          value={draft.tag}
          onChange={(e) => setDraft({ tag: e.target.value as Note['tag'] })}
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={submitting}
          className={styles.submitButton}
        >
          {submitting ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;