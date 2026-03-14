import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendUp, BookOpen, ArrowRight } from '@phosphor-icons/react';

// Hook for scroll-based entrance animation matching section 2
const useIntersectionObserver = (options: IntersectionObserverInit) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        // Disconnect after revealing once
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options]);

  return [ref, isIntersecting] as const;
};

const LevelsSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.15 });
  const animClasses = `transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`;

  return (
    <section id="niveles" className="w-full py-16 flex justify-center overflow-visible overflow-x-clip relative z-10 bg-white">
      {/* 95% width green gradient container max-width to not exceed extremely large screens */}
      {/* Reduced min-height by 20% compared to previous 975px height */}
      <div
        className="w-[95%] rounded-[36px] relative min-h-[660px] lg:min-h-[780px] flex flex-col pt-12 lg:pt-20 pb-0"
        style={{ background: 'linear-gradient(135deg, #016A31 0%, #1a9e4a 40%, #5ec832 75%, #88d62c 100%)' }}
      >
        {/* Watermark */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none rounded-[36px] overflow-hidden">
          <img
            src="/img/niveles/sonrisas.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Removed shadow-2xl so there's no opaque color behind the green container */}
        {/* Made container relative flex-1 so it takes full height, making absolute positioning relative to this full height box */}
        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-start" ref={ref}>

          {/* Title block locked at the top */}
          <div className={`mb-6 lg:mb-10 text-center max-w-4xl mx-auto ${animClasses}`} style={{ transitionDelay: '0ms' }}>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-1">
              Un programa diseñado a tu medida:
            </h2>
            <h3 className="font-display text-4xl md:text-5xl font-bold text-[#E2F835] leading-tight mb-2">
              3 Niveles para transformar tu mente.
            </h3>
            <p className="text-white/85 text-base md:text-lg leading-relaxed font-light mt-4">
              En ENSIL no creemos en métodos genéricos. Hemos diseñado tres programas especializados basados en la edad y el desarrollo cognitivo para garantizar que cada estudiante, desde los 5 años hasta la etapa profesional, repotencie sus capacidades hasta 20 veces más.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start justify-between lg:gap-8 relative z-10 w-full flex-grow">

            {/* ─── LEFT COLUMN ─── */}
            <div className="w-full lg:w-1/2 flex flex-col justify-start space-y-8 text-center lg:text-left mt-2 lg:mt-6 pb-20 lg:pb-0">

              {/* Bullets */}
              <div className="flex flex-col space-y-5 lg:mx-0 mx-auto max-w-xl">
                <div className={`flex items-start text-left gap-4 ${animClasses}`} style={{ transitionDelay: '200ms' }}>
                  <TrendUp weight="bold" className="text-white w-7 h-7 mt-0.5 flex-shrink-0" />
                  <p className="text-white text-base md:text-lg leading-snug font-medium">
                    Cada nivel cuenta con módulos de entrenamiento enfocados en fortalecer habilidades clave del aprendizaje.
                  </p>
                </div>
                <div className={`flex items-start text-left gap-4 ${animClasses}`} style={{ transitionDelay: '350ms' }}>
                  <BookOpen weight="fill" className="text-white w-7 h-7 mt-0.5 flex-shrink-0" />
                  <p className="text-base md:text-lg leading-snug">
                    <span className="text-[#E2F835] font-bold">Lectura, comprensión, retención y velocidad,</span>
                    <span className="text-white font-medium"> dentro de un programa sólido construido y perfeccionado a lo largo de 22 años.</span>
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <div className={`pt-2 flex justify-center lg:justify-start lg:mx-0 mx-auto w-full ${animClasses}`} style={{ transitionDelay: '500ms' }}>
                <Link to="/programas" className="inline-block">
                  <button className="flex items-center gap-3 bg-[#a3e635] hover:bg-[#84cc16] text-[#014d23] font-bold py-3.5 px-8 text-lg rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg">
                    Ver niveles
                    <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center">
                      <ArrowRight weight="bold" className="w-4 h-4 text-[#014d23]" />
                    </div>
                  </button>
                </Link>
              </div>
            </div>

            {/* ─── RIGHT COLUMN – Image overlapping 20% and shifted right ─── */}
            <div className={`w-full lg:w-[50%] lg:absolute lg:right-[-4rem] xl:right-[-6rem] lg:bottom-0 pointer-events-none z-30 flex items-end justify-center lg:justify-end mt-8 lg:mt-0 px-4 lg:px-0 ${animClasses}`} style={{ transitionDelay: '650ms' }}>
              <img
                src="/img/niveles/niveles.png"
                alt="Niveles ENSIL"
                className="w-full h-auto lg:w-[135%] max-w-none object-contain object-bottom drop-shadow-2xl translate-y-[15%] lg:translate-y-[20%]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LevelsSection;
