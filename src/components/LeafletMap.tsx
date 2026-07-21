'use client';

import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import Link from 'next/link';
import L from 'leaflet';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import type { LatLng } from '@/lib/geo';

export interface MapPoint { slug: string; title: string; island: string; price: string; href: string; lat: number; lng: number }

function FitBounds({ points }: { points: MapPoint[] }): null {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng] as [number, number]));
    map.fitBounds(bounds.pad(0.35), { maxZoom: 14 });
  }, [points, map]);
  return null;
}

export function LeafletMap({ points, center, zoom = 9, height = '72vh' }: {
  points: MapPoint[]; center: LatLng; zoom?: number; height?: string;
}): JSX.Element {
  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height, width: '100%' }}
      className="z-0 overflow-hidden rounded-2xl border border-slate-200"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((p) => (
        <CircleMarker key={p.slug} center={[p.lat, p.lng]} radius={8}
          pathOptions={{ color: '#ffffff', weight: 2, fillColor: '#003893', fillOpacity: 1 }}>
          <Popup>
            <span className="block text-sm font-semibold text-slate-900">{p.title}</span>
            <span className="block text-xs text-slate-500">{p.island} · {p.price}</span>
            <Link href={p.href} className="mt-1 inline-block text-xs font-semibold text-brand">Abrir · Open →</Link>
          </Popup>
        </CircleMarker>
      ))}
      <FitBounds points={points} />
    </MapContainer>
  );
}
