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
    <section id="inicio" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Multi-layered Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

        {/* Layer 1: Base Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img/heroF.webp')" }}
        ></div>

        {/* Layer 2: Custom White Gradients (Stronger at bottom-left, fading out) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white via-white/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/50 to-transparent w-full md:w-3/4"></div>

        {/* Layer 3: Foreground (No-background character image overlaid on top of the gradients) */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-10"
          style={{ backgroundImage: "url('/img/heroSF.webp')" }}
        ></div>

        {/* Layer 4: Left Bar Overlay (Using img for safe mobile scaling) */}
        <div className="absolute inset-y-0 left-0 z-20 pointer-events-none flex items-stretch">
          <img
            src="/img/ENSIL_Barra.webp"
            alt=""
            className="h-full w-auto max-w-[25vw] sm:max-w-[15vw] object-cover object-left"
          />
        </div>

        {/* Layer 5: Bottom White Fade to blend with next section */}
        <div className="absolute inset-x-0 bottom-0 h-48 md:h-64 bg-gradient-to-t from-white via-white/80 to-transparent z-30 pointer-events-none"></div>

      </div>

      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 text-left mt-24 md:mt-20">
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-slate-900 font-bold mb-4 md:mb-6 leading-tight md:leading-tight max-w-4xl">
          <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent drop-shadow-sm">
            Transforma Tu Lectura en <br />
          </span>
          <span
            ref={textRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative inline-block cursor-default select-none py-2"
          >
            {/* Base Text (Dark Gradient) */}
            <span className="bg-gradient-to-r from-slate-800 via-slate-500 to-slate-700 bg-clip-text text-transparent relative z-10">
              Tu Mayor Superpoder
            </span>

            {/* Spotlight Overlay (Vibrant Multi-tone Gradient) */}
            <span
              className="absolute top-0 left-0 bg-gradient-to-r from-lime-400 via-emerald-400 to-green-500 bg-clip-text text-transparent z-20 pointer-events-none py-2"
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

        <p className="text-slate-700 text-lg md:text-xl max-w-2xl mb-12 font-medium drop-shadow-sm">
          Desbloquea el potencial oculto de tu mente. Aprende a absorber conocimiento a una velocidad que nunca creíste posible.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mb-12 md:mb-16">
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 text-slate-900 shadow-lg border border-white transform hover:-translate-y-1 transition-transform duration-300 group">
            <BookOpen className="w-10 h-10 text-ensil-green mb-4" />
            <div className="font-display text-4xl font-bold">200</div>
            <div className="text-xs font-bold tracking-widest uppercase text-slate-600 mt-1">Páginas en 5 min</div>
          </div>
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 text-slate-900 shadow-lg border border-white transform hover:-translate-y-1 transition-transform duration-300 group">
            <Brain className="w-10 h-10 text-ensil-green mb-4" />
            <div className="font-display text-4xl font-bold">100%</div>
            <div className="text-xs font-bold tracking-widest uppercase text-slate-600 mt-1">de Comprensión</div>
          </div>
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 text-slate-900 shadow-lg border border-white transform hover:-translate-y-1 transition-transform duration-300 group">
            <MapPin className="w-10 h-10 text-ensil-green mb-4" />
            <div className="font-display text-4xl font-bold">16</div>
            <div className="text-xs font-bold tracking-widest uppercase text-slate-600 mt-1">Sedes en todo Perú</div>
          </div>
        </div>

        <a
          href="#programa"
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo('programa', 1200);
          }}
          className="inline-flex flex-col items-start text-slate-600 hover:text-slate-900 transition-colors group cursor-pointer"
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase mb-2">DESCUBRE</span>
          <ChevronDown className="w-8 h-8 animate-bounce text-ensil-green group-hover:text-green-800" />
        </a>
      </div>
    </section>
  );
};

export default Hero;