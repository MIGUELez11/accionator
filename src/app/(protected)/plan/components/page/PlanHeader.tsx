'use client';

import { TimePassed } from '@/components/TimePassed';
import { BrainIcon, ClockIcon } from 'lucide-react';

interface PlanHeaderProps {
  title: string;
  createdAt: Date;
}

export function PlanHeader({ title, createdAt }: PlanHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <BrainIcon className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div className="flex items-center gap-1 text-muted-foreground">
        <ClockIcon className="w-4 h-4 mr-1" />
        <span>Generado</span>
        <TimePassed date={createdAt} className="text-base" />
      </div>
    </div>
  );
}
