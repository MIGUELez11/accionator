'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface UseTabParamsProps {
  queryName: string;
  defaultValue: string;
}

export function useTabParams({ queryName, defaultValue }: UseTabParamsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const selectedTab = searchParams.get(queryName) ?? defaultValue;

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(queryName, value);
    const qs = params.toString();

    router.replace(`${pathname}?${qs}`, { scroll: false });
  };

  return { selectedTab, handleTabChange };
}
