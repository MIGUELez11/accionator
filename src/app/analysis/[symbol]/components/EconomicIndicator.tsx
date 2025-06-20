import { cn } from "@/lib/utils";

export function EconomicIndicator({
  title,
  value,
  className,
}: {
  title: string;
  value: string;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm text-gray-500">{title}</p>
      <p className={cn("font-bold", className)}>{value}</p>
    </div>
  );
}
