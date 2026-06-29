'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer style={{
      backgroundColor: 'var(--bg-dark)',
      color: 'var(--text-light)',
      padding: 'var(--space-lg) 0 2rem 0',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: 'var(--space-lg)',
          borderBottom: '1px solid rgba(255, 255, 240, 0.1)',
          paddingBottom: 'var(--space-lg)'
        }}>
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ position: 'relative', width: '40px', height: '40px' }}>
                <Image 
                  src="/img/logo-mark.svg" 
                  alt="Tinx Creative" 
                  fill 
                  style={{ objectFit: 'contain', filter: 'invert(1)' }} 
                />
              </div>
              <span style={{ fontFamily: 'var(--font-logo)', fontSize: '1.5rem', fontWeight: 'bold' }}>
                TINX
              </span>
            </Link>
            <p style={{ opacity: 0.7, maxWidth: '300px' }}>
              {t('tagline')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ marginBottom: '1.5rem', color: 'var(--primary)', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.875rem' }}>
              {t('links')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link href="/" className="footer-link">{t('home')}</Link>
              <Link href="/contact" className="footer-link">{t('contact')}</Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 style={{ marginBottom: '1.5rem', color: 'var(--primary)', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.875rem' }}>
              {t('social')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="#" className="footer-link" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="#" className="footer-link" target="_blank" rel="noopener noreferrer">Vimeo</a>
              <a href="#" className="footer-link" target="_blank" rel="noopener noreferrer">Behance</a>
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          opacity: 0.5,
          fontSize: '0.875rem'
        }}>
          <p>{t('copyright')}</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-link {
          opacity: 0.8;
          transition: opacity 0.3s ease, color 0.3s ease;
          display: inline-block;
          width: fit-content;
        }
        .footer-link:hover {
          opacity: 1;
          color: var(--primary);
        }
      `}</style>
    </footer>
  );
}
