import { cn } from "@/lib/utils";

export interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function InfoCard({ title, children, className }: InfoCardProps) {
  return (
    <div className={cn("flex flex-col gap-4 rounded-md border py-6", className)}>
      <div className="px-6">
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      {children}
    </div>
  )
}