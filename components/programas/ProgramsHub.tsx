import React, { useState } from 'react';
import PreKidsContent from './PreKidsContent';
import KidsContent from './KidsContent';
import ProfessionalContent from './ProfessionalContent';

const ProgramsHub: React.FC = () => {
  // Default to 'professional' which is index 2 in our array, or we can reorder.
  // Let's reorder to have Professional first as per request "Initially... Professional is enabled".
  // Actually, visually Professional is usually the last one in a reading progression (Pre -> Kids -> Pro),
  // but the request asks for Professional to be the "previous card" (or first/main one).
  // Let's stick to the visual order: Professional (Left/Top) -> Kids -> Pre-Kids? 
  // Or Pre-Kids -> Kids -> Professional?
  // User said: "Side by side... When professional is selected... right side are other cards".
  // This implies Professional is on the Left.
  // So Order: Professional, Kids, Pre-Kids.

  const [activeId, setActiveId] = useState<string>('professional');

  const programs = [
    {
      id: 'professional',
      title: 'Profesional',
      subtitle: 'Lectura Ágil',
      icon: 'school', // Material Icon name
      component: <ProfessionalContent />,
      color: 'bg-blue-50', // Light pastel blue
      activeColor: 'bg-white',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      id: 'kids',
      title: 'Kids',
      subtitle: 'Potencia Escolar',
      icon: 'child_care',
      component: <KidsContent />,
      color: 'bg-red-50', // Light pastel red
      activeColor: 'bg-white',
      borderColor: 'border-red-200',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      id: 'pre-kids',
      title: 'Pre-Kids',
      subtitle: 'Iniciación',
      icon: 'toys',
      component: <PreKidsContent />,
      color: 'bg-orange-50', // Light pastel orange
      activeColor: 'bg-white',
      borderColor: 'border-orange-200',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-white font-jakarta flex flex-col items-center pt-8 pb-12 md:pt-8 md:pb-16 relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-emerald-50/50 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[80px]"></div>
      </div>

      {/* Header Text - Improved Typography */}
      <div className="text-center max-w-4xl px-4 mb-8 z-10 relative">
        <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider mb-4">
          Nuestros Programas
        </span>
        <h1 className="font-fraunces text-3xl md:text-5xl lg:text-6xl text-slate-900 font-bold tracking-tight leading-tight">
          Formación para <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Cada Etapa</span>
        </h1>
      </div>

      {/* Accordion Container */}
      <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8 min-h-[500px] flex flex-col md:flex-row gap-4 md:gap-6 z-20 transition-all duration-700">
        {programs.map((program) => {
          const isActive = activeId === program.id;

          return (
            <div
              key={program.id}
              onClick={() => setActiveId(program.id)}
              className={`
                                group relative overflow-hidden rounded-[2rem] border transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer shadow-sm hover:shadow-md
                                ${isActive ? 'md:flex-[3] flex-[3] shadow-xl' : 'md:flex-[0.4] flex-[0.5] hover:flex-[0.5]'}
                                ${isActive ? program.activeColor : program.color}
                                ${program.borderColor}
                            `}
            >
              {/* COLLAPSED CONTENT (Vertical Strip Mode) */}
              <div
                className={`
                                    absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 z-10
                                    ${isActive ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 delay-100'}
                                `}
              >
                <div className={`p-4 rounded-2xl ${program.iconBg} mb-4 md:mb-8 transition-transform duration-300 transform group-hover:scale-110`}>
                  <span className={`material-icons-round text-3xl md:text-4xl ${program.iconColor}`}>
                    {program.icon}
                  </span>
                </div>
                {/* Vertical Text for Desktop */}
                <div className="hidden md:block writing-vertical-rl text-center">
                  <h3 className="text-xl font-bold text-slate-700 tracking-wide whitespace-nowrap pt-4 border-t border-slate-200/50">
                    {program.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-2">
                    {program.subtitle}
                  </p>
                </div>
                {/* Horizontal Text for Mobile (when collapsed) */}
                <div className="md:hidden text-center">
                  <h3 className="text-lg font-bold text-slate-700">{program.title}</h3>
                </div>

                {/* Expand Visual Indicator */}
                <div className="absolute top-6 md:top-8 flex flex-col items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                  <div className={`w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center border border-slate-100 animate-bounce`}>
                    <span className={`material-icons-round text-lg ${program.iconColor}`}>open_in_full</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden md:block">Expandir</span>
                </div>
              </div>

              {/* EXPANDED CONTENT */}
              <div
                className={`
                                    w-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                                    ${isActive ? 'opacity-100 translate-y-0 z-20 delay-100 relative h-full block' : 'opacity-0 translate-y-8 pointer-events-none z-0 absolute inset-0 overflow-hidden'}
                                `}
              >
                <div className="w-full p-1 h-full flex flex-col">
                  {/* Wrapper to ensure content takes full width/height */}
                  <div className="min-w-[280px] md:min-w-[500px] h-full">
                    {program.component}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hint for mobile users */}
      <div className="md:hidden mt-4 text-slate-400 text-xs flex items-center gap-2 animate-pulse">
        <span className="material-icons-round text-sm">touch_app</span>
        Toca una tarjeta para expandir
      </div>

    </div>
  );
};

export default ProgramsHub;