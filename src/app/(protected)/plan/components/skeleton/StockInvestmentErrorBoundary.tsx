import posthog from 'posthog-js';
import { Component } from 'react';

export class StockInvestmentErrorBoundary extends Component<{ children: React.ReactNode; symbol: string }> {
  state = { hasError: false };

  constructor(props: { children: React.ReactNode; symbol: string }) {
    super(props);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    posthog.captureException(error, {
      symbol: this.props.symbol,
      error: error.message,
      errorInfo: errorInfo.componentStack,
      component: 'StockInvestmentErrorBoundary',
    });

    console.error('Error loading stock investment plan', this.props.symbol, error, errorInfo);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <article className="flex flex-col gap-4 h-full justify-between py-4 border shadow-sm rounded-lg">
        <div className="flex flex-col gap-4 max-h-[452px] overflow-y-auto px-4">
          <header className="flex gap-2 justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-muted" />
              <div className="flex flex-col">
                <h3 className="text-lg font-bold line-clamp-1">{this.props.symbol} Error</h3>
                <p className="text-sm text-muted-foreground">No se pudo cargar la información</p>
              </div>
            </div>
          </header>

          <p className="text-sm text-muted-foreground">
            Ocurrió un error al cargar la información de esta acción. Por favor, intente nuevamente más tarde.
          </p>
        </div>
      </article>
    );
  }
}
