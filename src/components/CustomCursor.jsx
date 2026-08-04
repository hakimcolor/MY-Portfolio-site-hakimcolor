'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

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
      if (!isVisible) setIsVisible(true);
    };

    const lerp = (a, b, t) => a + (b - a) * t;
    let trailX = -200;
    let trailY = -200;
    const animate = () => {
      trailX = lerp(trailX, targetRef.current.x, 0.1);
      trailY = lerp(trailY, targetRef.current.y, 0.1);
      setTrail({ x: trailX, y: trailY });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    const onOver = (e) => {
      const t = e.target;
      if (
        t.tagName === 'A' ||
        t.tagName === 'BUTTON' ||
        t.closest('a') ||
        t.closest('button') ||
        window.getComputedStyle(t).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
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
  }, [isVisible]);

  /* Profile image cursor — trails behind the pointer */
  const imgSize = isHovering ? 80 : isClicking ? 52 : 64;

  return (
    <>
      {/* Profile image that follows with a lag */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-9998"
        style={{
          transform: `translate(${trail.x - imgSize / 2}px, ${trail.y - imgSize / 2}px)`,
          width: imgSize,
          height: imgSize,
          borderRadius: '50%',
          overflow: 'hidden',
          border: `2px solid ${isHovering ? '#22c55e' : 'rgba(34,197,94,0.55)'}`,
          boxShadow: isHovering
            ? '0 0 20px 6px rgba(34,197,94,0.45)'
            : '0 0 10px 3px rgba(34,197,94,0.2)',
          transition:
            'width 0.25s ease, height 0.25s ease, border-color 0.2s, box-shadow 0.2s',
          opacity: isVisible ? 1 : 0,
        }}
      >
        <Image
          src="/hakimcolor.png"
          alt="cursor"
          fill
          sizes="80px"
          className="object-cover object-top"
          priority
        />
      </div>

      {/* Tiny sharp dot — snaps to exact pointer */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-9999"
        style={{
          transform: `translate(${pos.x - 4}px, ${pos.y - 4}px)`,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#22c55e',
          boxShadow: '0 0 8px 2px rgba(34,197,94,0.7)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
      />

      {/* Click ripple */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            key="ripple"
            className="fixed top-0 left-0 pointer-events-none z-9997"
            style={{
              translateX: pos.x - 32,
              translateY: pos.y - 32,
              width: 64,
              height: 64,
              borderRadius: '50%',
              border: '2px solid #22c55e',
            }}
            initial={{ scale: 0.5, opacity: 0.9 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
