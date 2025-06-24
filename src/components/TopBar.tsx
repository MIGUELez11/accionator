import { UserButton as ClerkUserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import { NavBar } from './NavBar';
import { Separator } from './ui/separator';

function UserButton() {
  return (
    <div className="flex justify-end items-center p-4 gap-4 h-16">
      <SignedOut>
        <SignInButton />
        <SignUpButton>
          <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Sign Up
          </button>
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
            <p className="text-xl font-semibold">ACCIONATOR</p>
            <NavBar />
          </div>
        </div>
        <UserButton />
      </div>
      <Separator />
    </header>
  );
}
