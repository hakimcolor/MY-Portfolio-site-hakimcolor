'use client';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const rafRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
    };

    // Smooth trail via rAF lerp
    const lerp = (a, b, t) => a + (b - a) * t;
    let trailX = 0;
    let trailY = 0;
    const animate = () => {
      trailX = lerp(trailX, targetRef.current.x, 0.12);
      trailY = lerp(trailY, targetRef.current.y, 0.12);
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

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Outer trailing ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          transform: `translate(${trail.x - 20}px, ${trail.y - 20}px)`,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: `2px solid ${isHovering ? '#22c55e' : 'rgba(34,197,94,0.4)'}`,
          transition: 'border-color 0.2s, transform 0.05s',
          scale: isHovering ? '1.6' : isClicking ? '0.8' : '1',
        }}
      />

      {/* Inner dot — snaps instantly */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          transform: `translate(${pos.x - 5}px, ${pos.y - 5}px)`,
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: '#22c55e',
          boxShadow: isHovering
            ? '0 0 12px 4px rgba(34,197,94,0.6)'
            : '0 0 6px 2px rgba(34,197,94,0.3)',
          transition: 'box-shadow 0.2s, background-color 0.2s',
        }}
      />

      {/* Click ripple */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9997]"
          style={{
            translateX: pos.x - 20,
            translateY: pos.y - 20,
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '2px solid #22c55e',
          }}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      )}
    </>
  );
}
