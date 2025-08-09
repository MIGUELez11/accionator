'use client';

import { Id } from '@convex/_generated/dataModel';
import { Component, ErrorInfo, ReactNode } from 'react';
import { OperationActions } from './Operation';

interface Props {
  children?: ReactNode;
  symbol: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  _id: Id<'operations'>;
}

interface State {
  hasError: boolean;
}

export class OperationError extends Component<Props, State> {
  symbol: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;

  constructor(props: Props) {
    super(props);
    this.symbol = props.symbol;
    this.type = props.type;
    this.quantity = props.quantity;
    this.price = props.price;
  }

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
      return (
        <div className="relative p-4 border border-red-200 rounded-md bg-red-50 text-red-800">
          <div className="flex flex-col gap-2 items-center justify-center">
            <h2 className="text-lg font-semibold">Error al cargar la operación</h2>
            <p className="text-sm">Por favor, intenta recargar la página o editar la operación</p>
            <p className="text-sm">
              &quot;{this.symbol}&quot; {this.type === 'buy' ? 'Compra' : 'Venta'} de {this.quantity} acciones a $
              {this.price.toFixed(2)}
            </p>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <OperationActions operation={{ _id: this.props._id }} />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
