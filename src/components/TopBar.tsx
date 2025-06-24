import { UserButton as ClerkUserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import { TrendingUpIcon } from 'lucide-react';
import Link from 'next/link';
import { NavBar } from './NavBar';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

function UserButton() {
  return (
    <div className="flex justify-end items-center p-4 gap-4 h-16">
      <SignedOut>
        <SignInButton>
          <Button variant="ghost" className="cursor-pointer">
            Sign In
          </Button>
        </SignInButton>
        <SignUpButton>
          <Button className="cursor-pointer">Sign Up</Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <ClerkUserButton />
      </SignedIn>
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
            <SignedIn>
              <NavBar />
            </SignedIn>
          </div>
        </div>
        <UserButton />
      </div>
      <Separator />
    </header>
  );
}
