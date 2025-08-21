'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './TagsMenu.module.css';
import type { NoteTag } from '../../types/note';

const allTags: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function TagsMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.menuContainer}>
      <button
        className={styles.menuButton}
        onClick={() => setOpen((o) => !o)}
      >
        Notes ▾
      </button>
      {open && (
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <Link
              href="/notes/filter/All"
              className={styles.menuLink}
              onClick={() => setOpen(false)}
            >
              All notes
            </Link>
          </li>
          {allTags.map((tag) => (
            <li key={tag} className={styles.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={styles.menuLink}
                onClick={() => setOpen(false)}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}