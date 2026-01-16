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
    <footer className="w-full bg-background-dark/80 backdrop-blur-sm border-t border-slate-800/50 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left side - Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-slate-400 text-sm"
          >
            <p>© {currentYear} Md Azizul Hakim. All rights reserved.</p>
          </motion.div>

          {/* Right side - Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-4"
          >
            <Link
              className="p-2.5 rounded-full bg-surface-dark hover:bg-slate-800 text-slate-400 hover:text-white transition-all hover:scale-110"
              href="https://github.com/hakimcolor"
              target="_blank"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </Link>
            <Link
              className="p-2.5 rounded-full bg-surface-dark hover:bg-slate-800 text-slate-400 hover:text-blue-400 transition-all hover:scale-110"
              href="https://www.linkedin.com/in/md-azizul-hakim-b646b22a7"
              target="_blank"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </Link>
            <Link
              className="p-2.5 rounded-full bg-surface-dark hover:bg-slate-800 text-slate-400 hover:text-white transition-all hover:scale-110"
              href="https://x.com/hakimcolor"
              target="_blank"
              aria-label="X (Twitter)"
            >
              <FaXTwitter className="w-5 h-5" />
            </Link>
            <Link
              className="p-2.5 rounded-full bg-surface-dark hover:bg-slate-800 text-slate-400 hover:text-pink-500 transition-all hover:scale-110"
              href="https://www.instagram.com/hakim.color/"
              target="_blank"
              aria-label="Instagram"
            >
              <FaInstagram className="w-5 h-5" />
            </Link>
            <Link
              className="p-2.5 rounded-full bg-surface-dark hover:bg-slate-800 text-slate-400 hover:text-blue-500 transition-all hover:scale-110"
              href="https://www.facebook.com/hakimcolorofficial"
              target="_blank"
              aria-label="Facebook"
            >
              <FaFacebook className="w-5 h-5" />
            </Link>
            <Link
              className="p-2.5 rounded-full bg-surface-dark hover:bg-slate-800 text-slate-400 hover:text-green-500 transition-all hover:scale-110"
              href="https://wa.me/8801818777856"
              target="_blank"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="w-5 h-5" />
            </Link>
            <Link
              className="p-2.5 rounded-full bg-surface-dark hover:bg-slate-800 text-slate-400 hover:text-red-400 transition-all hover:scale-110"
              href="mailto:hakimcolor777@gmail.com"
              aria-label="Email"
            >
              <MdEmail className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-6 pt-6 border-t border-slate-800/50"
        >
          <p className="text-slate-500 text-xs">
            Built with <span className="text-cyan-400">Next.js</span> and{' '}
            <span className="text-cyan-400">Tailwind CSS</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
