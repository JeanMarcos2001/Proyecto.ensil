import React from 'react';

const testimonialsData = [
  {
    id: 1,
    name: "María Lopez",
    occupation: "CEO & Fundadora",
    program: "Profesional",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlJh0XUqP0W69pDTc94PkWGfySOiVFvw0EYF5npgO3gAxYVWAS-VGbIz-GzpQ5WIimk86i6ZbHdB16ptKfxOaGkYstk8-gOt2YdkOdXJGWck5lax9RsBOOAisEYupvedapkT7OaLQI9RHbkxhpSlAR3cWgtlelVyZvhOjoFOGUA7eoUemzJ0NUveHg9EEBFyIy19zgNz-FxKJPyp9vZ8WzH5CkN0xMWWbWnL-s0Np1AaNW0aavmba-VzRKLxGjIN__0KhZ7O4M4mQ",
    text: "Pensé que leer rápido significaba perder comprensión, pero ENSIL me demostró lo contrario. Ahora leo un libro por semana manteniendo el 100% de retención en mis proyectos.",
    speed: "1,200 ppm",
    comprehension: "100%"
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    occupation: "Estudiante de Derecho",
    program: "Profesional",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDycFLhDTVXG4J_ypj_TYcy0HBGQTQlC1LYBFdxbkZBVFOB0iNj5hTPJsKObnqAfdhOSJlM8OAVZeZ_h7xh59eJNnONADNXtTH4kz5vh4SkRBuqJhoEpW8xaTrXsFeS9zLPbPa6JENq0vEgvMWDjyYLB3zZJWHCzCNqMuLvPmv-rcMkRzypUtz_4m5sJUVX_rr-odRRqujtyXfEITw6fPEVpHWCRWpJVpKImTu3wq4MC5QH4AkVIDawuwtWqXYgoWRSMGIX4TlfRGI",
    text: "La carga de lectura en mi carrera era abrumadora. ENSIL no solo me ahorró tiempo, sino que me dio la confianza para destacar en mis exámenes y prepararme mejor.",
    speed: "2,400 ppm",
    comprehension: "100%"
  },
  {
    id: 3,
    name: "Lucía Vargas",
    occupation: "Estudiante de Primaria",
    program: "Kids",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMAaVusTvFpywPEjL2ouYf7UAWwq_gCCIq7XahIGoS65IYC5R4lPX7veQX9rI32hc8F2tgBlIj3Va7W-y6JdTcHHiL30PYPlzeS1_rpS6iHByzu5RBQ-ThXcTXEt1-k5VDq3IUriqRqkSSitXTMnN4exC4oReJVou28VtGK0MeRt4BJjtZ5obPtaqSLoy9rmj3TlFgWC48506keC273EVg-_0Y4UqereeYLLvcKINDkYUsB0xjcpxv5rtQtEcQLe_f-l567EGK1xg",
    text: "Antes me aburría mucho leer cuentos largos. Ahora leo más rápido que mis compañeros y entiendo todo lo que leo. ¡Me encantan los libros de aventuras!",
    speed: "650 ppm",
    comprehension: "100%"
  },
  {
    id: 4,
    name: "Mateo Silva",
    occupation: "Nivel Inicial",
    program: "PreKids",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCl2aD8-y3aI3JtC3X-oVvR3NfM3Y5G5K8P_A1z3aI3JtC3X-oVvR3NfM3Y5G5K8P_A1z3aI3JtC3X-oVvR3NfM",
    // Note: fallback placeholder for child not currently in images
    text: "Mi hijo Mateo tenía problemas de concentración. Desde que empezó en PreKids, su agilidad mental ha mejorado muchísimo. Está feliz y motivado.",
    speed: "Iniciado",
    comprehension: "95%"
  },
  {
    id: 5,
    name: "Ana Torres",
    occupation: "Médico Cirujano",
    program: "Profesional",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqwBCeE1hZspmnimeKcqfC8kK260mvIqAN2aVGSDSWFi_dq1bzq7dtvodBqkhEtLg20shaSpzg63zqLrP2bWVR1TbTnFYjk13R86rw0Lz9JLzbACsWKoSmuiE56bfpcsQzGZfoX5QuRZlWCa9rOXmQDb6TSyy-a6-AiiDtVvV4eOnTa_Qw0_QcM45IP1l3QbzqUMeB_-VtlKzNNHqxcXW1OsBRQlSeQ07KeG5BEY4p0xb1c30vxStFdLc8ZE-XHntWwKPrXep4Cco",
    text: "Actualizarme con artículos médicos me tomaba madrugadas enteras. Con ENSIL, mi velocidad de procesamiento de textos técnicos es otro nivel. Un antes y un después.",
    speed: "1,850 ppm",
    comprehension: "100%"
  },
  {
    id: 6,
    name: "Sofía Medina",
    occupation: "Estudiante Secundaria",
    program: "Kids",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuABU4O0L-_l1R9R-qV8E_Z-bL900uS7b-f2sA1z3aI3JtC3X-oVvR3NfM3Y5G5K8P_A1z3aI3JtC3X-oVvR3NfM",
    // Note: fallback placeholder for teen
    text: "Las tareas del colegio se me acumulaban muy rápido. Ahora termino de leer los textos de historia y literatura en minutos. He subido mis notas increíblemente.",
    speed: "900 ppm",
    comprehension: "100%"
  }
];

