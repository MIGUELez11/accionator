import heroImage from '@/assets/homeHeroImage.png';
import { Button } from '@/components/ui/button';
import { SignUpButton } from '@clerk/nextjs';
import { ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';

const heroImageWidth = 600;
const heroImageHeight = (heroImage.height / heroImage.width) * heroImageWidth;

export function Hero() {
  return (
    <div className="bg-white py-20 px-6 max-w-7xl mx-auto">
      <div className="flex gap-12">
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold">Análisis inteligente del mercado de valores</h1>
          <p className="text-lg mt-6">
            Toma decisiones informadas con nuestro análisis respaldado por IA. Descubre oportunidades de inversión
            únicas con nuestro experto sistema de análisis.
          </p>
          <SignUpButton>
            <Button className="mt-8 cursor-pointer">
              Comenzar ahora
              <ArrowRightIcon className="w-4 h-4" />
            </Button>
          </SignUpButton>
        </div>
        <Image
          src={heroImage.src}
          alt="Stock market chart preview"
          className={`object-cover rounded-lg flex-grow`}
          width={heroImageWidth}
          height={heroImageHeight}
        />
      </div>
    </div>
  );
}
