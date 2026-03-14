import React, { useState, useMemo } from 'react';
import { Search, MapPin, Phone, Smartphone, ChevronDown, MessageCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface Sede {
  id: string;
  filial: string;
  departamento: string;
  provincia: string;
  distrito: string;
  direccion: string;
  referencia: string;
  fijo: string;
  movil: string;
  image: string;
}

const sedesData: Sede[] = [
  {
    id: '1',
    filial: 'Piura',
    departamento: 'Piura',
    provincia: 'Piura',
    distrito: 'Piura',
    direccion: 'Av. Sullana #280',
    referencia: 'Frente al Museo Vicus',
    fijo: '073-617445',
    movil: '933732053',
    image: '/img/filiales/piura-sede.png'
  },
  {
    id: '2',
    filial: 'Chiclayo',
    departamento: 'Lambayeque',
    provincia: 'Chiclayo',
    distrito: 'Chiclayo',
    direccion: 'Calle Andalucía #150 Urb. San Juan',
    referencia: 'Altura del Hotel Tumbas Reales',
    fijo: '074-525632',
    movil: '905464734',
    image: '/img/filiales/chiclayo.png'
  },
  {
    id: '3',
    filial: 'Cajamarca',
    departamento: 'Cajamarca',
    provincia: 'Cajamarca',
    distrito: 'Cajamarca',
    direccion: 'Jr. Guadalupe #466',
    referencia: 'Huánuco y Silva Santiesteban',
    fijo: '076-772573',
    movil: '933722476',
    image: '/img/filiales/cajamarca-sede.jpeg'
  },
  {
    id: '4',
    filial: 'Trujillo',
    departamento: 'La Libertad',
    provincia: 'Trujillo',
    distrito: 'Trujillo',
    direccion: 'San Martín #150',
    referencia: 'Frente al Club Libertad',
    fijo: '—',
    movil: '928140527',
    image: '/img/filiales/trujillo-sede.png'
  },
  {
    id: '5',
    filial: 'Los Olivos',
    departamento: 'Lima',
    provincia: 'Lima',
    distrito: 'Los Olivos',
    direccion: 'Jr. Carlos Monge #233',
    referencia: 'Espalda cdra. 4 Av. Izaguirre',
    fijo: '01-7504687',
    movil: '960508686',
    image: '/img/filiales/los-olivos.png'
  },
  {
    id: '6',
    filial: 'Huancayo',
    departamento: 'Junín',
    provincia: 'Huancayo',
    distrito: 'El Tambo',
    direccion: 'Jr. Arequipa #218',
    referencia: 'Complejo Salesiano Sta. Rosa',
    fijo: '064-419923',
    movil: '992195898',
    image: '/img/filiales/huancayo.png'
  },
  {
    id: '7',
    filial: 'Puno',
    departamento: 'Puno',
    provincia: 'Puno',
    distrito: 'Puno',
    direccion: 'Jr. Moquegua #422 (2° piso)',
    referencia: 'Frente al Restaurant Tamis',
    fijo: '051-352969',
    movil: '961274101',
    image: '/img/filiales/puno.png'
  },
  {
    id: '8',
    filial: 'Juliaca',
    departamento: 'Puno',
    provincia: 'San Román',
    distrito: 'Juliaca',
    direccion: 'Jr. Bolívar #329',
    referencia: 'Costado del Mía Market',
    fijo: '—',
    movil: '913632393',
    image: '/img/filiales/Juliaca.png'
  },
  {
    id: '9',
    filial: 'Arequipa',
    departamento: 'Arequipa',
    provincia: 'Arequipa',
    distrito: 'Cayma',
    direccion: 'Calle Tronchadero #115',
    referencia: 'Av. del Ejército',
    fijo: '054-273553',
    movil: '980756620',
    image: '/img/filiales/arequipa.png'
  },
  {
    id: '10',
    filial: 'Cusco',
    departamento: 'Cusco',
    provincia: 'Cusco',
    distrito: 'Cusco',
    direccion: 'Parque Amauta #210 Urb. Magisterio',
    referencia: 'A 2 casas de Caprichos',
    fijo: '084-782957',
    movil: '953802527',
    image: '/img/filiales/cusco-magisterio.jpeg'
  },
  {
    id: '11',
    filial: 'Cusco Marcavalle',
    departamento: 'Cusco',
    provincia: 'Cusco',
    distrito: 'Wanchaq',
    direccion: 'Emilio Balcay #27 Urb. Cerveceros',
    referencia: 'Paradero Marcavalle',
    fijo: '—',
    movil: '922477489',
    image: '/img/filiales/cusco-marcavalle.png'
  },
  {
    id: '12',
    filial: 'Tacna',
    departamento: 'Tacna',
    provincia: 'Tacna',
    distrito: 'Tacna',
    direccion: 'Av. Cusco #485',
    referencia: 'Frente a Mueblería Rony',
    fijo: '052-638377',
    movil: '933746179',
    image: '/img/filiales/tacna-sede.jpeg'
  },
  {
    id: '13',
    filial: 'Huaraz',
    departamento: 'Áncash',
    provincia: 'Huaraz',
    distrito: 'Huaraz',
    direccion: 'Jr. Larrea y Laredo #796',
    referencia: 'Frente al Parque El Encuentro',
    fijo: '—',
    movil: '933741997',
    image: '/img/filiales/huaraz-sede.png'
  },
  {
    id: '14',
    filial: 'Ica',
    departamento: 'Ica',
    provincia: 'Ica',
    distrito: 'Ica',
    direccion: 'Av. San Martín #507',
    referencia: 'Al costado de Serpost',
    fijo: '—',
    movil: '936770444',
    image: '/img/filiales/ica-sede.png'
  },
  {
    id: '15',
    filial: 'Ayacucho',
    departamento: 'Ayacucho',
    provincia: 'Huamanga',
    distrito: 'Ayacucho',
    direccion: 'Jr. Las Gardenias Mz K Lt 14',
    referencia: 'Urb. Mariscal Cáceres',
    fijo: '—',
    movil: '925846402',
    image: '/img/filiales/Ayacucho.png'
  },
  {
    id: '16',
    filial: 'San Isidro',
    departamento: 'Lima',
    provincia: 'Lima',
    distrito: 'San Isidro',
    direccion: 'Calle Francisco de Zela #2575',
    referencia: '1/2 cdra. del Touring',
    fijo: '—',
    movil: '960508686',
    image: '/img/filiales/lima-san-isidro-sede.png'
  },
];

const ITEMS_PER_PAGE = 12;

const SedesContent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredSedes = useMemo(() => {
    return sedesData.filter((sede) =>
      sede.departamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sede.filial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sede.distrito.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredSedes.length / ITEMS_PER_PAGE);
  const paginatedSedes = filteredSedes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleExpand = (id: string) => {
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
          <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-ensil-green text-xs font-bold uppercase tracking-wider mb-4">
            Nuestras Sedes
          </span>
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
            {searchTerm && filteredSedes.length === 0 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg p-4 text-center text-slate-500 text-sm z-20">
                No encontramos sedes con ese criterio.
              </div>
            )}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 items-start">
          {paginatedSedes.map((sede) => (
            <div
              key={sede.id}
              onMouseLeave={() => setExpandedId(null)}
              className={`group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200 transition-all duration-500 flex flex-col p-3 border border-slate-100 ${expandedId === sede.id ? 'ring-2 ring-ensil-green z-10 scale-[1.02]' : 'z-0'}`}
            >
              {/* Card Image Floating Style */}
              <div className="relative h-56 rounded-2xl shadow-sm overflow-hidden shrink-0">
                <img
                  alt={`Sede ${sede.filial}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={sede.image}
                />

                {/* Floating Pills - Top Left */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <div className="px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-sm">
                    <h3 className="text-white font-display text-xs font-bold uppercase tracking-wider">{sede.filial}</h3>
                  </div>
                  <div className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/20 shadow-sm flex items-center gap-1">
                    <MapPin size={12} className="text-yellow-400" />
                    <span className="text-white text-[10px] font-bold uppercase tracking-wider">{sede.departamento}</span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="px-2 pt-5 pb-2 flex flex-col justify-start gap-1 relative z-10">
                <div className="flex items-start justify-between gap-3 mb-1 w-full">
                  <div className="flex flex-row items-start gap-3">
                    <div className="mt-1">
                      <MapPin className="text-ensil-green" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-lg tracking-wide leading-tight">Filial {sede.filial}</p>
                      <p className="text-sm text-slate-600 leading-snug mt-1">{sede.direccion}</p>
                      <span className="text-xs text-slate-400 mt-0.5 block uppercase tracking-wider font-semibold">{sede.distrito}, {sede.provincia}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleExpand(sede.id)}
                    className={`mt-1 bg-white border-2 border-green-800 text-green-800 rounded-full p-2 hover:border-lime-500 hover:text-lime-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-900/10 transition-all duration-300 z-10 shrink-0 ${expandedId === sede.id ? 'rotate-180 bg-green-50' : ''}`}
                  >
                    <ChevronDown size={22} className="stroke-[2.5]" />
                  </button>
                </div>

                {/* Expandable Content */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${expandedId === sede.id ? 'max-h-[500px] opacity-100 mt-4 pt-4 border-t border-slate-100' : 'max-h-0 opacity-0 mt-0 pt-0 border-transparent'}`}
                >
                  <div className="space-y-4 mb-5">
                    <div className="text-sm text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-100 shadow-inner">
                      <span className="block font-bold text-[11px] text-ensil-green uppercase tracking-wider mb-1.5">Referencia</span>
                      {sede.referencia}
                    </div>
                    <div className="text-sm flex flex-col gap-2.5">
                      <span className="block font-bold text-[11px] text-ensil-green uppercase tracking-wider mb-0.5">Contacto</span>
                      <div className="flex items-center gap-3 text-slate-700">
                        <Phone size={16} className="text-green-600" />
                        <span className="font-medium tracking-wide">{sede.fijo}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-700">
                        <Smartphone size={16} className="text-green-600" />
                        <span className="font-medium tracking-wide">{sede.movil}</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/51${sede.movil.replace(/\s/g, '').replace(/-/g, '')}?text=Hola, deseo información sobre la sede ${sede.filial}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-ensil-green hover:bg-green-600 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_4px_14px_rgba(4,120,87,0.3)] hover:shadow-[0_6px_20px_rgba(4,120,87,0.4)] hover:-translate-y-0.5 transform active:scale-95 group/btn text-sm"
                  >
                    <MessageCircle size={18} className="group-hover/btn:animate-bounce" />
                    Iniciar conversación
                  </a>
                </div>
              </div>
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

      </main>
    </div>
  );
};

export default SedesContent;