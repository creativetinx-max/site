'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Portfolio.module.css';

gsap.registerPlugin(ScrollTrigger);

const portfolioMedia = [
  { img: 'https://images.pexels.com/photos/1482193/pexels-photo-1482193.jpeg?auto=compress&cs=tinysrgb&w=1200', video: '/videos/stock/12291794_1920_1080_24fps.mp4' },
  { img: 'https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg?auto=compress&cs=tinysrgb&w=1200', video: '/videos/stock/14334678_2560_1440_30fps.mp4' },
  { img: 'https://images.pexels.com/photos/2261502/pexels-photo-2261502.jpeg?auto=compress&cs=tinysrgb&w=1200', video: '/videos/stock/15004999_2562_1440_32fps.mp4' },
  { img: 'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1200', video: '/videos/stock/15356433_3840_2160_24fps.mp4' },
  { img: 'https://images.pexels.com/photos/1578103/pexels-photo-1578103.jpeg?auto=compress&cs=tinysrgb&w=1200', video: '/videos/stock/15533803_1920_1080_30fps.mp4' },
  { img: 'https://images.pexels.com/photos/2739013/pexels-photo-2739013.jpeg?auto=compress&cs=tinysrgb&w=1200', video: '/videos/stock/6042261-hd_1920_1080_30fps.mp4' },
];

export default function Portfolio() {
  const t = useTranslations('portfolio');
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current.querySelectorAll(`.${styles.itemWrap}`);
      
      items.forEach((item) => {
        gsap.fromTo(item,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const itemKeys = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'];

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.label}>{t('label')}</span>
          <h2 className={styles.title}>{t('headline')}</h2>
        </div>
      </div>

      <div ref={gridRef} className={styles.grid}>
        {itemKeys.map((key, index) => (
          <div key={key} className={styles.itemWrap}>
            <div className={styles.item}>
              <Image
                src={portfolioMedia[index].img}
                alt={t(`items.${key}.title`)}
                fill
                className={styles.image}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <video
                src={portfolioMedia[index].video}
                autoPlay
                muted
                loop
                playsInline
                className={styles.hoverVideo}
                style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  opacity: 1, /* Changed to 1 so they always play and are visible */
                  zIndex: 1
                }}
              />
              <div className={styles.overlay}>
                <div className={styles.cropMark}></div>
                <div className={styles.cropMark}></div>
                <div className={styles.cropMark}></div>
                <div className={styles.cropMark}></div>
                
                <h3 className={styles.itemTitle}>{t(`items.${key}.title`)}</h3>
                <span className={styles.itemCat}>{t(`items.${key}.category`)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
