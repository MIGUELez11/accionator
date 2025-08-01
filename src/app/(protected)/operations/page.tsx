import { RegisterOperation } from './components/RegisterOperation';

export default function OperationsPage() {
  return (
    <div className="flex">
      <aside className="w-1/4">
        <RegisterOperation />
      </aside>

      <main className="w-3/4">
        <h1>Operaciones</h1>
      </main>
    </div>
  );
}
