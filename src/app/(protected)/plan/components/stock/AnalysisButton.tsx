'use client';

import { Button } from '@/components/ui/button';
import { ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';

interface AnalysisButtonProps {
  symbol: string;
}

export function AnalysisButton({ symbol }: AnalysisButtonProps) {
  return (
    <Link href={`/analysis/${symbol}`} target="_blank" rel="noopener noreferrer" className="px-4">
      <Button variant="outline" className="w-full cursor-pointer">
        Ver análisis
        <ExternalLinkIcon className="w-4 h-4" />
      </Button>
    </Link>
  );
}
