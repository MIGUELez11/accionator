import { RedirectToHome } from '@/components/RedirectToHome';
import { TopBar } from '@/components/TopBar';
import { SignedIn, SignedOut } from '@clerk/nextjs';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>
        <TopBar />
        <div className="max-w-7xl w-full mx-auto">{children}</div>
      </SignedIn>
      <SignedOut>
        <RedirectToHome />
      </SignedOut>
    </>
  );
}
