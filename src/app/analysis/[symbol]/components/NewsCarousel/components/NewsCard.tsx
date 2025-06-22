import type { CompanyNews } from '@/server/stocks/getCompanyNews';
import { useState } from 'react';

interface NewsCardProps {
  newItem: CompanyNews[number];
}

function unixToDate(unix?: number) {
  if (!unix) {
    return '';
  }

  return new Date(unix * 1000).toLocaleDateString();
}

function WrapWithLink({ children, href }: { children: React.ReactNode; href?: string }) {
  const isSecure = href && href.startsWith('https://');

  if (!isSecure) {
    return children;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function ImageRenderer({ src, title }: { src?: string; title?: string }) {
  const [imageSrc, setImageSrc] = useState<string | null>(src ?? null);

  if (!imageSrc) {
    return <div className="h-24 w-24 min-h-24 min-w-24 rounded-md bg-gray-200" />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageSrc}
      alt={`News preview for: ${title ?? 'unknown'}`}
      className="h-24 w-24 min-h-24 min-w-24 rounded-md object-cover"
      onError={() => setImageSrc(null)}
    />
  );
}

export default function NewsCard({ newItem }: NewsCardProps) {
  return (
    <WrapWithLink href={newItem.url}>
      <div className="flex gap-4">
        <ImageRenderer src={newItem.image} title={newItem.headline} />

        <div className="flex flex-col gap-1 h-24">
          <h3 className="font-bold line-clamp-1">{newItem.headline}</h3>
          <p className="text-gray-500">
            {newItem.source} · {unixToDate(newItem.datetime)}
          </p>
          <p className="text-sm text-wrap line-clamp-2">{newItem.summary}</p>
        </div>
      </div>
    </WrapWithLink>
  );
}
