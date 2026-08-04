'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MdArrowForward } from 'react-icons/md';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    title: 'Local Chef Bazaar',
    description:
      'A local chef bazaar app where admins manage users, chefs upload food, and users order meals with JWT authentication and real-time updates.',
    image: '/localchefBzer_hakimcolor.png',
    liveUrl: 'https://localchefbazaarbyhakimcolor.netlify.app/',
    githubUrl:
      'https://github.com/hakimcolor/UI-LocalChefBazaar-Marketplace-for-Local-Home-Cooked-Meals',
    tags: [
      'React',
      'Node.js',
      'MongoDB',
      'Express',
      'JWT',
      'Firebase',
      'Tailwind CSS',
    ],
  },
  {
    title: 'Finance Management App',
    description:
      'A comprehensive money management application for tracking income, expenses, and financial reports with interactive charts and analytics.',
    image: '/finance management app.png',
    liveUrl: 'https://fineasmanagmentapp.netlify.app/',
    githubUrl:
      'https://github.com/hakimcolor/FinEaseUIIIIIIIIIIIIIIIIIIIIIIIII---Personal-Finance-Management-App',
    tags: [
      'MongoDB',
      'Express',
      'React',
      'Node.js',
      'Chart.js',
      'Tailwind CSS',
    ],
  },
  {
    title: 'Community Cleanliness',
    description:
      'A community-based platform where users can donate for public damage and upload posts about damaged public property to keep communities clean.',
    image: '/ComunityCCIRP.png',
    liveUrl: 'https://community-cleanliness.netlify.app/',
    githubUrl: 'https://github.com/hakimcolor/Community-cleanliness-and-issue',
    tags: [
      'React',
      'Node.js',
      'MongoDB',
      'Express',
      'Tailwind CSS',
      'Firebase',
    ],
  },
  {
    title: 'Winter Pet Care',
    description:
      'A pet care website where you can find many different services and book any service easily for your beloved pets during the winter season.',
    image: '/winter pet care.png',
    liveUrl: 'https://petcareinwinterssevises.netlify.app/',
    githubUrl: 'https://github.com/hakimcolor',
    tags: [
      'React',
      'Node.js',
      'MongoDB',
      'Express',
      'Firebase',
      'Tailwind CSS',
    ],
  },
];

export default function Projects() {
  return (
    <section
      className="flex flex-col gap-12 px-6 py-12 max-w-[95%] mx-auto w-full"
      id="projects"
    >
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="font-title text-3xl font-bold flex items-center gap-3">
          <motion.span
            className="w-1.5 h-8 bg-green-500 rounded-full"
            initial={{ height: 0 }}
            whileInView={{ height: 32 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <span>
            <span className="text-green-500">My</span>{' '}
            <span className="text-white">Projects</span>
          </span>
        </h3>
        <motion.div
          whileHover={{ x: 5 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <Link
            className="font-body text-sm font-medium text-green-400 hover:text-green-300 flex items-center gap-1"
            href="https://github.com/hakimcolor"
            target="_blank"
          >
            View all <MdArrowForward className="text-base" />
          </Link>
        </motion.div>
      </motion.div>

      <div className="flex flex-col gap-12">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={index}
              className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center border border-slate-800 rounded-2xl overflow-hidden p-6 lg:p-8`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ borderColor: 'rgba(34,197,94,0.3)' }}
            >
              {/* Image */}
              <motion.div
                className="w-full lg:w-1/2 h-60 lg:h-72 relative rounded-xl overflow-hidden shrink-0"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-title font-bold rounded-full text-sm flex items-center gap-2 transition-colors"
                  >
                    <FaExternalLinkAlt className="text-xs" /> Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-slate-900 border border-white/20 text-white font-title font-bold rounded-full text-sm flex items-center gap-2 hover:bg-white hover:text-slate-900 transition-colors"
                  >
                    <FaGithub /> GitHub
                  </a>
                </div>
              </motion.div>

              {/* Text */}
              <div className="flex flex-col gap-4 w-full lg:w-1/2">
                <h4 className="font-title text-2xl font-bold">
                  <span className="text-green-500">
                    {project.title.split(' ')[0]}
                  </span>
                  <span className="text-white">
                    {' '}
                    {project.title.split(' ').slice(1).join(' ')}
                  </span>
                </h4>
                <p className="font-body text-slate-400 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-body px-3 py-1 text-xs font-medium bg-slate-800 text-slate-300 rounded-full border border-slate-700 hover:border-green-500/50 hover:text-green-400 transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-2">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white font-title font-bold rounded-full text-sm flex items-center gap-2 transition-colors"
                  >
                    <FaExternalLinkAlt className="text-xs" /> Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-transparent border border-slate-600 text-white font-title font-bold rounded-full text-sm flex items-center gap-2 hover:border-green-500 hover:text-green-400 transition-colors"
                  >
                    <FaGithub /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
