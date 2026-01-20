import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PreKidsContent from './PreKidsContent';
import KidsContent from './KidsContent';
import ProfessionalContent from './ProfessionalContent';

const ProgramsHub: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1); // Start with Kids (middle option)

  const programs = [
    {
      id: 'pre-kids',
      title: 'Pre-Kids',
      component: <PreKidsContent />,
      // Light Green Theme
      themeColor: 'bg-green-300' 
    },
    {
      id: 'kids',
      title: 'Kids',
      component: <KidsContent />,
      // Medium Green Theme
      themeColor: 'bg-green-600'
    },
    {
      id: 'professional',
      title: 'Profesional',
      component: <ProfessionalContent />,
      // Dark Green Theme
      themeColor: 'bg-green-900'
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % programs.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + programs.length) % programs.length);
  };

  // Helper to determine position based on index relative to active
  const getPositionClass = (index: number) => {
    const position = (index - activeIndex + programs.length) % programs.length;

    if (position === 0) {
      // ACTIVE CARD (CENTER) - Reduced width by ~15%
      return "z-30 scale-100 opacity-100 translate-x-0 cursor-auto shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border border-white/50";
    } else if (position === 1) {
      // RIGHT CARD - Adjusted translation for narrower cards
      return "z-10 scale-[0.80] opacity-40 blur-[4px] translate-x-[15%] md:translate-x-[55%] cursor-pointer hover:opacity-60 transition-opacity pointer-events-none grayscale-[0.5]";
    } else {
      // LEFT CARD - Adjusted translation for narrower cards
      return "z-10 scale-[0.80] opacity-40 blur-[4px] -translate-x-[15%] md:-translate-x-[55%] cursor-pointer hover:opacity-60 transition-opacity pointer-events-none grayscale-[0.5]";
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-100 overflow-hidden flex flex-col items-center py-8 relative">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-green-200/30 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-200/30 rounded-full blur-[100px]"></div>
      </div>

      {/* Header Text */}
      <div className="text-center max-w-3xl px-6 mb-6 z-40 relative">
        <span className="inline-block py-1 px-3 rounded-full bg-white border border-slate-200 text-green-800 font-bold tracking-widest text-[10px] uppercase mb-3 shadow-sm">
            Nuestros Niveles
        </span>
        <h1 className="font-fraunces text-3xl md:text-5xl text-slate-900 leading-tight">
           Formación para <span className="text-green-700 italic">Cada Etapa</span>
        </h1>
      </div>

      {/* 3D Carousel Container */}
      <div className="relative w-full max-w-7xl mx-auto h-[80vh] md:h-[85vh] flex items-center justify-center perspective-1000">
        
        {/* Navigation Buttons */}
        <button 
            onClick={prevSlide}
            className="absolute left-4 md:left-12 z-50 bg-white/80 backdrop-blur-md text-slate-800 p-4 rounded-full shadow-xl border border-white hover:bg-green-700 hover:text-white transition-all duration-300 hover:scale-110 group"
        >
            <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
        </button>

        <button 
            onClick={nextSlide}
            className="absolute right-4 md:right-12 z-50 bg-white/80 backdrop-blur-md text-slate-800 p-4 rounded-full shadow-xl border border-white hover:bg-green-700 hover:text-white transition-all duration-300 hover:scale-110 group"
        >
            <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Cards Area */}
        <div className="relative w-full h-full flex items-center justify-center">
            {programs.map((program, index) => (
                <div
                    key={program.id}
                    className={`
                        absolute 
                        w-[85%] md:w-[60%] lg:w-[55%] h-full 
                        transition-all duration-700 ease-in-out
                        bg-white rounded-[3rem] overflow-hidden
                        ${getPositionClass(index)}
                    `}
                    onClick={() => {
                        const position = (index - activeIndex + programs.length) % programs.length;
                        if(position === 1) nextSlide();
                        if(position === 2 || position === -1) prevSlide();
                    }}
                >
                    {/* Inner Scroll Container */}
                    <div className="w-full h-full overflow-y-auto custom-scrollbar relative bg-white">
                        <div className="origin-top transform scale-100 h-full">
                           {/* Content Wrapper */}
                           <div className="h-full">
                               {program.component}
                           </div>
                        </div>
                    </div>
                    
                    {/* Gradient Overlay at bottom */}
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-20"></div>
                </div>
            ))}
        </div>

      </div>

      {/* Pagination Dots */}
      <div className="flex gap-4 mt-6 z-40">
        {programs.map((prog, idx) => (
            <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-500 rounded-full flex items-center gap-2 px-1 ${
                    activeIndex === idx 
                    ? 'w-auto h-3 bg-green-700' 
                    : 'w-3 h-3 bg-slate-300 hover:bg-slate-400'
                }`}
            >
                {activeIndex === idx && (
                    <span className="text-[9px] text-white font-bold uppercase px-2 whitespace-nowrap animate-fade-in">
                        {prog.title}
                    </span>
                )}
            </button>
        ))}
      </div>

    </div>
  );
};

export default ProgramsHub;