import { cn } from "@/lib/utils";

export interface ScreenerTypeProps {
  title: string;
  description: string;
  icon: React.ElementType;
  selected?: boolean;
  onClick?: () => void;
}

export function ScreenerType({
  title,
  description,
  icon: Icon,
  selected,
  onClick,
}: ScreenerTypeProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-xl border flex flex-col transition-colors cursor-pointer hover:bg-secondary hover:border-accent",
        selected && "bg-secondary border-accent shadow-md",
      )}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <Icon className="w-8 h-8" />
      <p className="text-lg font-semibold text-wrap">{title}</p>
      <p className="text-sm text-secondary-foreground text-wrap">
        {description}
      </p>
    </div>
  );
}
