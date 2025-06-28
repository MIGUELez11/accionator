'use client';

import { ActionRecommendations } from '@/server/types';
import { ResponsiveBar } from '@nivo/bar';
import { useMemo } from 'react';
import { InfoCard } from './InfoCard';

export function Recommendations({ recommendations }: { recommendations: ActionRecommendations }) {
  const data = useMemo(
    () =>
      recommendations.map((rec) => ({
        date: new Date(rec.period!).toLocaleDateString(undefined, {
          month: 'short',
          year: 'numeric',
        }),
        'Strong Buy': rec.strongBuy!,
        Buy: rec.buy!,
        Hold: rec.hold!,
        Sell: rec.sell!,
        'Strong Sell': rec.strongSell!,
      })),
    [recommendations],
  );

  return (
    <InfoCard title="Recomendaciones de analistas">
      <div className="h-[470px] w-full px-4">
        <ResponsiveBar
          data={data}
          keys={['Strong Buy', 'Buy', 'Hold', 'Sell', 'Strong Sell']}
          indexBy="date"
          margin={{ top: 30, right: 140, bottom: 50, left: 50 }}
          padding={0.2}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={['#1b5e20', '#4caf50', '#ff9800', '#f44336', '#b71c1c']}
          borderColor={{ from: 'color', modifiers: [['darker', 0.6]] }}
          borderWidth={1}
          borderRadius={2}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Fecha',
            legendPosition: 'middle',
            legendOffset: 35,
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '# Analistas',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0,
          }}
          enableLabel={false}
          animate={true}
          theme={{
            axis: {
              ticks: {
                text: {
                  fontSize: 12,
                  fill: '#666',
                },
              },
              legend: {
                text: {
                  fontSize: 13,
                  fill: '#666',
                  fontWeight: 600,
                },
              },
            },
            legends: {
              text: {
                fontSize: 12,
                fill: '#666',
              },
            },
            tooltip: {
              container: {
                background: '#ffffff',
                fontSize: 12,
                borderRadius: 4,
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
              },
            },
          }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 4,
              itemWidth: 100,
              itemHeight: 18,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 16,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          role="application"
          ariaLabel="Tendencias de recomendaciones de analistas"
        />
      </div>
    </InfoCard>
  );
}
