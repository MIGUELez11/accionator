import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface StockHeaderProps {
  symbol: string;
  name: string;
  logo: string;
  price: number;
  percentChange: number;
}

export async function StockHeader({
  symbol,
  name,
  logo,
  price,
  percentChange,
}: StockHeaderProps) {
  return (
    <div>
      <div className="flex flex-row gap-2 min-w-full justify-between p-4">
        <div className="flex flex-row gap-2 items-center">
          <Image
            src={logo}
            alt={name + " logo"}
            className="w-12 h-12 rounded-sm"
            width={48}
            height={48}
          />
          <div className="flex flex-col justify-between content-center">
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-gray-500">{symbol}</p>
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <p className="text-2xl font-bold">${(price ?? 0).toFixed(2)}</p>
          <p
            className={cn({
              "text-green-500": percentChange > 0,
              "text-red-500": percentChange < 0,
              "text-gray-500": !percentChange,
            })}
          >
            {(percentChange ?? 0).toFixed(2)}%
          </p>
        </div>
      </div>
      <Separator />
    </div>
  );
}
