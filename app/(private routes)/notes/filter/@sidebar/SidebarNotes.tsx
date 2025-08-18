'use client';
import React from 'react';
import Link from 'next/link';
import styles from './SidebarNotes.module.css';
import type { NoteTag } from '@/types/note';

const tags: (NoteTag | 'All')[] = [
  'All',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

export default function SidebarNotes() {
  return (
    <ul className={styles.menuList}>
      {tags.map((tag) => {
        const href = tag === 'All'
          ? '/notes/filter'
          : `/notes/filter/${tag}`;
        return (
          <li key={tag} className={styles.menuItem}>
            <Link href={href} className={styles.menuLink}>
              {tag === 'All' ? 'All notes' : tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}