'use client';

import { Id } from '@convex/_generated/dataModel';
import { useTranslate } from '@tolgee/react';
import { Component, ErrorInfo, ReactNode } from 'react';
import { OperationActions } from './Operation';

interface Props {
  children?: ReactNode;
  symbol: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  _id: Id<'operations'>;
  onEdit: () => void;
}

interface State {
  hasError: boolean;
}

export class OperationError extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Operation error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorRender {...this.props} />;
    }

    return this.props.children;
  }
}

function ErrorRender({ symbol, type, quantity, price, _id, onEdit }: Props) {
  const { t } = useTranslate();

  return (
    <div className="relative p-4 border border-red-200 rounded-md bg-red-50 text-red-800">
      <div className="flex flex-col gap-2 items-center justify-center">
        <h2 className="text-lg font-semibold">{t('view.operations.error.title')}</h2>
        <p className="text-sm">{t('view.operations.error.description')}</p>
        <p className="text-sm">
          &quot;{symbol}&quot; {type === 'buy' ? t('view.operations.error.buy') : t('view.operations.error.sell')}{' '}
          {t('view.operations.error.details', { quantity, price: price.toFixed(2) })}
        </p>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <OperationActions operation={{ _id, symbol, quantity }} onEdit={onEdit} />
      </div>
    </div>
  );
}
