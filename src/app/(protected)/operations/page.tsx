import { OperationsList } from './components/OperationsList';
import { RegisterOperation } from './components/RegisterOperation';

export default function OperationsPage() {
  return (
    <div className={`flex h-[calc(100vh-65px)] overflow-hidden`}>
      <aside className="w-1/4 h-full">
        <RegisterOperation />
      </aside>

      <main className={`w-3/4 h-full pl-4 py-4 flex flex-col gap-4`}>
        <h1 className="text-2xl font-bold">Operaciones</h1>
        <OperationsList />
      </main>
    </div>
  );
}
