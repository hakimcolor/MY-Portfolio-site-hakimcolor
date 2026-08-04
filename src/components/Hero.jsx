'use client';
import { useRef, useEffect } from 'react';
import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaReact,
  FaNodeJs,
} from 'react-icons/fa';
import { MdEmail, MdDownload, MdSend, MdCode } from 'react-icons/md';
import { SiMongodb, SiTypescript } from 'react-icons/si';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 12 },
  },
};

// Name: Muhamaad white, Azizul green, Hakim green
const TypeWriter = () => {
  const words = [
    { text: 'Muhamaad', color: 'text-white' },
    { text: ' Azizul', color: 'text-green-500' },
    { text: ' Hakim', color: 'text-green-500' },
  ];
  let charIndex = 0;
  return (
    <>
      {words.map((word) => (
        <span key={word.text} className={word.color}>
          {word.text.split('').map((char) => {
            const i = charIndex++;
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </>
  );
};

// Custom role typer: first word green, rest white
function RoleTyper() {
  const roles = [
    'MERN Stack Developer',
    'WordPress Developer',
    'Full Stack Developer',
    'React Developer',
    'Node.js Developer',
  ];
  const [display, setDisplay] = React.useState('');
  const [roleIdx, setRoleIdx] = React.useState(0);
  const [typing, setTyping] = React.useState(true);

  React.useEffect(() => {
    const current = roles[roleIdx];
    let timeout;
    if (typing) {
      if (display.length < current.length) {
        timeout = setTimeout(
          () => setDisplay(current.slice(0, display.length + 1)),
          60
        );
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(display.slice(0, -1)), 30);
      } else {
        setRoleIdx((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display, typing, roleIdx]);

  const parts = display.split(' ');
  const first = parts[0];
  const rest = parts.slice(1).join(' ');
  return (
    <span>
      <span className="text-green-500">{first}</span>
      {rest && <span className="text-white"> {rest}</span>}
      <span className="animate-pulse text-green-500">|</span>
    </span>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    const particles = particlesRef.current?.children;
    if (particles) {
      gsap.to(particles, {
        y: 'random(-100, 100)',
        x: 'random(-100, 100)',
        rotation: 'random(-180, 180)',
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { amount: 2, from: 'random' },
      });
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex flex-col-reverse lg:flex-row items-center justify-center px-6 py-16 gap-12 lg:gap-16 w-full max-w-[95%] mx-auto min-h-[calc(100vh-80px)] overflow-hidden"
      id="home"
    >
      {/* Floating code symbols */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {['</', '/>', '{', '}', '()', '[]', '&&', '=>', '++', '**'].map(
          (symbol, i) => (
            <motion.div
              key={i}
              className="absolute text-green-500/10 font-mono text-2xl font-bold"
              style={{ left: `${10 + i * 9}%`, top: `${15 + i * 8}%` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.2 }}
            >
              {symbol}
            </motion.div>
          )
        )}
      </div>

      {/* Left: text content */}
      <motion.div
        className="flex flex-col items-center md:items-start text-center md:text-left gap-6 max-w-2xl w-full z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="space-y-3" variants={itemVariants}>
          <motion.span className="inline-block py-1 px-3 rounded-full bg-surface-dark border border-green-500/30 text-sm font-medium text-green-400 mb-2">
            Hello, I&apos;m
          </motion.span>
          <motion.h1
            className="font-title text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight"
            variants={itemVariants}
          >
            <TypeWriter />
          </motion.h1>
          <motion.h2
            className="font-title text-xl md:text-3xl font-bold mt-3 flex items-center gap-2 justify-center md:justify-start flex-wrap"
            variants={itemVariants}
          >
            <MdCode className="text-green-500 text-2xl" />
            <RoleTyper />
          </motion.h2>

          {/* Tech stack line */}
          <div className="text-sm md:text-base font-body text-slate-400 mt-3">
            MongoDB • Express • React • Node.js • Next.js • PostgreSQL • SQL •
            TypeScript
          </div>
        </motion.div>

        <motion.p
          className="font-body text-base md:text-lg text-slate-400 leading-relaxed max-w-lg"
          variants={itemVariants}
        >
          I&apos;m a Full Stack Developer with 2+ years of experience crafting
          scalable web apps using MongoDB, Express, React, Node.js, PostgreSQL,
          SQL, Prisma, and TypeScript. I turn ideas into polished digital
          products — and also build fast, SEO-ready sites as a WordPress
          Elementor Developer.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 mt-4"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => {
              const link = document.createElement('a');
              link.href =
                'https://drive.google.com/drive/u/0/folders/1Wzq2c2AyQPZ1MwUb5mnoX0bCnYr25JNX';
              link.target = '_blank';
              link.click();
            }}
            className="h-14 px-8 rounded-full bg-green-500 hover:bg-green-600 text-white font-title font-bold text-base shadow-lg shadow-green-500/25 flex items-center justify-center gap-2 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MdDownload className="text-xl" />
            <span>Download Resume</span>
          </motion.button>
          <motion.button
            onClick={() =>
              document
                .getElementById('contact')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="h-14 px-8 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-title font-bold text-base transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MdSend className="text-xl" />
            <span>Contact Me</span>
          </motion.button>
        </motion.div>

        <motion.div
          className="flex md:hidden items-center gap-6 mt-6 pt-6 border-t border-slate-800 w-full justify-center"
          variants={itemVariants}
        >
          {[
            { icon: FaGithub, color: 'hover:text-white' },
            { icon: FaLinkedin, color: 'hover:text-blue-500' },
            { icon: FaWhatsapp, color: 'hover:text-green-500' },
            { icon: MdEmail, color: 'hover:text-red-400' },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.3, y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link
                className={`text-slate-400 ${item.color} transition-colors`}
                href="#"
              >
                <item.icon className="w-6 h-6" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Right: profile image */}
      <ProfileImage />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <span className="font-body text-slate-500 text-sm">Scroll Down</span>
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-slate-600 flex justify-center pt-2"
          animate={{ borderColor: ['#475569', '#22c55e', '#475569'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-green-500"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function ProfileImage() {
  return (
    <motion.div
      className="relative shrink-0 z-10"
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, type: 'spring', stiffness: 70, delay: 0.5 }}
    >
      {/* Floating animation wrapper */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        {/* Rotating outer ring */}
        <motion.div
          className="absolute -inset-3 rounded-2xl"
          style={{
            background:
              'conic-gradient(from 0deg, #22c55e, transparent, #22c55e, transparent, #22c55e)',
            opacity: 0.4,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* Pulsing green glow */}
        <motion.div
          className="absolute -inset-6 rounded-3xl blur-3xl bg-green-500/20"
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Image container — rectangular, slight radius */}
        <div className="relative w-72 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[28rem] rounded-2xl overflow-hidden border-2 border-green-500/30 shadow-2xl shadow-green-500/20">
          <Image
            src="/hakimcolor.png"
            alt="Muhamaad Azizul Hakim"
            fill
            className="object-cover object-top"
            priority
          />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background-dark/50 to-transparent" />
        </div>

        {/* Corner accent lines */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-green-400 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-400 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-400 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-400 rounded-br-2xl" />
      </motion.div>

      {/* Experience badge */}
      <motion.div
        className="absolute -bottom-6 -right-4 bg-surface-dark border border-green-500/30 px-4 py-2 rounded-xl shadow-xl flex items-center gap-2"
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.4, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
      >
        <div className="flex -space-x-2">
          {[
            { icon: FaReact, bg: '#61DAFB', color: 'text-black' },
            { icon: FaNodeJs, bg: '#339933', color: 'text-white' },
            { icon: SiMongodb, bg: 'white', color: 'text-green-600' },
            { icon: SiTypescript, bg: '#3178C6', color: 'text-white' },
          ].map((tech, i) => (
            <motion.div
              key={i}
              className="w-7 h-7 rounded-full p-1 flex items-center justify-center border-2 border-surface-dark"
              style={{ backgroundColor: tech.bg }}
              whileHover={{ y: -4, zIndex: 10 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <tech.icon className={`w-full h-full ${tech.color}`} />
            </motion.div>
          ))}
        </div>
        <div className="text-xs font-title font-bold">
          <span className="block text-green-500">2+ Years</span>
          <span className="text-slate-400">Experience</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
