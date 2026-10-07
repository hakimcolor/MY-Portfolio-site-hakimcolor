'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Certificates from '@/components/Certificates';
import Contact from '@/components/Contact';
import Sidebar from '@/components/Sidebar';
import LoadingScreen from '@/components/LoadingScreen';
import Footer from '@/components/Footer';
import ThreeBackground from '@/components/ThreeBackground';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <ThreeBackground />
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <Header />
          <Sidebar />
          <div className="md:pl-24 pb-16 md:pb-0">
            <Hero />
            <main className="flex-1 w-full flex flex-col">
              <About />
              <Projects />
              <Certificates />
              <Contact />
            </main>
            <Footer />
          </div>
        </motion.div>
      )}
    </>
  );
}
