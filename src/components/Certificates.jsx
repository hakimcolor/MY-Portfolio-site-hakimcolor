'use client';
import { motion } from 'framer-motion';
import { BsPatchCheckFill } from 'react-icons/bs';
import { FaGoogleDrive, FaExternalLinkAlt, FaAward } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';

const DRIVE_LINK =
  'https://drive.google.com/drive/u/0/folders/19dU9Cn9CHqMgTUnqh-6ijrICSktL0LQ7';

const certificates = [
  {
    title: 'Full Stack Web Development',
    issuer: 'Programming Hero',
    category: 'Development',
    color: 'from-green-500/20 to-emerald-500/10',
    border: 'border-green-500/30',
    accent: 'text-green-400',
    badge: 'bg-green-500/10 text-green-400 border-green-500/30',
  },
  {
    title: 'React & Next.js Mastery',
    issuer: 'Online Course',
    category: 'Frontend',
    color: 'from-cyan-500/20 to-blue-500/10',
    border: 'border-cyan-500/30',
    accent: 'text-cyan-400',
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  },
  {
    title: 'Node.js & Express Backend',
    issuer: 'Online Course',
    category: 'Backend',
    color: 'from-purple-500/20 to-violet-500/10',
    border: 'border-purple-500/30',
    accent: 'text-purple-400',
    badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  },
  {
    title: 'MongoDB Database Design',
    issuer: 'Online Course',
    category: 'Database',
    color: 'from-yellow-500/20 to-orange-500/10',
    border: 'border-yellow-500/30',
    accent: 'text-yellow-400',
    badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  },
  {
    title: 'WordPress & Elementor',
    issuer: 'Online Course',
    category: 'CMS',
    color: 'from-blue-500/20 to-indigo-500/10',
    border: 'border-blue-500/30',
    accent: 'text-blue-400',
    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  },
  {
    title: 'UI/UX & Tailwind CSS',
    issuer: 'Online Course',
    category: 'Design',
    color: 'from-pink-500/20 to-rose-500/10',
    border: 'border-pink-500/30',
    accent: 'text-pink-400',
    badge: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 14 },
  },
};

export default function Certificates() {
  return (
    <section
      className="flex flex-col gap-12 px-6 py-16 max-w-[80%] mx-auto w-full"
      id="certificates"
    >
      <div className="h-px w-full bg-slate-800 mb-4" />

      {/* Section header */}
      <motion.div
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-px bg-green-500" />
            <span className="font-body text-green-400 text-xs uppercase tracking-widest font-semibold">
              Achievements
            </span>
          </div>
          <h3 className="font-title text-3xl md:text-4xl font-bold flex items-center gap-3">
            <motion.span
              className="w-1.5 h-8 bg-green-500 rounded-full"
              initial={{ height: 0 }}
              whileInView={{ height: 32 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <span>
              <span className="text-green-500">My</span>{' '}
              <span className="text-white">Certificates</span>
            </span>
          </h3>
          <p className="font-body text-slate-400 mt-3 max-w-lg leading-relaxed">
            A collection of certifications I&apos;ve earned through dedicated
            learning and hands-on practice across web development and design.
          </p>
        </div>

        {/* View all button */}
        <motion.a
          href={DRIVE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start md:self-auto flex items-center gap-2 px-5 py-3 rounded-full bg-green-500/10 border border-green-500/40 text-green-400 font-title font-semibold text-sm hover:bg-green-500 hover:text-white transition-all shrink-0"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGoogleDrive className="text-base" />
          View All Certificates
          <FaExternalLinkAlt className="text-xs" />
        </motion.a>
      </motion.div>

      {/* Decorative stat bar */}
      <motion.div
        className="flex flex-wrap gap-6 p-6 rounded-2xl bg-surface-dark/40 border border-slate-800"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {[
          { label: 'Certificates Earned', value: '6+', icon: FaAward },
          { label: 'Verified & Authentic', value: '100%', icon: MdVerified },
          { label: 'Courses Completed', value: '10+', icon: BsPatchCheckFill },
        ].map((stat, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <stat.icon className="text-green-400 text-lg" />
            </div>
            <div>
              <div className="font-title text-xl font-bold text-white">
                {stat.value}
              </div>
              <div className="font-body text-xs text-slate-500">
                {stat.label}
              </div>
            </div>
            {i < 2 && (
              <div className="hidden sm:block w-px h-8 bg-slate-700 ml-3" />
            )}
          </div>
        ))}
      </motion.div>

      {/* Certificate cards grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {certificates.map((cert, index) => (
          <motion.a
            key={index}
            href={DRIVE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative flex flex-col gap-4 p-6 rounded-2xl bg-linear-to-br ${cert.color} border ${cert.border} backdrop-blur-sm cursor-pointer group overflow-hidden`}
          >
            {/* Subtle glow on hover */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  'radial-gradient(circle at 50% 0%, rgba(34,197,94,0.08) 0%, transparent 70%)',
              }}
            />

            {/* Top row */}
            <div className="flex items-start justify-between gap-3 relative z-10">
              <div
                className={`w-10 h-10 rounded-xl bg-slate-900/60 border ${cert.border} flex items-center justify-center shrink-0`}
              >
                <FaAward className={`${cert.accent} text-lg`} />
              </div>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cert.badge} font-body`}
              >
                {cert.category}
              </span>
            </div>

            {/* Certificate info */}
            <div className="relative z-10 flex flex-col gap-1.5">
              <h4 className="font-title text-base font-bold text-white leading-snug group-hover:text-green-300 transition-colors">
                {cert.title}
              </h4>
              <p className="font-body text-xs text-slate-400 flex items-center gap-1.5">
                <BsPatchCheckFill className="text-green-500 shrink-0" />
                {cert.issuer}
              </p>
            </div>

            {/* Footer link hint */}
            <div className="relative z-10 flex items-center gap-1.5 mt-auto pt-2 border-t border-slate-700/50">
              <FaGoogleDrive className="text-slate-500 text-xs" />
              <span className="font-body text-xs text-slate-500 group-hover:text-green-400 transition-colors">
                View on Google Drive
              </span>
              <FaExternalLinkAlt className="text-slate-600 text-[10px] ml-auto group-hover:text-green-400 transition-colors" />
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* Big CTA banner */}
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-green-500/20 bg-linear-to-r from-green-500/10 via-slate-900 to-green-500/5 p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Background decoration */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-green-500/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute left-1/4 bottom-0 w-32 h-32 bg-green-500/5 rounded-full translate-y-1/2 pointer-events-none" />

        <div className="relative z-10">
          <h4 className="font-title text-xl font-bold text-white mb-1">
            Want to see all my certificates?
          </h4>
          <p className="font-body text-slate-400 text-sm max-w-md">
            All my verified certificates are stored on Google Drive. Click below
            to browse the full collection.
          </p>
        </div>

        <motion.a
          href={DRIVE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 flex items-center gap-2 px-7 py-3.5 rounded-full bg-green-500 hover:bg-green-400 text-white font-title font-bold text-sm shadow-lg shadow-green-500/25 shrink-0 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGoogleDrive className="text-base" />
          Open Google Drive
          <FaExternalLinkAlt className="text-xs" />
        </motion.a>
      </motion.div>
    </section>
  );
}
