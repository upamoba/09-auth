'use client';
import React, { FC, ChangeEvent } from 'react';
import styles from './SearchBox.module.css';
interface Props { value: string; onChange: (v: string) => void; }
const SearchBox: FC<Props> = ({ value, onChange }) => (
  <input
    className={styles.input}
    type="text"
    placeholder="Search notes"
    value={value}
    onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
  />
);
export default SearchBox;