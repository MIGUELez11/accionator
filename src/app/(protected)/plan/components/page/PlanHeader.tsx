'use client';

import { TimePassed } from '@/components/TimePassed';
import { ClockIcon } from 'lucide-react';

interface PlanHeaderProps {
  title: string;
  createdAt: Date;
}

export function PlanHeader({ title, createdAt }: PlanHeaderProps) {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <ClockIcon className="w-3 h-3" />
        <span>Generado</span>
        <TimePassed date={createdAt} />
      </div>
    </div>
  );
}
