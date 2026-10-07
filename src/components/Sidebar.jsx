'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaFacebook,
  FaArrowUp,
  FaArrowDown,
  FaXTwitter,
  FaInstagram,
} from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { useLenis } from './useLenis';

export default function Sidebar() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const percent =
        docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setScrollPercent(percent);

      // Detect scroll direction
      if (scrollTop > lastScrollY) {
        setScrollDirection('down');
      } else if (scrollTop < lastScrollY) {
        setScrollDirection('up');
      }
      setLastScrollY(scrollTop);

      // Show scroll to top button after 20%
      setShowScrollTop(percent > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToBottom = () => {
    if (lenis) {
      lenis.scrollTo('bottom', { duration: 2 });
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex flex-col items-center justify-center w-24 gap-4 fixed left-0 top-0 h-full z-40 bg-background-dark/50 backdrop-blur-sm border-r border-white/10 pt-16"
        style={{
          borderImage:
            'linear-gradient(to bottom, #22c55e, #ffffff, #22c55e) 1',
        }}
      >
        {/* Scroll Progress Circle */}
        <motion.div
          className="relative w-14 h-14 mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
        >
          <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="#1e293b"
              strokeWidth="3"
            />
            <motion.circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={150.8}
              strokeDashoffset={150.8 - (150.8 * scrollPercent) / 100}
              style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-green-500">
              {scrollPercent}%
            </span>
          </div>
        </motion.div>

        <div className="h-px w-8 bg-slate-700 my-2"></div>

        <Link
          className="p-3 rounded-full bg-surface-dark hover:bg-slate-800 text-slate-400 hover:text-white transition-all hover:scale-110 group relative"
          href="https://github.com/hakimcolor"
          target="_blank"
        >
          <FaGithub className="w-5 h-5" />
        </Link>
        <Link
          className="p-3 rounded-full bg-surface-dark hover:bg-slate-800 text-slate-400 hover:text-white transition-all hover:scale-110 group relative"
          href="https://www.linkedin.com/in/md-azizul-hakim-b646b22a7"
          target="_blank"
        >
          <FaLinkedin className="w-5 h-5 text-blue-400" />
        </Link>
        <Link
          className="p-3 rounded-full bg-surface-dark hover:bg-slate-800 text-slate-400 hover:text-white transition-all hover:scale-110 group relative"
          href="https://x.com/hakimcolor"
          target="_blank"
        >
          <FaXTwitter className="w-5 h-5" />
        </Link>
        <Link
          className="p-3 rounded-full bg-surface-dark hover:bg-slate-800 text-slate-400 hover:text-white transition-all hover:scale-110 group relative"
          href="https://www.instagram.com/hakim.color/"
          target="_blank"
        >
          <FaInstagram className="w-5 h-5 text-pink-500" />
        </Link>
        <Link
          className="p-3 rounded-full bg-surface-dark hover:bg-slate-800 text-slate-400 hover:text-white transition-all hover:scale-110 group relative"
          href="https://www.facebook.com/hakimcolorofficial"
          target="_blank"
        >
          <FaFacebook className="w-5 h-5 text-blue-500" />
        </Link>
        <Link
          className="p-3 rounded-full bg-surface-dark hover:bg-slate-800 text-slate-400 hover:text-white transition-all hover:scale-110 group relative"
          href="https://wa.me/8801818777856"
          target="_blank"
        >
          <FaWhatsapp className="w-5 h-5 text-green-500" />
        </Link>
        <Link
          className="p-3 rounded-full bg-surface-dark hover:bg-slate-800 text-slate-400 hover:text-white transition-all hover:scale-110 group relative"
          href="mailto:hakimcolor777@gmail.com"
        >
          <MdEmail className="w-5 h-5 text-red-400" />
        </Link>
        <div className="h-16 w-px bg-gradient-to-b from-slate-700 to-transparent mt-2"></div>

        {/* Scroll Up/Down Buttons */}
        <div className="flex flex-col gap-2 mt-2">
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollToTop}
                className="p-3 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25 transition-colors"
              >
                <FaArrowUp className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {scrollPercent < 90 && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollToBottom}
                className="p-3 rounded-full bg-surface-dark border border-slate-700 text-slate-400 hover:text-white hover:border-[#67C090]/50 transition-all"
              >
                <FaArrowDown className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Scroll Direction Indicator */}
        <AnimatePresence>
          {scrollDirection && (
            <motion.div
              key={scrollDirection}
              initial={{ opacity: 0, y: scrollDirection === 'down' ? -10 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2"
            >
              <div
                className={`w-2 h-2 rounded-full ${scrollDirection === 'down' ? 'bg-green-500' : 'bg-white'}`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </aside>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0b1120] border-t border-slate-800/50">
        {/* Progress bar */}
        <div className="h-0.5 bg-slate-800 w-full">
          <div
            className="h-full bg-green-500 transition-all duration-100"
            style={{ width: `${scrollPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between px-4 py-2.5">
          {/* Scroll % */}
          <span className="text-xs font-bold text-green-500 w-8">
            {scrollPercent}%
          </span>

          {/* 5 key social icons */}
          <div className="flex items-center gap-2">
            <Link
              className="p-2 rounded-lg bg-surface-dark text-slate-400 active:scale-95"
              href="https://github.com/hakimcolor"
              target="_blank"
            >
              <FaGithub className="w-4 h-4" />
            </Link>
            <Link
              className="p-2 rounded-lg bg-surface-dark transition-all active:scale-95"
              href="https://www.linkedin.com/in/md-azizul-hakim-b646b22a7"
              target="_blank"
            >
              <FaLinkedin className="w-4 h-4 text-blue-400" />
            </Link>
            <Link
              className="p-2 rounded-lg bg-surface-dark transition-all active:scale-95"
              href="https://wa.me/8801818777856"
              target="_blank"
            >
              <FaWhatsapp className="w-4 h-4 text-green-500" />
            </Link>
            <Link
              className="p-2 rounded-lg bg-surface-dark transition-all active:scale-95"
              href="https://www.facebook.com/hakimcolorofficial"
              target="_blank"
            >
              <FaFacebook className="w-4 h-4 text-blue-500" />
            </Link>
            <Link
              className="p-2 rounded-lg bg-surface-dark transition-all active:scale-95"
              href="mailto:hakimcolor777@gmail.com"
            >
              <MdEmail className="w-4 h-4 text-red-400" />
            </Link>
          </div>

          {/* Scroll to top */}
          <AnimatePresence>
            {showScrollTop ? (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollToTop}
                className="p-2 rounded-lg bg-green-500 text-white shadow-lg shadow-green-500/25"
              >
                <FaArrowUp className="w-4 h-4" />
              </motion.button>
            ) : (
              <div className="w-8" />
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
