import React, { useState } from 'react';

const ContactContent: React.FC = () => {
  const [audience, setAudience] = useState<string>('me');
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="w-full bg-white font-jakarta text-slate-800">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-12 overflow-hidden bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-ensil-gold text-xs font-bold tracking-wider uppercase mb-6 border border-amber-100">
              <span className="w-2 h-2 rounded-full bg-ensil-gold"></span>
              Método Exclusivo
            </div>
            <h1 className="font-fraunces text-5xl md:text-7xl font-bold leading-tight text-primary mb-6">
              Transforma Tu Lectura en <br/>
              <span className="relative z-10 inline-block">
                Tu Mayor Superpoder
                <span className="absolute left-0 bottom-2 w-full h-2 bg-ensil-gold/30 -z-10 -rotate-1"></span>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
              Descubre el poder de una mente entrenada. Multiplica tu velocidad de lectura y desata tu potencial con nuestro sistema integral.
            </p>
          </div>
          <div className="relative max-w-6xl mx-auto">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-ensil-gold/10 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
            <div className="relative z-10 aspect-video w-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
              <iframe 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen 
                className="w-full h-full object-cover" 
                frameBorder="0" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Conoce ENSIL: Donde la Lectura se Convierte en Transformación"
              ></iframe>
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10"></div>
            </div>
            <div className="hidden md:flex absolute -right-8 bottom-12 bg-white p-4 pr-6 rounded-2xl shadow-xl items-center gap-4 animate-bounce duration-[3000ms]">
              <div className="bg-primary/10 p-3 rounded-xl text-primary">
                <span className="material-icons-round">bolt</span>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">Resultados</p>
                <p className="text-primary font-fraunces font-bold text-xl">10x Más Rápido</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agenda Form Section */}
      <section className="py-16 md:py-24 bg-slate-50/50" id="agenda-form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-soft p-2 md:p-4 max-w-6xl mx-auto overflow-hidden border border-slate-100">
            <div className="grid lg:grid-cols-12 gap-0 lg:gap-8">
              <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <div className="mb-10">
                  <span className="text-ensil-gold font-bold text-sm tracking-wide uppercase mb-2 block">Agenda Tu Sesión</span>
                  <h2 className="font-fraunces text-primary text-4xl md:text-5xl font-bold leading-tight mb-4">
                    Tu Transformación <span className="text-ensil-gold text-3xl align-top">+</span><br/>Comienza Hoy
                  </h2>
                  <p className="text-slate-500 text-lg">
                    Estamos aquí para ayudarte a embarcarte en tu próxima aventura intelectual. Agenda tu entrevista presencial.
                  </p>
                </div>
                <form className="flex flex-col gap-6 w-full" onSubmit={(e) => e.preventDefault()}>
                  <fieldset>
                    <legend className="font-fraunces text-2xl text-slate-900 mb-6">¿Para quién deseas el programa?</legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className="cursor-pointer group relative">
                        <input 
                          className="peer sr-only" 
                          name="audience" 
                          type="radio" 
                          value="me" 
                          checked={audience === 'me'}
                          onChange={() => setAudience('me')}
                        />
                        <div className={`border rounded-2xl p-6 flex flex-row items-center gap-4 transition-all duration-300 h-full ${audience === 'me' ? 'border-primary bg-green-50 shadow-md transform -translate-y-0.5' : 'border-slate-200 bg-slate-50/50 hover:border-primary'}`}>
                          <div className="bg-white rounded-full p-3 shadow-sm text-2xl">👤</div>
                          <div className="flex flex-col">
                            <span className={`font-bold text-lg transition-colors ${audience === 'me' ? 'text-primary' : 'text-slate-900'}`}>Para Mí</span>
                            <span className="text-xs text-slate-500">Desarrollo personal</span>
                          </div>
                          {audience === 'me' && (
                             <span className="material-icons-round ml-auto text-primary animate-fade-in">check_circle</span>
                          )}
                        </div>
                      </label>
                      <label className="cursor-pointer group relative">
                        <input 
                          className="peer sr-only" 
                          name="audience" 
                          type="radio" 
                          value="child"
                          checked={audience === 'child'}
                          onChange={() => setAudience('child')}
                        />
                        <div className={`border rounded-2xl p-6 flex flex-row items-center gap-4 transition-all duration-300 h-full ${audience === 'child' ? 'border-primary bg-green-50 shadow-md transform -translate-y-0.5' : 'border-slate-200 bg-slate-50/50 hover:border-primary'}`}>
                          <div className="bg-white rounded-full p-3 shadow-sm text-2xl">👨‍👦</div>
                          <div className="flex flex-col">
                            <span className={`font-bold text-lg transition-colors ${audience === 'child' ? 'text-primary' : 'text-slate-900'}`}>Para Mi Hijo</span>
                            <span className="text-xs text-slate-500">Potencial académico</span>
                          </div>
                          {audience === 'child' && (
                             <span className="material-icons-round ml-auto text-primary animate-fade-in">check_circle</span>
                          )}
                        </div>
                      </label>
                    </div>
                  </fieldset>
                  <div className="pt-4">
                    <button className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-between group" type="submit">
                      <span className="pl-2 text-lg">Continuar</span>
                      <div className="bg-white text-black rounded-full p-1 transition-transform group-hover:translate-x-1 flex items-center justify-center">
                        <span className="material-icons-round">arrow_forward</span>
                      </div>
                    </button>
                  </div>
                </form>
              </div>
              <div className="lg:col-span-5 relative min-h-[400px] lg:min-h-full overflow-hidden rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none">
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10"></div>
                <img alt="Estudiante universitario concentrado leyendo en una biblioteca." className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmrFCZzkBlx1JPFPzY3LeoRBmbVUwKlkskKZVnSMOHGzy0knpGr_dsMibSe8NohxzLncdmJrvfTBiadvo3gi8V-te-aER_UamJliQgMtOY5XlHR3mHp-zdTKYn7peqkCwS7G_Pj6tnel6tfeTl8ON4Kv0eI9FV95e-fGDuwYbMExACbnryGHCb5Knzoo_pfUOx_DZ7B1Dp8VI9CfnDatkmIP8nc8zE2B9_do2O28j6q209hn4pjIw6jlNmVl0a65PI9WWGhLCxziM"/>
                <div className="absolute bottom-8 left-8 right-8 z-20">
                  <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white shadow-lg">
                    <p className="font-fraunces text-xl text-primary mb-3 italic">"Un lector vive mil vidas antes de morir... El que nunca lee vive solo una."</p>
                    <div className="flex items-center gap-2">
                      <div className="h-px flex-1 bg-slate-300"></div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">George R.R. Martin</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-24 bg-white" id="programa">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-ensil-gold font-bold text-sm tracking-wide uppercase mb-3 block">Beneficios</span>
            <h2 className="font-fraunces text-4xl md:text-5xl text-primary font-bold mb-6">
              Eleva tu Intelecto, <span className="text-ensil-gold italic">Domina</span> tu Tiempo.
            </h2>
            <p className="text-lg text-slate-500">
              Nuestro programa integral está diseñado para desbloquear tu máximo potencial, mejorando no solo tu velocidad de lectura, sino tu comprensión.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-slate-50 p-8 rounded-3xl hover:bg-white transition-all duration-300 hover:shadow-lg border border-transparent hover:border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="material-icons-round text-3xl text-primary">speed</span>
              </div>
              <h3 className="font-fraunces text-2xl text-primary font-semibold mb-3">Lectura Veloz</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                Multiplica tu velocidad de lectura por 10, manteniendo una comprensión superior al 90% mediante técnicas oculares avanzadas.
              </p>
            </div>
            <div className="group bg-primary text-white p-8 rounded-3xl shadow-xl transform md:-translate-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="material-icons-round text-3xl text-ensil-gold">psychology</span>
              </div>
              <h3 className="font-fraunces text-2xl text-white font-semibold mb-3">Comprensión Total</h3>
              <p className="text-white/80 leading-relaxed text-sm">
                Aprende técnicas avanzadas para analizar, sintetizar y retener información compleja sin esfuerzo mental adicional.
              </p>
            </div>
            <div className="group bg-slate-50 p-8 rounded-3xl hover:bg-white transition-all duration-300 hover:shadow-lg border border-transparent hover:border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="material-icons-round text-3xl text-primary">timer</span>
              </div>
              <h3 className="font-fraunces text-2xl text-primary font-semibold mb-3">Gestión del Tiempo</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                Integra la lectura eficiente en tu rutina diaria para optimizar tu productividad y alcanzar tus metas más rápido.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-slate-50 relative overflow-hidden" id="estadisticas">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(#1A4D2E 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-fraunces text-4xl md:text-5xl font-bold text-primary mb-2">Estadísticas de <span className="text-ensil-gold italic">Impacto</span></h2>
              <p className="text-lg text-slate-500">Resultados tangibles que nuestros alumnos experimentan cada día.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <p className="font-fraunces text-6xl font-bold text-primary mb-2">10x</p>
              <div className="h-1 w-12 bg-ensil-gold mb-4"></div>
              <p className="text-slate-900 font-medium">Aumento en Velocidad de Lectura</p>
              <p className="text-sm text-slate-500 mt-2">Promedio logrado en 6 meses.</p>
            </div>
            <div className="bg-primary p-8 rounded-2xl shadow-lg text-white">
              <p className="font-fraunces text-6xl font-bold text-white mb-2">95%</p>
              <div className="h-1 w-12 bg-ensil-gold mb-4"></div>
              <p className="text-white font-medium">Tasa de Comprensión Promedio</p>
              <p className="text-sm text-white/70 mt-2">Retención superior garantizada.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <p className="font-fraunces text-6xl font-bold text-primary mb-2">+25k</p>
              <div className="h-1 w-12 bg-ensil-gold mb-4"></div>
              <p className="text-slate-900 font-medium">Alumnos Graduados con Éxito</p>
              <p className="text-sm text-slate-500 mt-2">Una comunidad en crecimiento.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white" id="testimonios">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-ensil-gold font-bold text-sm tracking-wide uppercase mb-3 block">Testimonios</span>
            <h2 className="font-fraunces text-4xl md:text-5xl text-primary font-bold">Lo que dicen nuestros alumnos</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-ensil-gold mx-auto mt-6 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-3xl p-8 relative hover:bg-white hover:shadow-xl transition-all duration-300 group border border-slate-100">
              <span className="text-6xl text-ensil-gold/20 font-serif absolute top-6 left-6">"</span>
              <div className="relative z-10 flex flex-col h-full">
                <p className="text-slate-500 italic mb-8 pt-4 leading-relaxed">
                  ENSIL cambió mi forma de estudiar. Ahora termino mis lecturas en una fracción del tiempo y recuerdo todo para mis exámenes. ¡Increíble!
                </p>
                <div className="mt-auto flex items-center gap-4 border-t border-slate-200 pt-6">
                  <img alt="Maria González" className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRAhavN8ic6iNWz1xyUyI_e4T4xGD6-SRIpI3suejnXxFQyvPfjUVbNUWqfzVSnf27vGtv5U_SUJ0vrD4WTdv0r2tsDYFNF_F0LrE4v8Bvv2WAxm6dcDbYC9K20Bhcri_0RqF8RN7lIVs3cr1DXCM1QvHferHjlGsUU2VMc5MJHsFwHiZA5FSkTyBeE6YIkJDLXhWeQoOznkW2SoKtG9eFLaNS1SgmCmqZ1LWlPmJhz6z7el8LUT59x-dERjKYyooADe_lkvsYDXQ"/>
                  <div>
                    <p className="font-bold text-primary text-sm">Maria González</p>
                    <p className="text-xs text-slate-500">Estudiante de Derecho</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 rounded-3xl p-8 relative hover:bg-white hover:shadow-xl transition-all duration-300 group border border-slate-100">
              <span className="text-6xl text-ensil-gold/20 font-serif absolute top-6 left-6">"</span>
              <div className="relative z-10 flex flex-col h-full">
                <p className="text-slate-500 italic mb-8 pt-4 leading-relaxed">
                  Como profesional, el tiempo es oro. Gracias a este programa, me mantengo actualizado en mi campo sin sacrificar horas de mi día.
                </p>
                <div className="mt-auto flex items-center gap-4 border-t border-slate-200 pt-6">
                  <img alt="Carlos Rodriguez" className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjdO_2g_DzSGg34Yxw3B46sUtVJ3hR6zn8kNrgIW95wQnc-sMsYJM5-7VYMnpMFjr3WvmOwEQlH3lqZISPj0AqNbPO1r6izjvRiMP2CTiZn4LvgUdkZXlGoPRyunVnpy7yaLqcHFwFE5NFBcKJ-zQIzGrxvSqVTpLckZgY1R6lnQVIQsI4nfcaKbx2V2Hi6EAXaSl0la8EJ4mfNij0hFOvF4c6ONgVHhL3tzMY9y4W4w4rVBEtOaDUke8wQKZRLqZWgAuyFFkbu7U"/>
                  <div>
                    <p className="font-bold text-primary text-sm">Carlos Rodriguez</p>
                    <p className="text-xs text-slate-500">Ingeniero de Software</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 rounded-3xl p-8 relative hover:bg-white hover:shadow-xl transition-all duration-300 group border border-slate-100">
              <span className="text-6xl text-ensil-gold/20 font-serif absolute top-6 left-6">"</span>
              <div className="relative z-10 flex flex-col h-full">
                <p className="text-slate-500 italic mb-8 pt-4 leading-relaxed">
                  Inscribí a mi hijo y su rendimiento escolar mejoró notablemente. Ahora disfruta de la lectura y tiene más confianza en sí mismo.
                </p>
                <div className="mt-auto flex items-center gap-4 border-t border-slate-200 pt-6">
                  <img alt="Ana Torres" className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFKfGH8fTAlAON297D-JFcwqhxwykctGgKUhmClCZ-dTPKfyThjym2Eu54MoWBf2YPCjMpyWJu_mS6M_gLD68FUPJV2STxtql6QbU-_OHDChsVnuIYdFfVk1L-z7SWQuijKBj3cH7jeJcXcJoNB51bSddAbwFBRBLKXgV8uxLlBh9nU0KWGfekwd0p_efgCQEd9GSP0ZZ1NIbvCyYUOOoJ964UFKtUVSY8h2wL5Kj8JP-bDUgA4Mr0F8ERvxzwt7kUF_et2wU969g"/>
                  <div>
                    <p className="font-bold text-primary text-sm">Ana Torres</p>
                    <p className="text-xs text-slate-500">Madre de Familia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-white" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <h2 className="font-fraunces text-4xl text-primary font-bold">
              Preguntas <span className="text-ensil-gold italic">Frecuentes</span>
            </h2>
            <p className="text-slate-500 text-sm mt-2 md:mt-0">Respuestas a tus dudas más comunes</p>
          </div>
          <div className="space-y-4">
            {[
              { id: '1', q: '¿Para qué edades es el programa?', a: 'Nuestro programa está diseñado para niños desde los 9 años, adolescentes, universitarios y profesionales de todas las edades que deseen potenciar sus habilidades. Adaptamos la metodología según el grupo etario.' },
              { id: '2', q: '¿Cuánto tiempo dura el programa?', a: 'La duración estándar del programa es de 6 meses, con clases semanales. Ofrecemos horarios flexibles para adaptarnos a tu rutina y asegurar que puedas completar el entrenamiento satisfactoriamente.' },
              { id: '3', q: '¿Los resultados están garantizados?', a: 'Sí. Confiamos tanto en nuestro método que garantizamos por escrito que multiplicarás tu velocidad de lectura por 10 y mejorarás tu comprensión, o te devolvemos tu inversión. Tu éxito es nuestro compromiso.' }
            ].map((item) => (
              <div key={item.id} className="group border-b border-slate-200 pb-4">
                <button 
                  onClick={() => toggleFaq(item.id)}
                  className="flex justify-between items-center w-full text-left py-4 focus:outline-none"
                >
                  <span className="font-fraunces text-xl text-primary font-medium group-hover:text-green-700 transition-colors">
                    /0{item.id} {item.q}
                  </span>
                  <div className={`rounded-full p-2 transition-all ${openFaq === item.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-primary group-hover:text-white'}`}>
                    <span className={`material-icons-round text-sm transition-transform duration-300 ${openFaq === item.id ? 'rotate-180' : ''}`}>arrow_downward</span>
                  </div>
                </button>
                <div 
                  className={`text-slate-500 pl-0 md:pl-8 leading-relaxed overflow-hidden transition-all duration-300 ${openFaq === item.id ? 'max-h-40 opacity-100 py-2' : 'max-h-0 opacity-0'}`}
                >
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-primary rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-20 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuAmrFCZzkBlx1JPFPzY3LeoRBmbVUwKlkskKZVnSMOHGzy0knpGr_dsMibSe8NohxzLncdmJrvfTBiadvo3gi8V-te-aER_UamJliQgMtOY5XlHR3mHp-zdTKYn7peqkCwS7G_Pj6tnel6tfeTl8ON4Kv0eI9FV95e-fGDuwYbMExACbnryGHCb5Knzoo_pfUOx_DZ7B1Dp8VI9CfnDatkmIP8nc8zE2B9_do2O28j6q209hn4pjIw6jlNmVl0a65PI9WWGhLCxziM')] bg-cover bg-center mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="font-fraunces text-4xl md:text-6xl font-bold mb-6">
                ¡Tu futuro está a solo una <br/><span className="text-ensil-gold italic">decisión de cambiar!</span>
              </h2>
              <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto font-light">
                No esperes más para darte a ti mismo o a tu ser querido la herramienta más poderosa: el conocimiento.
              </p>
              <a href="#agenda-form" className="bg-ensil-gold hover:bg-yellow-500 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-lg hover:-translate-y-1 inline-flex items-center gap-2 group">
                Agendar mi Entrevista Ahora
                <span className="material-icons-round group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default ContactContent;