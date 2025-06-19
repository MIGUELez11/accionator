export function TitledSection({ title, subtitle, children }: { title: string, subtitle?: string, children?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-3xl font-semibold">{title}</p>
        {subtitle && <p className="text-gray-500">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}