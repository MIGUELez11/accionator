export function CompanyRenderer({ companyName, symbol }: { companyName: string, symbol: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-bold">{symbol}</p>
      <p className="text-sm text-gray-500">{companyName}</p>
    </div>
  )
}