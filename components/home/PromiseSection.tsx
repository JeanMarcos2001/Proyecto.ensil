import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { smoothScrollTo } from '../../utils/scroll';

const PromiseSection: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.2);
  return (
    <section id="promesa" className="min-h-screen py-16 md:py-24 px-4 bg-white flex flex-col justify-center relative overflow-hidden">
      <div
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        className={`w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center transition-all duration-1000 ease-out transform
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}
        `}
      >
        {/* Text Content */}
        <div className="order-2 lg:order-1">
          <h2 className="font-display text-4xl md:text-6xl text-gray-900 font-bold mb-8 leading-tight">
            Lectura Profesional <br />
            <span className="text-accent">+</span> Gestión del Tiempo
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed text-lg font-light">
            Descubre la metodología que ha transformado a miles de estudiantes y profesionales en Perú. Se trata de una evolución cognitiva.
          </p>
          <p className="text-gray-600 mb-10 leading-relaxed text-lg font-light">
            Al finalizar el programa, serás capaz de procesar información académica, técnica y literaria con una fluidez que te otorgará una ventaja competitiva de por vida.
          </p>
          <div className="flex items-center gap-4">
            <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors shadow-lg">
              Agendar Diagnóstico
            </button>
            <button className="w-14 h-14 border border-gray-300 rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-gray-400">
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        {/* Image Grid */}
        <div className="order-1 lg:order-2 grid grid-cols-2 gap-4 md:gap-6 mt-8 lg:mt-0">
          {/* Left Column (Shifted Down) */}
          <div className="space-y-4 md:space-y-6 mt-12 md:mt-24">
            <img
              alt="Joven latina universitaria"
              className="rounded-3xl object-cover w-full h-auto aspect-[4/3] md:h-[260px] shadow-lg hover:scale-[1.02] transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5d0pNNvi20roYA1zlo_MeusQnYn5Dj3PCZGUBCqy0K5U7Ikwk4ygOIgbfrpXrbLi5wtDICg-ZmFAQFSLoL6BEJa2DHK5HboxHrSAPWU4NC1j48eT_tOGOspbHB3ZqmN-jA_J7jYYYT-fBwb5_QK4X3shAZTeXVZrxBL67-Flmc4TBzmL6KOYu9D8jCAleAbx4sIKRFNQQUIn9a1UXP7aQ24YEi-1iOLJLv1u1rEIunPPm6OePVA4wqVVWOqFLkbvA6So7omHdUck"
            />
            <img
              alt="Hombre latino profesional"
              className="rounded-3xl md:rounded-[2.5rem] object-cover w-full h-auto aspect-[3/4] md:h-[460px] shadow-lg hover:scale-[1.02] transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzneKTxUoUQSo6JLtaVigaa6STMLYtEqLs-VCWY3lCocWMCDWmI6YGZHdI6ty6gaNZwy3gYDB9M5EB_ntLyHmszkPBIaftoTd4Gvwn2CQGkSQkeywntC4OW_vyOUlWDItSA9zNVUIcPVh1CrXO-X6PVWo0-0zOvdKEPxbrICyjGUVQ41z7EHVTmxT3QblOxpLHxYKVolHfl2dZWXG-J0N7GT0KGhuf5YWQVWyXoI3vXTq445cZ80Ft9axXTa7aymewL49X4b2pjPg"
            />
          </div>

          {/* Right Column (Starts Higher) */}
          <div className="space-y-4 md:space-y-6">
            <img
              alt="Adolescente latino sonriendo"
              className="rounded-3xl md:rounded-[3rem] object-cover w-full h-auto aspect-[2/3] md:h-[500px] shadow-lg hover:scale-[1.02] transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMAaVusTvFpywPEjL2ouYf7UAWwq_gCCIq7XahIGoS65IYC5R4lPX7veQX9rI32hc8F2tgBlIj3Va7W-y6JdTcHHiL30PYPlzeS1_rpS6iHByzu5RBQ-ThXcTXEt1-k5VDq3IUriqRqkSSitXTMnN4exC4oReJVou28VtGK0MeRt4BJjtZ5obPtaqSLoy9rmj3TlFgWC48506keC273EVg-_0Y4UqereeYLLvcKINDkYUsB0xjcpxv5rtQtEcQLe_f-l567EGK1xg"
            />
            <img
              alt="Mujer latina tomando notas"
              className="rounded-3xl object-cover w-full h-auto aspect-video md:h-[220px] shadow-lg hover:scale-[1.02] transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXn7QOH2Jt6tGaGoVBDbpGC-1y37r7-gRMRXG012yUH2IRtVxnHyPeDlFyCEf6FKzlnj0QJu-LeFZMmuijOE7aABoCDZt87UBtILWmn-T6aLgHyUmu6gacIGvkHb3RYh4De-iku5ggk3zKEXVOxH9rTLRrfnXFfkdKvv5qCSdMgFtXMbLJDqvwnh59AvYyTS2e8PbW7My7OHc_tccXZ-YNVPTxS04epxVYnCL0V_tDEbrasVty_ABf4Tx-7wkd52V1gpGjZq2CacM"
            />
          </div>
        </div>
      </div>

      {/* Scroll Down Button */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
        <a
          href="#faq"
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo('faq', 1200);
          }}
          className="group flex flex-col items-center justify-center cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full border border-gray-400 text-gray-400 flex items-center justify-center group-hover:bg-gray-400 group-hover:border-gray-400 group-hover:text-white transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm">
            <ChevronDown size={20} />
          </div>
        </a>
      </div>
    </section>
  );
};

export default PromiseSection;