'use client';
import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { LenisContext } from './useLenis';

export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null);
  const reqIdRef = useRef(null);

  useEffect(() => {
    // Skip Lenis on touch/mobile — native scroll is faster
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const lenisInstance = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2.5,
      infinite: false,
      lerp: 0.08,
      wheelMultiplier: 1.2,
      autoResize: true,
    });

    function raf(time) {
      lenisInstance.raf(time);
      reqIdRef.current = requestAnimationFrame(raf);
    }

    setLenis(lenisInstance);
    reqIdRef.current = requestAnimationFrame(raf);

    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      lenisInstance.destroy();
    };
  }, []);

  const scrollTo = (target, options = {}) => {
    if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.5, ...options });
  };
  const scrollToTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 2 });
  };
  const scrollToBottom = () => {
    if (lenis) lenis.scrollTo('bottom', { duration: 2 });
  };

  return (
    <LenisContext.Provider
      value={{ lenis, scrollTo, scrollToTop, scrollToBottom }}
    >
      {children}
    </LenisContext.Provider>
  );
}
