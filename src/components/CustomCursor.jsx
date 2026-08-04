'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [trail, setTrail] = useState({ x: -200, y: -200 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef(null);
  const targetRef = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const onMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const lerp = (a, b, t) => a + (b - a) * t;
    let tx = -200,
      ty = -200;
    const animate = () => {
      tx = lerp(tx, targetRef.current.x, 0.1);
      ty = lerp(ty, targetRef.current.y, 0.1);
      setTrail({ x: tx, y: ty });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    const onOver = (e) => {
      const t = e.target;
      // Never trigger hover state on images
      if (t.tagName === 'IMG') {
        setIsHovering(false);
        return;
      }
      const hoverable =
        t.tagName === 'A' ||
        t.tagName === 'BUTTON' ||
        t.closest('a') ||
        t.closest('button');
      setIsHovering(!!hoverable);
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* sizes */
  const ringSize = isHovering ? 52 : isClicking ? 28 : 36;
  const dotSize = isClicking ? 5 : 7;

  return (
    <>
      {/* Lagging outer ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-9998"
        style={{
          transform: `translate(${trail.x - ringSize / 2}px, ${trail.y - ringSize / 2}px)`,
          width: ringSize,
          height: ringSize,
          borderRadius: '50%',
          border: `1.5px solid ${isHovering ? '#22c55e' : 'rgba(34,197,94,0.6)'}`,
          background: isHovering ? 'rgba(34,197,94,0.08)' : 'transparent',
          boxShadow: isHovering
            ? '0 0 18px 4px rgba(34,197,94,0.35)'
            : '0 0 8px 1px rgba(34,197,94,0.15)',
          opacity: isVisible ? 1 : 0,
          transition:
            'width 0.2s ease, height 0.2s ease, border-color 0.2s, box-shadow 0.2s, background 0.2s, opacity 0.2s',
        }}
      />

      {/* Sharp centre dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-9999"
        style={{
          transform: `translate(${pos.x - dotSize / 2}px, ${pos.y - dotSize / 2}px)`,
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          backgroundColor: '#22c55e',
          boxShadow: '0 0 10px 3px rgba(34,197,94,0.7)',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.15s, height 0.15s, opacity 0.2s',
        }}
      />

      {/* Click ripple */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            key="ripple"
            className="fixed top-0 left-0 pointer-events-none z-9997"
            style={{
              translateX: pos.x - 24,
              translateY: pos.y - 24,
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: '1.5px solid #22c55e',
            }}
            initial={{ scale: 0.4, opacity: 0.9 }}
            animate={{ scale: 2.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
