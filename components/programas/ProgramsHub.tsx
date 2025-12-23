import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ProgramsHub: React.FC = () => {
  return (
    <div className="w-full">
        <section className="py-16 md:py-24 text-center max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-xs font-bold tracking-wider uppercase mb-6">
                Programa
            </div>
            <h1 className="font-fraunces text-4xl md:text-6xl text-slate-900 leading-[1.1] mb-6">
                No Somos una Academia. <br className="hidden md:block"/>
                Somos Tu Camino Hacia la <span className="text-underline-doodle z-10">Excelencia</span> en Lectura<span className="text-yellow-400 text-5xl align-top">+</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-jakarta">
                Desarrollamos el potencial intelectual a través de una metodología integral que transforma la manera en que procesas la información.
            </p>
        </section>

        <section className="mb-24 max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex justify-between items-end mb-10">
                <h2 className="font-fraunces text-3xl md:text-4xl text-slate-900">
                    Los 3 Superniveles
                </h2>
                <div className="hidden md:flex gap-2">
                    <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors">
                        <span className="material-icons-round text-slate-600">arrow_back</span>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center">
                        <span className="material-icons-round">arrow_forward</span>
                    </button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {/* PRE KIDS */}
                <div className="group relative bg-white rounded-3xl p-4 shadow-soft hover:shadow-soft-hover transition-all duration-300 flex flex-col h-full border border-transparent hover:border-blue-100">
                    <div className="relative h-56 w-full rounded-2xl overflow-hidden mb-6">
                        <img alt="Pre Kids Lectura" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcwojmSyPlptLXgCKcoFYOB1UcKQV56RWAeJQB58mFlkniHeV4mFA03BomDsKG6fTAwhfgRLbnu7oA6ecpZ69UtylByIPwpVNwKAPr4Qy5LKO7J-2uAy6DBTKg6hCdvNu--jLuLN3yjBXGrNMzROkZT-Hm7hnLtoPIzPoLLBBX9wlD8JyCJqWjexGXZjrK19NjjwuPMI1K3TXqf5R8eQu5Uy4VVeK7tZ26PN9Li9DgHOh5uhkX4ubrp-YFb0CUtpgk2-8mWj807rs"/>
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm">
                            <span className="material-icons-round text-blue-600">child_care</span>
                        </div>
                    </div>
                    <div className="px-2 pb-4 flex-grow flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Nivel Inicial</span>
                            <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded-md">4 - 6 años</span>
                        </div>
                        <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">PRE KIDS</h3>
                        <ul className="space-y-2 mb-6 flex-grow">
                            <li className="flex items-start gap-2 text-sm text-slate-600 font-jakarta">
                                <span className="material-icons-round text-yellow-400 text-base mt-0.5">check_circle</span>
                                Estimulación temprana de lectura.
                            </li>
                            <li className="flex items-start gap-2 text-sm text-slate-600 font-jakarta">
                                <span className="material-icons-round text-yellow-400 text-base mt-0.5">check_circle</span>
                                Desarrollo de vocabulario visual.
                            </li>
                            <li className="flex items-start gap-2 text-sm text-slate-600 font-jakarta">
                                <span className="material-icons-round text-yellow-400 text-base mt-0.5">check_circle</span>
                                Diversión y aprendizaje lúdico.
                            </li>
                        </ul>
                        <Link to="/programas/pre-kids" className="w-full py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 group cursor-pointer">
                            Ver detalles
                            <span className="material-icons-round text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </Link>
                    </div>
                </div>

                {/* KIDS */}
                <div className="group relative bg-blue-600 rounded-3xl p-4 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 flex flex-col h-full transform md:-translate-y-4">
                    <div className="absolute top-0 right-10 transform -translate-y-1/2 bg-yellow-400 text-slate-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-sm z-10">
                        MÁS POPULAR
                    </div>
                    <div className="relative h-56 w-full rounded-2xl overflow-hidden mb-6 bg-blue-600">
                        <img alt="Kids Lectura" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9M6QR7UD9YJSyPHVbTmldKQAZH4hkwu-x2UHvHvvhz0X8KGhtVPwJId6AtRgUlXjetEb_3MNUYnPVW20tIjsydOnSRW7qU5sknqgXoKUPnvJNB8bO4qb6DLyKqzWrenpCDSsHCm03CkSZENsTWUTxSzCbWG71g2Rddtige3rQlYDSK78Howrtj1jFMFLOguC4f792f-j2OJQLmP-aQhgh_RxugZQDoChbuxlFy2tFjR1KotlIXjJyT8Y4eWM-3HJBDtkX7LM_iUo"/>
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30">
                            <span className="material-icons-round text-white">school</span>
                        </div>
                    </div>
                    <div className="px-2 pb-4 flex-grow flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-100">Nivel Escolar</span>
                            <span className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-md backdrop-blur-sm">7 - 12 años</span>
                        </div>
                        <h3 className="font-fraunces text-2xl font-bold text-white mb-3">KIDS</h3>
                        <ul className="space-y-2 mb-6 flex-grow">
                            <li className="flex items-start gap-2 text-sm text-blue-50 font-jakarta">
                                <span className="material-icons-round text-yellow-400 text-base mt-0.5">check_circle</span>
                                Comprensión lectora avanzada.
                            </li>
                            <li className="flex items-start gap-2 text-sm text-blue-50 font-jakarta">
                                <span className="material-icons-round text-yellow-400 text-base mt-0.5">check_circle</span>
                                Hábitos de estudio efectivos.
                            </li>
                            <li className="flex items-start gap-2 text-sm text-blue-50 font-jakarta">
                                <span className="material-icons-round text-yellow-400 text-base mt-0.5">check_circle</span>
                                Concentración sostenida.
                            </li>
                        </ul>
                        <Link to="/programas/kids" className="w-full py-3 rounded-xl bg-white text-blue-600 font-bold text-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                            Ver detalles
                            <span className="material-icons-round text-base">arrow_forward</span>
                        </Link>
                    </div>
                </div>

                {/* PROFESIONAL */}
                <div className="group relative bg-white rounded-3xl p-4 shadow-soft hover:shadow-soft-hover transition-all duration-300 flex flex-col h-full border border-transparent hover:border-blue-100">
                    <div className="relative h-56 w-full rounded-2xl overflow-hidden mb-6">
                        <img alt="Profesional Lectura" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5vJAGA_JTgEWGg27LA2md4R2oUwWCk1lsFXPBYHXOknleHVFPvZgQw0pRQnrQfYMXMsXRei_T-vwgAQYqRKxdOqPhoZyJ-Htcj1igTB9i3vYv_lrr3rhOw0NNQK0plcKFwA-vYzSEQeNsKCSAe_4AE3gig19FHRl6ywpU3Sjq3G354N08flvFQr3yR_dtJxYuR_Lte0kg2TH78y6F4WX_4mQJi3ZxivqO9feWL1JXCft9YKyE8lJKz3zQ0Aqhcx7bMxEDZ6gMROw"/>
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm">
                            <span className="material-icons-round text-blue-600">business_center</span>
                        </div>
                    </div>
                    <div className="px-2 pb-4 flex-grow flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Nivel Superior</span>
                            <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded-md">13+ años</span>
                        </div>
                        <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">PROFESIONAL</h3>
                        <ul className="space-y-2 mb-6 flex-grow">
                            <li className="flex items-start gap-2 text-sm text-slate-600 font-jakarta">
                                <span className="material-icons-round text-yellow-400 text-base mt-0.5">check_circle</span>
                                Lectura veloz y analítica.
                            </li>
                            <li className="flex items-start gap-2 text-sm text-slate-600 font-jakarta">
                                <span className="material-icons-round text-yellow-400 text-base mt-0.5">check_circle</span>
                                Retención de información compleja.
                            </li>
                            <li className="flex items-start gap-2 text-sm text-slate-600 font-jakarta">
                                <span className="material-icons-round text-yellow-400 text-base mt-0.5">check_circle</span>
                                Optimización del tiempo.
                            </li>
                        </ul>
                        <Link to="/programas/profesional" className="w-full py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 group cursor-pointer">
                            Ver detalles
                            <span className="material-icons-round text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        <section className="mb-24 relative max-w-7xl mx-auto px-6 md:px-12">
            <div className="absolute top-0 left-0 w-24 h-24 bg-yellow-200 rounded-full blur-3xl opacity-30 -z-10"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-30 -z-10"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-5 pt-8">
                    <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-3 block">Nuestra Fórmula</span>
                    <h2 className="font-fraunces text-4xl text-slate-900 mb-6 relative inline-block">
                        Metodología <br/>
                        Patentada
                        <span className="absolute -top-4 -right-6 text-yellow-400 text-4xl font-serif italic">+</span>
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed mb-8 font-jakarta">
                        No improvisamos. Utilizamos un sistema científicamente probado que se adapta a la neuroplasticidad de tu cerebro para garantizar resultados permanentes.
                    </p>
                    <a className="inline-flex items-center gap-2 text-slate-900 font-bold border-b-2 border-blue-600 pb-1 hover:text-blue-600 transition-colors" href="#">
                        Conoce el respaldo científico
                        <span className="material-icons-round text-sm">arrow_outward</span>
                    </a>
                </div>
                <div className="lg:col-span-7">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-600/30 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                                <span className="material-icons-round">biotech</span>
                            </div>
                            <h4 className="font-bold text-lg text-slate-900 mb-2 font-fraunces">Diagnóstico Inicial</h4>
                            <p className="text-sm text-slate-500 font-jakarta">Evaluamos tu nivel actual para trazar la ruta exacta hacia tu objetivo.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-600/30 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 mb-4">
                                <span className="material-icons-round">tune</span>
                            </div>
                            <h4 className="font-bold text-lg text-slate-900 mb-2 font-fraunces">Personalización</h4>
                            <p className="text-sm text-slate-500 font-jakarta">Cada cerebro es único. Tu programa se adapta a tu ritmo de aprendizaje.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-600/30 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-4">
                                <span className="material-icons-round">trending_up</span>
                            </div>
                            <h4 className="font-bold text-lg text-slate-900 mb-2 font-fraunces">Evidencia Demostrable</h4>
                            <p className="text-sm text-slate-500 font-jakarta">Medimos tu progreso sesión a sesión con métricas claras y tangibles.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-600/30 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
                                <span className="material-icons-round">emoji_events</span>
                            </div>
                            <h4 className="font-bold text-lg text-slate-900 mb-2 font-fraunces">Celebración del Logro</h4>
                            <p className="text-sm text-slate-500 font-jakarta">Reconocemos cada avance para mantener la motivación al máximo nivel.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="rounded-3xl overflow-hidden shadow-2xl relative max-w-7xl mx-auto mb-20">
            <div className="bg-primary px-8 py-12 md:p-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 mb-4">
                            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                            <span className="text-white text-xs font-bold uppercase tracking-wider">Experiencia Inmersiva</span>
                        </div>
                        <h2 className="font-fraunces text-4xl md:text-5xl text-white mb-4">
                            100% Presencial
                        </h2>
                        <p className="text-white/80 text-lg md:text-xl font-jakarta">
                            La interacción humana es irremplazable. Vive la experiencia ENSIL en nuestras instalaciones de primer nivel.
                        </p>
                    </div>
                    <div className="flex flex-col items-center md:items-end">
                        <div className="text-white font-fraunces text-5xl md:text-6xl font-bold mb-2">16</div>
                        <div className="text-white/90 font-medium tracking-widest uppercase text-sm mb-6 border-t border-white/20 pt-2 w-full text-center md:text-right font-jakarta">
                            Sedes en casi todo el Perú
                        </div>
                        <Link to="/sedes" className="bg-white text-primary hover:bg-yellow-400 hover:text-slate-900 transition-colors px-8 py-3.5 rounded-full font-bold flex items-center gap-2 shadow-lg group">
                            <span className="material-icons-round">map</span>
                            Encuentra tu sede
                            <span className="material-icons-round transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 h-24 md:h-32 opacity-90">
                <img alt="Sede 1" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDu_CGx07pI8JqBSB8Ab3966J404gt6tTTno8Ox1VP_Sy_6FXRsdvtAuvPejGdDz4VE6fk2E8JCdqdFqoztzLwQZPu9muSybdbK9kEDfC7RqcKeefxFxiPGHy_PVZ8jJ3-pL_U_0Fv_RvUxsR7OzaFxvXZePqEp1qWozL0YXo-QFIivOBi4WIzXQXYdUa8-Tx27tSc2-Ghx4yfeafOcJrxdd0UVw2BUhU0ltnhZbbIHnsvbaRM6gDbpMb2NifEXLgyZrblE0pqfz6c"/>
                <img alt="Sede 2" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDt1c9J7Gm6AGScAqEw6l5fx9TaSQJpsI7m5CXgUe6oJH7SoHSbvKH_5EPjggrpQxbiJq3wQ1CMnoRb_Z2nRnfIO8uo6cyRrimWZMMnZyHkNetxhpkICiGrphy4OwR4j6zR3YJLDHxtVoZ9PZ6hmrPOHhR19yOjyifRUuGqxzAvJRX7mVkzn7n3pDOZwpdw8SQtq-k1bE-cBLm54vjLctzBkiH1RWjZGOHkeU1ebzIHhSdqaH_kRcSrsy4G48jsI3GHMwro8YR1ge4"/>
                <img alt="Sede 3" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7i1mR5ae2uY3rPlS8JGj5twBLs3yRnbK17LpoyeslY-3v6qRWft2BlCsDWINKNhp_IVze8R7mzwpCE5LaB1jyjDpGNc1euiRUmKwVEug0QtBOxlV5-h4FfG4fRw-3MhUHRxLUKziVwIb0lrPfv3wdWvf1Kh9Rcb8K5mz5pr9yT4fWmRKPO6QUGNgYx-7hvxS89YKjlpXr2xLi0JN3Vuc5wZ8Jc2mGk7alILDFw8ioMmYyEr4ztJ4ih7LJKjYp2KL-WvykeT4T-F0"/>
                <img alt="Sede 4" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAETk7IrQEF9jpkdcTlIBzB7S1xTB_dWd8hDtv7big96K-G2bm1jwO2c_8zvS5_umVJfdmDz-dGEmr2GdSc7SzJJXZRvRGNPGDmuXm9al1wHBjI6_Fc0sqpO45OJsrK48JWH97XAugtehX42oUBWKWLtus0HTRlVFULS18EMQTH2DmdD6TgmyidcqZrbY18Dd5buc979rdyn48j-C1zAM-_GNN7ZZMGi8EwgxNXkm_JFDUdJS8wNy-XXFXIDiaQzgDIGdL0vrv4Q8E"/>
            </div>
        </section>
    </div>
  );
};

export default ProgramsHub;