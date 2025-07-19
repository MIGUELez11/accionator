'use client';

import { useTimePassed } from '@/hooks/useTimePassed';
import { cn } from '@/lib/utils';

export function TimePassed({ date, className }: { date: Date; className?: string }) {
  const timePassed = useTimePassed(new Date(date));
  return <span className={cn('text-sm text-muted-foreground', className)}>{timePassed}</span>;
}
