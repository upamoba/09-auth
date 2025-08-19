'use client';
import React, { FC, useState, useEffect } from 'react';
import {keepPreviousData,useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import type { FetchNotesResponse } from '@/lib/api/api'
import { fetchNotes } from '@/lib/api/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import { LoadingIndicator } from '@/components/LoadingIndicator/LoadingIndicator';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import styles from './NotesPage.module.css';
import { FilterTag } from '@/types/note';
import Link from 'next/link';

interface NotesClientProps {
  initialData: FetchNotesResponse
  filterTag?: FilterTag
}

const NotesClient: FC<NotesClientProps> = ({ initialData , filterTag }) => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)
 

  
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filterTag]);

  
  

  const {data,isLoading,isError,} = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', page, filterTag ?? 'All', debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch || undefined, tag: filterTag }),
    initialData: page === 1  ? initialData : undefined,
    placeholderData: keepPreviousData
  })
const notes = data?.data ?? []
  const totalPages = data?.totalPages ?? 1

  return (
    <div className={styles.app}>
      <div className={styles.toolbar}>
        <SearchBox 
          value={search} 
           onChange={val => {
            setSearch(val)
          }} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            activePage={page}
            onPageChange={setPage}
          />
        )}
 <Link href="/notes/action/create" className={styles.button}>
         Create note +
</Link>
      </div>

      {isLoading && <LoadingIndicator />}
      {isError && <ErrorMessage />}

      {!isLoading && notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        !isLoading && <EmptyState message="No notes found." />
      )}

      
    </div>
  );
};

export default NotesClient