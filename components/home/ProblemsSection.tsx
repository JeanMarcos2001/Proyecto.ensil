import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, BookOpen, Clock, BrainCircuit, Lightbulb, CheckCircle2 } from 'lucide-react';
import { smoothScrollTo } from '../../utils/scroll';

// Hook for scroll-based entrance animation
const useIntersectionObserver = (options: IntersectionObserverInit) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        // Desconectar después de que aparezca una vez
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

const ProblemsSection = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.15 });

  // Uniform height classes for text cards and updated hover elevation
  const textCardClasses = "bg-gray-100 rounded-3xl p-4 shadow-sm flex flex-col justify-start relative overflow-hidden group hover:-translate-y-3 hover:shadow-xl hover:shadow-ensil-green/10 transition-all duration-300 min-h-[260px] h-auto shrink-0";
  const imageContainerClasses = "rounded-3xl overflow-hidden shadow-md flex-1 relative group hover:-translate-y-3 hover:shadow-xl transition-all duration-300";

  // Animation classes for columns (staggered delay applied inline)
  const animClasses = `transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`;

  return (
    <section id="problemas" className="pt-8 pb-6 md:pt-10 md:pb-8 bg-white overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>

        {/* Header content */}
        <div className={`text-center mb-10 md:mb-12 transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <h2 className="font-display text-4xl md:text-5xl text-gray-900 font-bold leading-tight">
            Miles de <span className="text-ensil-green">estudiantes</span> leen,<br />
            pocos son lo que <span className="text-ensil-green">comprenden</span>.
          </h2>
          <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed font-light">
            Nuestro programa integral fortalece la seguridad, la velocidad, la comprensión y la retención lectora, ayudando a escolares, preuniversitarios y profesionales a convertir la lectura en una herramienta de alto rendimiento.
          </p>
        </div>

        {/* Desktop 5-Column Alternating Layout */}
        <div className="hidden lg:grid grid-cols-5 gap-5 items-stretch min-h-[39rem] xl:min-h-[42rem]">

          {/* Column 1 - Image Top */}
          <div className={`flex flex-col gap-5 ${animClasses}`} style={{ transitionDelay: '0ms' }}>
            <div className={imageContainerClasses}>
              <img src="/img/sec1.2/img1.png" alt="Inseguridad al leer" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className={textCardClasses}>
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <BookOpen size={40} className="text-ensil-green" />
              </div>
              <div className="bg-ensil-green shrink-0 w-11 h-11 rounded-full flex justify-center items-center mb-4 relative z-10 shadow-sm">
                <BookOpen size={22} className="text-white" />
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-2 relative z-10">Lees, pero dudas</h3>
              <p className="text-sm text-gray-600 leading-snug relative z-10">
                La inseguridad al leer frena la fluidez y reduce tu confianza al enfrentarte a textos.
              </p>
            </div>
          </div>

          {/* Column 2 - Text Top */}
          <div className={`flex flex-col gap-5 ${animClasses}`} style={{ transitionDelay: '150ms' }}>
            <div className={textCardClasses}>
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Clock size={40} className="text-ensil-green" />
              </div>
              <div className="bg-ensil-green shrink-0 w-11 h-11 rounded-full flex justify-center items-center mb-4 relative z-10 shadow-sm">
                <Clock size={22} className="text-white" />
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-2 relative z-10">Avanzas demasiado lento</h3>
              <p className="text-sm text-gray-600 leading-snug relative z-10">
                Leer con poca velocidad consume tiempo, agota y dificulta rendir mejor en clases o evaluaciones.
              </p>
            </div>
            <div className={imageContainerClasses}>
              <img src="/img/sec1.2/img5.png" alt="Lectura lenta" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>

          {/* Column 3 - Image Top */}
          <div className={`flex flex-col gap-5 ${animClasses}`} style={{ transitionDelay: '300ms' }}>
            <div className={imageContainerClasses}>
              <img src="/img/sec1.2/img4.png" alt="Baja comprensión" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className={textCardClasses}>
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <BrainCircuit size={40} className="text-ensil-green" />
              </div>
              <div className="bg-ensil-green shrink-0 w-11 h-11 rounded-full flex justify-center items-center mb-4 relative z-10 shadow-sm">
                <BrainCircuit size={22} className="text-white" />
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-2 relative z-10">Terminas y no comprendes</h3>
              <p className="text-sm text-gray-600 leading-snug relative z-10">
                Leer sin captar la idea principal limita el aprendizaje y dificulta aplicar lo estudiado.
              </p>
            </div>
          </div>

          {/* Column 4 - Text Top */}
          <div className={`flex flex-col gap-5 ${animClasses}`} style={{ transitionDelay: '450ms' }}>
            <div className={textCardClasses}>
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Lightbulb size={40} className="text-ensil-green" />
              </div>
              <div className="bg-ensil-green shrink-0 w-11 h-11 rounded-full flex justify-center items-center mb-4 relative z-10 shadow-sm">
                <Lightbulb size={22} className="text-white" />
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-2 relative z-10">Olvidas lo que leíste</h3>
              <p className="text-sm text-gray-600 leading-snug relative z-10">
                Cuando no hay retención, estudiar o trabajar con información se vuelve repetitivo y frustrante.
              </p>
            </div>
            <div className={imageContainerClasses}>
              <img src="/img/sec1.2/img3.png" alt="Baja retención" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>

          {/* Column 5 - Image Top + Call To Action */}
          <div className={`flex flex-col gap-5 ${animClasses}`} style={{ transitionDelay: '600ms' }}>
            <div className={imageContainerClasses} style={{ flex: '1 1 auto' }}>
              <img src="/img/sec1.2/img2.png" alt="Solución integral" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            {/* CTA Card gets specific sizing below the overall 260px block height size so the button fits compactly within the column */}
            <div className="bg-gradient-to-br from-[#d4f870] to-[#bde24c] border border-[#c4eb4e] rounded-3xl p-4 shadow-sm flex flex-col justify-start relative overflow-hidden group hover:-translate-y-3 hover:shadow-xl hover:shadow-[#c4eb4e]/30 transition-all duration-300 min-h-[188px] h-auto shrink-0">
              <div className="absolute -top-4 -right-4 p-4 opacity-5">
                <CheckCircle2 size={50} className="text-ensil-green" />
              </div>
              <div className="bg-ensil-green shrink-0 w-11 h-11 rounded-full flex justify-center items-center mb-3 relative z-10 shadow-sm">
                <CheckCircle2 size={22} className="text-white" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#1a3f18] mb-1 relative z-10">Leer mejor es posible</h3>
              <p className="text-sm text-gray-700 leading-snug relative z-10">
                Descubre una metodología integral diseñada para desarrollar seguridad, velocidad, comprensión y retención lectora.
              </p>
            </div>
            <div className="flex-none shrink-0 h-[52px]">
              <a
                href="#niveles"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo('niveles', 1200);
                }}
                className="w-full h-full bg-ensil-green hover:bg-[#1a3f18] text-white rounded-full font-medium flex items-center justify-center gap-3 transition-all shadow-md hover:shadow-lg hover:shadow-ensil-green/30 hover:-translate-y-1 text-sm duration-300 pr-2 pl-4"
              >
                Descubre cómo
                <span className="bg-white text-ensil-green rounded-full p-1.5 flex items-center justify-center ml-1">
                  <ArrowDown size={18} strokeWidth={2.5} />
                </span>
              </a>
            </div>
          </div>

        </div>

        {/* Mobile / Tablet Layout (Vertical Stacking image overlay) */}
        <div className="lg:hidden flex flex-col gap-6 mt-4">

          {/* Card 1 */}
          <div className={`relative h-[300px] md:h-[350px] rounded-3xl overflow-hidden shadow-md flex flex-col justify-end p-6 group ${animClasses}`}>
            <img src="/img/sec1.2/img1.png" alt="Inseguridad al leer" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/60 to-transparent"></div>

            <div className="relative z-10 flex flex-col justify-end">
              <div className="bg-ensil-green shrink-0 w-12 h-12 rounded-full flex justify-center items-center mb-4 shadow-sm">
                <BookOpen size={24} className="text-white" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">Lees, pero dudas</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                La inseguridad al leer frena la fluidez y reduce tu confianza al enfrentarte a textos.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className={`relative h-[300px] md:h-[350px] rounded-3xl overflow-hidden shadow-md flex flex-col justify-end p-6 group ${animClasses}`} style={{ transitionDelay: '100ms' }}>
            <img src="/img/sec1.2/img5.png" alt="Lectura lenta" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/60 to-transparent"></div>

            <div className="relative z-10 flex flex-col justify-end">
              <div className="bg-ensil-green shrink-0 w-12 h-12 rounded-full flex justify-center items-center mb-4 shadow-sm">
                <Clock size={24} className="text-white" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">Avanzas demasiado lento</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                Leer con poca velocidad consume tiempo, agota y dificulta rendir mejor en clases o evaluaciones.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className={`relative h-[300px] md:h-[350px] rounded-3xl overflow-hidden shadow-md flex flex-col justify-end p-6 group ${animClasses}`} style={{ transitionDelay: '200ms' }}>
            <img src="/img/sec1.2/img4.png" alt="Baja comprensión" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/60 to-transparent"></div>

            <div className="relative z-10 flex flex-col justify-end">
              <div className="bg-ensil-green shrink-0 w-12 h-12 rounded-full flex justify-center items-center mb-4 shadow-sm">
                <BrainCircuit size={24} className="text-white" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">Terminas y no comprendes</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                Leer sin captar la idea principal limita el aprendizaje y dificulta aplicar lo estudiado.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className={`relative h-[300px] md:h-[350px] rounded-3xl overflow-hidden shadow-md flex flex-col justify-end p-6 group ${animClasses}`} style={{ transitionDelay: '300ms' }}>
            <img src="/img/sec1.2/img3.png" alt="Baja retención" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/60 to-transparent"></div>

            <div className="relative z-10 flex flex-col justify-end">
              <div className="bg-ensil-green shrink-0 w-12 h-12 rounded-full flex justify-center items-center mb-4 shadow-sm">
                <Lightbulb size={24} className="text-white" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">Olvidas lo que leíste</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                Cuando no hay retención, estudiar o trabajar con información se vuelve repetitivo y frustrante.
              </p>
            </div>
          </div>

          {/* Card 5 - Span full width on md */}
          <div className={`relative h-[380px] md:h-[350px] rounded-3xl overflow-hidden shadow-md flex flex-col justify-end p-6 group ${animClasses}`} style={{ transitionDelay: '400ms' }}>
            <img src="/img/sec1.2/img2.png" alt="Solución integral" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#c4eb4e]/95 via-[#c4eb4e]/80 to-[#d4f870]/30 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#c4eb4e] via-[#d4f870]/80 to-transparent"></div>

            <div className="relative z-10 flex flex-col justify-end">
              <div className="bg-ensil-green shrink-0 w-12 h-12 rounded-full flex justify-center items-center mb-4 shadow-sm">
                <CheckCircle2 size={24} className="text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#1a3f18] mb-2">Leer mejor sí es posible</h3>
              <p className="text-[#1a3f18] font-medium text-sm leading-relaxed mb-6">
                Descubre una metodología integral diseñada para desarrollar seguridad, velocidad, comprensión y retención lectora.
              </p>
              <a
                href="#niveles"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo('niveles', 1200);
                }}
                className="w-full h-[52px] inline-flex pr-2 pl-6 bg-[#1a3f18] hover:bg-[#112a10] text-[#d4f870] rounded-full font-medium items-center justify-center gap-3 transition-colors shadow-md hover:shadow-lg text-sm"
              >
                Descubre cómo
                <span className="bg-white text-[#1a3f18] rounded-full p-1.5 flex items-center justify-center ml-1">
                  <ArrowDown size={18} strokeWidth={2.5} />
                </span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProblemsSection;
