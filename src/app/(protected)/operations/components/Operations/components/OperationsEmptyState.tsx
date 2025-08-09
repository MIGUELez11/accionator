import { LineChartIcon } from 'lucide-react';

export function OperationsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
        <LineChartIcon className="w-12 h-12 text-gray-400 stroke-[1.5]" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">No hay operaciones registradas</h3>
        <p className="mt-1 text-sm text-gray-500">
          Comienza registrando tu primera operación usando el formulario de la izquierda
        </p>
      </div>
    </div>
  );
}
