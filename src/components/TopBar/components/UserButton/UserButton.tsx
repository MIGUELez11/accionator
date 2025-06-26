import { UserButton as ClerkUserButton } from '@clerk/nextjs';
import { CoinsIcon } from 'lucide-react';
import { ProfileCreditsPage } from './ProfileCreditsPage';

export function UserButton() {
  return (
    <ClerkUserButton>
      {/* <ClerkUserButton.MenuItems>
        <ClerkUserButton.Action label="Profile" labelIcon={<UserIcon />} onClick={() => console.log('profile')} />
      </ClerkUserButton.MenuItems> */}
      <ClerkUserButton.UserProfilePage
        label="Credits"
        labelIcon={<CoinsIcon className="w-4 h-4 text-current" />}
        url="credits"
      >
        <ProfileCreditsPage />
      </ClerkUserButton.UserProfilePage>
    </ClerkUserButton>
  );
}
