import { Button } from '@/components/ui/button';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { useTranslate } from '@tolgee/react';
import { Authenticated, Unauthenticated } from 'convex/react';
import { UserButton } from '../UserButton';

export function LoginButton() {
  const { t } = useTranslate();
  return (
    <div className="flex justify-end items-center p-4 gap-4 h-16">
      <Unauthenticated>
        <SignInButton>
          <Button variant="ghost" className="cursor-pointer">
            {t('component.loginButton.signIn')}
          </Button>
        </SignInButton>
        <SignUpButton>
          <Button className="cursor-pointer">{t('component.loginButton.signUp')}</Button>
        </SignUpButton>
      </Unauthenticated>
      <Authenticated>
        <UserButton />
      </Authenticated>
    </div>
  );
}
