import { InfoCard } from '@/components/InfoCard';
import { Card, CardContent } from '@/components/ui/card';
import { BrainIcon, ClockIcon, TrendingUpIcon } from 'lucide-react';

export default function PlanLoader() {
  return (
    <div className="p-4 flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BrainIcon className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Plan de inversión</h1>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <ClockIcon className="h-4 w-4" />
          <span>Generando plan personalizado...</span>
        </div>
      </div>

      {/* Loading Section */}
      <InfoCard title="Generando plan personalizado...">
        <div className="flex items-center justify-center py-8">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <BrainIcon className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm font-medium">Analizando mercado y calculando estrategias</p>
              <p className="text-xs text-muted-foreground">Esto puede tomar entre 10 segundos y 5 minutos</p>
            </div>
          </div>
        </div>
      </InfoCard>

      {/* Info Message */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent>
          <div className="flex items-start gap-3">
            <TrendingUpIcon className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-blue-900">Generando plan de inversión personalizado</p>
              <p className="text-sm text-blue-700">
                El tiempo de generación puede variar entre 10 segundos (cache) y 5 minutos dependiendo de la complejidad
                del análisis y la carga del sistema.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
