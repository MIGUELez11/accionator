import type { LucideIcon } from 'lucide-react';

interface DataCardProps {
  title: string;
  value: number;
  isPercentage?: boolean;
  icon: LucideIcon;
}

export function DataCard({ title, value, isPercentage = false, icon: Icon }: DataCardProps) {
  return (
    <div className="flex flex-col gap-4 border rounded-sm p-8 items-center justify-center">
      <div className="rounded-full bg-gray-200 flex items-center justify-center w-12 h-12">
        <Icon className="text-black w-6 h-6" />
      </div>
      <p className="text-4xl font-bold">{isPercentage ? `${value.toFixed(0)}%` : value.toFixed(0)}</p>
      <p className="text-gray-500">{title}</p>
    </div>
  );
}
