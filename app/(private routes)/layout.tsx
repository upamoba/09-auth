'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type PrivateLayoutProps = {
  children: React.ReactNode;
};

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return <>{children}</>;
}