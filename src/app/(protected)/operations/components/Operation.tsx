import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { stockProfileQuery } from '@/queries/stockProfileQuery';
import { useConvexMutation } from '@convex-dev/react-query';
import { api } from '@convex/_generated/api';
import { Id } from '@convex/_generated/dataModel';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { Trash2Icon } from 'lucide-react';
import Image from 'next/image';

function useColor(type: 'buy' | 'sell') {
  return type === 'buy' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800';
}

function TypeTag({ type }: { type: 'buy' | 'sell' }) {
  const color = useColor(type);

  return <Tag tag={type === 'buy' ? 'Compra' : 'Venta'} color={color} />;
}

function StockInfo({ symbol }: { symbol: string }) {
  const { data: stockProfile } = useSuspenseQuery(stockProfileQuery(symbol));

  const logo = stockProfile.logo;
  const name = stockProfile.name!;
  const ticker = stockProfile.ticker!;

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

function Tag({ tag, color }: { tag: string; color: string }) {
  return (
    <div className={cn('text-xs font-medium rounded-md px-2 py-1 max-h-6 flex items-center justify-center', color)}>
      <span className="line-clamp-1">{tag}</span>
    </div>
  );
}

function Tags({ tags }: { tags: { id: Id<'operationTags'>; tag: string }[] }) {
  return (
    <div className="flex flex-row gap-2 items-center">
      {tags.map((tag) => (
        <Tag key={tag.id} tag={tag.tag} color="bg-gray-200 text-gray-800" />
      ))}
    </div>
  );
}

export function OperationActions({
  operation,
}: {
  operation: {
    _id: Id<'operations'>;
  };
}) {
  const { mutate: deleteOperation } = useMutation({
    mutationFn: useConvexMutation(api.mutations.operations.remove),
  });

  return (
    <div className="flex flex-row gap-2 items-center">
      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer"
        onClick={() => deleteOperation({ id: operation._id })}
      >
        <Trash2Icon />
      </Button>
    </div>
  );
}

interface OperationProps {
  operation: (typeof api.queries.operations.listOperations._returnType)['page'][number];
}

export function Operation({ operation }: OperationProps) {
  const date = new Date(operation.date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <section className="flex flex-row gap-4 border border-gray-200 rounded-md p-4 shadow-md justify-between items-center h-24">
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
          </div>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
        <OperationActions operation={operation} />
      </div>
    </section>
  );
}
