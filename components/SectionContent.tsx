import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DESIGN_TOKENS } from '../constants';
import { X, ArrowRight, BookOpen, Layers, Settings, ExternalLink } from 'lucide-react';

// Fix for Framer Motion types
const MotionDiv = motion.div as any;

// Constants
const PROFILE_IMAGE_URL = "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31p97dcddis6g4a6u3ftf0ei87fl8pog?imageView2/2/w/540/format/webp|imageMogr2/strip2";

// --- Types ---
interface Project {
  id: number;
  title: string;
  category: string;
  metrics: string;
  url?: string;
  details: {
    strategy: string;
    product: string;
    project: string;
  };
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Mercedes-Benz China",
    category: "Digital Experience",
    metrics: "Conversion +15%",
    url: "https://www.mercedes-benz.com.cn/",
    details: {
      strategy: "Redefined the digital luxury experience by aligning brand heritage with modern web usability standards.",
      product: "Implemented a modular design system allowing rapid content updates across regional markets.",
      project: "Managed cross-functional teams across 3 time zones, delivering the revamp 2 weeks ahead of schedule."
    }
  },
  {
    id: 2,
    title: "Hisense Branding",
    category: "Global Marketing",
    metrics: "Brand Lift +22%",
    details: {
      strategy: "Shifted perception from 'utility' to 'smart living' through targeted storytelling campaigns.",
      product: "Developed interactive campaign landing pages focusing on user engagement and emotional connection.",
      project: "Coordinated with global agency partners to ensure consistent messaging across EU and NA markets."
    }
  },
  {
    id: 3,
    title: "Hisense Strategy",
    category: "Corporate Planning",
    metrics: "Efficiency +30%",
    details: {
      strategy: "Analyzed 5-year market trends to identify key growth vectors in IoT and Smart Home sectors.",
      product: "Defined the roadmap for the internal strategic dashboard used by C-level executives.",
      project: "Led the digital transformation initiative, integrating siloed data systems into a unified source of truth."
    }
  }
];

// --- Sub-Components ---

