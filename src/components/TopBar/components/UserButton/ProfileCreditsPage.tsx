import { ActivityIcon, AlignHorizontalDistributeCenterIcon } from 'lucide-react';
import { ProfilePageHeader } from './ProfilePageHeader';
import { ChartCard } from './components/ChartCard';
import { DataCard } from './components/DataCard';
import { RemainingCredits } from './components/RemainingCredits';
import { SectorChart } from './components/SectorChart';
import { UsageChart } from './components/UsageChart';

export function ProfileCreditsPage() {
  // const { data: tokens } = useQuery(convexQuery(api.queries.tokens.getTokens, {}));

  return (
    <div className="flex flex-col gap-8">
      <ProfilePageHeader title="Credits" />
      <RemainingCredits credits={100} remainingCredits={10} renewDate={new Date()} subscriptionType="monthly" />

      <div className="grid grid-cols-2 gap-4 w-full">
        <DataCard title="Acciones analizadas" value={100} icon={AlignHorizontalDistributeCenterIcon} />
        <DataCard title="Créditos restantes" value={10} icon={ActivityIcon} isPercentage />
        <ChartCard title="Sectores más analizados">
          <SectorChart
            data={[
              { name: 'Finanzas', queries: 35 },
              { name: 'Tecnologia', queries: 30 },
              { name: 'Consumo', queries: 25 },
              { name: 'Energia', queries: 10 },
            ]}
          />
        </ChartCard>
        <ChartCard title="Tendencias de uso">
          <UsageChart
            data={[
              { month: 'Enero', requests: 100 },
              { month: 'Febrero', requests: 200 },
              { month: 'Marzo', requests: 150 },
              { month: 'Abril', requests: 250 },
              { month: 'Mayo', requests: 300 },
              { month: 'Junio', requests: 200 },
            ]}
          />
        </ChartCard>
      </div>
    </div>
  );
}
