'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const t = useTranslations('about');
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text reveal matching reference
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll('.gsap_split_line_inner');
        gsap.fromTo(lines, 
          { yPercent: 100 },
          { 
            yPercent: 0,
            stagger: 0.1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 85%',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split text into lines for the clipping animation effect
  const splitTextToLines = (text) => {
    // Split by sentence for multi-line reveal
    const parts = text.split('. ').filter(Boolean);
    const lines = parts.map((line, i) => (
      <div key={i} className="gsap_split_line">
        <div className="gsap_split_line_inner">
          {line}{i < parts.length - 1 ? '. ' : ''}
        </div>
      </div>
    ));
    return lines;
  };

  return (
    <section 
      ref={sectionRef} 
      className="section-padding cloud-texture"
      style={{ backgroundColor: 'var(--bg-light)', color: 'var(--text-dark)' }}
    >
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
            <span style={{ 
              textTransform: 'uppercase', 
              letterSpacing: '2px', 
              fontSize: '0.875rem',
              color: 'var(--primary)',
              fontWeight: '600',
              flex: '1 1 200px'
            }}>
              {t('label')}
            </span>
            <div style={{ flex: '1 1 800px' }}>
              <h2 
                ref={headlineRef}
                data-text-anim="header"
                style={{ 
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)', 
                  lineHeight: 1.1,
                  fontFamily: 'var(--font-display)',
                  textTransform: 'none'
                }}
              >
                {splitTextToLines(t('headline'))}
              </h2>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '3rem',
            maxWidth: '900px',
            marginLeft: 'auto'
          }}>
            <p style={{ fontSize: '1.125rem', lineHeight: 1.6, opacity: 0.8 }}>
              {t('description')}
            </p>
            <p style={{ fontSize: '1.125rem', lineHeight: 1.6, opacity: 0.8 }}>
              {t('description2')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
