import React from 'react';
import { ArrowRight } from 'lucide-react';

const PromiseSection: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <div className="order-2 lg:order-1">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            Nuestra Promesa
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-gray-900 font-bold mb-8 leading-tight">
            Lectura Profesional <br/>
            <span className="text-accent">+</span> Gestión del Tiempo
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed text-lg font-light">
            Descubre la metodología que ha transformado a miles de estudiantes y profesionales en Perú. No se trata solo de leer rápido, se trata de una evolución cognitiva.
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
        <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
          <div className="space-y-4 mt-8">
            <img 
              alt="Joven latina universitaria" 
              className="rounded-3xl object-cover w-full h-48 shadow-lg hover:scale-[1.02] transition-transform duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5d0pNNvi20roYA1zlo_MeusQnYn5Dj3PCZGUBCqy0K5U7Ikwk4ygOIgbfrpXrbLi5wtDICg-ZmFAQFSLoL6BEJa2DHK5HboxHrSAPWU4NC1j48eT_tOGOspbHB3ZqmN-jA_J7jYYYT-fBwb5_QK4X3shAZTeXVZrxBL67-Flmc4TBzmL6KOYu9D8jCAleAbx4sIKRFNQQUIn9a1UXP7aQ24YEi-1iOLJLv1u1rEIunPPm6OePVA4wqVVWOqFLkbvA6So7omHdUck"
            />
            <img 
              alt="Hombre latino profesional" 
              className="rounded-3xl object-cover w-full h-64 shadow-lg hover:scale-[1.02] transition-transform duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzneKTxUoUQSo6JLtaVigaa6STMLYtEqLs-VCWY3lCocWMCDWmI6YGZHdI6ty6gaNZwy3gYDB9M5EB_ntLyHmszkPBIaftoTd4Gvwn2CQGkSQkeywntC4OW_vyOUlWDItSA9zNVUIcPVh1CrXO-X6PVWo0-0zOvdKEPxbrICyjGUVQ41z7EHVTmxT3QblOxpLHxYKVolHfl2dZWXG-J0N7GT0KGhuf5YWQVWyXoI3vXTq445cZ80Ft9axXTa7aymewL49X4b2pjPg"
            />
          </div>
          <div className="space-y-4">
            <img 
              alt="Adolescente latino sonriendo" 
              className="rounded-3xl object-cover w-full h-64 shadow-lg hover:scale-[1.02] transition-transform duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMAaVusTvFpywPEjL2ouYf7UAWwq_gCCIq7XahIGoS65IYC5R4lPX7veQX9rI32hc8F2tgBlIj3Va7W-y6JdTcHHiL30PYPlzeS1_rpS6iHByzu5RBQ-ThXcTXEt1-k5VDq3IUriqRqkSSitXTMnN4exC4oReJVou28VtGK0MeRt4BJjtZ5obPtaqSLoy9rmj3TlFgWC48506keC273EVg-_0Y4UqereeYLLvcKINDkYUsB0xjcpxv5rtQtEcQLe_f-l567EGK1xg"
            />
            <img 
              alt="Mujer latina tomando notas" 
              className="rounded-3xl object-cover w-full h-48 shadow-lg hover:scale-[1.02] transition-transform duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXn7QOH2Jt6tGaGoVBDbpGC-1y37r7-gRMRXG012yUH2IRtVxnHyPeDlFyCEf6FKzlnj0QJu-LeFZMmuijOE7aABoCDZt87UBtILWmn-T6aLgHyUmu6gacIGvkHb3RYh4De-iku5ggk3zKEXVOxH9rTLRrfnXFfkdKvv5qCSdMgFtXMbLJDqvwnh59AvYyTS2e8PbW7My7OHc_tccXZ-YNVPTxS04epxVYnCL0V_tDEbrasVty_ABf4Tx-7wkd52V1gpGjZq2CacM"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromiseSection;