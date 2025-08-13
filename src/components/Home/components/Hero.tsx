import heroImage from '@/assets/homeHeroImage.png';
import { Button } from '@/components/ui/button';
import { getTranslate } from '@/i18n/tolgee/server';
import { SignUpButton } from '@clerk/nextjs';
import { ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';

const heroImageWidth = 600;
const heroImageHeight = (heroImage.height / heroImage.width) * heroImageWidth;

export async function Hero() {
  const t = await getTranslate();
  return (
    <div className="bg-white py-20 px-6 max-w-7xl mx-auto">
      <div className="flex gap-12">
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold">{t('page.home.hero.title')}</h1>
          <p className="text-lg mt-6">{t('page.home.hero.description')}</p>
          <SignUpButton>
            <Button className="mt-8 cursor-pointer">
              {t('page.home.hero.cta')}
              <ArrowRightIcon className="w-4 h-4" />
            </Button>
          </SignUpButton>
        </div>
        <Image
          src={heroImage.src}
          alt={t('page.home.hero.imageAlt')}
          className={`object-cover rounded-lg flex-grow`}
          width={heroImageWidth}
          height={heroImageHeight}
        />
      </div>
    </div>
  );
}
