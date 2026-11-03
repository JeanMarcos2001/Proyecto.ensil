import React from 'react';
import PreKidsContent from './PreKidsContent';
import KidsContent from './KidsContent';
import ProfessionalContent from './ProfessionalContent';

interface BookDividerProps {
  id: string | number;
}

const BookDivider: React.FC<BookDividerProps> = ({ id }) => (
  <div className="w-full max-w-3xl mx-auto my-2.5 sm:my-3.5 md:my-5 px-4 flex items-center justify-center select-none pointer-events-none">
    <svg
      viewBox="0 0 1000 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-6 sm:h-7 md:h-8"
    >
      <defs>
        {/* Degradado para el trazo único: ensil -> esmeralda -> lomo ensil -> esmeralda -> ensil */}
        <linearGradient id={`bookLine-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#016A31" stopOpacity="0" />
          <stop offset="12%" stopColor="#016A31" stopOpacity="0.4" />
          <stop offset="30%" stopColor="#10b981" stopOpacity="1" />
          <stop offset="50%" stopColor="#016A31" stopOpacity="0.85" />
          <stop offset="70%" stopColor="#10b981" stopOpacity="1" />
          <stop offset="88%" stopColor="#016A31" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#016A31" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Trazo único y continuo que dibuja el contorno superior del libro abierto */}
      <path
        d="M 60,38 C 180,38 230,10 320,10 C 410,10 465,34 500,37 C 535,34 590,10 680,10 C 770,10 820,38 940,38"
        stroke={`url(#bookLine-${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  </div>
);

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
    <div className="w-full min-h-screen bg-white font-jakarta flex flex-col items-center pt-6 pb-10 md:pt-12 md:pb-20 relative overflow-hidden">

      {/* Header Text - Improved Typography */}
      <div className="text-center max-w-4xl px-4 mb-8 md:mb-12 z-10 relative">
        <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl text-slate-900 font-bold tracking-tight leading-tight">
          Formación para <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Cada Etapa</span>
        </h1>
      </div>

      {/* Continuous Programs Container with Compact Custom Book Dividers */}
      <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8 flex flex-col z-20">
        {programs.map((program, index) => (
          <React.Fragment key={program.id}>
            <div className="w-full relative bg-transparent">
              {/* Component Content (Continuous display) */}
              <div className="w-full h-full">
                {program.component}
              </div>
            </div>

            {/* Separador personalizado compacto: Contorno superior de libro abierto */}
            {index < programs.length - 1 && (
              <BookDivider id={`book-${program.id}`} />
            )}
          </React.Fragment>
        ))}
      </div>

    </div>
  );
};

export default ProgramsHub;
