import { Progress } from '@/components/ui/progress';
import { CalendarIcon } from 'lucide-react';

interface RemainingCreditsProps {
  subscriptionType: 'monthly' | 'lifetime';
  credits: number;
  usedCredits: number;
  renewDate: Date;
}

export function RemainingCredits({ subscriptionType, credits, usedCredits, renewDate }: RemainingCreditsProps) {
  const remainingCredits = credits - usedCredits;
  return (
    <div className="border rounded-sm p-6 flex flex-col gap-4">
      <div className="flex flex-row gap-2 justify-between items-center">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">
            {subscriptionType === 'monthly' ? 'Este mes te' : 'Te'} quedan ${remainingCredits.toFixed(4)}
          </h2>
          {renewDate && (
            <div className="flex flex-row gap-2 items-center text-gray-500">
              <CalendarIcon className="w-4 h-4" />
              <p>
                Próxima renovación:{' '}
                {renewDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}
              </p>
            </div>
          )}
        </div>
        <div className="rounded-full bg-gray-200 flex items-center justify-center w-12 h-12">
          <CalendarIcon className="text-black w-6 h-6" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 justify-between">
          <p>Uso{subscriptionType === 'monthly' ? ' este mes' : ''}</p>
          <p>
            ${usedCredits.toFixed(4)} de ${credits.toFixed(4)}
          </p>
        </div>
        <Progress value={(usedCredits / credits) * 100} className="w-full" />
      </div>
    </div>
  );
}
