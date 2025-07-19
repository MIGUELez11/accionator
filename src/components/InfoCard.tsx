import { cn } from '@/lib/utils';

export interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}

export function InfoCard({ title, leftIcon, children, className, rightIcon }: InfoCardProps) {
  return (
    <div className={cn('flex flex-col gap-4 rounded-md border py-6', className)}>
      <div className="px-6 flex justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold">{title}</h2>
          {leftIcon ? <div className="flex items-center gap-2">{leftIcon}</div> : null}
        </div>
        {rightIcon ? <div className="flex items-center gap-2">{rightIcon}</div> : null}
      </div>
      {children}
    </div>
  );
}
