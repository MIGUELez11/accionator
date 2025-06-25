'use client';

import { UserButton as ClerkUserButton, SignInButton, SignUpButton } from '@clerk/nextjs';
import { Authenticated, Unauthenticated } from 'convex/react';
import { TrendingUpIcon } from 'lucide-react';
import Link from 'next/link';
import { NavBar } from './NavBar';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

function UserButton() {
  return (
    <div className="flex justify-end items-center p-4 gap-4 h-16">
      <Unauthenticated>
        <SignInButton>
          <Button variant="ghost" className="cursor-pointer">
            Sign In
          </Button>
        </SignInButton>
        <SignUpButton>
          <Button className="cursor-pointer">Sign Up</Button>
        </SignUpButton>
      </Unauthenticated>
      <Authenticated>
        <ClerkUserButton />
      </Authenticated>
    </div>
  );
}

export function TopBar() {
  return (
    <header>
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center gap-6 h-16">
          <div className="flex flex-row items-center gap-6 max-w-7xl w-full mx-auto px-4">
            <Link href="/" className="text-xl font-semibold flex gap-2 items-center">
              <TrendingUpIcon />
              ACCIONATOR
            </Link>
            <Authenticated>
              <NavBar />
            </Authenticated>
          </div>
        </div>
        <UserButton />
      </div>
      <Separator />
    </header>
  );
}
