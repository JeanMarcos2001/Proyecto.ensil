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

        {/* Layer 2: Custom Green Gradients (Stronger at bottom-left, fading out) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-ensil-green-900 via-ensil-green-800/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-ensil-green-900/90 via-ensil-green-900/40 to-transparent w-full md:w-3/4"></div>

        {/* Layer 3: Foreground (No-background character image overlaid on top of the gradients) */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-10"
          style={{ backgroundImage: "url('/img/heroSF.webp')" }}
        ></div>

        {/* Layer 4: Left Bar Overlay */}
        <div
          className="absolute inset-0 bg-left bg-no-repeat z-20 pointer-events-none"
          style={{
            backgroundImage: "url('/img/ENSIL_Barra.webp')",
            backgroundSize: 'auto 100%'
          }}
        ></div>

      </div>

      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 text-left mt-20">
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-6 leading-tight drop-shadow-sm max-w-4xl">
          <span className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
            Transforma Tu Lectura en <br />
          </span>
          <span
            ref={textRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative inline-block cursor-default select-none py-2"
          >
            {/* Base Text (White Gradient) */}
            <span className="bg-gradient-to-r from-white/90 via-slate-200 to-white/60 bg-clip-text text-transparent relative z-10">
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

        <p className="text-slate-200 text-lg md:text-xl max-w-2xl mb-12 font-medium">
          Desbloquea el potencial oculto de tu mente. Aprende a absorber conocimiento a una velocidad que nunca creíste posible.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mb-16">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white shadow-lg border border-white/20 transform hover:-translate-y-1 transition-transform duration-300 group">
            <BookOpen className="w-10 h-10 text-lime-400 mb-4" />
            <div className="font-display text-4xl font-bold">200</div>
            <div className="text-xs font-bold tracking-widest uppercase text-slate-300 mt-1">Páginas en 5 min</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white shadow-lg border border-white/20 transform hover:-translate-y-1 transition-transform duration-300 group">
            <Brain className="w-10 h-10 text-lime-400 mb-4" />
            <div className="font-display text-4xl font-bold">100%</div>
            <div className="text-xs font-bold tracking-widest uppercase text-slate-300 mt-1">de Comprensión</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white shadow-lg border border-white/20 transform hover:-translate-y-1 transition-transform duration-300 group">
            <MapPin className="w-10 h-10 text-lime-400 mb-4" />
            <div className="font-display text-4xl font-bold">16</div>
            <div className="text-xs font-bold tracking-widest uppercase text-slate-300 mt-1">Sedes en todo Perú</div>
          </div>
        </div>

        <a
          href="#programa"
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo('programa', 1200);
          }}
          className="inline-flex flex-col items-start text-slate-300 hover:text-white transition-colors group cursor-pointer"
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase mb-2">DESCUBRE</span>
          <ChevronDown className="w-8 h-8 animate-bounce text-lime-400 group-hover:text-lime-300" />
        </a>
      </div>
    </section>
  );
};

export default Hero;