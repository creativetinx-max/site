'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function ContactCTA() {
  const t = useTranslations('cta');

  return (
    <section 
      className="cloud-texture"
      style={{
        backgroundColor: 'var(--bg-light)',
        color: 'var(--text-dark)',
        padding: 'var(--space-xl) 0',
        textAlign: 'center',
        position: 'relative'
      }}
    >
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        <h2 style={{ 
          fontSize: 'clamp(2.5rem, 6vw, 5rem)', 
          lineHeight: 1.1,
          maxWidth: '800px',
        }}>
          {t('headline')} <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>{t('headlineAccent')}</span>
        </h2>
        
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          maxWidth: '600px',
          opacity: 0.8,
          marginBottom: '2rem'
        }}>
          {t('description')}
        </p>

        <Link href="/contact" className="cta-link">
          {t('button')}
          <span className="underline"></span>
        </Link>
      </div>

      <style jsx>{`
        .cta-link {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3rem);
          color: var(--text-dark);
          position: relative;
          display: inline-block;
          padding-bottom: 0.25em;
        }

        .underline {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: var(--primary);
          transform: scaleX(1);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .cta-link:hover .underline {
          transform: scaleX(0);
          transform-origin: right;
        }
      `}</style>
    </section>
  );
}
