'use client';

import { RedirectToHome } from '@/components/RedirectToHome';
import { TopBar } from '@/components/TopBar';
import { Authenticated, Unauthenticated } from 'convex/react';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Authenticated>
        <TopBar />
        <div className="w-full mx-auto pt-16">{children}</div>
      </Authenticated>
      <Unauthenticated>
        <RedirectToHome />
      </Unauthenticated>
    </>
  );
}
