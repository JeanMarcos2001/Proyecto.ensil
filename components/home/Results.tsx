import React from 'react';
import { Quote } from 'lucide-react';

const Results: React.FC = () => {
  return (
    <section id="resultados" className="py-24 px-4 bg-white">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-ensil-green font-bold tracking-[0.2em] text-sm uppercase">Testimonios</span>
          <h2 className="font-display text-4xl md:text-5xl text-gray-900 font-bold mt-3 relative inline-block z-10">
            Resultados que hablan
            <span className="absolute right-0 -bottom-2 w-full h-3 bg-accent/20 -skew-x-12 -z-10"></span>
          </h2>

          <div className="flex justify-center -space-x-4 mt-10">
            <img alt="Estudiante 1" className="w-14 h-14 rounded-full border-4 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwUd1xyfe0jISVuJLIXciCSGa4VeiuO1fi3j_2eBO2rOGRCbLtF5x4uzqghuXU3Ir1r8AdBG8xqUrHKjzBO0Lat1R51atoju0oauwQsef2dC6s8B45fBv-AbpG23kIFW1hJrYXc62mhoOgv_8AqIVPGnGciFtRh_malsblqSMVYCwTSlpuu83NPpyxHTC6_ikG06yqNWQoukA5IWVgGnFRHSEATRMh0SYAfXW20sYW7FajB1M5vBnERhnnEEcgvqqkcr-D94Xw2H0" />
            <img alt="Estudiante 2" className="w-14 h-14 rounded-full border-4 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuArpMVDdyqZWDEMgSPE-8FqeDXkKTbEZznLr4xMHvDbC6QHY1w_EvXcqg2AphytX_4yY37Bls7laa5_XSGqE7hSDb5sSWDwcmPhSisG5JpRd2x16P05TNzLPE7lhqTzjBLc5OPDomRZ4Ym6pP0prnwzWwk2IJKY5Ic6pndG_5PLq-0zk1Ha4rNjVs_Jk58bThW_rX6DGc6BSdoaVmrGqXGLutOj3U0zYbv-VSkpqrAhOEhQAMtRp_oTMGTMJswDOvK7WpjEc7TZkVk" />
            <img alt="Estudiante 3" className="w-14 h-14 rounded-full border-4 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYaNHtJsa082Km1DPAaPU0ajmk_nlz3v25TaURmpmBXDciZDHkA8zmzABRbt7D4ygAcO00UX4Hmy-mmXtPEZ7yMbnhFBBr5MNG2sIwEvK6V_RsrkErEXwSPMWGmLWbE5tEMMwg2pyHpXq12K7VKtbIWrmBUtr8l7tTHDMGSoMTsvlZYtKY_0zxAZmJCM42nWFA7NZzIT0HrutlKdYYPo0BNX6bf1a1kK-LekC1cl8EYfTIFORFjgFl1v6u678sjWW4et-gVkTY7uw" />
            <div className="w-14 h-14 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">+2k</div>
          </div>
          <p className="mt-4 text-sm text-gray-500 font-medium">Estudiantes graduados exitosamente</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm relative hover:shadow-lg transition-shadow">
            <div className="text-xs font-bold uppercase tracking-wider text-ensil-green mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ensil-green"></span> 2023 • Programa Integral
            </div>
            <p className="text-gray-700 mb-8 italic font-serif text-lg leading-relaxed">
              "Entré leyendo 180 palabras por minuto y salí con 2100. Pude terminar mi tesis en tiempo récord. ENSIL cambió mi carrera profesional."
            </p>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-3">
                <img alt="Maria" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSU0DMA2iE5xcrL0mpigXbuAtHn3WTUIhEX0Pbp3G8ZCpGyoM9CN1i3_7lHL29ZJHMaa7bF9koA2i3lSob4oVWWcU_8v14oMcu2Ipmu1ZEjgrYQtS9F7msnRZMOdmQriPgYQerp0xLSqEIhau4Gf4rv1IkHjSe0gHI3aSj3SRBLt6dvpTcZyn1BRIvyiatSdz28xIPnF-SqyHeT5nFX-W0J7X2HsqcoNUiHO1dauY_tMhbDTh5YOZFfy_qBf-2cngMON7MZEQiNxo" />
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Maria Gómez</h4>
                  <p className="text-xs text-gray-500">Abogada</p>
                </div>
              </div>
              <Quote className="text-green-100 fill-current" size={40} />
            </div>
          </div>

          {/* Testimonial 2 (ensil-green) */}
          <div className="bg-ensil-green p-8 rounded-3xl shadow-xl relative transform md:-translate-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-white/70 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent"></span> 2024 • Lectura Veloz
            </div>
            <p className="text-white mb-8 font-serif text-lg leading-relaxed font-medium">
              "Al principio era escéptico. ¿Leer un libro en 15 minutos? Ahora lo hago cada mañana. La retención es increíblemente superior."
            </p>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-3">
                <img alt="Carlos" className="w-12 h-12 rounded-full object-cover border-2 border-accent" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBA2W6veC_Dgzng8idSWehU1n-0mSsP0vL87eXaGRWIxtEDjbmmgj2QuATSJoK6OIYMblt-53vH3aFk3xSPMSglbjYJnu9jVXFulMBY4WzPWE2y1rYW5n_KThENgMHLY1nsrRxzf0bIThGAVYkTsjB0fS6GHl67iiZg3bpHYdqCYqAJUqG1SM8oN39jdNe2SGEnXXy45i3haUgwhoPf-EneQn-yZlrS_t2Id4GJauFbUnYEPcBTL4fgJOG6L5et4zysIUvqwStq5Dc" />
                <div>
                  <h4 className="text-sm font-bold text-white">Carlos Ruíz</h4>
                  <p className="text-xs text-white/70">Estudiante Medicina</p>
                </div>
              </div>
              <Quote className="text-white/20 fill-current" size={40} />
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm relative hover:shadow-lg transition-shadow">
            <div className="text-xs font-bold uppercase tracking-wider text-ensil-green mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ensil-green"></span> 2023 • Memoria
            </div>
            <p className="text-gray-700 mb-8 italic font-serif text-lg leading-relaxed">
              "Mi hija tenía problemas de atención en el colegio. El método ENSIL le dio las herramientas para concentrarse y disfrutar aprendiendo."
            </p>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-3">
                <img alt="Sofia" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMGujBviBvF9RdkYTZi-3mAqCkGs9ht4fnCs-ghtmCbji1q91Q9FdJ_kJDaQqImF02KDSbSdui_4n3A4OzW50wXkd0SGW0jkD0CjgpdliZvrvBTAxFdpkCkpfXKvzCK88d2p2-nh5DzReYpjDvr5KFdId2mw9jDm6L0hY2WPdE21OzOWacZqgQ_DTl98AyDmjf4yU5-d3JQau9DnJlWmF46XZoG7SdCn3crcfGurHB6n_1w-L8vCZJsRPN4BKehzcTszv-IK1XefA" />
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Sofía P.</h4>
                  <p className="text-xs text-gray-500">Madre de familia</p>
                </div>
              </div>
              <Quote className="text-green-100 fill-current" size={40} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;