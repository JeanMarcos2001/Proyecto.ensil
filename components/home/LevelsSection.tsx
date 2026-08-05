import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';

const useIntersectionObserver = (options: IntersectionObserverInit) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(entry.target);
      }
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [options]);

  return [ref, isIntersecting] as const;
};

const levels = [
  {
    title: 'Pre-Kids',
    image: '/img/Home_Section03/Web_Programas_01_Aquiles copia 3.png',
  },
  {
    title: 'Kids',
    image: '/img/Home_Section03/Web_Programas_01_Aquiles copia 4.png',
    isFeatured: true,
  },
  {
    title: 'Profesional',
    image: '/img/Home_Section03/Web_Programas_01_Aquiles copia 5.png',
  },
];

const LevelsSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="niveles" className="w-full py-16 md:py-24 flex justify-center overflow-x-clip relative z-10 bg-white">
      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>

        {/* Header centrado */}
        <div className={`text-center max-w-3xl mx-auto mb-12 lg:mb-9 transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-4">
            Un programa diseñado<br className="hidden sm:block" /> a tu medida
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light">
            Tres programas especializados según la edad and el desarrollo cognitivo.
          </p>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light">
            Desde los 4 años hasta la etapa profesional.
          </p>
        </div>

        {/* Grid de 3 tarjetas — alineación superior */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-16 items-start">
          {levels.map((level, i) => (
            <div
              key={level.title}
              className={`flex flex-col transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Botón CTA encima de la tarjeta central */}
              {level.isFeatured && (
                <div className="flex justify-center mb-6 lg:mb-10">
                  <Link to="/programas">
                    <button className="flex items-center gap-2.5 bg-[#d4f870] hover:bg-white text-[#1a3f18] font-bold py-3 px-7 text-sm rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg border border-[#d4f870]/20 hover:border-slate-200">
                      Ver todos los niveles
                      <span className="bg-[#1a3f18] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                        <ArrowRight weight="bold" className="w-3.5 h-3.5 text-[#d4f870]" />
                      </span>
                    </button>
                  </Link>
                </div>
              )}

              {/* Tarjeta — solo imagen */}
              <Link to="/programas" className="block group relative">
                {/* Tarjeta de fondo (Escala y traslación menores para efecto de profundidad) */}
                <div className={`absolute inset-0 rounded-[27px] border shadow-inner transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-2 group-hover:scale-[1.01] ${
                  i === 0 ? 'bg-red-50/80 border-red-200/60' :
                  i === 1 ? 'bg-blue-50/80 border-blue-200/60' :
                  'bg-orange-50/80 border-orange-200/60'
                }`} />

                {/* Tarjeta del frente (Se eleva y escala más, con rotación para separar las capas) */}
                <div className={`relative rounded-[27px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-6 group-hover:scale-[1.03] group-hover:shadow-2xl ${
                  i === 1 ? 'group-hover:rotate-[4deg]' : 'group-hover:-rotate-[4deg]'
                }`}>
                  <img
                    src={level.image}
                    alt={`Programa ${level.title} ENSIL`}
                    className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default LevelsSection;
