import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Djarvista — a porta digital para imóveis, construção e informação oficial em Cabo Verde';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '90px',
          background: 'linear-gradient(135deg, #012a63 0%, #003893 55%, #1a4fae 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
          <div style={{ width: 76, height: 76, borderRadius: 20, background: '#f2612a', display: 'flex' }} />
          <div style={{ fontSize: 70, fontWeight: 800, letterSpacing: -2 }}>Djarvista</div>
        </div>
        <div style={{ marginTop: 30, fontSize: 36, lineHeight: 1.3, color: 'rgba(255,255,255,0.92)', maxWidth: 920 }}>
          Terra, imóveis, construção e informação oficial em Cabo Verde
        </div>
        <div style={{ marginTop: 46, fontSize: 24, color: 'rgba(255,255,255,0.72)' }}>djarvista.com · PT · EN · NL</div>
      </div>
    ),
    { ...size },
  );
}
