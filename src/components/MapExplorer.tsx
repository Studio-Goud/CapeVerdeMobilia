'use client';

import dynamic from 'next/dynamic';
import type { MapPoint } from './LeafletMap';
import type { LatLng } from '@/lib/geo';

// Leaflet touches window; load it client-only.
const LeafletMap = dynamic(() => import('./LeafletMap').then((m) => m.LeafletMap), {
  ssr: false,
  loading: () => <div className="grid w-full place-items-center rounded-2xl border border-slate-200 bg-brand-50 text-sm text-slate-500" style={{ height: '72vh' }}>…</div>,
});

export function MapExplorer({ points, center, height, zoom }: { points: MapPoint[]; center: LatLng; height?: string; zoom?: number }): JSX.Element {
  return <LeafletMap points={points} center={center} height={height} zoom={zoom} />;
}
