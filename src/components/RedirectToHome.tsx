'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export function RedirectToHome() {
  useEffect(() => {
    redirect('/');
  }, []);

  return null;
}
