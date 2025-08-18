'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotesError({ error }: { error: Error }) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div>
      <p>Could not fetch the list of notes. {error.message}</p>
      <button onClick={() => router.refresh()}>Retry</button>
    </div>
  );
}