// Geographic helpers for the map. Approximate island centres (fallback when a
// listing has no precise coordinates).

export interface LatLng { lat: number; lng: number }

export const CV_CENTER: LatLng = { lat: 16.0, lng: -24.0 };

export const ISLAND_CENTERS: Record<string, LatLng> = {
  'São Vicente': { lat: 16.877, lng: -24.98 },
  Santiago: { lat: 15.09, lng: -23.6 },
  Sal: { lat: 16.73, lng: -22.94 },
  'Boa Vista': { lat: 16.08, lng: -22.8 },
  'Santo Antão': { lat: 17.06, lng: -25.15 },
  Fogo: { lat: 14.95, lng: -24.38 },
  Maio: { lat: 15.2, lng: -23.16 },
  'São Nicolau': { lat: 16.6, lng: -24.3 },
  Brava: { lat: 14.85, lng: -24.72 },
};

/** Precise coordinates if present, else the island centre, else null. */
export function coordsFor(l: { latitude?: number | null; longitude?: number | null; island: string }): LatLng | null {
  if (typeof l.latitude === 'number' && typeof l.longitude === 'number') return { lat: l.latitude, lng: l.longitude };
  return ISLAND_CENTERS[l.island] ?? null;
}