// 1. WORK SECTION
export const WorkSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedProject = PROJECTS.find(p => p.id === selectedId);

  return (
    <div className="w-full h-full flex flex-col pt-24 px-4 md:px-12 pb-12 overflow-y-auto">
      <h2 className="text-4xl font-bold text-white mb-8 font-orbitron">Selected Work</h2>
      
      {/* Bento Grid - ALL cards equal width */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mx-auto">
        {PROJECTS.map((project) => (
          <MotionDiv
            key={project.id}
            layoutId={`card-${project.id}`}
            onClick={() => setSelectedId(project.id)}
            className="group relative bg-white/5 border border-white/10 p-6 rounded-xl cursor-pointer hover:bg-white/10 transition-colors backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex justify-between items-start mb-4">
               <span className="text-[color:var(--primary)] font-orbitron text-xs tracking-wider border border-[color:var(--primary)] px-2 py-1 rounded" style={{ '--primary': DESIGN_TOKENS.palette.primary } as React.CSSProperties}>
                 {project.category}
               </span>
               <span className="text-white/80 font-orbitron text-xs bg-white/10 px-2 py-1 rounded">
                 {project.metrics}
               </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 font-orbitron">{project.title}</h3>
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
               <ArrowRight color={DESIGN_TOKENS.palette.primary} />
            </div>
          </MotionDiv>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <MotionDiv 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            <MotionDiv 
              layoutId={`card-${selectedId}`}
              className="w-full max-w-2xl bg-[#0A0A0A] border border-white/20 rounded-2xl p-8 overflow-hidden relative"
              onClick={(e: any) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white"
              >
                <X />
              </button>

              <h2 className="text-3xl font-bold text-white mb-1 font-orbitron">{selectedProject.title}</h2>
              {selectedProject.url && (
                <a href={selectedProject.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[color:var(--primary)] text-sm font-orbitron mb-6 hover:underline" style={{ '--primary': DESIGN_TOKENS.palette.primary } as React.CSSProperties}>
                  Visit Site <ExternalLink size={14} />
                </a>
              )}
              
              <div className="space-y-6 mt-6">
                 {/* Strategy */}
                 <div className="border-l-2 pl-4 border-[color:var(--secondary)]" style={{ '--secondary': DESIGN_TOKENS.palette.secondary } as React.CSSProperties}>
                    <h4 className="text-white font-orbitron text-sm uppercase tracking-widest mb-1 opacity-70">Strategy</h4>
                    <p className="text-gray-300 text-sm leading-relaxed font-orbitron">{selectedProject.details.strategy}</p>
                 </div>
                 {/* Product */}
                 <div className="border-l-2 pl-4 border-[color:var(--primary)]" style={{ '--primary': DESIGN_TOKENS.palette.primary } as React.CSSProperties}>
                    <h4 className="text-white font-orbitron text-sm uppercase tracking-widest mb-1 opacity-70">Product</h4>
                    <p className="text-gray-300 text-sm leading-relaxed font-orbitron">{selectedProject.details.product}</p>
                 </div>
                 {/* Project */}
                 <div className="border-l-2 pl-4 border-white">
                    <h4 className="text-white font-orbitron text-sm uppercase tracking-widest mb-1 opacity-70">Project</h4>
                    <p className="text-gray-300 text-sm leading-relaxed font-orbitron">{selectedProject.details.project}</p>
                 </div>
              </div>
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

// 2. ABOUT SECTION
export const AboutSection: React.FC = () => {
  const [imgSrc, setImgSrc] = useState(PROFILE_IMAGE_URL);

  return (
    <div className="w-full h-full flex flex-col pt-24 px-4 md:px-12 pb-12 overflow-y-auto no-scrollbar">
       <div className="max-w-5xl mx-auto w-full space-y-20">
          
          {/* Section 1: Philosophy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { icon: <BookOpen size={32} />, title: "The North Star", subtitle: "Strategy", desc: "Macro Trends, Competitive Analysis, Business Models." },
               { icon: <Layers size={32} />, title: "The Blueprint", subtitle: "Product", desc: "User Empathy, Feature Definition, MVP Validation." },
               { icon: <Settings size={32} />, title: "The Engine", subtitle: "Project", desc: "Gantt Charts, Risk Control, Resource Allocation." }
             ].map((card, i) => (
               <MotionDiv 
                 key={i}
                 className="bg-white/5 border border-white/10 p-8 rounded-xl flex flex-col items-center text-center gap-4 hover:border-[color:var(--primary)] transition-colors group"
                 style={{ '--primary': DESIGN_TOKENS.palette.primary } as React.CSSProperties}
                 whileHover={{ y: -5, scale: 1.02 }}
               >
                 <div className="text-[color:var(--primary)] group-hover:scale-110 transition-transform duration-300" style={{ '--primary': DESIGN_TOKENS.palette.primary } as React.CSSProperties}>
                   {card.icon}
                 </div>
                 <div>
                   <h3 className="text-xl font-bold tracking-wider text-white font-orbitron">{card.title}</h3>
                   <span className="text-xs font-orbitron uppercase tracking-widest text-gray-500">{card.subtitle}</span>
                 </div>
                 <p className="text-gray-400 text-sm font-orbitron">{card.desc}</p>
               </MotionDiv>
             ))}
          </div>

          {/* Section 2: Skills & Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             {/* Skills */}
             <div>
                <h3 className="text-2xl font-bold tracking-wider text-white font-orbitron mb-6">Capabilities</h3>
                <div className="space-y-6">
                   <div>
                     <span className="text-xs font-orbitron text-gray-500 block mb-2">// STRATEGIC</span>
                     <div className="flex flex-wrap gap-2">
                       {['DSTE', 'SWOT', 'PESTEL', "Porter's Five Forces"].map(tag => (
                         <span key={tag} className="px-3 py-1 bg-white/10 rounded text-sm text-[color:var(--secondary)] font-orbitron border border-transparent hover:border-[color:var(--secondary)] transition-all" style={{ '--secondary': DESIGN_TOKENS.palette.secondary } as React.CSSProperties}>
                           {tag}
                         </span>
                       ))}
                     </div>
                   </div>
                   <div>
                     <span className="text-xs font-orbitron text-gray-500 block mb-2">// PRODUCT & PROJECT</span>
                     <div className="flex flex-wrap gap-2">
                       {['Figma', 'Jira', 'Notion', 'SQL', 'Roadmapping', 'Agile'].map(tag => (
                         <span key={tag} className="px-3 py-1 bg-white/10 rounded text-sm text-[color:var(--primary)] font-orbitron border border-transparent hover:border-[color:var(--primary)] transition-all" style={{ '--primary': DESIGN_TOKENS.palette.primary } as React.CSSProperties}>
                           {tag}
                         </span>
                       ))}
                     </div>
                   </div>
                </div>
             </div>

             {/* Timeline (Changelog style) */}
             <div>
                <h3 className="text-2xl font-bold tracking-wider text-white font-orbitron mb-6">Education</h3>
                <div className="border-l border-white/20 ml-2 space-y-8">
                   <div className="relative pl-8">
                      <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-[color:var(--primary)]" style={{ '--primary': DESIGN_TOKENS.palette.primary } as React.CSSProperties}></div>
                      <span className="font-orbitron text-xs text-gray-500 block mb-1">2009.09 - 2013.06</span>
                      <h4 className="text-white font-bold font-orbitron">Beijing Foreign Studies University</h4>
                      <p className="text-gray-400 text-sm font-orbitron">Master Degree, Simultaneous Interpreting</p>
                   </div>
                   {/* Add more timeline items here if needed */}
                </div>
             </div>
          </div>

          {/* Section 3: Love Life */}
          <div className="flex flex-col items-center justify-center py-12 border-t border-white/10">
             <h3 className="text-2xl font-bold tracking-wider text-white font-orbitron mb-8">This is also about me</h3>
             <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white/10 relative shrink-0">
                   <img 
                      key={imgSrc} 
                      src={imgSrc}
                      onError={(e) => {
                        // If profile fails, we fallback to placeholder
                        if (imgSrc === PROFILE_IMAGE_URL) {
                             console.warn(`Failed to load profile image. Fallback to placeholder.`);
                             setImgSrc("https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?q=80&w=1000&auto=format&fit=crop");
                        }
                      }}
                      alt="Life - Recording the long-lost summer" 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                   />
                </div>
                <div className="text-center md:text-left">
                   <p className="font-orbitron font-bold tracking-normal text-4xl text-white mb-2">Love Life</p>
                   <p className="text-gray-400 max-w-xs font-orbitron">Live the moment.</p>
                </div>
             </div>
          </div>

       </div>
    </div>
  );
}

// 3. CONTACT SECTION
export const ContactSection: React.FC = () => {
  const REDNOTE_URL = "https://www.xiaohongshu.com/user/profile/5b407af0e8ac2b6b1fdb3a48";

  return (
    <div className="w-full h-full flex flex-col justify-center items-center pt-24 px-4 pb-12">
       <div className="bg-white/5 backdrop-blur-md border border-white/10 p-12 rounded-2xl flex flex-col items-center gap-8 max-w-md w-full relative overflow-hidden group">
           
           {/* Glow effect behind */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[color:var(--primary)] blur-[100px] opacity-20 pointer-events-none" style={{ '--primary': DESIGN_TOKENS.palette.primary } as React.CSSProperties}></div>

           <h2 className="text-3xl font-bold text-white font-orbitron z-10">Let's Connect</h2>
           
           <a 
             href={REDNOTE_URL} 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex items-center gap-6 bg-[#FF2442]/10 px-8 py-6 rounded-2xl border border-[#FF2442]/30 w-full hover:bg-[#FF2442]/20 transition-all cursor-pointer group/card z-10"
           >
              {/* Profile Image (Avatar) */}
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#FF2442] shrink-0 shadow-[0_0_15px_rgba(255,36,66,0.3)]">
                  <img 
                    src={PROFILE_IMAGE_URL} 
                    alt="Rednote Profile" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?q=80&w=1000&auto=format&fit=crop"; 
                    }}
                  />
              </div>
              
              <div className="flex flex-col flex-1">
                 <div className="flex items-center gap-2 mb-1">
                    <span className="text-white text-lg font-bold font-orbitron tracking-wide">Polly Liu</span>
                    <ExternalLink size={14} className="text-[#FF2442] opacity-0 group-hover/card:opacity-100 transition-opacity" />
                 </div>
                 <span className="text-xs text-[#FF2442] font-orbitron uppercase tracking-wider mb-0.5">Rednote ID: 424956997</span>
                 <span className="text-xs text-gray-400 font-orbitron">Product & Strategy</span>
              </div>
           </a>
           
           <div className="z-10 text-center">
             <p className="text-gray-400 text-sm font-orbitron mb-2">
               Click to view full profile on Xiaohongshu
             </p>
           </div>
       </div>
    </div>
  );
}