interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

export function ChartCard({ title, children }: ChartCardProps) {
  return (
    <div className="flex flex-col gap-1 border rounded-sm p-4">
      <p className="text-gray-500">{title}</p>
      {children}
    </div>
  );
}
