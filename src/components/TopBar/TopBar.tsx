'use client';

import { Authenticated } from 'convex/react';
import { TrendingUpIcon } from 'lucide-react';
import Link from 'next/link';
import { NavBar } from '../NavBar';
import { Separator } from '../ui/separator';
import { LoginButton } from './components/UserButton/components/LoginButton';
import { StockSearch } from './components/UserButton/components/StockSearch';

export function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center gap-6 h-16">
          <div className="flex flex-row items-center gap-6 max-w-7xl w-full mx-auto px-4">
            <Link href="/" className="text-xl font-semibold flex gap-2 items-center">
              <TrendingUpIcon />
              STOCKATOR
            </Link>
            <Authenticated>
              <NavBar />
            </Authenticated>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <Authenticated>
            <StockSearch />
          </Authenticated>
          <LoginButton />
        </div>
      </div>
      <Separator />
    </header>
  );
}
