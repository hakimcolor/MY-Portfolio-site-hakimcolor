'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaBootstrap,
  FaWordpress,
  FaGitAlt,
  FaGithub,
  FaNpm,
  FaElementor,
  FaDocker,
} from 'react-icons/fa';
import {
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiDaisyui,
  SiNetlify,
  SiVercel,
  SiPostman,
  SiWoocommerce,
  SiTypescript,
  SiPrisma,
  SiPostgresql,
  SiMysql,
} from 'react-icons/si';
import {
  MdSchool,
  MdMenuBook,
  MdPerson,
  MdEmail,
  MdWork,
  MdLocationOn,
  MdQuestionAnswer,
} from 'react-icons/md';
import { TbBrandNextjs, TbBrandVscode, TbCircleLetterN } from 'react-icons/tb';
import { IoChevronDown } from 'react-icons/io5';
import { VscDatabase } from 'react-icons/vsc';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 12 },
  },
};
const infoItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 100, damping: 12 },
  },
};

function SectionHeading({ green, white }) {
  return (
    <motion.h3
      className="font-title text-3xl font-bold flex items-center gap-3"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        className="w-1.5 h-8 bg-green-500 rounded-full"
        initial={{ height: 0 }}
        whileInView={{ height: 32 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <span>
        <span className="text-green-500">{green}</span>
        {white && <span className="text-white"> {white}</span>}
      </span>
    </motion.h3>
  );
}

export default function About() {
  return (
    <section
      className="w-full px-6 pb-20 max-w-[80%] mx-auto flex flex-col gap-16 relative z-10"
      id="about"
    >
      <div className="h-px w-full bg-slate-800 mb-4" />
      <motion.div
        className="flex flex-col gap-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <AboutMe />
        <Skills />
      </motion.div>
      <motion.div
        className="grid grid-cols-1 xl:grid-cols-2 gap-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Experience />
        <Education />
      </motion.div>
      <FAQ />
    </section>
  );
}

function AboutMe() {
  const infoItems = [
    {
      label: 'Name',
      value: 'Muhamaad Azizul Hakim',
      icon: MdPerson,
      color: 'text-green-400',
    },
    {
      label: 'Email',
      value: 'hakimcolor777@gmail.com',
      icon: MdEmail,
      color: 'text-violet-400',
    },
    {
      label: 'Experience',
      value: '2+ years experience',
      icon: MdWork,
      color: 'text-white',
    },
    {
      label: 'Location',
      value: 'Dhaka, Bangladesh',
      icon: MdLocationOn,
      color: 'text-green-500',
    },
  ];

  return (
    <motion.div className="space-y-6" variants={itemVariants}>
      <SectionHeading green="About" white="Me" />
      <motion.div
        className="border border-slate-800 rounded-2xl p-6 lg:p-8 shadow-xl relative overflow-hidden bg-surface-dark/30"
        whileHover={{ borderColor: 'rgba(34,197,94,0.3)' }}
        transition={{ duration: 0.3 }}
      >
        {/* Top green accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-green-500/50 rounded-t-2xl" />
        <motion.p
          className="font-body text-slate-300 leading-relaxed text-lg relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          I&apos;m{' '}
          <span className="text-white font-semibold">
            Muhamaad Azizul Hakim
          </span>
          , a MERN Stack &amp; Full Stack Developer with 2+ years of hands-on
          experience building scalable, high-performance web applications. I
          specialize in MongoDB, Express.js, React.js, Node.js,{' '}
          <span className="text-green-400">
            PostgreSQL, SQL, Prisma, and TypeScript
          </span>{' '}
          — crafting clean architecture and user-centric digital experiences.
        </motion.p>
        <motion.p
          className="font-body text-slate-300 leading-relaxed text-lg relative z-10 mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Whether it&apos;s a full-stack app, REST API, or a polished marketing
          site — I deliver fast, reliable, and maintainable code. I&apos;m also
          a{' '}
          <span className="text-green-400">WordPress Elementor Developer</span>,
          building conversion-optimized, SEO-friendly websites.
        </motion.p>
        <motion.p
          className="font-body text-slate-300 leading-relaxed text-lg relative z-10 mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          I value clean code, continuous learning, and strong collaboration.
          Search{' '}
          <span className="text-green-400 font-semibold">
            &quot;hakimcolor&quot;
          </span>{' '}
          on any platform and you&apos;ll find me!
        </motion.p>

        <motion.div
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {infoItems.map((item, index) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-3 border-l-2 border-slate-700 pl-4"
              variants={infoItemVariants}
              whileHover={{
                x: 5,
                borderColor: '#22c55e',
                transition: { duration: 0.2 },
              }}
            >
              <item.icon className={`text-2xl ${item.color}`} />
              <div className="flex flex-col">
                <span className="font-body text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                  {item.label}
                </span>
                <span className="font-body text-white font-medium">
                  {item.value}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Skills() {
  const skillCategories = [
    {
      title: 'Frontend',
      rest: ' Development',
      accent: '#61DAFB',
      skills: [
        { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
        { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
        { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
        { name: 'React JS', icon: FaReact, color: '#61DAFB' },
        { name: 'Next.js', icon: TbBrandNextjs, color: '#ffffff' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8' },
        { name: 'Bootstrap', icon: FaBootstrap, color: '#7952B3' },
        { name: 'DaisyUI', icon: SiDaisyui, color: '#F472B6' },
      ],
    },
    {
      title: 'Backend',
      rest: ' Development',
      accent: '#339933',
      skills: [
        { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
        { name: 'Express.js', icon: SiExpress, color: '#ffffff' },
        { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
        { name: 'SQL', icon: VscDatabase, color: '#22c55e' },
        { name: 'Prisma', icon: SiPrisma, color: '#5a67d8' },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      ],
    },
    {
      title: 'Database',
      rest: '',
      accent: '#47A248',
      skills: [
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
        { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
        { name: 'MySQL', icon: SiMysql, color: '#00758F' },
        { name: 'NoSQL', icon: VscDatabase, color: '#22c55e' },
      ],
    },
    {
      title: 'Tools',
      rest: ' & Technologies',
      accent: '#F05032',
      skills: [
        { name: 'VS Code', icon: TbBrandVscode, color: '#007ACC' },
        { name: 'Git', icon: FaGitAlt, color: '#F05032' },
        { name: 'GitHub', icon: FaGithub, color: '#ffffff' },
        { name: 'NPM', icon: FaNpm, color: '#CB3837' },
        { name: 'Netlify', icon: SiNetlify, color: '#00C7B7' },
        { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
        { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
        { name: 'Docker', icon: FaDocker, color: '#2496ED' },
        { name: 'Beekeeper', icon: VscDatabase, color: '#22c55e' },
        { name: 'CI/CD', icon: FaGitAlt, color: '#F05032' },
      ],
    },
    {
      title: 'WordPress',
      rest: ' Development',
      accent: '#21759B',
      skills: [
        { name: 'WordPress', icon: FaWordpress, color: '#21759B' },
        { name: 'Elementor', icon: FaElementor, color: '#E2155A' },
        { name: 'WooCommerce', icon: SiWoocommerce, color: '#96588A' },
      ],
    },
  ];

  return (
    <motion.div className="space-y-8" id="skills" variants={itemVariants}>
      <SectionHeading green="Skills" white="" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {skillCategories.map((category, catIndex) => (
          <motion.div
            key={category.title}
            className="border border-slate-800 rounded-2xl p-6 shadow-xl overflow-hidden relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: catIndex * 0.08, duration: 0.5 }}
            whileHover={{ borderColor: 'rgba(34,197,94,0.3)' }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
              style={{ backgroundColor: category.accent, opacity: 0.7 }}
            />
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-1 h-6 rounded-full"
                style={{ backgroundColor: category.accent }}
              />
              <h4 className="font-title text-lg font-bold">
                <span style={{ color: category.accent }}>{category.title}</span>
                <span className="text-white">{category.rest}</span>
              </h4>
            </div>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  className="flex flex-col items-center gap-1.5 p-3 border border-slate-700/50 rounded-xl bg-slate-800/30 cursor-default group"
                  whileHover={{
                    scale: 1.1,
                    y: -3,
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  style={{
                    '--icon-color': skill.color,
                  }}
                >
                  <skill.icon
                    className="text-2xl transition-all duration-200 group-hover:drop-shadow-[0_0_6px_var(--icon-color)]"
                    style={{ color: skill.color }}
                  />
                  <span className="font-body text-xs text-slate-400 whitespace-nowrap group-hover:text-slate-200 transition-colors">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function Experience() {
  const experiences = [
    {
      title: 'Freelance Web Developer',
      company: 'Self-Employed',
      period: '2023 - Present',
      description:
        'Building custom websites and web applications for clients using MERN stack, TypeScript, PostgreSQL, and WordPress Elementor.',
    },
    {
      title: 'Full Stack Development Training',
      company: 'Programming Hero',
      period: '2024 - 2025',
      description:
        'Completed intensive training in MongoDB, Express.js, React.js, Node.js, and modern web development practices.',
    },
  ];

  return (
    <motion.div className="space-y-6" id="experience" variants={itemVariants}>
      <SectionHeading green="Experience" white="" />
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="relative pl-8 before:absolute before:left-3 before:top-0 before:h-full before:w-px before:bg-slate-800"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <motion.div
              className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-surface-dark border-2 border-green-500 flex items-center justify-center"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.2 + 0.3,
                type: 'spring',
                stiffness: 200,
              }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-green-500"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <motion.div
              className="border border-slate-800 p-5 rounded-xl"
              whileHover={{ x: 5, borderColor: 'rgba(34,197,94,0.3)' }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1">
                <h4 className="font-title text-lg font-bold">
                  <span className="text-green-500">
                    {exp.title.split(' ')[0]}
                  </span>
                  <span className="text-white">
                    {' '}
                    {exp.title.split(' ').slice(1).join(' ')}
                  </span>
                </h4>
                <span className="font-body text-xs font-mono py-1 px-2 rounded bg-slate-800 text-green-400 w-fit">
                  {exp.period}
                </span>
              </div>
              <p className="font-body text-sm font-medium text-slate-300 mb-2">
                {exp.company}
              </p>
              <p className="font-body text-sm text-slate-400 leading-relaxed">
                {exp.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function Education() {
  const educations = [
    {
      title: 'BBA in Management',
      institution: 'National University of Bangladesh',
      period: '2024 - 2027',
      description: 'Pursuing undergraduate degree in Business Administration.',
      icon: MdSchool,
    },
    {
      title: 'Full Stack Certification',
      institution: 'Programming Hero',
      period: '2025',
      description:
        'Intensive bootcamp covering MERN stack development and deployment.',
      icon: MdMenuBook,
    },
  ];

  return (
    <motion.div className="space-y-6" id="education" variants={itemVariants}>
      <SectionHeading green="Education" white="" />
      <div className="space-y-4">
        {educations.map((edu, index) => (
          <motion.div
            key={index}
            className="border border-slate-800 p-5 rounded-xl flex gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ x: 5, borderColor: 'rgba(34,197,94,0.3)' }}
          >
            <div className="w-12 h-12 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
              <edu.icon className="text-green-400 text-2xl" />
            </div>
            <div>
              <h4 className="font-title text-lg font-bold">
                <span className="text-green-500">
                  {edu.title.split(' ')[0]}
                </span>
                <span className="text-white">
                  {' '}
                  {edu.title.split(' ').slice(1).join(' ')}
                </span>
              </h4>
              <p className="font-body text-green-400 font-medium text-sm mb-1">
                {edu.institution}
              </p>
              <p className="font-body text-slate-500 text-xs mb-2">
                {edu.period}
              </p>
              <p className="font-body text-slate-400 text-sm">
                {edu.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    {
      question: 'Why should you hire me?',
      answer:
        'I bring a strong combination of MERN stack, TypeScript, PostgreSQL, and WordPress expertise. I write clean, maintainable code while ensuring responsive design and excellent UX. I focus on your business goals — helping you grow through effective digital solutions.',
    },
    {
      question: 'How can I help grow your e-commerce business?',
      answer:
        'I build fast, SEO-optimized eCommerce websites using React/Next.js or WordPress with WooCommerce. I focus on conversion optimization, mobile responsiveness, secure payment integration, and a smooth user experience.',
    },
    {
      question: 'What makes my development approach different?',
      answer:
        'I prioritize communication and understanding your business goals first. I write clean, scalable code with proper documentation using modern technologies like TypeScript, Prisma, and PostgreSQL for long-term maintainability.',
    },
    {
      question: 'What is my project delivery process?',
      answer:
        'Structured 5-step approach: 1) Requirements gathering, 2) Design mockups and approval, 3) Development with regular updates, 4) Testing and QA, 5) Deployment and handoff. I keep you informed at every step.',
    },
  ];

  return (
    <motion.div
      className="space-y-6"
      id="faq"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <SectionHeading green="Frequently" white="Asked Questions" />
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="border border-slate-800 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ borderColor: 'rgba(34,197,94,0.3)' }}
          >
            <button
              className="w-full p-5 flex items-center justify-between text-left"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <MdQuestionAnswer className="text-green-400 text-lg" />
                </div>
                <span className="font-title text-base font-semibold text-white">
                  {faq.question}
                </span>
              </div>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-green-500"
              >
                <IoChevronDown className="text-xl" />
              </motion.div>
            </button>
            <motion.div
              initial={false}
              animate={{
                height: openIndex === index ? 'auto' : 0,
                opacity: openIndex === index ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 ml-12 border-l-2 border-green-500/20 pl-4">
                <p className="font-body text-slate-300 leading-relaxed text-sm">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
