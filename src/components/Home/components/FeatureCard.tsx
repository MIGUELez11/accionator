interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-left bg-white rounded-lg p-6 shadow-md">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 w-full">{title}</h3>
      <p className="text-gray-600 w-full">{description}</p>
    </div>
  );
}
