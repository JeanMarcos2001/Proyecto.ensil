import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jtrugvxgztnxbhwjtiou.supabase.co';
const supabaseKey = 'sb_publishable_embxlHUxh_7_A1OriNUTTQ_uxid3RZh';
const supabase = createClient(supabaseUrl, supabaseKey);

interface FaqItem {
  idFAQ: number;
  PREGUNTA: string;
  RESPUESTA: string;
  idCategoria?: number;
  ORDEN: number;
  categoriaFAQ?: {
    nombreCategoria: string;
  };
}

const FAQ: React.FC = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const { data, error } = await supabase
          .from('faq')
          .select('*, categoriaFAQ(nombreCategoria)')
          .order('ORDEN', { ascending: true })
          .limit(5);

        if (error) throw error;

        if (data && data.length > 0) {
          setFaqs(data as FaqItem[]);
          setOpenIds(new Set([data[0].idFAQ]));
        } else {
          console.warn("No FAQs found or tables missing in this Supabase project.");
        }
      } catch (err) {
        console.error('Error fetching FAQs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const toggleFAQ = (id: number) => {
    setOpenIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const midpoint = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, midpoint);
  const rightFaqs = faqs.slice(midpoint);

  const renderItem = (item: FaqItem) => {
    const isOpen = openIds.has(item.idFAQ);
    return (
      <div
        key={item.idFAQ}
        onClick={() => toggleFAQ(item.idFAQ)}
        className="bg-gray-50 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-gray-100"
      >
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-gray-900 font-bold text-base md:text-lg leading-snug">
            {item.PREGUNTA}
          </h3>
          <button className="text-gray-500 shrink-0 mt-0.5">
            {isOpen ? <Minus size={20} className="text-ensil-green border border-ensil-green rounded-full p-0.5" /> : <Plus size={20} className="text-gray-500 hover:text-gray-800" />}
          </button>
        </div>
        <div
          className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
            }`}
        >
          <div className="overflow-hidden">
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-2">
              {item.RESPUESTA}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="faq" className="py-24 px-4 bg-white font-jakarta">
      <div className="max-w-screen-xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex py-1 px-3 rounded-full bg-green-50 border border-green-200 text-ensil-green text-xs font-bold tracking-wider uppercase mb-4">
              / FAQS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Preguntas Frecuentes
            </h2>
            <p className="text-gray-500 text-lg">
              Aquí tienes todo lo que necesitas saber para comenzar, gestionar tus horarios y resolver las dudas más comunes.
            </p>
          </div>
          <Link
            to="/faq"
            className="shrink-0 bg-gradient-to-r from-ensil-green-800 to-ensil-green text-white font-bold py-3 px-8 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Leer más
          </Link>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-ensil-green/30 border-t-ensil-green rounded-full animate-spin"></div>
          </div>
        ) : (
          /* Grid Section */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
            {/* Left Column */}
            <div className="flex flex-col gap-4 md:gap-6">
              {leftFaqs.map(renderItem)}
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4 md:gap-6">
              {rightFaqs.map(renderItem)}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default FAQ;