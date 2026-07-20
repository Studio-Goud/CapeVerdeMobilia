import * as React from 'react';
import { cn } from './cn';

export interface ListingCardProps {
  slug: string;
  title: string;
  priceLabel: string;
  island: string | null;
  thumbnailUrl: string | null;
  isFeatured?: boolean;
  documentStatusLabel?: string;
  href?: string;
}

/** Presentational listing card. Sponsored placements are always labelled. */
export function ListingCard(props: ListingCardProps): React.JSX.Element {
  const href = props.href ?? `/imoveis/${props.slug}`;
  return (
    <a
      href={href}
      className="group block overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500"
    >
      <div className="relative aspect-[4/3] bg-slate-100">
        {props.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={props.thumbnailUrl}
            alt={props.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">Kavíla</div>
        )}
        {props.isFeatured && (
          <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-xs font-semibold text-white">
            Sponsored
          </span>
        )}
      </div>
      <div className="space-y-1 p-3">
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">{props.title}</h3>
        <p className="text-sm font-bold text-slate-900">{props.priceLabel}</p>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{props.island ?? '—'}</span>
          {props.documentStatusLabel && (
            <span className={cn('rounded bg-slate-100 px-1.5 py-0.5')}>
              {props.documentStatusLabel}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
