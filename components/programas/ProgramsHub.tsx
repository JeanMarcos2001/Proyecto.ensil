import React, { useState } from 'react';
import PreKidsContent from './PreKidsContent';
import KidsContent from './KidsContent';
import ProfessionalContent from './ProfessionalContent';

const ProgramsHub: React.FC = () => {
  const programs = [
    {
      id: 'professional',
      title: 'Profesional',
      subtitle: 'Lectura Ágil',
      icon: 'school', // Material Icon name
      component: <ProfessionalContent />,
      color: 'bg-blue-50', // Light pastel blue
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
      borderColor: 'border-orange-200',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-white font-jakarta flex flex-col items-center pt-8 pb-12 md:pt-16 md:pb-24 relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-emerald-50/50 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[80px]"></div>
      </div>

      {/* Header Text - Improved Typography */}
      <div className="text-center max-w-4xl px-4 mb-16 z-10 relative">
        <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider mb-4">
          Nuestros Programas
        </span>
        <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl text-slate-900 font-bold tracking-tight leading-tight">
          Formación para <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Cada Etapa</span>
        </h1>
      </div>

      {/* Continuous Programs Container */}
      <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8 flex flex-col gap-12 md:gap-24 z-20">
        {programs.map((program) => (
          <div
            key={program.id}
            className={`w-full overflow-hidden rounded-[2.5rem] border ${program.color} ${program.borderColor} shadow-sm`}
          >
            {/* Component Content (Continuous display) */}
            <div className="w-full h-full">
              {program.component}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProgramsHub;