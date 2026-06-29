'use client';

import { useTranslations } from 'next-intl';

export default function Marquee() {
  const t = useTranslations('marquee');
  
  // Create an array to repeat the text a few times for the seamless loop
  const textContent = Array(4).fill(t('text')).join(' ');

  return (
    <div style={{
      backgroundColor: 'var(--primary)',
      color: 'var(--text-dark)',
      padding: '1.5rem 0',
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div 
        className="marquee-content"
        style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
          fontWeight: '500',
          textTransform: 'uppercase',
          letterSpacing: '2px',
        }}
      >
        {textContent}
      </div>

      <style jsx>{`
        .marquee-content {
          animation: marquee 20s linear infinite;
          will-change: transform;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
