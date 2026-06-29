'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const t = useTranslations('philosophy');
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        color: 'var(--text-light)',
      }}
    >
      {/* Parallax Background */}
      <div 
        ref={bgRef}
        style={{
          position: 'absolute',
          top: '-20%', left: 0, right: 0, bottom: '-20%',
          backgroundImage: 'url("https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg?auto=compress&cs=tinysrgb&w=1600")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1,
          opacity: 0.6, // Summer sky vibe
        }}
      />

      {/* Dark gradient overlay for text readability */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to right, rgba(32, 87, 128, 0.9), rgba(47, 156, 170, 0.6))',
        zIndex: 2,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ 
            textTransform: 'uppercase', 
            letterSpacing: '2px', 
            fontSize: '0.875rem',
            color: 'var(--primary)',
            fontWeight: '600'
          }}>
            {t('label')}
          </span>
        </div>

        <h2 style={{ 
          fontSize: 'clamp(2rem, 5vw, 4rem)', 
          maxWidth: '1000px', 
          margin: '0 auto 2rem',
          lineHeight: 1.2
        }}>
          {t('headline')}<br />
          <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>{t('headlineAccent')}</span>
        </h2>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          maxWidth: '800px',
          margin: '0 auto',
          opacity: 0.9,
          lineHeight: 1.6
        }}>
          {t('description')}
        </p>
      </div>
    </section>
  );
}
