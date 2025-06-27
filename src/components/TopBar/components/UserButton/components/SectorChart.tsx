import { ResponsivePie } from '@nivo/pie';

interface SectorChartProps {
  data: { name: string; queries: number }[];
}

export function SectorChart({ data }: SectorChartProps) {
  const total = data.reduce((acc, curr) => acc + curr.queries, 0);

  if (total === 0) {
    return <div style={{ height: 150 }}>No data available</div>;
  }

  const chartData = data.map(({ name, queries }) => ({
    id: name,
    label: name,
    value: total ? (queries / total) * 100 : 0,
  }));

  return (
    <div style={{ height: 150 }}>
      <ResponsivePie
        data={chartData}
        margin={{ top: 8, right: 0, bottom: 8, left: 0 }}
        innerRadius={0}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        enableArcLabels={true}
        arcLabelsSkipAngle={25}
        arcLabelsTextColor="#000"
        arcLabel={(d) => (d.value > 15 ? `${d.id}` : '')}
        enableArcLinkLabels={false}
        tooltip={({ datum }) => (
          <div
            style={{
              background: 'white',
              padding: '9px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          >
            <strong>{datum.label}</strong>: {datum.value.toFixed(1)}%
          </div>
        )}
      />
    </div>
  );
}
