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
    <Button asChild variant="outline" className="w-full">
      <Link href={`/analysis/${symbol}`} target="_blank" rel="noopener noreferrer" className="px-4">
        {t('page.plan.stock.analysisButton')}
        <ExternalLinkIcon className="w-4 h-4" aria-hidden="true" />
      </Link>
    </Button>
  );
}
