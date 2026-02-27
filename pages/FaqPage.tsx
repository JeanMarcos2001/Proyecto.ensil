import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronDown, Search, LayoutGrid, HelpCircle, Users, Clock, BookOpen, MapPin, Phone } from 'lucide-react';
import { FaqItem, localFaqs } from '../data/faqData';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    'Sobre el programa y resultados': <LayoutGrid size={18} />,
    'Para quién es el programa': <Users size={18} />,
    'Información, evaluación y proceso de inscripción': <HelpCircle size={18} />,
    'Horarios y compatibilidad con la rutina': <Clock size={18} />,
    'Materiales incluidos': <BookOpen size={18} />,
    'Modalidad y sedes': <MapPin size={18} />,
    'Contacto y atención': <Phone size={18} />,
};

const FaqPage: React.FC = () => {
    const [faqs, setFaqs] = useState<FaqItem[]>([]);
    const [openIds, setOpenIds] = useState<Set<number>>(new Set());
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>('');

    useEffect(() => {
        const loadData = async () => {
            try {
                setFaqs(localFaqs);
                // Set first category as active by default
                if (localFaqs.length > 0) {
                    const firstCat = localFaqs[0].categoriaFAQ?.nombreCategoria;
                    if (firstCat) setActiveCategory(firstCat);
                }
            } catch (err) {
                console.error('Error loading local FAQs:', err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const toggleFAQ = (id: number) => {
        setOpenIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) newSet.delete(id);
            else newSet.add(id);
            return newSet;
        });
    };

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = new Set<string>();
        faqs.forEach(faq => {
            if (faq.categoriaFAQ?.nombreCategoria) {
                cats.add(faq.categoriaFAQ.nombreCategoria);
            }
        });
        return Array.from(cats);
    }, [faqs]);

    // Filter FAQs by search term and active category
    const filteredFaqs = faqs.filter(faq => {
        const matchesSearch = faq.PREGUNTA.toLowerCase().includes(searchTerm.toLowerCase()) || faq.RESPUESTA.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = searchTerm ? true : faq.categoriaFAQ?.nombreCategoria === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const renderItem = (item: FaqItem) => {
        const isOpen = openIds.has(item.idFAQ);
        return (
            <div
                key={item.idFAQ}
                className="border-b border-gray-100 last:border-0"
            >
                <button
                    onClick={() => toggleFAQ(item.idFAQ)}
                    className="w-full flex justify-between items-center py-6 text-left group transition-colors"
                >
                    <h3 className={`font-bold text-base md:text-lg pr-8 transition-colors ${isOpen ? 'text-ensil-green' : 'text-slate-800 group-hover:text-ensil-green'}`}>
                        {item.PREGUNTA}
                    </h3>
                    <ChevronDown
                        size={20}
                        className={`shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-ensil-green' : 'group-hover:text-ensil-green'}`}
                    />
                </button>
                <div
                    className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'
                        }`}
                >
                    <div className="overflow-hidden">
                        <p className="text-slate-500 text-sm md:text-base leading-relaxed pr-8">
                            {item.RESPUESTA}
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full relative min-h-screen bg-gray-50/50 font-jakarta">
            <Navbar />

            <main className="pt-32 pb-24 px-4 min-h-screen flex flex-col">
                <div className="max-w-6xl mx-auto w-full">

                    {/* Header */}
                    <div className="text-center mb-12 md:mb-16">
                        <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-ensil-green text-xs font-bold uppercase tracking-wider mb-4">
                            CENTRO DE AYUDA
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                            ¿Cómo podemos <span className="text-ensil-green">ayudarte?</span>
                        </h1>

                        {/* Search Bar - Center aligned */}
                        <div className="relative max-w-2xl mx-auto mt-8">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="text-slate-400" size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Busca por duda o palabra clave..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-ensil-green focus:border-transparent outline-none shadow-sm text-base transition-all"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-10 h-10 border-4 border-ensil-green/30 border-t-ensil-green rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">

                            {/* Sidebar Categories (Hide if searching) */}
                            {!searchTerm && (
                                <div className="w-full lg:w-72 shrink-0 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm sticky top-28">
                                    <nav className="flex flex-col gap-1">
                                        {categories.map(category => (
                                            <button
                                                key={category}
                                                onClick={() => setActiveCategory(category)}
                                                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all text-left ${activeCategory === category
                                                    ? 'bg-green-50 text-ensil-green shadow-sm shadow-green-100/50'
                                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                                    }`}
                                            >
                                                <span className={`${activeCategory === category ? 'text-ensil-green' : 'text-slate-400'}`}>
                                                    {CATEGORY_ICONS[category] || <HelpCircle size={18} />}
                                                </span>
                                                {category}
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            )}

                            {/* Main FAQ Content */}
                            <div className="flex-1 w-full bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-10">
                                {!searchTerm && (
                                    <h2 className="text-2xl font-bold text-slate-900 mb-8 pb-4 border-b border-sidebar-border/50 flex items-center gap-3">
                                        <span className="text-ensil-green bg-green-50 p-2 rounded-xl">
                                            {CATEGORY_ICONS[activeCategory] || <HelpCircle size={24} />}
                                        </span>
                                        {activeCategory}
                                    </h2>
                                )}

                                {searchTerm && (
                                    <h2 className="text-lg font-medium text-slate-500 mb-6">
                                        Resultados para: <span className="text-slate-900 font-bold">"{searchTerm}"</span>
                                    </h2>
                                )}

                                <div className="flex flex-col">
                                    {filteredFaqs.length > 0 ? (
                                        filteredFaqs.map(renderItem)
                                    ) : (
                                        <div className="text-center py-16">
                                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 text-slate-300 mb-4">
                                                <Search size={32} />
                                            </div>
                                            <p className="text-lg text-slate-500">
                                                No encontramos respuestas exactas. Intenta con otra palabra clave.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default FaqPage;
