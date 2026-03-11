import React, { useState, useRef } from 'react';
import { Brain, BookOpen, MapPin, ChevronDown } from 'lucide-react';
import { smoothScrollTo } from '../../utils/scroll';

const Hero: React.FC = () => {

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <section id="inicio" className="relative h-auto min-h-screen flex flex-col justify-start md:justify-center overflow-x-hidden pt-28 md:pt-0">
      {/* Multi-layered Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

        {/* Layer 1: Base Background (Clean) */}
        <div className="absolute inset-0 bg-white"></div>

        {/* Layer 2: Custom White Gradients (Stronger at bottom-left, fading out) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white via-white/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/50 to-transparent w-full md:w-3/4"></div>

        {/* Layer 3: Foreground (Hidden on mobile, uses full bg on desktop) */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-10 hidden md:block"
          style={{ backgroundImage: "url('/img/heroSF.webp')" }}
        ></div>        {/* Layer 5: Ticker Tape at the bottom (Absolute on Desktop, In Flow on Mobile) */}
        <div className="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-r from-ensil-green-900 to-lime-500 overflow-hidden flex items-center shadow-lg border-t border-white/20 group cursor-default hidden md:flex">
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              display: flex;
              width: max-content;
              animation: marquee 80s linear infinite;
            }
          `}</style>
          <div className="animate-marquee py-3 md:py-4 text-white font-normal text-[11px] md:text-[13px] tracking-widest whitespace-nowrap group-hover:[animation-play-state:paused]">
            {/* Duplicated block to ensure perfect infinite loop without empty space */}
            {[1, 2, 3, 4].map((group) => (
              <div key={group} className="flex px-4 items-center shrink-0 whitespace-nowrap">
                <span>RETENCIÓN</span><span className="mx-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>COMPRENSIÓN</span><span className="mx-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>VELOCIDAD</span><span className="mx-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>LECTURA INTEGRAL</span><span className="mx-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>16 SEDES EN TODO EL PERÚ</span><span className="mx-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>MÁS DE 22 AÑOS CREANDO LÍDERES</span><span className="mx-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>ELEVAMOS TUS CAPACIDADES AL SIGUIENTE NIVEL</span><span className="mx-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 text-left flex flex-col md:block mt-8 md:mt-20">
        <h1 className="order-1 font-display mb-4 md:mb-6 leading-tight md:leading-[1.1] max-w-4xl text-ensil-green-900">
          <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-ensil-green-900 via-ensil-green-800 to-ensil-green-700 bg-clip-text text-transparent mb-1 md:mb-2">
            Transforma Tu Lectura en
          </span>
          <span
            ref={textRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="block relative cursor-default select-none text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-black"
          >
            {/* Base Text (Dark Gradient) */}
            <span className="bg-gradient-to-r from-ensil-green-800 via-ensil-green to-ensil-green-700 bg-clip-text text-transparent relative z-10 w-full block">
              Tu Mayor Superpoder
            </span>

            {/* Spotlight Overlay (Vibrant Multi-tone Gradient) */}
            <span
              className="absolute top-0 left-0 bg-gradient-to-r from-lime-400 via-emerald-400 to-green-500 bg-clip-text text-transparent z-20 pointer-events-none w-full block"
              style={{
                opacity: isHovered ? 1 : 0,
                maskImage: `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
                WebkitMaskImage: `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
                transition: 'opacity 0.2s ease',
              }}
            >
              Tu Mayor Superpoder
            </span>
          </span>
        </h1>

        <p className="order-2 text-slate-700 text-lg md:text-xl max-w-2xl mb-8 md:mb-12 font-medium">
          Desbloquea el potencial oculto de tu mente. Aprende a absorber conocimiento a una velocidad que nunca creíste posible.
        </p>

        {/* Mobile Character Image (Only shows right 60% of original image scaling) */}
        <div className="order-3 md:hidden w-[100vw] relative -ml-4 -mr-4 h-[350px] mb-6 overflow-hidden">
          {/* We use an image container that fills parent, and push the image to object-right with a specific width to crop the left side */}
          <img
            src="/img/heroSF.webp"
            alt="ENSIL Character"
            className="absolute right-0 top-0 w-[140%] max-w-none h-full object-cover object-[80%_top]"
          />
        </div>

        {/* Mobile Inline Ticker Tape (Inserted dynamically into flex order) */}
        <div className="order-4 md:hidden w-[100vw] relative -ml-4 -mr-4 z-30 bg-gradient-to-r from-ensil-green-900 to-lime-500 overflow-hidden flex items-center shadow-lg group cursor-default mb-10">
          <div className="animate-marquee py-3 text-white font-normal text-[11px] tracking-widest whitespace-nowrap">
            {[1, 2, 3, 4].map((group) => (
              <div key={`mob-${group}`} className="flex px-4 items-center shrink-0 whitespace-nowrap">
                <span>RETENCIÓN</span><span className="mx-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>COMPRENSIÓN</span><span className="mx-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>VELOCIDAD</span><span className="mx-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>LECTURA INTEGRAL</span><span className="mx-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>16 SEDES EN TODO EL PERÚ</span><span className="mx-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>MÁS DE 22 AÑOS CREANDO LÍDERES</span><span className="mx-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>ELEVAMOS TUS CAPACIDADES AL SIGUIENTE NIVEL</span><span className="mx-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="order-5 grid grid-cols-1 sm:grid-cols-3 gap-4 xl:gap-6 max-w-[90%] lg:max-w-3xl mb-12 lg:mb-16">
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 lg:p-6 text-slate-900 shadow-lg border border-white transform hover:-translate-y-1 transition-transform duration-300 group">
            <BookOpen className="w-8 h-8 lg:w-10 lg:h-10 text-ensil-green mb-3 lg:mb-4" />
            <div className="font-display text-3xl lg:text-4xl font-bold">200</div>
            <div className="text-[10px] lg:text-xs font-bold tracking-widest uppercase text-slate-600 mt-1">Páginas en 5 min</div>
          </div>
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 lg:p-6 text-slate-900 shadow-lg border border-white transform hover:-translate-y-1 transition-transform duration-300 group">
            <Brain className="w-8 h-8 lg:w-10 lg:h-10 text-ensil-green mb-3 lg:mb-4" />
            <div className="font-display text-3xl lg:text-4xl font-bold">100%</div>
            <div className="text-[10px] lg:text-xs font-bold tracking-widest uppercase text-slate-600 mt-1">de Comprensión</div>
          </div>
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 lg:p-6 text-slate-900 shadow-lg border border-white transform hover:-translate-y-1 transition-transform duration-300 group">
            <MapPin className="w-8 h-8 lg:w-10 lg:h-10 text-ensil-green mb-3 lg:mb-4" />
            <div className="font-display text-3xl lg:text-4xl font-bold">16</div>
            <div className="text-[10px] lg:text-xs font-bold tracking-widest uppercase text-slate-600 mt-1">Sedes en todo Perú</div>
          </div>
        </div>

        <a
          href="#programa"
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo('programa', 1200);
          }}
          className="order-6 inline-flex flex-col items-start text-slate-600 hover:text-slate-900 transition-colors group cursor-pointer w-fit mb-10 md:mb-0"
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase mb-2">DESCUBRE</span>
          <ChevronDown className="w-8 h-8 animate-bounce text-ensil-green group-hover:text-green-800" />
        </a>
      </div>
    </section>
  );
};

export default Hero;