import { Skeleton } from '@/components/ui/skeleton';

export function OperationSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Skeleton className="w-full h-24 rounded-md" />
    </div>
  );
}
