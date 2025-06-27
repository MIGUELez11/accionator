import { ResponsiveLine } from '@nivo/line';

interface UsageChartProps {
  data: { month: string; cost: number }[];
}

export function UsageChart({ data }: UsageChartProps) {
  const chartData = [
    {
      id: 'usage',
      data: data.map(({ month, cost }) => ({
        x: month,
        y: cost,
      })),
    },
  ];

  const maxValue = data.length > 0 ? Math.max(...data.map(({ cost }) => cost)) : 0;
  return (
    <div style={{ height: 150 }}>
      <ResponsiveLine
        tooltip={({ point }) => (
          <div
            style={{
              background: 'white',
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              maxWidth: '200px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <strong>{point.data.x}</strong>: ${point.data.y.toLocaleString()}
          </div>
        )}
        useMesh={true}
        data={chartData}
        margin={{ top: 8, right: 20, bottom: 30, left: 20 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'symlog',
          min: 0,
          max: maxValue < 1 ? 1 : maxValue,
          reverse: false,
        }}
        curve="monotoneX"
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 45,
          tickValues: data.map((d) => d.month),
          format: (value) => value.slice(0, 3),
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
