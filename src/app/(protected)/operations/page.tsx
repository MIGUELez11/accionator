'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTabParams } from '@/hooks/useTabParams';
import { api } from '@convex/_generated/api';
import { Id } from '@convex/_generated/dataModel';
import { useTranslate } from '@tolgee/react';
import { useCallback, useRef, useState } from 'react';
import { RegisterOperation, RegisterOperationRef } from './components/Form/RegisterOperation';
import { OperationTab } from './components/Operations';
import { SymbolTab } from './components/Symbol';

function useRegisterOperationLogic() {
  const formRef = useRef<RegisterOperationRef>(null);
  const [editingOperationId, setEditingOperationId] = useState<Id<'operations'> | null>(null);

  const handleEditOperation = useCallback(
    (operation: (typeof api.queries.operations.listOperations._returnType)['page'][number]) => {
      formRef.current?.setEditingOperation(operation);
      // Reflect editing state immediately in the right pane
      setEditingOperationId(operation._id as Id<'operations'>);
    },
    [setEditingOperationId],
  );

  const handleEditingChange = useCallback((editingId: Id<'operations'> | null) => {
    setEditingOperationId(editingId);
  }, []);

  return {
    formRef,
    editingOperationId,
    handleEditOperation,
    handleEditingChange,
  };
}

export default function OperationsPage() {
  const { selectedTab, handleTabChange } = useTabParams({ queryName: 'tab', defaultValue: 'operations' });
  const { formRef, editingOperationId, handleEditOperation, handleEditingChange } = useRegisterOperationLogic();
  const { t } = useTranslate();

  return (
    <div className={`flex h-[calc(100vh-65px)] overflow-hidden`}>
      <aside className="w-1/4 h-full">
        <RegisterOperation ref={formRef} onEditingChange={handleEditingChange} />
      </aside>

      <main className={`w-3/4 h-full pl-4 py-4 flex flex-col gap-4`}>
        <h1 className="text-2xl font-bold">{t('page.operations.title')}</h1>
        <Tabs defaultValue={selectedTab} className="h-full" onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="operations">{t('page.operations.tabs.operations')}</TabsTrigger>
            <TabsTrigger value="symbols">{t('page.operations.tabs.symbols')}</TabsTrigger>
          </TabsList>
          <div className="mt-4 h-full">
            <TabsContent value="operations" className="h-full">
              <OperationTab onEditOperation={handleEditOperation} editingOperationId={editingOperationId} />
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
