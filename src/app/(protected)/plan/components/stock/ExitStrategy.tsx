'use client';

interface ExitStrategyItem {
  price: number;
  percentage: number;
}

interface ExitStrategyProps {
  strategies: ExitStrategyItem[];
}

export function ExitStrategy({ strategies }: ExitStrategyProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-muted-foreground">Estrategia de salida</p>
      <div className="flex flex-col gap-1">
        {strategies
          .sort((a, b) => a.price - b.price)
          .map((strategy, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="font-medium">${strategy.price}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {(strategy.percentage * 100).toFixed(0)}% del capital
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
