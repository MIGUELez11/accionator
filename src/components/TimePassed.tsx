'use client';

import { useTimePassed } from '@/hooks/useTimePassed';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

export function TimePassed({ date, className }: { date: Date; className?: string }) {
  const parsedDate = useMemo(() => new Date(date), [date]);
  const timePassed = useTimePassed(parsedDate);

  return <span className={cn('text-sm text-muted-foreground', className)}>{timePassed}</span>;
}
