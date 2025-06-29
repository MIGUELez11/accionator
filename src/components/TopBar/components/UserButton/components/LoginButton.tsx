import { Button } from '@/components/ui/button';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { Authenticated, Unauthenticated } from 'convex/react';
import { UserButton } from '../UserButton';

export function LoginButton() {
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
        <UserButton />
      </Authenticated>
    </div>
  );
}
