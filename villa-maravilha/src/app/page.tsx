'use client';

import dynamic from 'next/dynamic';

const VillaExperience = dynamic(() => import('@/components/VillaExperience'), {
  ssr: false,
  loading: () => (
    <div style={{
      position: 'fixed', inset: 0, background: '#000',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.5rem', letterSpacing: '0.3em',
        textTransform: 'uppercase', color: 'rgba(245,240,235,0.5)',
      }}>
        Villa Maravilha
      </div>
    </div>
  ),
});

export default function Home() {
  return <VillaExperience />;
}
