"use client";

import { TitledSection } from "@/components/TitledSection";
import { ScreenerPicker } from "./components/ScreenerPicker/ScreenerPicker";
import { useState } from "react";
import { ScreenerTable } from "./components/ScreenerTable";
import { useQuery } from "@tanstack/react-query";
import { screenerQuery } from "@/queries/screenerQuery";

export default function ScreenerPage() {
  const [selectedScreener, setSelectedScreener] = useState<string | null>(null);
  const { data, isLoading } = useQuery(screenerQuery(selectedScreener));

  console.log("data", data);

  return (
    <TitledSection
      title="Descubre oportunidades de inversión"
      subtitle="Selecciona un screener para encontrar acciones con potencial de inversión a corto plazo"
    >
      <ScreenerPicker value={selectedScreener} onChange={setSelectedScreener} />
      {selectedScreener && isLoading ? <div>Loading...</div> : null}
      {selectedScreener && !isLoading && data ? (
        <ScreenerTable data={data} />
      ) : null}
    </TitledSection>
  );
}
