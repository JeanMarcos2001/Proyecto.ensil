import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Phone, Smartphone, ChevronDown, MessageCircle, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Sede {
  id: number;
  nombre: string;
  departamento: string;
  provincia: string;
  distrito: string;
  direccion: string;
  referencia: string;
  telefono_fijo: string;
  telefono_movil: string;
  file_path: string | null;
  foto_position: string | null;
  foto_scale: number | null;
  mensajes_wsp?: { contenido: string } | null;
  maps_url?: string | null;
}

const ITEMS_PER_PAGE = 12;

// Icono personalizado de pin de ubicación tipo Google Maps (silueta sólida con corte circular)
const LocationPinIcon: React.FC<{ className?: string; size?: number }> = ({ className = "text-ensil-green", size = 24 }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 1.5C7.3 1.5 3.5 5.3 3.5 10c0 5.7 8.5 12.5 8.5 12.5s8.5-6.8 8.5-12.5c0-4.7-3.8-8.5-8.5-8.5zm0 12c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
  </svg>
);

const SedesContent: React.FC = () => {
  const [sedesData, setSedesData] = useState<Sede[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Responsive column count to prevent empty spaces in rows when expanding cards
  const getInitialColumns = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }
    return 3;
  };

  const [columnsCount, setColumnsCount] = useState<number>(getInitialColumns);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setColumnsCount(3);
      } else if (window.innerWidth >= 768) {
        setColumnsCount(2);
      } else {
        setColumnsCount(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const { data, error } = await supabase
          .from('filiales')
          .select('*, mensajes_wsp (contenido)')
          .eq('activo', true)
          .order('id', { ascending: true });

        if (error) throw error;
        if (data) {
          setSedesData(data as Sede[]);
        }
      } catch (err) {
        console.error('Error fetching filiales:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSedes();
  }, []);

  const filteredSedes = useMemo(() => {
    return sedesData.filter((sede) =>
      sede.departamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sede.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sede.distrito.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, sedesData]);

  const totalPages = Math.ceil(filteredSedes.length / ITEMS_PER_PAGE);
  const paginatedSedes = filteredSedes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Distribute sedes into independent columns so expanding one card only moves items below it in that column
  const columns = useMemo(() => {
    const cols: Sede[][] = Array.from({ length: columnsCount }, () => []);
    paginatedSedes.forEach((sede, idx) => {
      cols[idx % columnsCount].push(sede);
    });
    return cols;
  }, [paginatedSedes, columnsCount]);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white text-slate-800 font-jakarta">
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">

        {/* Header Section */}
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Encuéntranos en <span className="relative inline-block text-ensil-green">Tu Ciudad
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-500 opacity-70" preserveAspectRatio="none" viewBox="0 0 100 10">
                <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="8"></path>
              </svg>
            </span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Estamos presentes en las principales ciudades del Perú. Visita nuestras sedes y potencia tus habilidades de lectura integral.
          </p>
        </div>

        {/* Predictive Search */}
        <div className="max-w-2xl mx-auto mb-16 relative">
          <div className="relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-900/10 rounded-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <Search className="text-slate-400 group-focus-within:text-ensil-green transition-colors" size={24} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset page on search
              }}
              placeholder="Escribe tu departamento de residencia..."
              className="block w-full pl-12 pr-4 py-4 bg-white border-0 ring-1 ring-slate-200 rounded-full text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-ensil-green shadow-soft text-lg transition-all"
            />
            {searchTerm && filteredSedes.length === 0 && !loading && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg p-4 text-center text-slate-500 text-sm z-20">
                No encontramos sedes con ese criterio.
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-ensil-green/30 border-t-ensil-green rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Cards Grid: Organizado en columnas independientes para evitar que toda la fila baje al expandir */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 items-start">
              {columns.map((colSedes, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-6">
                  {colSedes.map((sede) => {
                    const mapsLink =
                      sede.maps_url ||
                      (sede as any).google_maps_url ||
                      (sede as any).url_mapa ||
                      (sede as any).ubicacion_url ||
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Ensil ${sede.nombre} ${sede.direccion}`)}`;

                    const hasFijo = Boolean(sede.telefono_fijo && sede.telefono_fijo.trim() !== '' && sede.telefono_fijo !== '—');
                    const hasMovil = Boolean(sede.telefono_movil && sede.telefono_movil.trim() !== '' && sede.telefono_movil !== '—');

                    return (
                      <div
                        key={sede.id}
                        onMouseLeave={() => setExpandedId(null)}
                        className={`group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200 transition-all duration-500 flex flex-col p-3 border border-slate-100 ${expandedId === sede.id ? 'ring-2 ring-ensil-green z-10 scale-[1.02]' : 'z-0'}`}
                      >
                        {/* Card Image Floating Style */}
                        <div className="relative h-56 rounded-2xl shadow-sm overflow-hidden shrink-0">
                          <div className="w-full h-full transition-transform duration-700 group-hover:scale-110">
                            <img
                              alt={`Sede ${sede.nombre}`}
                              className="w-full h-full object-cover"
                              src={sede.file_path || '/img/filiales/placeholder.jpg'}
                              loading="lazy"
                              style={{
                                objectPosition: sede.foto_position || '50% 50%',
                                transform: `scale(${sede.foto_scale || 1})`,
                              }}
                            />
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="px-2 pt-5 pb-2 flex flex-col justify-start gap-1 relative z-10">
                          <div className="flex items-start justify-between gap-3 mb-1 w-full">
                            <div className="flex flex-row items-start gap-3">
                              {/* Icono de ubicación personalizado sólido tipo Google Maps */}
                              <div className="mt-1 text-ensil-green shrink-0">
                                <LocationPinIcon size={26} className="text-ensil-green drop-shadow-sm" />
                              </div>
                              <div>
                                <p className="font-bold text-slate-900 text-lg tracking-wide leading-tight">Filial {sede.nombre}</p>
                                <p className="text-sm text-slate-600 leading-snug mt-1">{sede.direccion}</p>
                                <span className="text-xs text-slate-400 mt-0.5 block uppercase tracking-wider font-semibold">{sede.distrito}, {sede.provincia}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => toggleExpand(sede.id)}
                              aria-label="Ver detalles de filial"
                              className={`mt-1 bg-white border-2 border-green-800 text-green-800 rounded-full p-2 hover:border-lime-500 hover:text-lime-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-900/10 transition-all duration-300 z-10 shrink-0 ${expandedId === sede.id ? 'rotate-180 bg-green-50' : ''}`}
                            >
                              <ChevronDown size={22} className="stroke-[2.5]" />
                            </button>
                          </div>

                          {/* Expandable Content */}
                          <div
                            className={`transition-all duration-500 ease-in-out overflow-hidden ${expandedId === sede.id ? 'max-h-[600px] opacity-100 mt-4 pt-4 border-t border-slate-100' : 'max-h-0 opacity-0 mt-0 pt-0 border-transparent'}`}
                          >
                            <div className="space-y-4 mb-4">
                              <div className="text-sm text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-100 shadow-inner">
                                <span className="block font-bold text-[11px] text-ensil-green uppercase tracking-wider mb-1.5">Referencia</span>
                                {sede.referencia}
                              </div>

                              {/* Teléfonos alineados en la misma fila al 50% de ancho si existen ambos */}
                              <div className="text-sm">
                                <span className="block font-bold text-[11px] text-ensil-green uppercase tracking-wider mb-1.5">Contacto</span>
                                <div className={`grid gap-2 items-center ${hasFijo && hasMovil ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                  {hasFijo && (
                                    <a
                                      href={`tel:${sede.telefono_fijo}`}
                                      className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 py-2 px-2.5 rounded-xl border border-slate-100 text-slate-700 min-w-0 transition-colors"
                                      title="Llamar teléfono fijo"
                                    >
                                      <Phone size={15} className="text-green-600 shrink-0" />
                                      <span className="font-medium text-xs sm:text-sm tracking-wide truncate">{sede.telefono_fijo}</span>
                                    </a>
                                  )}
                                  {hasMovil && (
                                    <a
                                      href={`tel:${sede.telefono_movil}`}
                                      className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 py-2 px-2.5 rounded-xl border border-slate-100 text-slate-700 min-w-0 transition-colors"
                                      title="Llamar teléfono móvil"
                                    >
                                      <Smartphone size={15} className="text-green-600 shrink-0" />
                                      <span className="font-medium text-xs sm:text-sm tracking-wide truncate">{sede.telefono_movil}</span>
                                    </a>
                                  )}
                                  {!hasFijo && !hasMovil && (
                                    <span className="text-xs text-slate-400 italic">Sin teléfonos registrados</span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Botones de acción: En la misma fila como un botón partido en dos (50% para cada acción) */}
                            <div className="w-full flex items-stretch rounded-xl overflow-hidden shadow-sm border border-emerald-600/30 bg-white">
                              {/* Mitad izquierda: Ver mapa (50%) */}
                              <a
                                href={mapsLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-1/2 flex items-center justify-center gap-1.5 py-3 px-2 bg-emerald-50/90 hover:bg-emerald-100 text-ensil-green font-bold text-xs sm:text-sm transition-all border-r border-emerald-200 group/map active:scale-[0.98]"
                              >
                                <LocationPinIcon size={16} className="text-ensil-green group-hover/map:scale-110 transition-transform shrink-0" />
                                <span className="truncate">Ver mapa</span>
                              </a>

                              {/* Mitad derecha: WhatsApp (50%) */}
                              {hasMovil ? (
                                <a
                                  href={`https://wa.me/51${sede.telefono_movil!.replace(/\s/g, '').replace(/-/g, '')}?text=${encodeURIComponent(sede.mensajes_wsp?.contenido || `Hola, deseo información sobre la sede ${sede.nombre}`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-1/2 flex items-center justify-center gap-1.5 py-3 px-2 bg-ensil-green hover:bg-green-600 text-white font-bold text-xs sm:text-sm transition-all group/wsp active:scale-[0.98]"
                                >
                                  <MessageCircle size={16} className="shrink-0 group-hover/wsp:animate-bounce" />
                                  <span className="truncate">WhatsApp</span>
                                </a>
                              ) : (
                                <div className="w-1/2 flex items-center justify-center py-3 px-2 bg-slate-100 text-slate-400 font-medium text-xs sm:text-sm">
                                  <span className="truncate">Sin WhatsApp</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );                  })}
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mb-12">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`w-12 h-12 flex items-center justify-center rounded-full border transition-all ${currentPage === 1 ? 'border-slate-200 text-slate-300 cursor-not-allowed' : 'border-slate-300 text-slate-600 hover:border-ensil-green hover:text-ensil-green hover:shadow-md'}`}
                >
                  <ArrowLeft size={20} />
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all ${currentPage === page ? 'bg-ensil-green text-white shadow-lg scale-110' : 'border border-slate-200 text-slate-600 hover:border-ensil-green hover:text-ensil-green'}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`w-12 h-12 flex items-center justify-center rounded-full border transition-all ${currentPage === totalPages ? 'border-slate-200 text-slate-300 cursor-not-allowed' : 'border-slate-300 text-slate-600 hover:border-ensil-green hover:text-ensil-green hover:shadow-md'}`}
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            )}
          </>
        )}

      </main>
    </div>
  );
};

export default SedesContent;