const ResultsContent: React.FC = () => {
  return (
    <div className="w-full bg-white text-slate-800 font-jakarta">
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 space-y-16">

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider mb-4">
            Nuestros Resultados
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
            La prueba está en <br />
            <span className="relative inline-block">
              los resultados
              <span className="absolute -top-4 -right-6 text-yellow-400 text-4xl font-light">+</span>
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-400 opacity-80" fill="none" viewBox="0 0 200 9" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.00025 6.99997C25.7509 2.99991 73.2505 1.50005 99.0003 4.49997C119.349 6.87083 145.003 7.82885 198.003 2.50005" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
              </svg>
            </span>
          </h1>
          <p className="text-lg text-slate-600">
            Transformamos la manera en que procesas información. Nuestra metodología integral combina velocidad, comprensión y retención para desbloquear tu máximo potencial intelectual.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-green-800 p-8 rounded-3xl text-white relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <span className="material-icons-round text-6xl">school</span>
            </div>
            <h3 className="text-5xl font-bold mb-2 relative z-10">1000<span className="text-yellow-400">+</span></h3>
            <p className="font-medium text-green-100 relative z-10">Graduados Exitosos</p>
            <div className="mt-4 text-xs bg-white/20 inline-block px-3 py-1 rounded-full backdrop-blur-sm">Líderes en Perú</div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-50 rounded-full"></div>
            <h3 className="text-5xl font-bold text-slate-900 mb-2">95<span className="text-green-700 text-3xl align-top">%</span></h3>
            <p className="font-medium text-slate-600">Aprueban sus módulos</p>
            <p className="text-xs text-slate-400 mt-2">En el primer intento</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <span className="material-icons-round text-green-700 text-3xl mb-2">location_on</span>
            <h3 className="text-5xl font-bold text-slate-900 mb-2">16</h3>
            <p className="font-medium text-slate-600">Sedes Nacionales</p>
            <p className="text-xs text-slate-400 mt-2">Presencia en todo el país</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <span className="material-icons-round text-green-700 text-3xl mb-2">history</span>
            <h3 className="text-5xl font-bold text-slate-900 mb-2">20<span className="text-green-700 text-3xl align-top">+</span></h3>
            <p className="font-medium text-slate-600">Años de Experiencia</p>
            <p className="text-xs text-slate-400 mt-2">Metodología comprobada</p>
          </div>
        </div>

        {/* Visual Evidence Section */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Evidencia Visual <span className="text-yellow-400 text-4xl">+</span></h2>
              <p className="text-slate-500 mt-2">Momentos reales de superación académica.</p>
            </div>
            <button className="flex items-center gap-2 text-green-700 font-bold hover:gap-4 transition-all group">
              Ver galería completa <span className="material-icons-round text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:h-[500px]">
            <div className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group shadow-md cursor-pointer">
              <img alt="Estudiantes estudiando" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMoHZgAFX7hGcNnRzZEYIgghFR9G4wTH-FPHH3vRl4KHVor37HCfjvZzkPUt1LibFpjNFMoBRZiAJq0RdLMiIv316xyRWsjEDHIzTgL9RrenDAkXHi2E0ObTyZUO0jvW9Im_LogQQK6cuUTMnkTGorRiW6-_o1RxjVd730yMECIxvPKt_2SztrslzIpR-9ZFgvmvki6QfpOS9aDKQ7-9VeL8x9UcGQ_peYd1UjL_OYbfcWiuR8RzaUJepnESrNbUikJNjMxYYQ2sM" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full mb-2 inline-block">Entrenamiento</span>
                <p className="text-white font-semibold">Sesiones de práctica intensiva</p>
              </div>
            </div>

            <div className="md:col-span-1 md:row-span-2 relative rounded-3xl overflow-hidden group shadow-md cursor-pointer">
              <img alt="Graduación ENSIL" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9ebh22bTPg3mUlxBSlNUnx1VRadG99Tn4pOlyoHqUbwixz4pwLsYIzv_-Ifd0XGxaSwcCTPWdTdoTv5HLC02P0_0EoTWwT0TySF5TQ6HHP5uExL6WyEsiuHMa7OeWy1A4LcKxrq5UCAll7zmALJuCXEdJ0hUUgpX515uW6inOJfNaATdiMb9ujGNVDvjY2_YhKlLwNEcEN9BfPQ3yePWfUZl-wD3L25ABPn0fAhDCT8XoDmH3TpfSKHN3-7a__cgFLEw7z2ANkPA" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full mb-2 inline-block">Ceremonia</span>
                <p className="text-white font-semibold">Graduación Promoción 2024</p>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden group shadow-md bg-slate-100 flex items-center justify-center">
              <img alt="Cronómetro" className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYFRrrWrF8rGykIvzPTsJgR11UQ2DjhN1s12m73bRH2JPTscpO--rW-tuCukGR2rU8q6ONX3YkKftl_AEfEbi7l0HHsaCEAebCEdfdhzrTSVbWXFZderSgHwN2CEStuos-9PEHSHDtiMOzswBZSFzB2kzlbdv4bySc6sSGpst7xSvoMKoee2LhcuG_KFhy_s2oP7wWX6uNuM3x8PVCeFKg2ZxeQyYy4rjhQhowf9_3vmPtbC8_gKz_Xt4JVNuVDD7VhEaKpbPBE4k" />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-800/20 backdrop-blur-[2px]">
                <span className="material-icons-round text-white text-4xl drop-shadow-lg">timer</span>
                <p className="text-white font-bold drop-shadow-md mt-2">Velocidad</p>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden group shadow-md bg-white p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="material-icons-round text-green-700 bg-green-100 p-2 rounded-xl">emoji_events</span>
              </div>
              <div>
                <p className="text-4xl font-bold text-slate-900">10x</p>
                <p className="text-sm text-slate-500">Mejora promedio</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transformation Stories */}
        <div className="space-y-8 py-8 overflow-hidden">
          <h2 className="text-3xl font-bold text-center text-slate-900">
            Historias de transformación
          </h2>
          {/* Marquee Container */}
          <div className="relative w-full overflow-hidden flex pt-6 pb-8 -mt-2 group/marquee">
            {/* Left Fade */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 md:w-48 bg-gradient-to-r from-white to-transparent"></div>
            {/* Right Fade */}
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 md:w-48 bg-gradient-to-l from-white to-transparent"></div>

            <div className="flex animate-marquee hover:[animation-play-state:paused] gap-6 whitespace-nowrap">
              {/* Double array to create seamless loop effect */}
              {[...testimonialsData, ...testimonialsData].map((testimonial, idx) => {
                // Determine group color class based on program
                let groupHoverColor = "";
                let programBadgeBg = "bg-green-100 text-green-700";

                if (testimonial.program === "Profesional") {
                  groupHoverColor = "hover:bg-blue-600";
                  programBadgeBg = "bg-blue-100 text-blue-700";
                } else if (testimonial.program === "Kids") {
                  groupHoverColor = "hover:bg-red-500";
                  programBadgeBg = "bg-red-100 text-red-700";
                } else if (testimonial.program === "PreKids") {
                  groupHoverColor = "hover:bg-orange-500";
                  programBadgeBg = "bg-orange-100 text-orange-700";
                }

                return (
                  <div
                    key={`${testimonial.id}-${idx}`}
                    className={`min-w-[320px] max-w-[350px] whitespace-normal bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 relative group transition-all duration-300 hover:-translate-y-4 hover:shadow-xl ${groupHoverColor}`}
                  >
                    <span className="absolute top-8 right-8 text-6xl text-slate-100 font-serif leading-none group-hover:text-white/20 transition-colors">”</span>
                    <div className="flex items-center gap-4 mb-4">
                      <img alt={testimonial.name} className={`w-14 h-14 rounded-full object-cover ring-2 ring-slate-100 ring-offset-2 group-hover:ring-white/50 transition-colors`} src={testimonial.image} />
                      <div>
                        <h4 className="font-bold text-slate-900 group-hover:text-white transition-colors">{testimonial.name}</h4>
                        <p className="text-xs text-slate-500 group-hover:text-white/80 transition-colors uppercase tracking-wide">{testimonial.occupation}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className={`inline-block px-2 py-1 text-[10px] font-bold uppercase rounded-full transition-colors group-hover:bg-white/20 group-hover:text-white ${programBadgeBg}`}>
                        Programa {testimonial.program}
                      </span>
                    </div>

                    <p className="text-slate-600 mb-6 relative z-10 text-sm group-hover:text-white transition-colors line-clamp-4">
                      "{testimonial.text}"
                    </p>
                    <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between group-hover:bg-white/10 transition-colors border border-transparent group-hover:border-white/10">
                      <div>
                        <p className="text-xs text-slate-500 group-hover:text-white/70 transition-colors">Vel. final</p>
                        <p className="text-lg font-bold text-slate-900 group-hover:text-white transition-colors">{testimonial.speed}</p>
                      </div>
                      <div className="h-8 w-px bg-slate-200 group-hover:bg-white/20 transition-colors"></div>
                      <div>
                        <p className="text-xs text-slate-500 group-hover:text-white/70 transition-colors">Comprensión</p>
                        <p className="text-lg font-bold text-slate-900 group-hover:text-white transition-colors">{testimonial.comprehension}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Methodology Section */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="text-center mb-12">
            <span className="text-yellow-400 font-bold text-sm tracking-wider uppercase mb-2 block">Metodología Transparente</span>
            <h2 className="text-3xl font-bold text-slate-900">Tu camino al éxito</h2>
            <p className="text-slate-500 mt-2">Un proceso estructurado para garantizar resultados.</p>
          </div>
          <div className="relative">
            {/* Timeline connector line */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-slate-100 -z-10"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-8">
              <div className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-700 group-hover:text-white transition-colors duration-300 text-green-700">
                  <span className="material-icons-round text-3xl">psychology</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Diagnóstico</h4>
                <p className="text-xs text-slate-500">Evaluación inicial</p>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-700 group-hover:text-white transition-colors duration-300 text-green-700">
                  <span className="material-icons-round text-3xl">assignment_ind</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Asignación</h4>
                <p className="text-xs text-slate-500">Nivel personalizado</p>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-700 group-hover:text-white transition-colors duration-300 text-green-700">
                  <span className="material-icons-round text-3xl">cast_for_education</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-1">1ra Asesoría</h4>
                <p className="text-xs text-slate-500">Inicio del programa</p>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-700 group-hover:text-white transition-colors duration-300 text-green-700">
                  <span className="material-icons-round text-3xl">fitness_center</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Entrenamiento</h4>
                <p className="text-xs text-slate-500">Práctica semanal</p>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-700 group-hover:text-white transition-colors duration-300 text-green-700">
                  <span className="material-icons-round text-3xl">quiz</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Evaluación</h4>
                <p className="text-xs text-slate-500">Fin de módulo</p>
              </div>
              <div className="flex flex-col items-center text-center group relative">
                <div className="absolute -top-4 right-0 text-xs text-orange-500 font-bold hidden md:block animate-bounce">
                  <span className="material-icons-round text-sm">replay</span> Repetición
                </div>
                <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-700 group-hover:text-white transition-colors duration-300 text-green-700 border-2 border-dashed border-green-700">
                  <span className="material-icons-round text-3xl">trending_up</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Avance</h4>
                <p className="text-xs text-slate-500">Basado en logros</p>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-yellow-400 text-slate-900 flex items-center justify-center mb-4 shadow-lg shadow-yellow-200 transform group-hover:scale-110 transition-transform">
                  <span className="material-icons-round text-4xl">school</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Graduación</h4>
                <p className="text-xs text-slate-500">Ceremonia oficial</p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 rounded-xl flex items-start gap-3 max-w-2xl mx-auto">
              <span className="material-icons-round text-yellow-600">info</span>
              <p className="text-sm text-yellow-800">
                <strong>Nota importante:</strong> El avance entre módulos depende estrictamente del cumplimiento de objetivos. Si no se alcanza la meta, reforzamos el módulo sin costo adicional hasta lograr la excelencia.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-green-700 rounded-full filter blur-[100px] opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-400 rounded-full filter blur-[100px] opacity-20"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">¿Listo para multiplicar tu capacidad de lectura?</h2>
            <p className="text-slate-300 mb-8 text-lg">Únete a los más de 1000 graduados que han transformado su vida académica y profesional.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-yellow-400 text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2">
                Reservar Diagnóstico Gratuito
                <span className="material-icons-round">arrow_forward</span>
              </button>
              <button className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-colors">
                Hablar con un asesor
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default ResultsContent;