'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTabParams } from '@/hooks/useTabParams';
import { RegisterOperation } from './components/Form/RegisterOperation';
import { OperationTab } from './components/Operations';
import { SymbolTab } from './components/Symbol';

export default function OperationsPage() {
  const { selectedTab, handleTabChange } = useTabParams({ queryName: 'tab', defaultValue: 'summary' });

  return (
    <div className={`flex h-[calc(100vh-65px)] overflow-hidden`}>
      <aside className="w-1/4 h-full">
        <RegisterOperation />
      </aside>

      <main className={`w-3/4 h-full pl-4 py-4 flex flex-col gap-4`}>
        <h1 className="text-2xl font-bold">Gestión de operaciones</h1>
        <Tabs defaultValue={selectedTab} className="h-full" onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="summary">Resumen</TabsTrigger>
            <TabsTrigger value="operations">Operaciones</TabsTrigger>
            <TabsTrigger value="tags">Por etiqueta</TabsTrigger>
            <TabsTrigger value="symbols">Por símbolo</TabsTrigger>
          </TabsList>

          <div className="mt-4 h-full">
            <TabsContent value="summary" className="h-full">
              <p>Unknown</p>
            </TabsContent>
            <TabsContent value="operations" className="h-full">
              <OperationTab />
            </TabsContent>
            <TabsContent value="tags" className="h-full">
              <p>Unknown</p>
            </TabsContent>
            <TabsContent value="symbols" className="h-full">
              <SymbolTab />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
}
