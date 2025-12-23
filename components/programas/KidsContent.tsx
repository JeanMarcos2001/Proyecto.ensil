import React from 'react';

const KidsContent: React.FC = () => {
  return (
    <div className="w-full font-jakarta text-slate-800">
        <section className="relative w-full min-h-[600px] lg:h-[85vh] flex items-center overflow-hidden bg-background-dark">
            <div className="absolute inset-0 z-0">
                <img alt="Niños de 6-9 años leyendo con concentración y emoción" className="w-full h-full object-cover object-center opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9M6QR7UD9YJSyPHVbTmldKQAZH4hkwu-x2UHvHvvhz0X8KGhtVPwJId6AtRgUlXjetEb_3MNUYnPVW20tIjsydOnSRW7qU5sknqgXoKUPnvJNB8bO4qb6DLyKqzWrenpCDSsHCm03CkSZENsTWUTxSzCbWG71g2Rddtige3rQlYDSK78Howrtj1jFMFLOguC4f792f-j2OJQLmP-aQhgh_RxugZQDoChbuxlFy2tFjR1KotlIXjJyT8Y4eWM-3HJBDtkX7LM_iUo"/>
                <div className="absolute inset-0 bg-gradient-to-r from-ensil-green via-ensil-green/80 to-transparent mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col gap-6 text-white max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-ensil-gold w-fit text-xs font-bold tracking-widest uppercase">
                        Programa Kids
                    </div>
                    <h1 className="font-fraunces text-5xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-lg">
                        KIDS: <span className="text-transparent bg-clip-text bg-gradient-to-r from-ensil-gold to-yellow-200">El Despegue</span> Lector
                    </h1>
                    <div className="space-y-6">
                        <p className="text-xl md:text-2xl text-gray-100 font-light leading-relaxed max-w-lg border-l-4 border-ensil-gold pl-6">
                            "Desarrollan amor por la lectura mientras aumentan su comprensión y velocidad desde temprana edad."
                        </p>
                        <p className="text-lg text-gray-300 font-sans max-w-md">
                            Incremento gradual de complejidad y velocidad para potenciar el hábito lector.
                        </p>
                    </div>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <button className="bg-ensil-gold text-ensil-green hover:bg-white border-2 border-transparent font-bold py-4 px-8 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            Agenda tu diagnóstico gratuito
                            <span className="material-icons-round">arrow_forward</span>
                        </button>
                        <button className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white/30 hover:border-white text-white font-semibold transition-all backdrop-blur-sm hover:bg-white/10">
                            <span className="material-icons-round mr-2">play_circle</span>
                            Ver video explicativo
                        </button>
                    </div>
                </div>
                <div className="hidden lg:block self-end pb-20">
                    <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl max-w-sm ml-auto transform translate-y-8 hover:translate-y-0 transition-transform duration-500">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-ensil-gold flex items-center justify-center text-ensil-green shadow-lg">
                                <span className="material-icons-round text-2xl">emoji_events</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-lg">Objetivo Clave</h4>
                                <span className="text-xs text-ensil-gold font-bold tracking-wider uppercase">Excelencia Académica</span>
                            </div>
                        </div>
                        <p className="text-gray-200 font-sans leading-relaxed text-sm">
                            Preparamos a los niños para enfrentar con éxito los retos escolares, convirtiendo la lectura en su superpoder.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 -mt-10 relative z-20">
            <div className="bg-white rounded-[2.5rem] shadow-soft p-8 md:p-12 border border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    <div className="space-y-8">
                        <div>
                            <h3 className="font-fraunces text-2xl text-ensil-green font-bold mb-6 flex items-center gap-2">
                                <span className="material-icons-round">info</span>
                                Información General
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
                                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0">
                                        <span className="material-icons-round text-2xl">cake</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg">Edad Recomendada</h4>
                                        <p className="text-slate-600 mt-1">Mayormente 6 a 9 años <br/><span className="text-xs text-slate-500">(según diagnóstico previo)</span></p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
                                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-ensil-green flex-shrink-0">
                                        <span className="material-icons-round text-2xl">stairs</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg">Estructura</h4>
                                        <p className="text-slate-600 mt-1">3 Niveles Progresivos: <br/><strong>Kids 1, Kids 2 y Kids 3</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <h3 className="font-fraunces text-2xl text-ensil-green font-bold mb-6 flex items-center gap-2">
                            <span className="material-icons-round">backpack</span>
                            Materiales Incluidos
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-ensil-gold hover:shadow-soft-hover transition-all duration-300">
                                <div className="w-10 h-10 rounded-lg bg-ensil-green/10 flex items-center justify-center text-ensil-green mb-4 group-hover:scale-110 transition-transform">
                                    <span className="material-icons-round">view_module</span>
                                </div>
                                <h5 className="font-bold text-slate-900 mb-2">Módulo KIDS</h5>
                                <p className="text-sm text-slate-600">Tarjetas especializadas de 29.7 x 10.5 cm para ejercicios visuales.</p>
                            </div>
                            <div className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-ensil-gold hover:shadow-soft-hover transition-all duration-300">
                                <div className="w-10 h-10 rounded-lg bg-ensil-green/10 flex items-center justify-center text-ensil-green mb-4 group-hover:scale-110 transition-transform">
                                    <span className="material-icons-round">auto_stories</span>
                                </div>
                                <h5 className="font-bold text-slate-900 mb-2">8 Libros Narrativos</h5>
                                <p className="text-sm text-slate-600">Historias seleccionadas con tipografía y tamaño de letra adaptados.</p>
                            </div>
                            <div className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-ensil-gold hover:shadow-soft-hover transition-all duration-300">
                                <div className="w-10 h-10 rounded-lg bg-ensil-green/10 flex items-center justify-center text-ensil-green mb-4 group-hover:scale-110 transition-transform">
                                    <span className="material-icons-round">visibility</span>
                                </div>
                                <h5 className="font-bold text-slate-900 mb-2">Primer Velóptico 'KIDS'</h5>
                                <p className="text-sm text-slate-600">Herramienta exclusiva de entrenamiento visual (entregado en nivel 3).</p>
                            </div>
                            <div className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-ensil-gold hover:shadow-soft-hover transition-all duration-300">
                                <div className="w-10 h-10 rounded-lg bg-ensil-green/10 flex items-center justify-center text-ensil-green mb-4 group-hover:scale-110 transition-transform">
                                    <span className="material-icons-round">work</span>
                                </div>
                                <h5 className="font-bold text-slate-900 mb-2">Maletín ENSIL</h5>
                                <p className="text-sm text-slate-600">Kit personalizado para transportar todos los materiales del programa.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <p className="font-fraunces font-bold text-lg text-slate-900">¿Listo para comenzar?</p>
                        <p className="text-slate-500 text-sm">El primer paso es conocer el nivel actual de tu hijo.</p>
                    </div>
                    <button className="bg-ensil-green text-white font-bold py-4 px-8 rounded-full hover:bg-[#114224] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        Agenda tu diagnóstico gratuito
                        <span className="material-icons-round">arrow_forward</span>
                    </button>
                </div>
            </div>
        </section>
    </div>
  );
};

export default KidsContent;