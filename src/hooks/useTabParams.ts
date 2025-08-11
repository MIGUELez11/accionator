import { useRouter, useSearchParams } from 'next/navigation';

interface UseTabParamsProps {
  queryName: string;
  defaultValue: string;
}

export function useTabParams({ queryName, defaultValue }: UseTabParamsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTab = searchParams.get(queryName) || defaultValue;

  const handleTabChange = (value: string) => {
    router.replace(`?${queryName}=${value}`, { scroll: false });
  };

  return { selectedTab, handleTabChange };
}
