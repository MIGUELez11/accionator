'use client';

import { Button } from '@/components/ui/button';
import { useTranslate } from '@tolgee/react';
import { ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';

interface AnalysisButtonProps {
  symbol: string;
}

export function AnalysisButton({ symbol }: AnalysisButtonProps) {
  const { t } = useTranslate();

  return (
    <Link href={`/analysis/${symbol}`} target="_blank" rel="noopener noreferrer" className="px-4">
      <Button variant="outline" className="w-full cursor-pointer">
        {t('page.plan.stock.analysisButton')}
        <ExternalLinkIcon className="w-4 h-4" />
      </Button>
    </Link>
  );
}
