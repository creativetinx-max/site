'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

const SLIDES = [
  {
    id: 1,
    videoSrc: '/videos/hero-video.mp4',
    title: 'Visual',
    titleAccent: 'Excellence',
  },
  {
    id: 2,
    videoSrc: '/videos/hero-video2.mp4',
    title: 'Creative',
    titleAccent: 'Direction',
  },
  {
    id: 3,
    videoSrc: '/videos/hero-video3.mp4',
    title: 'Brand',
    titleAccent: 'Stories',
  }
];

export default function Hero() {
  const t = useTranslations('hero');
  const containerRef = useRef(null);
  const slidesRef = useRef([]);
  const videoWrapRef = useRef([]);
  const titleLineRefs = useRef([]);
  const currentIndexRef = useRef(0);
  const animatingRef = useRef(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoplayRef = useRef(null);

  const setTitleRef = (slideIndex, type) => (el) => {
    if (!titleLineRefs.current[slideIndex]) {
      titleLineRefs.current[slideIndex] = {};
    }
    titleLineRefs.current[slideIndex][type] = el;
  };

  /* ───────── SLIDE TRANSITION ───────── */
  const animateSlideChange = useCallback((fromIndex, toIndex, direction) => {
    const fromSlide = slidesRef.current[fromIndex];
    const toSlide = slidesRef.current[toIndex];

    const fromTitle = titleLineRefs.current[fromIndex]?.title;
    const fromAccent = titleLineRefs.current[fromIndex]?.accent;
    const toTitle = titleLineRefs.current[toIndex]?.title;
    const toAccent = titleLineRefs.current[toIndex]?.accent;

    /* Place incoming slide off-screen */
    gsap.set(toSlide, { xPercent: direction * 100, visibility: 'visible' });
    gsap.set(toTitle, { yPercent: 120 });
    gsap.set(toAccent, { yPercent: 120 });

    const tl = gsap.timeline({
      defaults: { duration: 1.4, ease: 'slideshow-wipe' },
      onComplete: () => {
        /* Park the old slide */
        gsap.set(fromSlide, { visibility: 'hidden', xPercent: 0 });
        animatingRef.current = false;
      }
    });

    /* Outgoing slide wipes away */
    tl.to(fromSlide, { xPercent: -direction * 100 }, 0);
    tl.to(fromTitle, { yPercent: -120, duration: 0.7, ease: 'power3.inOut' }, 0);
    tl.to(fromAccent, { yPercent: -120, duration: 0.7, ease: 'power3.inOut' }, 0.04);

    /* Incoming slide wipes in */
    tl.to(toSlide, { xPercent: 0 }, 0);
    tl.to(toTitle, { yPercent: 0, duration: 0.9, ease: 'power3.out' }, 0.35);
    tl.to(toAccent, { yPercent: 0, duration: 0.9, ease: 'power3.out' }, 0.45);
  }, []);

  /* ───────── NAVIGATE ───────── */
  const navigate = useCallback((direction) => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    const fromIndex = currentIndexRef.current;
    const toIndex = direction === 1
      ? (fromIndex + 1) % SLIDES.length
      : (fromIndex - 1 + SLIDES.length) % SLIDES.length;

    currentIndexRef.current = toIndex;
    setCurrentSlide(toIndex);
    animateSlideChange(fromIndex, toIndex, direction);

    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => navigate(1), 6000);
  }, [animateSlideChange]);

  /* ───────── INITIAL LOADER ───────── */
  useEffect(() => {
    CustomEase.create('slideshow-wipe', '0.625, 0.05, 0, 1');
    CustomEase.create('loader-ease', '0.7, 0, 0.3, 1');

    const ctx = gsap.context(() => {
      /* Hide all slides except the first */
      slidesRef.current.forEach((slide, i) => {
        gsap.set(slide, {
          visibility: i === 0 ? 'visible' : 'hidden',
          xPercent: i === 0 ? 0 : 100,
        });
      });

      /* Hide all text */
      titleLineRefs.current.forEach((refs) => {
        if (refs?.title) gsap.set(refs.title, { yPercent: 120 });
        if (refs?.accent) gsap.set(refs.accent, { yPercent: 120 });
      });

      /* Reveal first slide text */
      const t0 = titleLineRefs.current[0]?.title;
      const a0 = titleLineRefs.current[0]?.accent;

      const tl = gsap.timeline({
        delay: 0.3,
        onComplete: () => {
          animatingRef.current = false;
          autoplayRef.current = setInterval(() => navigate(1), 6000);
        }
      });

      if (t0) tl.to(t0, { yPercent: 0, duration: 1, ease: 'power3.out' }, 0);
      if (a0) tl.to(a0, { yPercent: 0, duration: 1, ease: 'power3.out' }, 0.1);

      /* Reveal nav */
      tl.fromTo('.hero-nav',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        0.3
      );
    }, containerRef);

    return () => {
      ctx.revert();
      clearInterval(autoplayRef.current);
    };
  }, [navigate]);

  /* ───────── RENDER ───────── */
  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        height: '100dvh',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-dark)',
      }}
    >
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          ref={el => slidesRef.current[index] = el}
          className="hero-slide"
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            visibility: 'hidden',
          }}
        >
          {/* Video wrapper — fills the slide, no parallax transform */}
          <div
            ref={el => videoWrapRef.current[index] = el}
            style={{
              position: 'absolute',
              inset: 0,
              overflow: 'hidden',
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.85,
              }}
            >
              <source src={slide.videoSrc} type="video/mp4" />
            </video>

            {/* Warm overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundColor: '#8a6d3b',
              mixBlendMode: 'overlay',
              opacity: 0.4,
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.7) 100%)',
            }} />
          </div>

          {/* Text */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 10,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
          }}>
            <h1 style={{
              fontSize: 'clamp(4rem, 12vw, 11rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              margin: 0,
              fontFamily: 'var(--font-display)',
              color: 'var(--text-light)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.05em',
            }}>
              <span style={{ display: 'block', overflow: 'hidden', padding: '0.15em 0' }}>
                <span
                  ref={setTitleRef(index, 'title')}
                  style={{ display: 'block', willChange: 'transform' }}
                >
                  {slide.title}
                </span>
              </span>
              <span style={{ display: 'block', overflow: 'hidden', padding: '0.15em 0' }}>
                <span
                  ref={setTitleRef(index, 'accent')}
                  style={{ display: 'block', color: 'var(--primary)', willChange: 'transform' }}
                >
                  {slide.titleAccent}
                </span>
              </span>
            </h1>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <div className="hero-nav" style={{
        position: 'absolute', bottom: '3rem',
        left: 0, right: 0, zIndex: 20,
        display: 'flex', justifyContent: 'center',
        gap: '2rem', alignItems: 'center',
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            color: 'var(--text-light)', border: 'none',
            cursor: 'pointer', background: 'none',
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem', letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          PREV
        </button>

        <div style={{ display: 'flex', gap: '8px' }}>
          {SLIDES.map((_, i) => (
            <div key={i} style={{
              width: '30px', height: '2px',
              backgroundColor: i === currentSlide ? 'var(--primary)' : 'rgba(255,255,255,0.3)',
              transition: 'background-color 0.4s ease',
            }} />
          ))}
        </div>

        <button
          onClick={() => navigate(1)}
          style={{
            color: 'var(--text-light)', border: 'none',
            cursor: 'pointer', background: 'none',
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem', letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          NEXT
        </button>
      </div>
    </section>
  );
}
