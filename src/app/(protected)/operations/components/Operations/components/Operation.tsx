import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { handleShiftClick } from '@/lib/handleShiftClick';
import { stockProfileQuery } from '@/queries/stockProfileQuery';
import { useConvexMutation } from '@convex-dev/react-query';
import { api } from '@convex/_generated/api';
import { Id } from '@convex/_generated/dataModel';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import Image from 'next/image';

function useColor(type: 'buy' | 'sell') {
  return type === 'buy' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800';
}

function TypeTag({ type }: { type: 'buy' | 'sell' }) {
  const color = useColor(type);

  return (
    <Badge variant="outline" className={color}>
      {type === 'buy' ? 'Compra' : 'Venta'}
    </Badge>
  );
}

function StockInfo({ symbol }: { symbol: string }) {
  const { data: stockProfile } = useSuspenseQuery(stockProfileQuery(symbol));

  const logo = stockProfile.logo;
  const name = stockProfile.name ?? symbol;
  const ticker = stockProfile.ticker ?? symbol;
  return (
    <header className="flex flex-row gap-2 h-12">
      {logo ? (
        <Image src={logo} alt={name} width={48} height={48} className="rounded-md" />
      ) : (
        <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">{ticker}</div>
      )}
      <div className="flex flex-col justify-between h-full">
        <h2 className="font-bold line-clamp-1" title={name}>
          {name}
        </h2>
        <p className="text-sm text-gray-500">{ticker}</p>
      </div>
    </header>
  );
}

function DataPoint({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col h-full justify-between">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-sm font-bold">{value}</p>
    </div>
  );
}

function Tags({ tags }: { tags: { id: Id<'operationTags'>; tag: string }[] }) {
  return (
    <div className="flex flex-row gap-2 items-center">
      {tags.map((tag) => (
        <Badge key={tag.id} variant="outline" className="bg-gray-200 text-gray-800">
          {tag.tag}
        </Badge>
      ))}
    </div>
  );
}

export function OperationActions({
  operation,
  onEdit,
}: {
  operation: {
    _id: Id<'operations'>;
    symbol: string;
    quantity: number;
  };
  onEdit: () => void;
}) {
  const { mutate: deleteOperation, isPending: isDeleting } = useMutation({
    mutationFn: useConvexMutation(api.mutations.operations.remove),
  });

  return (
    <div className="flex flex-row gap-1 items-center">
      {/* Edit operation */}
      <Button
        variant="ghost"
        size="icon"
        title="Editar operación"
        aria-label="Editar operación"
        className="cursor-pointer"
        onClick={onEdit}
      >
        <PencilIcon />
      </Button>

      {/* Delete operation */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer"
            title="Eliminar operación"
            aria-label="Eliminar operación"
            disabled={isDeleting}
            onClick={handleShiftClick({ onShiftClick: () => deleteOperation({ id: operation._id }) })}
          >
            <Trash2Icon />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Eliminar {operation.quantity} acciones de {operation.symbol}
            </AlertDialogTitle>
            <AlertDialogDescription>¿Estás seguro de querer eliminar esta operación?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer" type="button">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer bg-red-500 text-white hover:bg-red-600"
              type="submit"
              onClick={() => deleteOperation({ id: operation._id })}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

interface OperationProps {
  operation: (typeof api.queries.operations.listOperations._returnType)['page'][number];
  onEdit: () => void;
  isEditing?: boolean;
}

export function Operation({ operation, onEdit, isEditing = false }: OperationProps) {
  const date = new Date(operation.date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <section
      className={`flex flex-row gap-4 border rounded-md p-4 shadow-md justify-between items-center h-24 transition-all duration-200 ${
        isEditing ? 'border-blue-300 bg-blue-50 shadow-blue-100' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex flex-row gap-4 items-center h-12">
        <StockInfo symbol={operation.symbol} />
        <div className="flex flex-row gap-4 items-center h-full pt-0.5">
          <DataPoint label="Cantidad" value={operation.quantity.toLocaleString()} />
          <DataPoint label="Precio" value={`$${operation.price.toLocaleString()}`} />
          <DataPoint label="Total" value={`$${(operation.price * operation.quantity).toLocaleString()}`} />
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <div className="flex flex-col gap-2 items-end justify-end">
          <div className="flex flex-row gap-2 items-center">
            <Tags tags={operation.tags} />
            <TypeTag type={operation.type} />
            {isEditing && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">Editando</span>
            )}
          </div>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
        <OperationActions operation={operation} onEdit={onEdit} />
      </div>
    </section>
  );
}
