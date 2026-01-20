import React, { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { FaqItem } from '../../types';

const faqData: FaqItem[] = [
  {
    id: '1',
    question: '¿El programa es para niños?',
    answer: 'Sí, contamos con programas especializados (ENSIL Kids) diseñados pedagógicamente para niños desde los 7 años, enfocados en crear hábitos de lectura y mejorar el rendimiento escolar.'
  },
  {
    id: '2',
    question: '¿Dónde están ubicadas las sedes?',
    answer: 'Tenemos 16 sedes en todo el Perú, incluyendo Lima (Miraflores, Los Olivos, San Borja), Arequipa, Trujillo, Cusco y Piura. También ofrecemos la modalidad 100% online en vivo.'
  },
  {
    id: '3',
    question: '¿Cuánto dura el programa?',
    answer: 'El programa estándar tiene una duración de 6 meses, asistiendo a sesiones una vez por semana con práctica diaria en casa de 15 minutos mediante nuestra plataforma digital.'
  },
  {
    id: '4',
    question: '¿Qué equipo necesito?',
    answer: 'Para la modalidad virtual, solo necesitas una computadora o tablet con conexión a internet. Nosotros te enviamos todo el material físico (libros de trabajo, guías) a tu domicilio.'
  }
];

const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('2'); // Default open for visual match

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-gray-900 font-bold mb-12 flex items-center gap-3">
          Preguntas Frecuentes
          <span className="text-accent text-5xl font-light">+</span>
        </h2>

        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <div 
                key={item.id}
                onClick={() => toggleFAQ(item.id)}
                className={`rounded-2xl p-6 cursor-pointer transition-all duration-300 border ${
                  isOpen 
                    ? 'bg-primary text-white shadow-lg border-primary' 
                    : 'bg-gray-50 text-gray-900 hover:bg-white border-transparent hover:border-gray-200 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className={`text-lg font-bold ${isOpen ? 'text-white' : 'text-primary'}`}>
                    /0{index + 1} {item.question}
                  </h3>
                  <ChevronDown 
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : 'text-gray-400'}`} 
                  />
                </div>
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <p className={`overflow-hidden ${isOpen ? 'text-white/90' : 'text-gray-600'}`}>
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;