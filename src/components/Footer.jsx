'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaFacebook,
  FaXTwitter,
  FaInstagram,
} from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0b1120] border-t border-slate-800/50 mt-16 relative z-10">
      <div className="w-[95%] mx-auto py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-slate-400 text-sm text-center sm:text-left order-2 sm:order-1"
          >
            <p>© {currentYear} Md Azizul Hakim. All rights reserved.</p>
          </motion.div>

          {/* Social Links — scrollable on very small screens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 order-1 sm:order-2 flex-wrap justify-center"
          >
            {[
              {
                href: 'https://github.com/hakimcolor',
                icon: FaGithub,
                label: 'GitHub',
                color: 'hover:text-white',
              },
              {
                href: 'https://www.linkedin.com/in/md-azizul-hakim-b646b22a7',
                icon: FaLinkedin,
                label: 'LinkedIn',
                color: 'hover:text-blue-400',
              },
              {
                href: 'https://x.com/hakimcolor',
                icon: FaXTwitter,
                label: 'X',
                color: 'hover:text-white',
              },
              {
                href: 'https://www.instagram.com/hakim.color/',
                icon: FaInstagram,
                label: 'Instagram',
                color: 'hover:text-pink-500',
              },
              {
                href: 'https://www.facebook.com/hakimcolorofficial',
                icon: FaFacebook,
                label: 'Facebook',
                color: 'hover:text-blue-500',
              },
              {
                href: 'https://wa.me/8801818777856',
                icon: FaWhatsapp,
                label: 'WhatsApp',
                color: 'hover:text-green-500',
              },
              {
                href: 'mailto:hakimcolor777@gmail.com',
                icon: MdEmail,
                label: 'Email',
                color: 'hover:text-red-400',
              },
            ].map(({ href, icon: Icon, label, color }) => (
              <Link
                key={label}
                className={`p-2 rounded-full bg-surface-dark text-slate-400 ${color} transition-all active:scale-90 hover:scale-110`}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </Link>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-4 pt-4 border-t border-slate-800/50"
        >
          <p className="text-slate-500 text-xs leading-relaxed">
            Built with{' '}
            <span className="text-green-400 font-semibold">Next.js</span>
            {' & '}
            <span className="text-green-400 font-semibold">Tailwind CSS</span>
            {' · '}Designed &amp; developed by{' '}
            <span className="text-green-400 font-semibold">
              Muhamaad Azizul Hakim
            </span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
