import { BrainIcon, ChartNoAxesColumnIcon, ClockIcon } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

const features = [
  {
    title: 'Screener Avanzado',
    description:
      'Filtra y analiza miles de acciones en tiempo real con criterios personalizables y análisis técnico avanzado.',
    icon: <ChartNoAxesColumnIcon className="w-8 h-8 text-black" />,
  },
  {
    title: 'Análisis por IA',
    description:
      'Obtén recomendaciones personalizadas basadas en modelos de IA entrenados con millones de datos históricos.',
    icon: <BrainIcon className="w-8 h-8 text-black" />,
  },
  {
    title: 'Datos en Tiempo Real',
    description:
      'Accede a datos del mercado en tiempo real, noticias relevantes y análisis fundamentales actualizados.',
    icon: <ClockIcon className="w-8 h-8 text-black" />,
  },
];

export function Features() {
  return (
    <div className="bg-gray-50 py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-center">Características principales</h2>
      <div className="flex flex-row justify-between gap-8 w-full">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </div>
  );
}
