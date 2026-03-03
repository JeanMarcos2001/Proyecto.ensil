import React, { useState, useMemo, useEffect, useRef } from 'react';
import { User, Baby, ArrowRight, CheckCircle, ArrowLeft, MapPin, Loader2, Phone, Sparkles, ChevronLeft, ChevronRight, Clock, Calendar, AlertCircle, Plus, Trash2, RotateCcw, ChevronDown, Briefcase, Users } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { smoothScrollTo } from '../../utils/scroll';

// --- 1. CREDENCIALES DE CONEXIÓN ---
const supabaseUrl = 'https://fmbtcgilsicvvsltmzms.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtYnRjZ2lsc2ljdnZzbHRtem1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMTkxODIsImV4cCI6MjA4MTU5NTE4Mn0.pd3CmAATwdtP4beaRWM6ufWyrdu8ywZ4JPAnsf7DX6c';
const supabase = createClient(supabaseUrl, supabaseKey);

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
  const [viewDate, setViewDate] = useState(new Date());
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
    guardianPhone: ''
  });

  // Alumnos extra (solo para dependientes)
  const [extraStudents, setExtraStudents] = useState<ExtraStudent[]>([]);

  // --- FETCH SEDES ---
  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const { data, error } = await supabase
          .from('filiales')
          .select('id, provincia, nombre, direccion')
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
      return ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
    } else {
      return ['09:00', '10:00', '11:00', '12:00', '13:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
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

  // --- HANDLERS CALENDARIO ---
  const handlePrevMonth = () => {
    const today = new Date();
    const prevMonthDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
    if (prevMonthDate.getMonth() < today.getMonth() && prevMonthDate.getFullYear() === today.getFullYear()) return;
    if (prevMonthDate < new Date(today.getFullYear(), today.getMonth(), 1)) return;
    setViewDate(prevMonthDate);
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleDayClick = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (newDate < today) return;
    setSelectedDateObj(newDate);

    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(newDate.getDate()).padStart(2, '0');
    setFormData(prev => ({ ...prev, fecha: `${year}-${month}-${dayStr}`, hora: '' }));
  };

  const handleTimeClick = (time: string) => {
    setFormData(prev => ({ ...prev, hora: time }));
  };

  // --- GENERACIÓN DE DÍAS DEL CALENDARIO ---
  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = [];
    for (let i = 0; i < adjustedFirstDay; i++) daysArray.push(null);
    for (let i = 1; i <= daysInMonth; i++) daysArray.push(i);
    return daysArray;
  }, [viewDate]);


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
        guardianPhone: ''
      });
      setExtraStudents([]);
      setSelectedDateObj(null);
      setViewDate(new Date());

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
    if (!formData.fecha || !formData.hora) { setError("Por favor selecciona fecha y hora en el calendario."); return; }

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
          p_es_dependiente: false
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
          p_hora: formData.hora
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
      <section className="relative py-4 md:py-8 overflow-hidden" id="agenda-form">

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
          <div className="w-full max-w-[85rem] mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_0.9fr] gap-8 lg:gap-12 items-stretch min-h-[600px] lg:h-[680px]">

            {/* LEFT COLUMN: Split into Title Card and Video Card */}
            <div className="w-full h-full flex flex-col gap-4">

              {/* BLOCK 1: Title Card */}
              <div className="relative w-full shrink-0">
                <div className="absolute -inset-[2px] bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600 rounded-[2.2rem] opacity-75 blur-sm transition duration-1000 animate-gradient-xy"></div>
                <div className="relative w-full rounded-[2rem] bg-white p-[2px] overflow-hidden">
                  <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,#f1f5f9_0%,#84cc16_50%,#f1f5f9_100%)] animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {/* Top Section: Title & Badge */}
                  <div className="p-4 md:p-6 pb-2 flex-shrink-0">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/80 text-ensil-gold text-[10px] font-bold tracking-wider uppercase mb-2 border border-slate-200/60 shadow-sm w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-ensil-gold animate-pulse"></span>
                      Método Exclusivo
                    </div>

                    {/* Title */}
                    <h1 className="font-fraunces text-3xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.1] text-slate-900 tracking-tight m-0 mb-2 py-1">
                      Transforma Tu Lectura <br className="hidden md:block" />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-600 to-green-700 drop-shadow-sm inline-block py-1">
                        En Tu Mayor Poder
                      </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-slate-500 text-xs md:text-sm font-medium max-w-md leading-relaxed">
                      Domina la lectura veloz y la comprensión total en tiempo récord.
                    </p>
                  </div>
                </div>
              </div>

              {/* BLOCK 2: Video Card - Fills remaining height */}
              <div className="relative group w-full flex-1 min-h-[280px] lg:min-h-[0px] flex flex-col">
                <div className="absolute -inset-[2px] bg-gradient-to-r from-lime-400 via-green-500 to-lime-400 rounded-[2.2rem] opacity-75 blur-sm group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
                <div className="relative h-full w-full rounded-[2rem] bg-white p-[2px] overflow-hidden flex flex-col">
                  <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,#f1f5f9_0%,#84cc16_50%,#f1f5f9_100%)] animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Video Container */}
                  <div className="relative h-full w-full bg-black rounded-[1.9rem] overflow-hidden border border-slate-100/50 group/video flex-1">
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
                      <source src="https://fmbtcgilsicvvsltmzms.supabase.co/storage/v1/object/public/Videos/LandingVideo.webm" type="video/webm" />
                    </video>

                    {/* Replay Overlay */}
                    {videoEnded && (
                      <div className="absolute inset-0 flex items-center justify-center z-20 animate-fade-in">
                        <button
                          onClick={handleReplay}
                          className="group/btn flex flex-col items-center gap-3"
                        >
                          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:bg-white/20">
                            <RotateCcw size={32} className="group-hover/btn:-rotate-90 transition-transform duration-500" />
                          </div>
                          <span className="text-white font-fraunces font-bold text-lg tracking-wide drop-shadow-md">Repetir Video</span>
                        </button>
                      </div>
                    )}

                    {!videoEnded && (
                      <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Form Card */}
            <div className="relative group w-full h-full flex flex-col">
              {/* Animated Border Container */}
              <div className="absolute -inset-[2px] bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600 rounded-[2.2rem] opacity-75 blur-sm group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
              <div className="relative h-full w-full rounded-[2rem] bg-white p-[2px] overflow-hidden">
                {/* Rotating Border Effect */}
                <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,#f1f5f9_0%,#34d399_50%,#f1f5f9_100%)] animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative h-full w-full bg-white rounded-[1.9rem] overflow-hidden flex flex-col border border-slate-100/50">
                  <div className="p-5 md:p-8 flex flex-col h-full overflow-y-auto">

                    {step < 4 && (
                      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
                        <div>
                          <h2 className="font-fraunces text-slate-900 text-xl md:text-2xl font-bold leading-tight">
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
                        <p className="text-slate-600 text-sm md:text-base mb-4 font-medium text-center">¿Para quién desea el programa?</p>
                        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-8 w-full max-w-2xl mx-auto">
                          <button
                            onClick={() => setTarget('me')}
                            className={`p-6 md:px-8 md:py-10 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center justify-center gap-5 text-center min-h-[140px] w-full ${target === 'me' ? 'border-green-500 bg-green-50 shadow-lg transform scale-[1.02]' : 'border-slate-100 bg-white hover:border-green-200 hover:bg-slate-50 hover:-translate-y-1'}`}
                          >
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 transition-colors ${target === 'me' ? 'bg-ensil-green text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                              <User size={32} />
                            </div>
                            <div className="mt-1">
                              <h3 className={`font-bold text-base md:text-lg leading-tight uppercase tracking-wide ${target === 'me' ? 'text-ensil-green' : 'text-slate-700'}`}>Para Mí</h3>
                            </div>
                            {target === 'me' && <CheckCircle className="text-ensil-green absolute top-5 right-5" size={22} />}
                          </button>

                          <button
                            onClick={() => setTarget('child')}
                            className={`p-6 md:px-8 md:py-10 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center justify-center gap-5 text-center min-h-[140px] w-full ${target === 'child' ? 'border-green-500 bg-green-50 shadow-lg transform scale-[1.02]' : 'border-slate-100 bg-white hover:border-green-200 hover:bg-slate-50 hover:-translate-y-1'}`}
                          >
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 transition-colors ${target === 'child' ? 'bg-ensil-green text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                              <Baby size={32} />
                            </div>
                            <div className="mt-1">
                              <h3 className={`font-bold text-base md:text-lg leading-tight uppercase tracking-wide ${target === 'child' ? 'text-ensil-green' : 'text-slate-700'}`}>Para Mi Hijo</h3>
                            </div>
                            {target === 'child' && <CheckCircle className="text-ensil-green absolute top-5 right-5" size={22} />}
                          </button>
                        </div>
                        <button onClick={nextStep} className="w-full bg-gradient-to-r from-emerald-500 to-green-700 hover:from-emerald-400 hover:to-green-600 text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 transition-all shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.23)] hover:-translate-y-0.5">
                          Continuar <ArrowRight size={20} />
                        </button>
                        {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
                      </div>
                    )}

                    {/* STEP 2: DEPENDENCY (Only if Target is 'me') */}
                    {step === 2 && (
                      <div className="flex-1 flex flex-col justify-center animate-fade-in">
                        <button onClick={prevStep} className="text-slate-400 hover:text-green-600 mb-2 flex items-center gap-1 text-xs font-bold uppercase tracking-wider transition-colors w-fit bg-slate-50 px-3 py-1.5 rounded-lg hover:bg-green-50"><ArrowLeft size={14} /> Atrás</button>
                        <p className="text-slate-600 text-sm md:text-base mb-4 font-medium text-center uppercase">Se considera usted:</p>

                        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-8 w-full max-w-2xl mx-auto">
                          <button
                            onClick={() => setDependency('independent')}
                            className={`p-6 md:px-8 md:py-10 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center justify-center gap-5 text-center min-h-[140px] w-full ${dependency === 'independent' ? 'border-green-500 bg-green-50 shadow-lg transform scale-[1.02]' : 'border-slate-100 bg-white hover:border-green-200 hover:bg-slate-50 hover:-translate-y-1'}`}
                          >
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 transition-colors ${dependency === 'independent' ? 'bg-ensil-green text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                              <Briefcase size={32} />
                            </div>
                            <div className="mt-1">
                              <h4 className={`font-bold text-sm md:text-base leading-tight uppercase px-2 ${dependency === 'independent' ? 'text-ensil-green' : 'text-slate-700'}`}>Persona totalmente independiente</h4>
                            </div>
                            {dependency === 'independent' && <CheckCircle className="text-ensil-green absolute top-5 right-5" size={22} />}
                          </button>

                          <button
                            onClick={() => setDependency('dependent')}
                            className={`p-6 md:px-8 md:py-10 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center justify-center gap-5 text-center min-h-[140px] w-full ${dependency === 'dependent' ? 'border-green-500 bg-green-50 shadow-lg transform scale-[1.02]' : 'border-slate-100 bg-white hover:border-green-200 hover:bg-slate-50 hover:-translate-y-1'}`}
                          >
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 transition-colors ${dependency === 'dependent' ? 'bg-ensil-green text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                              <Users size={32} />
                            </div>
                            <div className="mt-1">
                              <h4 className={`font-bold text-sm md:text-base leading-tight uppercase px-2 ${dependency === 'dependent' ? 'text-ensil-green' : 'text-slate-700'}`}>Aún dependo de un apoderado</h4>
                            </div>
                            {dependency === 'dependent' && <CheckCircle className="text-ensil-green absolute top-5 right-5" size={22} />}
                          </button>
                        </div>

                        <button onClick={nextStep} className="w-full bg-gradient-to-r from-emerald-500 to-green-700 hover:from-emerald-400 hover:to-green-600 text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 transition-all shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.23)] hover:-translate-y-0.5">
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
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/20 text-slate-900 placeholder:text-slate-400 text-sm transition-all"
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
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/20 text-slate-900 placeholder:text-slate-400 text-sm transition-all"
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
                              className="md:col-span-2 w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/20 text-slate-900 placeholder:text-slate-400 text-sm transition-all"
                            />
                            <input
                              type="number"
                              name="studentAge"
                              placeholder="Edad"
                              value={formData.studentAge}
                              onChange={handleInputChange}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/20 text-slate-900 placeholder:text-slate-400 text-sm transition-all"
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
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/20 text-slate-900 placeholder:text-slate-400 text-sm transition-all"
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
                                      className="md:col-span-2 w-full bg-white border border-slate-200 rounded-lg py-2 px-3 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/20 text-slate-900 placeholder:text-slate-400 text-sm font-medium transition-all"
                                    />
                                    <input
                                      type="number"
                                      placeholder="Edad"
                                      value={student.age}
                                      onChange={(e) => updateExtraStudent(student.id, 'age', e.target.value)}
                                      className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/20 text-slate-900 placeholder:text-slate-400 text-sm font-medium transition-all"
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
                                    {sede.provincia} - {sede.nombre}
                                  </option>
                                ))}
                              </select>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Enhanced Date Picker Trigger */}
                                <div className="relative">
                                  <div className="text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">Fecha</div>
                                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 min-h-[290px] relative flex flex-col">
                                    {/* Calendar Header */}
                                    <div className="flex justify-between items-center mb-3 px-1">
                                      <button onClick={handlePrevMonth} className="text-slate-400 hover:text-slate-600 transition-colors"><ChevronLeft size={16} /></button>
                                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{MONTHS_ES[viewDate.getMonth()]} {viewDate.getFullYear()}</span>
                                      <button onClick={handleNextMonth} className="text-slate-400 hover:text-slate-600 transition-colors"><ChevronRight size={16} /></button>
                                    </div>

                                    {/* Days Initials Row */}
                                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                                      {['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'].map(d => (
                                        <div key={d} className="text-[9px] font-bold text-slate-400">{d}</div>
                                      ))}
                                    </div>

                                    {/* Calendar Grid - Show all days */}
                                    <div className="grid grid-cols-7 gap-1 text-center flex-1">
                                      {calendarDays.map((day, idx) => {
                                        if (!day) return <div key={idx} />;

                                        const dateOfCurrentLoop = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
                                        const now = new Date();
                                        now.setHours(0, 0, 0, 0); // normalize today

                                        const isPast = dateOfCurrentLoop < now;
                                        const isToday = dateOfCurrentLoop.getTime() === now.getTime();
                                        const isSelected = selectedDateObj?.getDate() === day && selectedDateObj?.getMonth() === viewDate.getMonth();

                                        let dayStyles = "w-7 h-7 shrink-0 aspect-square text-[11px] rounded-full flex items-center justify-center transition-all mx-auto ";

                                        if (isSelected) {
                                          dayStyles += 'bg-green-600 text-white shadow-md font-bold';
                                        } else if (isPast && !isToday) {
                                          dayStyles += 'text-slate-300 cursor-not-allowed';
                                        } else {
                                          dayStyles += 'text-slate-600 hover:bg-green-100 hover:text-green-800 font-medium cursor-pointer';
                                          if (isToday) {
                                            dayStyles += ' ring-2 ring-inset ring-green-500 bg-green-50 text-green-700';
                                          }
                                        }

                                        return (
                                          <div key={idx} className="flex justify-center items-center py-0.5">
                                            <button
                                              disabled={isPast && !isToday}
                                              onClick={() => handleDayClick(day)}
                                              className={dayStyles}
                                            >
                                              {day}
                                            </button>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>

                                {/* Time Picker */}
                                <div className="relative">
                                  <div className="text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">Hora</div>
                                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 h-[290px] overflow-y-auto custom-scrollbar">
                                    {availableHours.length > 0 ? (
                                      <div className="grid grid-cols-1 gap-1">
                                        {availableHours.map(hour => (
                                          <button
                                            key={hour}
                                            onClick={() => handleTimeClick(hour)}
                                            className={`text-xs py-1.5 px-2 rounded-lg border ${formData.hora === hour ? 'bg-green-600 text-white border-green-600' : 'bg-white border-slate-200 text-slate-600 hover:border-green-400'}`}
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
                          className="mt-auto w-full bg-gradient-to-r from-emerald-500 to-green-700 hover:from-emerald-400 hover:to-green-600 text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.23)] hover:-translate-y-0.5"
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
          </div>

          {/* Scroll Down Indicator - Moved OUTSIDE and BELOW the cards completely */}
          <div className="w-full flex justify-center mt-12 pb-8 relative z-20">
            <a
              href="#programa"
              className="inline-flex flex-col items-center text-slate-400 hover:text-green-700 transition-colors group cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('programa', 1200);
              }}
            >
              <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-2">Sigue Aprendiendo</span>
              <div className="p-2 rounded-full bg-white/50 backdrop-blur-sm border border-slate-200 shadow-sm group-hover:bg-white transition-all">
                <ChevronDown className="w-5 h-5 md:w-6 md:h-6 animate-bounce text-slate-400 group-hover:text-green-600" />
              </div>
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
              <h3 className="font-fraunces text-2xl text-slate-900 font-semibold mb-3">Lectura Veloz</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Multiplica tu velocidad de lectura por 10, manteniendo una comprensión superior al 90% mediante técnicas oculares avanzadas.
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
                Integra la lectura eficiente en tu rutina diaria para optimizar tu productividad y alcanzar tus metas más rápido.
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
              <p className="font-fraunces text-6xl font-bold text-ensil-green mb-2">10x</p>
              <div className="h-1 w-12 bg-ensil-gold mb-4"></div>
              <p className="text-slate-900 font-medium">Aumento en Velocidad de Lectura</p>
              <p className="text-sm text-slate-500 mt-2">Promedio logrado en 6 meses.</p>
            </div>
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl">
              <p className="font-fraunces text-6xl font-bold text-ensil-gold mb-2">95%</p>
              <div className="h-1 w-12 bg-white/20 mb-4"></div>
              <p className="text-white font-medium">Tasa de Comprensión Promedio</p>
              <p className="text-sm text-slate-400 mt-2">Retención superior garantizada.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
              <p className="font-fraunces text-6xl font-bold text-ensil-green mb-2">+25k</p>
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
          <div className="bg-gradient-to-r from-ensil-gold to-yellow-600 rounded-[2.5rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl border border-white/20">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="font-fraunces text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-md">
                ¡Tu futuro está a solo una <br /><span className="italic text-green-900">decisión de cambiar!</span>
              </h2>
              <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto font-light">
                No esperes más para darte a ti mismo o a tu ser querido la herramienta más poderosa: el conocimiento.
              </p>
              <a href="#agenda-form" className="bg-white text-ensil-gold hover:bg-green-900 hover:text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-xl text-lg hover:-translate-y-1 inline-flex items-center gap-2 group">
                Agendar mi Entrevista Ahora
                <span className="material-icons-round group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </section >

    </div >
  );
};

export default ContactContent;