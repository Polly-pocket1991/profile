import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DESIGN_TOKENS } from '../constants';
import { WorkSection, AboutSection, ContactSection } from './SectionContent';

// Fix for Framer Motion types in strict environment
const MotionDiv = motion.div as any;
const MotionFooter = motion.footer as any;
const MotionSpan = motion.span as any;

type Section = 'home' | 'work' | 'about' | 'contact';

const OverlayUI: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>('home');

  const navItems: { id: Section; label: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'work', label: 'WORK' },
    { id: 'about', label: 'ABOUT' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (section: Section) => {
    setCurrentSection(section);
  };

  const goHome = () => setCurrentSection('home');

  const introText = "mens et manus. From Abstract Vision to Tangible Reality.";
  const introWords = introText.split(" ");

  return (
    <div className="absolute top-0 left-0 w-full h-full z-10 flex flex-col pointer-events-none">
      
      {/* --- HEADER --- */}
      <header className="flex justify-between items-center w-full pointer-events-auto p-8 md:p-12 z-50 fixed top-0 left-0">
        <div 
          className="text-white text-2xl font-bold tracking-widest cursor-pointer" 
          style={{ fontFamily: DESIGN_TOKENS.fonts.hero }}
          onClick={goHome}
        >
          IDENTITY<span style={{ color: DESIGN_TOKENS.palette.primary }}>.</span>DEV
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm text-gray-400 font-orbitron">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`transition-colors duration-300 tracking-wider ${currentSection === item.id ? 'text-[color:var(--primary)]' : 'hover:text-white'}`}
              style={currentSection === item.id ? { '--primary': DESIGN_TOKENS.palette.primary } as React.CSSProperties : {}}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Icon */}
        <button 
          className="md:hidden text-white pointer-events-auto"
          onClick={() => setCurrentSection(currentSection === 'home' ? 'work' : 'home')}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </button>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 w-full h-full relative overflow-hidden pointer-events-auto">
        <AnimatePresence mode="wait">
          
          {/* HOME SECTION */}
          {currentSection === 'home' && (
            <MotionDiv
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full flex flex-col justify-center items-start p-8 md:p-12 max-w-4xl"
            >
              <div className="mt-20">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight mix-blend-difference" style={{ fontFamily: DESIGN_TOKENS.fonts.hero }}>
                    柳波含 <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--secondary)]" style={{ '--primary': DESIGN_TOKENS.palette.primary, '--secondary': DESIGN_TOKENS.palette.secondary } as React.CSSProperties}>
                      Polly Liu
                    </span>
                </h1>
                
                {/* Typewriter Effect - Reverted to font-mono (Roboto Mono) */}
                <p className="text-gray-400 text-lg md:text-xl font-mono max-w-lg mb-8 leading-relaxed tracking-wide flex flex-wrap gap-x-1.5">
                  {introWords.map((word, i) => (
                    <MotionSpan
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: i * 0.05 + 0.5 }}
                    >
                      {word}
                    </MotionSpan>
                  ))}
                </p>

                {/* Explore Work Button - Hover Green, Click to Work */}
                <button 
                  onClick={() => handleNavClick('work')}
                  className="group relative px-8 py-3 bg-transparent border border-white/20 text-white font-orbitron uppercase tracking-wider overflow-hidden transition-all hover:border-[color:var(--primary)] cursor-pointer" 
                  style={{ '--primary': DESIGN_TOKENS.palette.primary } as React.CSSProperties}
                >
                    {/* Text layer */}
                    <span className="relative z-10 group-hover:text-black transition-colors duration-300 font-bold">Explore Work</span>
                    {/* Background fill layer */}
                    <div className="absolute inset-0 bg-[color:var(--primary)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" style={{ '--primary': DESIGN_TOKENS.palette.primary } as React.CSSProperties}></div>
                </button>
              </div>
            </MotionDiv>
          )}

          {/* WORK SECTION */}
          {currentSection === 'work' && (
             <MotionDiv
                key="work"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
             >
                <WorkSection />
             </MotionDiv>
          )}

          {/* ABOUT SECTION */}
          {currentSection === 'about' && (
             <MotionDiv
                key="about"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
             >
                <AboutSection />
             </MotionDiv>
          )}

          {/* CONTACT SECTION */}
          {currentSection === 'contact' && (
             <MotionDiv
                key="contact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
             >
                <ContactSection />
             </MotionDiv>
          )}

        </AnimatePresence>
      </main>

      {/* --- FOOTER --- */}
      {currentSection === 'home' && (
        <MotionFooter 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="fixed bottom-0 left-0 w-full p-8 md:p-12 flex justify-between items-end pointer-events-auto text-xs md:text-sm text-gray-500 font-orbitron z-40"
        >
          <div className="flex flex-col gap-2">
        </MotionFooter>
      )}
    </div>
  );
};

export default OverlayUI;