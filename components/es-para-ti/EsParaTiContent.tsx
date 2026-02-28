import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const EsParaTiContent: React.FC = () => {
    const { ref: gridRef, isVisible } = useScrollReveal(0.15);
    return (
        <div className="w-full bg-white text-slate-800 font-jakarta">
            <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 space-y-20">

                {/* Header Section */}
                <div className="text-center mb-10 md:mb-12 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 w-64 h-64 bg-green-400/10 rounded-full blur-3xl -z-10"></div>
                    <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider mb-4">
                        Criterios de Admisión
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight font-fraunces">
                        ENSIL <span className="text-slate-400 line-through decoration-ensil-green decoration-4">No</span> Es <br className="hidden md:block" />
                        Para <span className="relative inline-block italic text-ensil-green">
                            Cualquiera
                            <svg className="absolute -top-6 -right-8 w-8 h-8 text-ensil-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path></svg>
                        </span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-slate-600 font-jakarta">
                        La lectura integral requiere compromiso. Descubre si tu perfil se alinea con nuestra metodología de alto rendimiento.
                    </p>
                </div>

                {/* Comparison Grid */}
                <section
                    ref={gridRef as React.RefObject<HTMLElement>}
                    className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 transition-all duration-1000 ease-out transform
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}
                    `}
                >
                    {/* YES Column */}
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden group hover:border-ensil-green/50 transition-all duration-300 flex flex-col">
                        <div className="h-80 md:h-[400px] relative w-full overflow-hidden">
                            <img alt="Estudiante enfocada y exitosa" className="w-full h-full object-cover object-[center_90%] group-hover:scale-105 transition-transform duration-700" src="/img/esparati/Alumno-_1_.webp" />
                            <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-white via-white/60 to-transparent z-10"></div>
                        </div>
                        <div className="p-8 md:p-10 pt-2 flex-1 relative z-20">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-ensil-green shrink-0">
                                    <span className="material-icons-round text-2xl">check_circle</span>
                                </div>
                                <h3 className="text-3xl font-bold text-slate-800 italic font-fraunces">ERES PERFECTO PARA ENSIL SI...</h3>
                            </div>
                            <ul className="space-y-4 text-slate-600 font-medium font-jakarta">
                                <li className="flex items-start">
                                    <span className="material-icons-round text-ensil-green mr-3 mt-1">done</span>
                                    <span>Tienes un deseo genuino de aprender y superar tus límites actuales.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="material-icons-round text-ensil-green mr-3 mt-1">done</span>
                                    <span>Estás dispuesto a invertir tiempo (mínimo 20 min diarios) en tu entrenamiento.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="material-icons-round text-ensil-green mr-3 mt-1">done</span>
                                    <span>Valoras la comprensión profunda sobre la velocidad superficial.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="material-icons-round text-ensil-green mr-3 mt-1">done</span>
                                    <span>Eres constante y entiendes que los resultados requieren disciplina.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="material-icons-round text-ensil-green mr-3 mt-1">done</span>
                                    <span>Buscas aplicar lo leído para mejorar tu vida profesional o académica.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* NO Column */}
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden group hover:border-red-500/50 transition-all duration-300 flex flex-col">
                        <div className="h-80 md:h-[400px] relative w-full overflow-hidden">
                            <img alt="Persona enfrentando un reto o dificultad" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[20%]" src="/img/esparati/Alumno-_2_.webp" />
                            <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-white via-white/60 to-transparent z-10"></div>
                        </div>
                        <div className="p-8 md:p-10 pt-2 flex-1 relative z-20">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500 shrink-0">
                                    <span className="material-icons-round text-2xl">cancel</span>
                                </div>
                                <h3 className="text-3xl font-bold text-slate-800 italic font-fraunces">ENSIL NO ES PARA TI SI...</h3>
                            </div>
                            <ul className="space-y-4 text-slate-600 font-medium font-jakarta">
                                <li className="flex items-start">
                                    <span className="material-icons-round text-red-500 mr-3 mt-1">close</span>
                                    <span>Buscas una "píldora mágica" sin esfuerzo de tu parte.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="material-icons-round text-red-500 mr-3 mt-1">close</span>
                                    <span>Crees que ya lo sabes todo y no tienes apertura para desaprender hábitos.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="material-icons-round text-red-500 mr-3 mt-1">close</span>
                                    <span>No tienes 20 minutos al día para dedicar a tu crecimiento personal.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="material-icons-round text-red-500 mr-3 mt-1">close</span>
                                    <span>Solo te interesa terminar libros rápido sin entender el contenido.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="material-icons-round text-red-500 mr-3 mt-1">close</span>
                                    <span>Sueles abandonar proyectos a la primera dificultad que encuentras.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Diagnosis Section */}
                <section className="relative">
                    <div className="bg-green-50 border border-green-200 rounded-3xl overflow-hidden shadow-lg flex flex-col md:flex-row">
                        <div className="p-8 md:p-12 md:w-3/5 flex flex-col justify-center">
                            <div className="inline-flex items-center gap-2 mb-4 bg-white px-3 py-1 rounded-full shadow-sm w-fit">
                                <span className="material-icons-round text-ensil-green text-sm">school</span>
                                <span className="text-xs font-bold text-ensil-green uppercase tracking-wide font-jakarta">Evaluación Previa</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight font-fraunces">
                                TU NIVEL SE DEFINE POR DIAGNÓSTICO, <br className="hidden md:block" /> <span className="text-ensil-green italic">NO POR EDAD</span>
                            </h2>
                            <p className="text-slate-600 mb-8 text-lg font-jakarta">
                                En ENSIL, no agrupamos a los estudiantes por grado escolar, sino por capacidad cognitiva actual. Realizamos una evaluación exhaustiva de velocidad, comprensión y retención para diseñar tu ruta personalizada.
                            </p>
                            <button className="group relative flex items-center justify-center gap-2 bg-ensil-green text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:-translate-y-1 transition-all duration-300 w-full md:w-fit font-jakarta">
                                <span>Agenda tu Evaluación</span>
                                <span className="material-icons-round group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                        </div>
                        <div className="md:w-2/5 relative h-64 md:h-auto min-h-[300px]">
                            <img alt="Estudiante recibiendo orientación personalizada" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaoF22GeT_z-TICnxOdyeg-oNKNEDL4PpIInulytdK4yS3sc7fOPkX2LsKZtU1m-ShbSocyREZmFstiMnBWd5V0RUGoMXTqNoiT9ggIELlgvpM474XOFUT9E_rz13XXcrbgHf6rP8yjZao2t-1iLFTksOH2tIXOM09oeBGpi2Iudj-ebpQzfrr1x1BkuXqm3PIaWGd_wON7XOjDSp4SXgHt7P4qcQhsdEG8ENSCOU7N6xgdKcERMwtIMnuR_-eUl0MXqdIE2xZ72w" />
                            <div className="absolute inset-0 bg-ensil-green/20 mix-blend-multiply"></div>
                        </div>
                    </div>
                </section>

                {/* Promises Grid */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden flex flex-col justify-center">
                        <div className="absolute -right-12 -top-12 w-48 h-48 bg-ensil-green rounded-full mix-blend-overlay filter blur-3xl opacity-30"></div>
                        <h3 className="text-4xl font-bold mb-6 flex items-center gap-3 font-fraunces">
                            <span className="material-icons-round text-green-400 text-4xl">verified_user</span>
                            Nuestra Promesa
                        </h3>
                        <div className="space-y-8 text-slate-300 font-jakarta text-lg">
                            <p className="leading-relaxed">
                                Te entregamos una metodología probada, herramientas de vanguardia y acompañamiento experto. Si sigues el programa al pie de la letra, garantizamos un incremento sustancial en tu velocidad lectora manteniendo o mejorando tu comprensión.
                            </p>
                            <div className="flex gap-8 pt-6 border-t border-slate-700/50">
                                <div>
                                    <span className="block text-3xl font-serif text-white">100%</span>
                                    <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Compromiso</span>
                                </div>
                                <div>
                                    <span className="block text-3xl font-serif text-white">24/7</span>
                                    <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Soporte</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-3xl p-10 shadow-xl border-2 border-dashed border-slate-200 flex flex-col justify-center">
                        <h3 className="text-4xl font-bold mb-6 flex items-center gap-3 text-slate-900 font-fraunces">
                            <span className="material-icons-round text-ensil-green text-4xl">handshake</span>
                            Tu Promesa
                        </h3>
                        <div className="space-y-8 text-slate-600 font-jakarta text-lg">
                            <p className="leading-relaxed">
                                Te comprometes a ser honesto contigo mismo, a realizar las prácticas asignadas y a comunicar tus dudas. El éxito en ENSIL es un trabajo en equipo donde tú eres el jugador principal.
                            </p>
                            <div className="bg-green-50 p-5 rounded-xl flex items-center gap-4 border-l-4 border-ensil-green">
                                <div className="w-2 h-2 rounded-full bg-ensil-green animate-pulse shrink-0"></div>
                                <p className="text-base font-medium text-ensil-green italic font-fraunces">
                                    "La disciplina es el puente entre metas y logros."
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Philosophy Quote */}
                <section className="max-w-4xl mx-auto">
                    <div className="border-2 border-ensil-gold bg-amber-50 rounded-2xl p-8 md:p-12 text-center relative">
                        <span className="material-icons-round text-6xl text-ensil-gold/20 absolute top-4 left-4 transform rotate-180">format_quote</span>
                        <span className="material-icons-round text-6xl text-ensil-gold/20 absolute bottom-4 right-4">format_quote</span>
                        <h2 className="text-4xl md:text-5xl font-fraunces italic font-medium text-slate-800 mb-6">
                            "La mejor herencia... la felicidad"
                        </h2>
                        <div className="w-16 h-1 bg-ensil-gold mx-auto mb-4"></div>
                        <p className="text-sm md:text-base text-slate-500 font-bold tracking-widest uppercase font-jakarta">
                            Filosofía ENSIL
                        </p>
                    </div>
                </section>

            </main>
        </div>
    );
};

export default EsParaTiContent;