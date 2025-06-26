import { ResponsiveLine } from '@nivo/line';

interface UsageChartProps {
  data: { month: string; requests: number }[];
}

export function UsageChart({ data }: UsageChartProps) {
  const chartData = [
    {
      id: 'usage',
      data: data.map(({ month, requests }) => ({
        x: month,
        y: requests,
      })),
    },
  ];

  return (
    <div style={{ height: 150 }}>
      <ResponsiveLine
        tooltip={({ point }) => (
          <div
            style={{
              background: 'white',
              padding: '9px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <strong>{point.data.x}</strong>: {point.data.y.toLocaleString()}
          </div>
        )}
        useMesh={true}
        data={chartData}
        margin={{ top: 8, right: 20, bottom: 25, left: 20 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
        }}
        curve="monotoneX"
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          tickValues: data.map((d) => d.month),
        }}
        axisLeft={null}
        enablePoints={true}
        pointSize={8}
        pointColor="#FF6B6B"
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        enableGridX={true}
        enableGridY={false}
        gridXValues={data.map((d) => d.month)}
        colors={['#FF6B6B']}
        lineWidth={3}
        enableArea={true}
        areaOpacity={0.15}
      />
    </div>
  );
}
