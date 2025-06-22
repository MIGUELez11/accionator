import type { CompanyNews } from '@/server/stocks/getCompanyNews';

interface NewsCardProps {
  new: CompanyNews[number];
}

function unixToDate(unix?: number) {
  if (!unix) {
    return '';
  }

  return new Date(unix * 1000).toLocaleDateString();
}

export default function NewsCard({ new: newData }: NewsCardProps) {
  return (
    <a href={newData.url} target="_blank" rel="noopener noreferrer" className="flex gap-4">
      {newData.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={newData.image}
          alt={newData.headline + ' image'}
          className="h-24 w-24 min-h-24 min-w-24 rounded-md object-cover"
        />
      ) : (
        <div className="h-24 w-24 min-w-24 min-h-24 rounded-md bg-gray-200" />
      )}

      <div className="flex flex-col gap-2 h-24">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold line-clamp-1">{newData.headline}</h3>
          <p className="text-gray-500">
            {newData.source} · {unixToDate(newData.datetime)}
          </p>
        </div>
        <p className="text-sm text-wrap line-clamp-2">{newData.summary}</p>
      </div>
    </a>
  );
}
