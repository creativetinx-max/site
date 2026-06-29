'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import gsap from 'gsap';

export default function Navbar() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        padding: scrolled ? '1rem 0' : '2rem 0',
        backgroundColor: scrolled ? 'var(--bg-light)' : 'transparent',
        color: scrolled ? 'var(--text-dark)' : 'var(--text-light)',
        boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* We will use text logo for now if SVG is problematic with colors, but let's use the SVG */}
          <div style={{ position: 'relative', width: '40px', height: '40px' }}>
            <Image 
              src="/img/logo-mark.svg" 
              alt="Tinx Creative" 
              fill 
              style={{ 
                objectFit: 'contain',
                filter: scrolled ? 'none' : 'invert(1)' 
              }} 
            />
          </div>
          <span style={{ fontFamily: 'var(--font-logo)', fontSize: '1.5rem', fontWeight: 'bold' }}>
            TINX
          </span>
        </Link>

        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/" style={{ fontWeight: 500 }}>{t('home')}</Link>
          <Link href="/contact" style={{ fontWeight: 500 }}>{t('contact')}</Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
