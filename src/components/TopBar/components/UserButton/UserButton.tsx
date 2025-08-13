import { UserButton as ClerkUserButton } from '@clerk/nextjs';
import { useTranslate } from '@tolgee/react';
import { CoinsIcon } from 'lucide-react';
import { ProfileCreditsPage } from './ProfileCreditsPage';

export function UserButton() {
  const { t } = useTranslate();

  return (
    <ClerkUserButton>
      {/* <ClerkUserButton.MenuItems>
        <ClerkUserButton.Action label="Profile" labelIcon={<UserIcon />} onClick={() => console.log('profile')} />
      </ClerkUserButton.MenuItems> */}
      <ClerkUserButton.UserProfilePage
        label={t('page.profile.credits.title')}
        labelIcon={<CoinsIcon className="w-4 h-4 text-current" />}
        url="credits"
      >
        <ProfileCreditsPage />
      </ClerkUserButton.UserProfilePage>
    </ClerkUserButton>
  );
}
