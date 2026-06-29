'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Services.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const t = useTranslations('services');
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          }
        }
      );

      // List stagger reveal
      const items = listRef.current.querySelectorAll(`.${styles.item}`);
      gsap.fromTo(items,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const keys = ['product', 'location', 'web', 'content'];

  return (
    <section ref={sectionRef} className={styles.section} id="services">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.label}>{t('label')}</span>
          <h2 ref={titleRef} className={styles.title}>{t('headline')}</h2>
        </div>

        <div ref={listRef} className={styles.list}>
          {keys.map((key, index) => (
            <div key={key} className={styles.item}>
              <div className={styles.itemContent}>
                <span className={styles.itemIndex}>0{index + 1}</span>
                <h3 className={styles.itemTitle}>{t(`items.${key}.title`)}</h3>
                <p className={styles.itemDesc}>{t(`items.${key}.description`)}</p>
              </div>
              <div className={styles.iconWrap}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
