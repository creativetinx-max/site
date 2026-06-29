'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // A simple function to update cursor position
    const onMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
    };

    const onMouseEnterLink = () => {
      cursor.classList.add('hovered');
    };

    const onMouseLeaveLink = () => {
      cursor.classList.remove('hovered');
    };

    window.addEventListener('mousemove', onMouseMove);

    // Add event listeners to all links and buttons
    const interactiveElements = document.querySelectorAll('a, button');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterLink);
      el.addEventListener('mouseleave', onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);

  return <div ref={cursorRef} className="cursor" />;
}
