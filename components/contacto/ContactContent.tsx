import React, { useState, useMemo, useEffect, useRef } from 'react';
import { User, Baby, ArrowRight, CheckCircle, ArrowLeft, MapPin, Loader2, Phone, Sparkles, ChevronLeft, ChevronRight, Clock, Calendar, AlertCircle, Plus, Trash2, RotateCcw, ChevronDown, Briefcase, Users } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { smoothScrollTo } from '../../utils/scroll';

// --- TIPOS ---
type Step = 1 | 2 | 3 | 4;
type Target = 'me' | 'child' | null;
type Dependency = 'independent' | 'dependent' | null;

interface ExtraStudent {
  id: string; // ID temporal para la UI
  name: string;
  age: string;
}

interface FormData {
  filial: string;
  fecha: string;
  hora: string;
  studentName: string;
  studentAge: string;
  studentPhone: string;
  guardianName: string;
  guardianPhone: string;
  email: string;
}

// --- UTILIDADES CALENDARIO ---
const DAYS_ES = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const MONTHS_ES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const ContactContent: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  // --- VIDEO STATE ---
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);

  // --- FORM STATE ---
  const [step, setStep] = useState<Step>(1);
  const [target, setTarget] = useState<Target>(null);
  const [dependency, setDependency] = useState<Dependency>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- CALENDAR STATE ---
  const [selectedDateObj, setSelectedDateObj] = useState<Date | null>(null);

  // --- DATA STATE ---
  const [sedesDb, setSedesDb] = useState<any[]>([]);

  // Campos principales
  const [formData, setFormData] = useState<FormData>({
    filial: '',
    fecha: '',
    hora: '',
    studentName: '',
    studentAge: '',
    studentPhone: '',
    guardianName: '',
    guardianPhone: '',
    email: ''
  });

  // Alumnos extra (solo para dependientes)
  const [extraStudents, setExtraStudents] = useState<ExtraStudent[]>([]);

  // --- FETCH SEDES ---
  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const { data, error } = await supabase
          .from('filiales')
          .select('id, provincia, nombre, distrito, direccion')
          .eq('activo', true)
          .order('provincia', { ascending: true });

        if (error) throw error;
        setSedesDb(data || []);
      } catch (err) {
        console.error("Error cargando sedes:", err);
      }
    };
    fetchSedes();
  }, []);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  // --- VIDEO HANDLERS ---
  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const handleReplay = () => {
    if (videoRef.current) {
      setVideoEnded(false);
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  // --- LOGIC HORARIOS ---
  const availableHours = useMemo(() => {
    if (!selectedDateObj) return [];
    const dayOfWeek = selectedDateObj.getDay(); // 0 = Domingo
    const isSunday = dayOfWeek === 0;

    if (isSunday) {
      return ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
    } else {
      return ['09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
    }
  }, [selectedDateObj]);

  // --- HANDLERS GENÉRICOS ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- HANDLERS ALUMNOS EXTRA ---
  const addExtraStudent = () => {
    if (extraStudents.length < 3) { // Max 3 extras + 1 principal = 4 total
      setExtraStudents([...extraStudents, { id: crypto.randomUUID(), name: '', age: '' }]);
    }
  };

  const removeExtraStudent = (id: string) => {
    setExtraStudents(extraStudents.filter(s => s.id !== id));
  };

  const updateExtraStudent = (id: string, field: 'name' | 'age', value: string) => {
    setExtraStudents(extraStudents.map(s =>
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  // --- LISTA DE PRÓXIMOS 8 DÍAS ---
  const datesList = useMemo(() => {
    const list = [];
    const today = new Date();
    for (let i = 0; i < 8; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      list.push(d);
    }
    return list;
  }, []);

  const handleTimeClick = (time: string) => {
    setFormData(prev => ({ ...prev, hora: time }));
  };


  // --- STEP NAVIGATION ---
  const nextStep = () => {
    setError(null);
    if (step === 1) {
      if (!target) { setError("Por favor selecciona una opción."); return; }
      if (target === 'child') {
        setDependency('dependent');
        setStep(3);
      } else {
        setStep(2);
      }
    } else if (step === 2) {
      if (!dependency) { setError("Por favor selecciona tu situación."); return; }
      setStep(3);
    }
  };

  const prevStep = () => {
    setError(null);
    if (step === 3) {
      // RESET FORM DATA & CALENDAR
      setFormData({
        filial: '',
        fecha: '',
        hora: '',
        studentName: '',
        studentAge: '',
        studentPhone: '',
        guardianName: '',
        guardianPhone: '',
        email: ''
      });
      setExtraStudents([]);
      setSelectedDateObj(null);

      if (target === 'child') setStep(1);
      else setStep(2);
    } else if (step === 2) {
      setStep(1);
    }
  };

  // --- VALIDACIÓN DE DUPLICADOS ---
  const checkPhoneExists = async (phone: string): Promise<boolean> => {
    // 1. Verificar en Apoderados
    const { data: apoderado } = await supabase
      .from('apoderados')
      .select('id')
      .eq('telefono', phone)
      .maybeSingle();

    if (apoderado) return true;

    // 2. Verificar en Alumnos (para independientes o datos antiguos)
    const { data: alumno } = await supabase
      .from('alumnos')
      .select('id')
      .eq('telefono', phone)
      .maybeSingle();

    return !!alumno;
  };

  // --- LÓGICA DE ENVÍO ---
  const handleSubmit = async () => {
    setError(null);

    // --- A. Validaciones de campos ---
    if (!formData.email) {
      setError("Completa tu correo electrónico."); return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Por favor ingresa un correo electrónico válido."); return;
    }

    if (dependency === 'independent') {
      if (!formData.studentName || !formData.studentAge) {
        setError("Completa tus datos personales (Nombre y Edad)."); return;
      }
      if (!formData.studentPhone || formData.studentPhone.length < 9) {
        setError("Ingresa un número de celular válido (mínimo 9 dígitos)."); return;
      }
    } else {
      if (!formData.guardianName || !formData.studentName || !formData.studentAge) {
        setError("Completa todos los nombres y la edad del primer alumno."); return;
      }
      if (!formData.guardianPhone || formData.guardianPhone.length < 9) {
        setError("Ingresa un número de celular del apoderado válido."); return;
      }
      // Validar alumnos extra
      for (const ext of extraStudents) {
        if (!ext.name || !ext.age) {
          setError("Completa los datos de todos los alumnos adicionales."); return;
        }
      }
    }

    if (!formData.filial) { setError("Por favor selecciona una sede de preferencia."); return; }
    if (!formData.fecha || !formData.hora) { setError("Por favor selecciona fecha y hora para tu cita."); return; }

    setLoading(true);

    try {
      const filialId = parseInt(formData.filial);
      if (isNaN(filialId)) throw new Error("ID de filial inválido.");

      // --- B. Validación de Duplicados ---
      const phoneToCheck = dependency === 'independent' ? formData.studentPhone : formData.guardianPhone;
      const isRegistered = await checkPhoneExists(phoneToCheck);

      if (isRegistered) {
        throw new Error("Este número de celular ya se encuentra registrado en nuestra base de datos.");
      }

      // --- C. Inserción de Datos (Vía RPC Seguro) ---
      if (dependency === 'independent') {
        // Caso INDEPENDIENTE (Solo 1 alumno, sin apoderado)
        const { error: rpcError } = await supabase.rpc('registrar_reserva', {
          p_nombre_alumno: formData.studentName,
          p_edad_alumno: parseInt(formData.studentAge),
          p_telefono_alumno: formData.studentPhone,
          p_nombre_apoderado: null,
          p_telefono_apoderado: null,
          p_id_filial: filialId,
          p_fecha: formData.fecha,
          p_hora: formData.hora,
          p_es_dependiente: false,
          p_email: formData.email
        });
        if (rpcError) throw rpcError;

      } else {
        // Caso DEPENDIENTE (Familia: 1 Apoderado + N Alumnos)
        const nombresAlumnos = [formData.studentName, ...extraStudents.map(s => s.name)];
        const edadesAlumnos = [parseInt(formData.studentAge), ...extraStudents.map(s => parseInt(s.age))];

        const { error: rpcError } = await supabase.rpc('registrar_familia', {
          p_nombre_apoderado: formData.guardianName,
          p_telefono_apoderado: formData.guardianPhone,
          p_nombres_alumnos: nombresAlumnos,
          p_edades_alumnos: edadesAlumnos,
          p_id_filial: filialId,
          p_fecha: formData.fecha,
          p_hora: formData.hora,
          p_email: formData.email
        });

        if (rpcError) throw rpcError;
      }

      // Éxito: Avanzar
      setStep(4);

    } catch (err: any) {
      console.error("Detalle del error:", err);
      let errorMessage = "Ocurrió un error al agendar. Por favor intenta nuevamente.";
      if (err) {
        if (typeof err === 'string') errorMessage = err;
        else if (err.message) errorMessage = err.message;
        else if (err.error_description) errorMessage = err.error_description;
        else errorMessage = JSON.stringify(err);
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full font-jakarta">

      {/* 
        COMBINED HERO & FORM SECTION 
        Replaces the previous separate sections.
      */}
      <section className="relative py-4 md:py-3 overflow-hidden" id="agenda-form">

        {/* Ambient Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-emerald-500/30 blur-[120px] -z-10 rounded-full pointer-events-none"></div>

        {/* Custom Style for slow spin if not in tailwind config */}
        <style>{`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
        `}</style>


        <div className="w-full flex flex-col items-center px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Center Header Content - Full width above grid */}


          {/* Main Grid Layout - Video Left, Form Right */}
          <div className="w-full max-w-screen-2xl mb-4 mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_0.9fr] lg:grid-rows-1 gap-6 items-stretch min-h-[440px] lg:h-[690px]">

            {/* LEFT COLUMN: Single card with title on top + video flush at bottom */}
            <div className="relative w-full h-full flex flex-col rounded-[1.2rem] bg-white border border-slate-200 shadow-sm overflow-hidden">

              {/* Title section with padding */}
              <div className="shrink-0 p-4 md:p-6 pb-3">

                {/* Title */}
                <h1 className="font-fraunces text-3xl md:text-5xl lg:text-[3.25rem] font-bold leading-[0.9] text-slate-900 tracking-tight m-0 mb-2 py-1">
                  <span className="text-ensil-gold">Transforma tu lectura</span> <br className="hidden md:block" />
                  <span className="text-transparent  lg:text-[4.6rem] bg-clip-text bg-gradient-to-r from-green-900 via-emerald-800 to-green-950 drop-shadow-sm inline-block py-1">
                    en tu mayor poder
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-slate-700 text-xs lg:text-[1.2rem] font-light leading-relaxed">
                  Domina la lectura veloz y la comprensión total en tiempo récord.
                </p>
              </div>

              {/* Video — centered with all 4 corners rounded */}
              <div className="relative flex-1 bg-white p-4 md:p-4 pt-0 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full rounded-[1rem] overflow-hidden bg-black shadow-sm flex items-center justify-center">
                  <video
                    ref={(el) => {
                      if (el) {
                        videoRef.current = el;
                        el.volume = 0.5;
                      }
                    }}
                    className={`w-full h-full object-cover transition-all duration-700 ${videoEnded ? 'blur-md scale-105 opacity-60' : ''}`}
                    autoPlay
                    muted={false}
                    controls
                    playsInline
                    onEnded={handleVideoEnd}
                  >
                    <source src="https://jtrugvxgztnxbhwjtiou.supabase.co/storage/v1/object/public/Videos/LandingVideo.webm" type="video/webm" />
                  </video>

                  {/* Replay Overlay */}
                  {videoEnded && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 animate-fade-in">
                      <button
                        onClick={handleReplay}
                        className="group/btn flex flex-col items-center gap-3"
                      >
                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-md transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:bg-white/20">
                          <RotateCcw size={28} className="group-hover/btn:-rotate-90 transition-transform duration-500" />
                        </div>
                        <span className="text-white font-fraunces font-bold text-sm tracking-wide drop-shadow-md">Repetir Video</span>
                      </button>
                    </div>
                  )}

                  {!videoEnded && (
                    <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
                  )}
                </div>
              </div>

            </div>


            {/* RIGHT COLUMN: Form Card */}
            <div className="relative w-full h-full flex flex-col rounded-[1rem] bg-white border border-slate-200 overflow-hidden shadow-md">
              <div className="relative h-full w-full bg-white flex flex-col">
                <div className="p-5 md:p-8 flex flex-col h-full overflow-y-auto">

                  {step < 4 && (
                    <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
                      <div>
                        <h2 className="font-fraunces text-slate-900 text-xl md:text-2xl font-bold leading-[1.05]">
                          Inicia Tu Transformación
                        </h2>
                        <p className="text-xs text-slate-500 mt-1 font-medium">Postula ahora y descubre tu potencial</p>
                      </div>
                      <div className="bg-ensil-gold/10 text-ensil-gold font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider border border-ensil-gold/20 whitespace-nowrap">
                        Paso {step}/3
                      </div>
                    </div>
                  )}

                  {/* STEP 1: TARGET SELECTION */}
                  {step === 1 && (
                    <div className="flex-1 flex flex-col justify-center animate-fade-in">
                      <h3 className="font-fraunces text-2xl md:text-3xl font-light text-slate-800 text-center leading-tight mb-8">
                        ¿Para quién <br />
                        desea el <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-900 via-emerald-800 to-green-950">Programa</span>?
                      </h3>
                      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-12 w-full max-w-2xl mx-auto">
                        <button
                          onClick={() => setTarget('me')}
                          className={`relative p-6 md:px-8 md:py-10 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center justify-center gap-5 text-center min-h-[140px] w-full ${target === 'me' ? 'border-green-700 bg-gradient-to-br from-green-700 to-emerald-900 text-white shadow-lg transform scale-[1.02]' : 'border-slate-200 bg-white hover:border-green-500/80 hover:bg-slate-50 hover:-translate-y-1'}`}
                        >
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 transition-colors ${target === 'me' ? 'bg-white text-green-900 shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                            <User size={32} />
                          </div>
                          <div className="mt-1">
                            <h3 className={`font-bold text-base md:text-lg leading-tight ${target === 'me' ? 'text-white' : 'text-slate-700'}`}>Para mí</h3>
                          </div>
                        </button>

                        <button
                          onClick={() => setTarget('child')}
                          className={`relative p-6 md:px-8 md:py-10 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center justify-center gap-5 text-center min-h-[140px] w-full ${target === 'child' ? 'border-green-700 bg-gradient-to-br from-green-700 to-emerald-900 text-white shadow-lg transform scale-[1.02]' : 'border-slate-200 bg-white hover:border-green-500/80 hover:bg-slate-50 hover:-translate-y-1'}`}
                        >
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 transition-colors ${target === 'child' ? 'bg-white text-green-900 shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                            <Baby size={32} />
                          </div>
                          <div className="mt-1">
                            <h3 className={`font-bold text-base md:text-lg leading-tight ${target === 'child' ? 'text-white' : 'text-slate-700'}`}>Para mi hijo</h3>
                          </div>
                        </button>
                      </div>
                      <button onClick={nextStep} className="w-full bg-gradient-to-r from-emerald-700 to-green-800 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                        Continuar <ArrowRight size={20} />
                      </button>
                      {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
                    </div>
                  )}

                  {/* STEP 2: DEPENDENCY (Only if Target is 'me') */}
                  {step === 2 && (
                    <div className="flex-1 flex flex-col justify-center animate-fade-in">
                      <button onClick={prevStep} className="text-slate-400 hover:text-green-800 mb-6 flex items-center gap-1 text-xs font-bold uppercase tracking-wider transition-colors w-fit bg-slate-50 px-3 py-1.5 rounded-lg hover:bg-green-50"><ArrowLeft size={14} /> Atrás</button>
                      <h3 className="font-fraunces text-2xl md:text-3xl font-light text-slate-800 text-center leading-tight mb-8">
                        ¿Cómo se <br />
                        considera <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-900 via-emerald-800 to-green-950">Usted</span>?
                      </h3>

                      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-12 w-full max-w-2xl mx-auto">
                        <button
                          onClick={() => setDependency('independent')}
                          className={`relative p-6 md:px-8 md:py-10 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center justify-center gap-5 text-center min-h-[140px] w-full ${dependency === 'independent' ? 'border-green-700 bg-gradient-to-br from-green-700 to-emerald-900 text-white shadow-lg transform scale-[1.02]' : 'border-slate-200 bg-white hover:border-green-500/80 hover:bg-slate-50 hover:-translate-y-1'}`}
                        >
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 transition-colors ${dependency === 'independent' ? 'bg-white text-green-900 shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                            <Briefcase size={32} />
                          </div>
                          <div className="mt-1">
                            <h4 className={`font-bold text-sm md:text-base leading-tight px-2 ${dependency === 'independent' ? 'text-white' : 'text-slate-700'}`}>Persona totalmente independiente</h4>
                          </div>
                        </button>

                        <button
                          onClick={() => setDependency('dependent')}
                          className={`relative p-6 md:px-8 md:py-10 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center justify-center gap-5 text-center min-h-[140px] w-full ${dependency === 'dependent' ? 'border-green-700 bg-gradient-to-br from-green-700 to-emerald-900 text-white shadow-lg transform scale-[1.02]' : 'border-slate-200 bg-white hover:border-green-500/80 hover:bg-slate-50 hover:-translate-y-1'}`}
                        >
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 transition-colors ${dependency === 'dependent' ? 'bg-white text-green-900 shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                            <Users size={32} />
                          </div>
                          <div className="mt-1">
                            <h4 className={`font-bold text-sm md:text-base leading-tight px-2 ${dependency === 'dependent' ? 'text-white' : 'text-slate-700'}`}>Aún dependo de un apoderado</h4>
                          </div>
                        </button>
                      </div>

                      <button onClick={nextStep} className="w-full bg-gradient-to-r from-emerald-700 to-green-800 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                        Continuar <ArrowRight size={20} />
                      </button>
                      {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
                    </div>
                  )}

                  {/* STEP 3: DATA FORM & APPOINTMENT */}
                  {step === 3 && (
                    <div className="flex-1 flex flex-col animate-fade-in">
                      <button onClick={prevStep} className="text-slate-400 hover:text-ensil-green mb-4 flex items-center gap-1 text-sm w-fit"><ArrowLeft size={16} /> Volver</button>

                      <div className="space-y-4 mb-4 max-h-[420px] overflow-y-auto px-2 pb-4 -mx-2 custom-scrollbar">
                        {/* Campo Correo Electrónico */}
                        <div>
                          <h4 className="font-bold text-slate-700 text-sm uppercase flex items-center gap-2 mb-1">
                            <Sparkles size={16} className="text-green-600 animate-pulse" /> Correo Electrónico
                          </h4>
                          <input
                            type="email"
                            name="email"
                            placeholder="ejemplo@correo.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-green-500 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm transition-all"
                          />
                        </div>
                        <div className="border-t border-slate-100 my-1"></div>

                        {dependency === 'dependent' && (
                          <>
                            <h4 className="font-bold text-slate-700 text-sm uppercase flex items-center gap-2 mt-2">
                              <User size={16} /> Datos del Apoderado
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <input
                                type="text"
                                name="guardianName"
                                placeholder="Nombre Completo Apoderado"
                                value={formData.guardianName}
                                onChange={handleInputChange}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-green-500 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm transition-all"
                              />
                              <input
                                type="tel"
                                name="guardianPhone"
                                placeholder="Celular Apoderado"
                                value={formData.guardianPhone}
                                onChange={(e) => {
                                  const val = e.target.value.replace(/\D/g, '');
                                  if (val.length <= 9) handleInputChange({ ...e, target: { ...e.target, value: val, name: 'guardianPhone' } });
                                }}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-green-500 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm transition-all"
                              />
                            </div>
                            <div className="border-t border-slate-100 my-2"></div>
                          </>
                        )}

                        <h4 className="font-bold text-slate-700 text-sm uppercase flex items-center gap-2 mt-2">
                          {dependency === 'dependent' ? <Baby size={16} /> : <User size={16} />}
                          {dependency === 'dependent' ? 'Datos del Alumno' : 'Mis Datos'}
                        </h4>

                        {/* ALUMNO PRINCIPAL */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            name="studentName"
                            placeholder="Nombre Completo Alumno"
                            value={formData.studentName}
                            onChange={handleInputChange}
                            className="md:col-span-2 w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-green-500 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm transition-all"
                          />
                          <input
                            type="number"
                            name="studentAge"
                            placeholder="Edad"
                            value={formData.studentAge}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-green-500 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm transition-all"
                          />
                          {dependency === 'independent' && (
                            <input
                              type="tel"
                              name="studentPhone"
                              placeholder="Mi Celular"
                              value={formData.studentPhone}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                if (val.length <= 9) handleInputChange({ ...e, target: { ...e.target, value: val, name: 'studentPhone' } });
                              }}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-green-500 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm transition-all"
                            />
                          )}
                        </div>

                        {/* ALUMNOS ADICIONALES (SOLO DEPENDIENTES) */}
                        {dependency === 'dependent' && (
                          <div className="space-y-4 animate-fade-in">
                            {extraStudents.map((student, index) => (
                              <div key={student.id} className="relative bg-slate-100 p-4 rounded-xl border border-slate-200 mt-4 animate-fade-in group">
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Alumno Adicional #{index + 1}</h5>
                                  <button
                                    onClick={() => removeExtraStudent(student.id)}
                                    className="text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors"
                                    title="Eliminar alumno"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <input
                                    type="text"
                                    placeholder="Nombre Completo"
                                    value={student.name}
                                    onChange={(e) => updateExtraStudent(student.id, 'name', e.target.value)}
                                    className="md:col-span-2 w-full bg-white border border-slate-200 rounded-lg py-2 px-3 outline-none focus:border-green-500 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm font-medium transition-all"
                                  />
                                  <input
                                    type="number"
                                    placeholder="Edad"
                                    value={student.age}
                                    onChange={(e) => updateExtraStudent(student.id, 'age', e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 outline-none focus:border-green-500 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm font-medium transition-all"
                                  />
                                </div>
                              </div>
                            ))}

                            {extraStudents.length < 3 && (
                              <button
                                onClick={addExtraStudent}
                                className="mt-2 text-sm text-green-700 hover:text-green-900 font-bold flex items-center gap-1.5 transition-colors py-2 px-3 rounded-lg hover:bg-green-50 w-fit border border-transparent hover:border-green-200"
                              >
                                <Plus size={16} />
                                Agregar otro alumno
                              </button>
                            )}
                          </div>
                        )}

                        {/* DATE/TIME/SEDE SELECTION */}
                        <div className="pt-4 border-t border-slate-100">
                          <h4 className="font-bold text-slate-700 text-sm uppercase flex items-center gap-2 mb-3">
                            <MapPin size={16} /> Preferencias de Cita
                          </h4>

                          <div className="space-y-3">
                            <select
                              name="filial"
                              value={formData.filial}
                              onChange={handleInputChange}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 text-sm outline-none focus:ring-2 focus:ring-green-500"
                            >
                              <option value="">Selecciona una sede...</option>
                              {sedesDb.map((sede) => (
                                <option key={sede.id} value={sede.id}>
                                  {sede.nombre} - {sede.direccion}
                                </option>
                              ))}
                            </select>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Cards Date Picker */}
                              <div className="relative flex flex-col h-full">
                                <div className="text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">Fecha</div>
                                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex-1 flex flex-col justify-center min-h-[220px]">
                                  <div className="grid grid-cols-4 grid-rows-2 gap-2 flex-1">
                                    {datesList.map((d, idx) => {
                                      const isSelected = selectedDateObj?.getDate() === d.getDate() && selectedDateObj?.getMonth() === d.getMonth();
                                      const isToday = idx === 0;
                                      const dayName = isToday ? 'Hoy' : DAYS_ES[d.getDay() === 0 ? 6 : d.getDay() - 1];
                                      const dayNum = d.getDate();
                                      const monName = MONTHS_ES[d.getMonth()].substring(0, 3);

                                      return (
                                        <button
                                          key={idx}
                                          type="button"
                                          onClick={() => {
                                            setSelectedDateObj(d);
                                            const year = d.getFullYear();
                                            const month = String(d.getMonth() + 1).padStart(2, '0');
                                            const dayStr = String(d.getDate()).padStart(2, '0');
                                            setFormData(prev => ({ ...prev, fecha: `${year}-${month}-${dayStr}`, hora: '' }));
                                          }}
                                          className={`w-full h-full flex flex-col items-center justify-center p-1.5 rounded-xl border transition-all duration-200 ${isSelected
                                            ? 'bg-green-600 border-green-600 text-white shadow-md'
                                            : 'bg-white border-slate-200 text-slate-600 hover:border-green-300 hover:bg-green-50/30'
                                            }`}
                                        >
                                          <span className={`text-[9px] uppercase font-bold tracking-wider ${isSelected ? 'text-green-100' : 'text-slate-400'}`}>
                                            {dayName}
                                          </span>
                                          <span className="text-lg font-extrabold leading-none my-1">
                                            {dayNum}
                                          </span>
                                          <span className={`text-[9px] uppercase font-bold ${isSelected ? 'text-green-200' : 'text-slate-400'}`}>
                                            {monName}
                                          </span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>

                              {/* Time Picker */}
                              <div className="relative flex flex-col h-full">
                                <div className="text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">Hora</div>
                                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex-1 flex flex-col justify-center min-h-[220px]">
                                  {availableHours.length > 0 ? (
                                    <div className={`grid grid-cols-3 gap-2 flex-1 ${availableHours.length <= 6 ? 'grid-rows-2' : 'grid-rows-3'}`}>
                                      {availableHours.map(hour => (
                                        <button
                                          key={hour}
                                          type="button"
                                          onClick={() => handleTimeClick(hour)}
                                          className={`text-xs w-full h-full font-bold border transition-all duration-200 flex items-center justify-center rounded-xl ${formData.hora === hour
                                            ? 'bg-green-600 border-green-600 text-white shadow-md scale-[1.03]'
                                            : 'bg-white border-slate-200 text-slate-600 hover:border-green-300 hover:bg-green-50/30'
                                            }`}
                                        >
                                          {hour}
                                        </button>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-[10px] text-slate-400 text-center mt-4">Selecciona fecha</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="mt-auto w-full bg-gradient-to-r from-emerald-500 to-green-700 hover:from-emerald-400 hover:to-green-600 text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:-translate-y-0.5"
                      >
                        {loading ? <Loader2 className="animate-spin" /> : 'Confirmar Reserva'}
                      </button>
                      {error && (
                        <div className="mt-3 bg-red-50 border border-red-100 rounded-xl p-3 flex items-start gap-3 animate-fade-in">
                          <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                          <p className="text-red-600 text-sm">{error}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 4: SUCCESS */}
                  {step === 4 && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in py-10">
                      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-md">
                        <CheckCircle size={40} />
                      </div>
                      <h2 className="font-fraunces text-3xl font-bold text-slate-800 mb-4">¡Reserva Exitosa!</h2>
                      <p className="text-slate-600 mb-8 max-w-md text-sm">
                        Hemos registrado tus datos correctamente. Un asesor educativo se pondrá en contacto contigo a la brevedad.
                      </p>
                      <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-2xl w-full max-w-sm">
                        <p className="text-xs text-yellow-700 font-bold uppercase tracking-wider mb-2">Central Telefónica</p>
                        <div className="flex items-center justify-center gap-3 text-2xl font-bold text-slate-900">
                          <Phone className="text-green-600" />
                          <span>908 880 167</span>
                        </div>
                      </div>
                      <button onClick={() => window.location.reload()} className="mt-8 text-slate-400 text-xs hover:text-slate-600 underline">
                        Volver al inicio
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Scroll Down Indicator - Moved OUTSIDE and BELOW the cards completely */}
          <div className="w-full flex justify-center mt-12 pb-2 relative z-20">
            <a
              href="#programa"
              className="inline-flex flex-col items-center text-slate-400 hover:text-green-700 transition-colors group cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('programa', 1200);
              }}
            >
              <ChevronDown className="w-5 h-5 md:w-6 md:h-6 animate-bounce text-slate-400 group-hover:text-green-600" />
            </a>
          </div>

        </div>
      </section>

      {/* Benefits Section - Glassmorphism */}
      <section className="py-20 md:py-24" id="programa">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-ensil-gold font-bold text-sm tracking-wide uppercase mb-3 block">Beneficios</span>
            <h2 className="font-fraunces text-4xl md:text-5xl text-slate-900 font-bold mb-6">
              Eleva tu Intelecto, <span className="text-ensil-gold italic">Domina</span> tu Tiempo.
            </h2>
            <p className="text-lg text-slate-600 font-light">
              Nuestro programa integral está diseñado para desbloquear tu máximo potencial, mejorando no solo tu velocidad de lectura, sino tu comprensión.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-3xl hover:shadow-xl transition-all duration-300 border border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10">
                <span className="material-icons-round text-3xl text-ensil-gold">speed</span>
              </div>
              <h3 className="font-fraunces text-2xl text-slate-900 font-semibold mb-3">Lectura Integral</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Multiplica tu velocidad de lectura por 20, manteniendo una comprensión superior al 99% mediante técnicas, estrategias y métodos avanzados de lectura.
              </p>
            </div>
            <div className="group bg-gradient-to-br from-ensil-gold/20 to-yellow-600/20 backdrop-blur-md p-8 rounded-3xl border border-ensil-gold/30 hover:border-ensil-gold/50 transition-all duration-300 transform md:-translate-y-4 shadow-lg shadow-ensil-gold/10">
              <div className="w-14 h-14 rounded-2xl bg-ensil-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                <span className="material-icons-round text-3xl text-white">psychology</span>
              </div>
              <h3 className="font-fraunces text-2xl text-yellow-900 font-semibold mb-3">Comprensión Total</h3>
              <p className="text-yellow-900/80 leading-relaxed text-sm">
                Aprende técnicas avanzadas para analizar, sintetizar y retener información compleja sin esfuerzo mental adicional.
              </p>
            </div>
            <div className="group bg-white p-8 rounded-3xl hover:shadow-xl transition-all duration-300 border border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10">
                <span className="material-icons-round text-3xl text-ensil-gold">timer</span>
              </div>
              <h3 className="font-fraunces text-2xl text-slate-900 font-semibold mb-3">Gestión del Tiempo</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Con lectura integral en tu rutina diaria optimizaras tu productividad y alcanzar tus metas académicas, profesionales y laborales será sencillo de lograr.
              </p>
            </div>
          </div>



        </div>
      </section>

      {/* Statistics Section - Glass Cards */}
      <section className="py-20 relative overflow-hidden" id="estadisticas">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-fraunces text-4xl md:text-5xl font-bold text-slate-900 mb-2">Estadísticas de <span className="text-ensil-gold italic">Impacto</span></h2>
              <p className="text-lg text-slate-600">Resultados tangibles que nuestros alumnos experimentan cada día.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
              <p className="font-fraunces text-6xl font-bold text-ensil-green mb-2">20x</p>
              <div className="h-1 w-12 bg-ensil-gold mb-4"></div>
              <p className="text-slate-900 font-medium">Aumento en Velocidad de Lectura</p>
              <p className="text-sm text-slate-500 mt-2">Promedio logrado en 6 meses.</p>
            </div>
            <div className="bg-green-900 p-8 rounded-2xl border border-slate-800 shadow-xl">
              <p className="font-fraunces text-6xl font-bold text-ensil-gold mb-2">99%</p>
              <div className="h-1 w-12 bg-white/20 mb-4"></div>
              <p className="text-white font-medium">Tasa de Comprensión Promedio</p>
              <p className="text-sm text-slate-400 mt-2">Retención superior garantizada.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
              <p className="font-fraunces text-6xl font-bold text-ensil-green mb-2">+12k</p>
              <div className="h-1 w-12 bg-ensil-gold mb-4"></div>
              <p className="text-slate-900 font-medium">Alumnos Graduados con Éxito</p>
              <p className="text-sm text-slate-500 mt-2">Una comunidad en crecimiento.</p>
            </div>
          </div>
        </div>
      </section >

      {/* Testimonials Section */}
      < section className="py-24" id="testimonios" >
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-ensil-gold font-bold text-sm tracking-wide uppercase mb-3 block">Testimonios</span>
            <h2 className="font-fraunces text-4xl md:text-5xl text-slate-900 font-bold">Lo que dicen nuestros alumnos</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-ensil-gold to-transparent mx-auto mt-6 rounded-full opacity-50"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 relative hover:shadow-xl transition-all duration-300 group border border-slate-100 shadow-sm">
              <span className="text-6xl text-ensil-gold/20 font-serif absolute top-6 left-6">"</span>
              <div className="relative z-10 flex flex-col h-full">
                <p className="text-slate-600 italic mb-8 pt-4 leading-relaxed font-light">
                  ENSIL cambió mi forma de estudiar. Ahora termino mis lecturas en una fracción del tiempo y recuerdo todo para mis exámenes. ¡Increíble!
                </p>
                <div className="mt-auto flex items-center gap-4 border-t border-slate-100 pt-6">
                  <img alt="Maria González" className="w-12 h-12 rounded-full object-cover ring-2 ring-ensil-gold/50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRAhavN8ic6iNWz1xyUyI_e4T4xGD6-SRIpI3suejnXxFQyvPfjUVbNUWqfzVSnf27vGtv5U_SUJ0vrD4WTdv0r2tsDYFNF_F0LrE4v8Bvv2WAxm6dcDbYC9K20Bhcri_0RqF8RN7lIVs3cr1DXCM1QvHferHjlGsUU2VMc5MJHsFwHiZA5FSkTyBeE6YIkJDLXhWeQoOznkW2SoKtG9eFLaNS1SgmCmqZ1LWlPmJhz6z7el8LUT59x-dERjKYyooADe_lkvsYDXQ" />
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Maria González</p>
                    <p className="text-xs text-slate-500">Estudiante de Derecho</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 relative hover:shadow-xl transition-all duration-300 group border border-slate-100 shadow-sm">
              <span className="text-6xl text-ensil-gold/20 font-serif absolute top-6 left-6">"</span>
              <div className="relative z-10 flex flex-col h-full">
                <p className="text-slate-600 italic mb-8 pt-4 leading-relaxed font-light">
                  Como profesional, el tiempo es oro. Gracias a este programa, me mantengo actualizado en mi campo sin sacrificar horas de mi día.
                </p>
                <div className="mt-auto flex items-center gap-4 border-t border-slate-100 pt-6">
                  <img alt="Carlos Rodriguez" className="w-12 h-12 rounded-full object-cover ring-2 ring-ensil-gold/50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjdO_2g_DzSGg34Yxw3B46sUtVJ3hR6zn8kNrgIW95wQnc-sMsYJM5-7VYMnpMFjr3WvmOwEQlH3lqZISPj0AqNbPO1r6izjvRiMP2CTiZn4LvgUdkZXlGoPRyunVnpy7yaLqcHFwFE5NFBcKJ-zQIzGrxvSqVTpLckZgY1R6lnQVIQsI4nfcaKbx2V2Hi6EAXaSl0la8EJ4mfNij0hFOvF4c6ONgVHhL3tzMY9y4W4w4rVBEtOaDUke8wQKZRLqZWgAuyFFkbu7U" />
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Carlos Rodriguez</p>
                    <p className="text-xs text-slate-500">Ingeniero de Software</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 relative hover:shadow-xl transition-all duration-300 group border border-slate-100 shadow-sm">
              <span className="text-6xl text-ensil-gold/20 font-serif absolute top-6 left-6">"</span>
              <div className="relative z-10 flex flex-col h-full">
                <p className="text-slate-600 italic mb-8 pt-4 leading-relaxed font-light">
                  Inscribí a mi hijo y su rendimiento escolar mejoró notablemente. Ahora disfruta de la lectura y tiene más confianza en sí mismo.
                </p>
                <div className="mt-auto flex items-center gap-4 border-t border-slate-100 pt-6">
                  <img alt="Ana Torres" className="w-12 h-12 rounded-full object-cover ring-2 ring-ensil-gold/50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFKfGH8fTAlAON297D-JFcwqhxwykctGgKUhmClCZ-dTPKfyThjym2Eu54MoWBf2YPCjMpyWJu_mS6M_gLD68FUPJV2STxtql6QbU-_OHDChsVnuIYdFfVk1L-z7SWQuijKBj3cH7jeJcXcJoNB51bSddAbwFBRBLKXgV8uxLlBh9nU0KWGfekwd0p_efgCQEd9GSP0ZZ1NIbvCyYUOOoJ964UFKtUVSY8h2wL5Kj8JP-bDUgA4Mr0F8ERvxzwt7kUF_et2wU969g" />
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Ana Torres</p>
                    <p className="text-xs text-slate-500">Madre de Familia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* FAQ Section */}
      < section className="py-20 md:py-28" id="faq" >
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <h2 className="font-fraunces text-4xl text-slate-900 font-bold">
              Preguntas <span className="text-ensil-gold italic">Frecuentes</span>
            </h2>
            <p className="text-slate-600 text-sm mt-2 md:mt-0">Respuestas a tus dudas más comunes</p>
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
                  <span className="font-fraunces text-xl text-slate-800 font-medium group-hover:text-ensil-gold transition-colors">
                    /0{item.id} {item.q}
                  </span>
                  <div className={`rounded-full p-2 transition-all ${openFaq === item.id ? 'bg-ensil-gold text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-ensil-gold group-hover:text-white'}`}>
                    <span className={`material-icons-round text-sm transition-transform duration-300 ${openFaq === item.id ? 'rotate-180' : ''}`}>arrow_downward</span>
                  </div>
                </button>
                <div
                  className={`text-slate-600 pl-0 md:pl-8 leading-relaxed overflow-hidden transition-all duration-300 ${openFaq === item.id ? 'max-h-40 opacity-100 py-2' : 'max-h-0 opacity-0'}`}
                >
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* Final CTA Section */}
      < section className="py-20 px-6" >
        <div className="max-w-7xl mx-auto">
          <div
            className="rounded-[1.5rem] p-18 md:p-20 text-center text-white relative overflow-hidden shadow-2xl border border-white/20 bg-cover bg-center"
            style={{ backgroundImage: "linear-gradient(rgba(22, 101, 52, 0.8), rgba(3, 107, 43, 0.8)), url('/img/bg-contacto-final.webp')" }}
          >
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="font-fraunces text-2xl md:text-6xl font-bold mb-6 text-white drop-shadow-md">
                ¡Tu futuro está a solo una <br /><span className="italic text-yellow-300">decisión de cambiar!</span>
              </h2>
              <p className="text-lg text-white/90 mb-10 max-w-xl mx-auto font-light">
                No esperes más para darte a ti mismo o a tu ser querido la herramienta más poderosa.
              </p>
              <button
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-white text-green-800 hover:bg-green-100 hover:text-green-900 font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-xl text-lg hover:-translate-y-1 inline-flex items-center gap-4 group cursor-pointer border-none"
              >
                Ir a agendar una entrevista
                <span className="material-icons-round group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section >

    </div >
  );
};

export default ContactContent;