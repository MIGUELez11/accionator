"use client";

import { useState } from "react";
import { InfoCard } from "./InfoCard";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { aiAnalysisQuery } from "@/queries/aiAnalysisQuery";
import { EconomicIndicator } from "./EconomicIndicator";
import { Separator } from "@/components/ui/separator";

function useAIAnalysis(symbol: string) {
  const [shouldGenerate, setShouldGenerate] = useState(false);
  const { data, isLoading, error } = useQuery({
    ...aiAnalysisQuery(symbol),
    enabled: shouldGenerate && !!symbol,
  });

  return {
    shouldGenerate,
    generateAnalysis: () => {
      setShouldGenerate(true);
    },
    data,
    isLoading,
    error,
  };
}

export function AIAnalysis({ symbol }: { symbol: string }) {
  const { generateAnalysis, shouldGenerate, data, isLoading, error } =
    useAIAnalysis(symbol);

  if (!shouldGenerate) {
    return (
      <InfoCard title="Recomendación IA">
        <div className="h-full w-full px-4">
          <Button onClick={generateAnalysis}>Generar análisis</Button>
        </div>
      </InfoCard>
    );
  }

  if (isLoading) {
    return (
      <InfoCard title="Recomendación IA">
        <div className="h-full w-full px-4">
          <p>Generando análisis...</p>
        </div>
      </InfoCard>
    );
  }

  if (error) {
    return (
      <InfoCard title="Recomendación IA">
        <div className="h-full w-full px-4">
          <p>
            Error al generar análisis{" "}
            {error.message ? error.message : "error desconocido"}
          </p>
        </div>
      </InfoCard>
    );
  }

  if (!data) {
    return (
      <InfoCard title="Recomendación IA">
        <div className="h-full w-full px-4">
          <p>No se encontró ningún análisis</p>
        </div>
      </InfoCard>
    );
  }

  const inputTokens =
    data.action.inputTokens +
    data.financialAnalysis.inputTokens +
    data.newsSummary.inputTokens;
  const outputTokens =
    data.action.outputTokens +
    data.financialAnalysis.outputTokens +
    data.newsSummary.outputTokens;
  const pricePerMillionInputTokens = 0.1;
  const pricePerMillionOutputTokens = 0.4;
  const price =
    (inputTokens / 1e6) * pricePerMillionInputTokens +
    (outputTokens / 1e6) * pricePerMillionOutputTokens;

  return (
    <InfoCard
      title={`Recomendación IA${price ? ` (${price.toFixed(4)}$)` : ""}`}
    >
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-medium">Recomendación</h3>
          <div className="grid grid-cols-2 gap-4">
            <EconomicIndicator
              title="Acción"
              value={
                data.action.response.action === "buy" ? "Comprar" : "No comprar"
              }
              className={
                data.action.response.action === "buy"
                  ? "text-green-600"
                  : "text-red-600"
              }
            />
            <EconomicIndicator
              title="Rango de entrada"
              value={`$${data.action.response.entryPrice.min.toFixed(2)} - $${data.action.response.entryPrice.max.toFixed(2)}`}
            />
            <EconomicIndicator
              title="Precio objetivo"
              value={`$${data.action.response.desiredPrice.toFixed(2)}`}
              className="text-green-600"
            />
            <EconomicIndicator
              title="Stop loss"
              value={`$${data.action.response.stopLoss.toFixed(2)}`}
              className="text-red-600"
            />
            <EconomicIndicator
              title="Beneficio potencial"
              value={`${(data.action.response.profit * 100).toFixed(2)}%`}
              className="text-green-600"
            />
            <EconomicIndicator
              title="Pérdida potencial"
              value={`${(data.action.response.loss * 100).toFixed(2)}%`}
              className="text-red-600"
            />
            <EconomicIndicator
              title="Tiempo estimado"
              value={data.action.response.estimatedTime}
            />
          </div>
        </div>

        <Separator className="my-2" />

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-medium">Estrategia de salida</h3>
          <div className="grid gap-3">
            {Object.entries(data.action.response.exitStrategies)
              .sort(([priceA], [priceB]) => Number(priceB) - Number(priceA))
              .map(([price, percentage], index) => (
                <div
                  key={price}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 h-6 text-sm font-medium text-white bg-blue-500 rounded-full">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">${Number(price).toFixed(2)}</p>
                      <p className="text-sm text-gray-500">Precio objetivo</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">
                      {(Number(percentage) * 100).toFixed(2)}%
                    </p>
                    <p className="text-sm text-gray-500">Vender</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </InfoCard>
  );
}
