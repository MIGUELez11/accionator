'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { useRef } from 'react';

export interface InputProps extends React.ComponentProps<'input'> {
  rightIcon?: LucideIcon;
  leftIcon?: LucideIcon;
}

const ICON_CLASS =
  'absolute top-1/2 -translate-y-1/2 text-primary-500 group-data-[disabled=true]:text-neutral-200 w-4 h-4 flex items-center justify-center';

function Input({ className, type, rightIcon: RightIcon, leftIcon: LeftIcon, ...props }: InputProps) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="relative">
      {LeftIcon && (
        <div className={cn(ICON_CLASS, 'left-3')} onClick={() => ref.current?.focus()} role="presentation">
          <LeftIcon className="w-4 h-4" />
        </div>
      )}
      {RightIcon && (
        <div className={cn(ICON_CLASS, 'right-3')} onClick={() => ref.current?.focus()} role="presentation">
          <RightIcon className="w-4 h-4" />
        </div>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex-row items-center gap-2',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          RightIcon && 'pr-10',
          LeftIcon && 'pl-10',
          className,
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
