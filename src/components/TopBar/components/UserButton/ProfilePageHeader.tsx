interface ProfilePageHeaderProps {
  title: string;
}

export function ProfilePageHeader({ title }: ProfilePageHeaderProps) {
  return (
    <div className="flex flex-col gap-1 border-b-[0.6px] border-b-[rgb(0,0,0,0.07)]">
      <h1 className="cl-headerTitle font-bold text-[rgb(33,33,38)] mb-4">{title}</h1>
    </div>
  );
}
