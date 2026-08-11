import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase as supabaseDemo, supabaseUrl as SUPABASE_URL } from '../../lib/supabase';

// --- Tipo para las historias que vienen de Supabase ---
interface Historia {
  id: number;
  nombre_alumno: string;
  programa: string;
  narracion: string;
  palabras_por_min: string;
  foto_path: string | null;
  foto_url: string | null;
  foto_position: string | null;  // e.g. "40% 20%" → CSS object-position
  foto_scale: number | null;     // zoom factor, e.g. 1.3
  clase_css: string;
  orden: number;
}

// -- Componente para Marquesina Arrastrable e Infinita --
interface DraggableMarqueeProps {
  children: React.ReactNode;
  speed?: number; // Pixels per frame (approx 60fps)
  direction?: 'left' | 'right';
}

const DraggableMarquee: React.FC<DraggableMarqueeProps> = ({ children, speed = 1, direction = 'left' }) => {
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);

  // State for dragging
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  // Animation ref
  const requestRef = React.useRef<number>();

  const animate = React.useCallback(() => {
    if (!scrollerRef.current || isDragging || isHovered) {
      if (!isDragging && !isHovered) {
        requestRef.current = requestAnimationFrame(animate);
      }
      return;
    }

    const scroller = scrollerRef.current;
    const inner = innerRef.current;

    // Half of the inner width is one full set of children
    const halfWidth = inner.scrollWidth / 2;

    if (direction === 'left') {
      scroller.scrollLeft += speed;
      // Loop back if we've scrolled past the first half
      if (scroller.scrollLeft >= halfWidth) {
        scroller.scrollLeft -= halfWidth;
      }
    } else {
      scroller.scrollLeft -= speed;
      // Loop forward if we hit the left edge
      if (scroller.scrollLeft <= 0) {
        scroller.scrollLeft += halfWidth;
      }
    }

    requestRef.current = requestAnimationFrame(animate);
  }, [isDragging, isHovered, speed, direction]);

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  // To handle the initial position for right-directed marquees, so they don't start at 0 and immediately jump
  React.useEffect(() => {
    const initScroll = () => {
      if (direction === 'right' && scrollerRef.current && innerRef.current) {
        scrollerRef.current.scrollLeft = innerRef.current.scrollWidth / 2;
      }
    };
    initScroll();
    const timeoutId = setTimeout(initScroll, 100);
    return () => clearTimeout(timeoutId);
  }, [direction]);

  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const pageX = 'touches' in e ? e.touches[0].pageX : (e as React.MouseEvent).pageX;
    setStartX(pageX - (scrollerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollerRef.current?.scrollLeft || 0);
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  const onDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !scrollerRef.current) return;
    e.preventDefault(); // Prevent text selection/scrolling while dragging
    const pageX = 'touches' in e ? e.touches[0].pageX : (e as React.MouseEvent).pageX;
    const x = pageX - (scrollerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2; // The multiplier changes drag sensitivity

    let newScrollLeft = scrollLeft - walk;
    const halfWidth = innerRef.current.scrollWidth / 2;

    // Manual infinite wrapping logic during drag
    if (newScrollLeft >= halfWidth) {
      newScrollLeft -= halfWidth;
      setStartX(pageX); // Reset start anchor to avoid jumping next frame
      setScrollLeft(newScrollLeft);
    } else if (newScrollLeft <= 0) {
      newScrollLeft += halfWidth;
      setStartX(pageX); // Reset start anchor
      setScrollLeft(newScrollLeft);
    }

    scrollerRef.current.scrollLeft = newScrollLeft;
  };

  return (
    <div
      ref={scrollerRef}
      className={`w-full overflow-x-hidden overflow-y-visible cursor-grab active:cursor-grabbing py-12 -my-12 ${isDragging ? 'select-none pointer-events-auto' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); onDragEnd(); }}
      onMouseDown={onDragStart}
      onMouseUp={onDragEnd}
      onMouseMove={onDragMove}
      onTouchStart={onDragStart}
      onTouchEnd={onDragEnd}
      onTouchMove={onDragMove}
      style={{ scrollBehavior: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
    >
      <div
        ref={innerRef}
        className="flex gap-4 w-max items-center"
      >
        {/* Render children twice for seamless looping */}
        {children}
        {children}
      </div>
    </div>
  );
};

// -- Componente para YouTube Interactivo --
const InteractiveYouTubeItem: React.FC<{ url: string; index: number }> = ({ url, index }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <div
      key={`yt-${index}`}
      className="h-[220px] md:h-[432px] aspect-video shrink-0 rounded-2xl overflow-hidden shadow-md bg-slate-100 flex items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:scale-[1.02] cursor-pointer relative"
      onMouseEnter={() => setIsPlaying(true)}
      onMouseLeave={() => setIsPlaying(false)}
    >
      {/* 
        The iframe gets pointer-events-none when NOT playing so the mouse events 
        trigger on the wrapper div. When playing, we allow pointer events 
        so the user can click actual YT controls if needed.
      */}
      <iframe
        className={`w-full h-full ${isPlaying ? 'pointer-events-auto' : 'pointer-events-none'}`}
        src={`${url}?controls=1&mute=1&autoplay=${isPlaying ? 1 : 0}`}
        title="Testimonio ENSIL"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      {/* Capa visual para indicar reproducir cuando no está activo */}
      {!isPlaying && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-icons-round text-white text-3xl">play_arrow</span>
          </div>
        </div>
      )}
    </div>
  );
};

const ResultsContent: React.FC = () => {
  const [demoImages, setDemoImages] = useState<string[]>([]);
  const [isLoadingDemo, setIsLoadingDemo] = useState(true);
  const [carrusel02Images, setCarrusel02Images] = useState<{ url: string; position: string; scale: number }[]>([]);
  const [isLoadingCarrusel02, setIsLoadingCarrusel02] = useState(true);
  const [historias, setHistorias] = useState<Historia[]>([]);
  const [isLoadingHistorias, setIsLoadingHistorias] = useState(true);
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  useEffect(() => {
    // --- Fetch imágenes del bucket Demostraciones ---
    const fetchDemoImages = async () => {
      try {
        setIsLoadingDemo(true);
        const { data, error } = await supabaseDemo
          .storage
          .from('Demostraciones')
          .list('', { limit: 100, offset: 0, sortBy: { column: 'name', order: 'asc' } });

        if (error) { console.error('Error fetching Demo images:', error); return; }

        if (data) {
          const validFiles = data.filter(file => file.name && file.name !== '.emptyFolderPlaceholder');
          const imageUrls = validFiles.map(file => {
            const { data: { publicUrl } } = supabaseDemo.storage
              .from('Demostraciones').getPublicUrl(file.name);
            return publicUrl;
          });
          setDemoImages(imageUrls);
        }
      } catch (err) {
        console.error('Unexpected error fetching Demo images:', err);
      } finally {
        setIsLoadingDemo(false);
      }
    };

    // --- Fetch historias de transformación desde la BD ---
    const fetchHistorias = async () => {
      try {
        setIsLoadingHistorias(true);
        const { data, error } = await supabaseDemo
          .from('historias_transformacion')
          .select(`
            id, nombre_alumno, programa, narracion,
            palabras_por_min, foto_path, foto_position, foto_scale, orden,
            colores_corporativos ( clase_css )
          `)
          .eq('activo', true)
          .order('orden', { ascending: true });

        if (error) { console.error('Error fetching historias:', error); return; }

        if (data) {
          const mapped: Historia[] = data.map((h: any) => {
            // Construir la URL de la foto de forma robusta,
            // manejando los distintos formatos que puede tener foto_path:
            //   A) URL completa: "https://jtrugvxgztnxbhwjtiou.supabase.co/storage/v1/..."
            //   B) Solo nombre:  "maria.webp"
            //   C) Con ruta:     "historias/maria.webp"
            let foto_url: string | null = null;
            if (h.foto_path) {
              if (h.foto_path.startsWith('http')) {
                // Caso A: ya es una URL completa, usarla directamente
                foto_url = h.foto_path;
              } else {
                // Casos B y C: construir la URL pública del bucket
                const cleanPath = h.foto_path.startsWith('/') ? h.foto_path.slice(1) : h.foto_path;
                foto_url = `${SUPABASE_URL}/storage/v1/object/public/Testimonios/${cleanPath}`;
              }
            }
            // DEBUG TEMPORAL — ver en consola del navegador (F12 → Console)
            console.log(`[ENSIL Historias] id=${h.id} | foto_path="${h.foto_path}" | foto_url="${foto_url}"`);
            return {
              id: h.id,
              nombre_alumno: h.nombre_alumno,
              programa: h.programa,
              narracion: h.narracion,
              palabras_por_min: h.palabras_por_min,
              foto_path: h.foto_path,
              foto_url,
              foto_position: h.foto_position ?? '50% 50%',
              foto_scale: h.foto_scale ?? 1.0,
              clase_css: h.colores_corporativos?.clase_css || 'bg-[#f5f2eb]',
              orden: h.orden,
            };
          });
          setHistorias(mapped);
        }
      } catch (err) {
        console.error('Unexpected error fetching historias:', err);
      } finally {
        setIsLoadingHistorias(false);
      }
    };

    // --- Fetch imágenes del bucket Carrusel 02 (orden controlado desde BD) ---
    const fetchCarrusel02Images = async () => {
      try {
        setIsLoadingCarrusel02(true);
        const { data, error } = await supabaseDemo
          .from('carrusel_02_imagenes')
          .select('file_path, foto_position, foto_scale')
          .eq('activo', true)
          .order('orden', { ascending: true });

        if (error) { console.error('Error fetching Carrusel02 images:', error); return; }

        if (data) {
          const images = data.map(item => {
            const { data: { publicUrl } } = supabaseDemo.storage
              .from('carrusel_02')
              .getPublicUrl(item.file_path);
            return {
              url: publicUrl,
              position: item.foto_position ?? '50% 50%',
              scale: item.foto_scale ?? 1.0,
            };
          });
          setCarrusel02Images(images);
        }
      } catch (err) {
        console.error('Unexpected error fetching Carrusel02 images:', err);
      } finally {
        setIsLoadingCarrusel02(false);
      }
    };

    fetchDemoImages();
    fetchCarrusel02Images();
    fetchHistorias();

    const timer = setTimeout(() => setIsStatsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Duplicar para los loops infinitos
  const loopingDemoImages = demoImages.length > 0
    ? [...demoImages, ...demoImages, ...demoImages, ...demoImages]
    : [];

  const loopingCarrusel02Images = carrusel02Images.length > 0
    ? [...carrusel02Images, ...carrusel02Images, ...carrusel02Images, ...carrusel02Images]
    : [] as typeof carrusel02Images;

  const dynamicDuration = loopingDemoImages.length > 0
    ? `${loopingDemoImages.length * 5}s`
    : '43s';

  return (
    <div className="w-full bg-white text-slate-800 font-jakarta">
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 space-y-16">

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
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
          <div className={`bg-green-800 p-8 rounded-3xl text-white relative overflow-hidden group hover:shadow-xl transition-all duration-700 ease-out transform ${isStatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <span className="material-icons-round text-6xl">school</span>
            </div>
            <h3 className="text-5xl font-bold mb-2 relative z-10">1000<span className="text-yellow-400">+</span></h3>
            <p className="font-medium text-green-100 relative z-10">Graduados Exitosos</p>
          </div>

          <div className={`bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden hover:shadow-lg transition-all duration-700 delay-150 ease-out transform ${isStatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-50 rounded-full"></div>
            <h3 className="text-5xl font-bold text-slate-900 mb-2">95<span className="text-green-700 text-3xl align-top">%</span></h3>
            <p className="font-medium text-slate-600">Aprueban sus módulos</p>
            <p className="text-xs text-slate-400 mt-2">En el primer intento</p>
          </div>

          <div className={`bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden hover:shadow-lg transition-all duration-700 delay-300 ease-out transform ${isStatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <span className="material-icons-round text-green-700 text-3xl mb-2">location_on</span>
            <h3 className="text-5xl font-bold text-slate-900 mb-2">16</h3>
            <p className="font-medium text-slate-600">Sedes Nacionales</p>
            <p className="text-xs text-slate-400 mt-2">Presencia en todo el país</p>
          </div>

          <div className={`bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden hover:shadow-lg transition-all duration-700 delay-500 ease-out transform ${isStatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <span className="material-icons-round text-green-700 text-3xl mb-2">history</span>
            <h3 className="text-5xl font-bold text-slate-900 mb-2">20<span className="text-green-700 text-3xl align-top">+</span></h3>
            <p className="font-medium text-slate-600">Años de Experiencia</p>
            <p className="text-xs text-slate-400 mt-2">Metodología comprobada</p>
          </div>
        </div>
      </main>

      {/* Visual Evidence Section (Full Width / Edge to Edge) */}
      <div className="w-full pb-12 pt-8 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Evidencia Visual
            </h2>
            <p className="text-slate-500 mt-1 text-lg">Momentos reales de superación académica.</p>
          </div>
        </div>

        <div className="flex flex-col gap-[19px] relative mt-4 w-full">

          {/* Fila 1 (Horario / Izquierda - Supabase Dynamic) */}
          <div className="relative w-full group/marquee1 hover:z-20 [clip-path:inset(-40px_0_-40px_0)]">
            <DraggableMarquee speed={1} direction="left">
              {isLoadingDemo ? (
                // Skeleton loading state
                [...Array(10)].map((_, i) => (
                  <div key={`skel-${i}`} className="h-[220px] md:h-[432px] w-[320px] md:w-[600px] shrink-0 rounded-2xl bg-slate-100 animate-pulse flex items-center justify-center">
                    <span className="material-icons-round text-slate-300 text-4xl">image</span>
                  </div>
                ))
              ) : loopingDemoImages.length > 0 ? (
                // Dynamic Images from Supabase
                loopingDemoImages.slice(0, loopingDemoImages.length / 4).map((url, i) => (
                  <div key={`f1-sb-${i}`} className="h-[220px] md:h-[432px] shrink-0 rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:scale-[1.02] cursor-pointer bg-slate-50">
                    <img
                      src={url}
                      alt={`Evidencia Demostración ${i}`}
                      className="h-full w-auto object-cover max-w-none pointer-events-none"
                    />
                  </div>
                ))
              ) : (
                // Fallback if no images found
                <div className="h-[220px] md:h-[432px] w-full flex items-center justify-center text-slate-400">
                  No hay imágenes disponibles en esta carpeta.
                </div>
              )}
            </DraggableMarquee>
          </div>

          {/* Fila 2 (Antihorario / Derecha — Supabase Carrusel 02) */}
          <div className="relative w-full group/marquee2 hover:z-20 [clip-path:inset(-40px_0_-40px_0)]">
            <DraggableMarquee speed={0.8} direction="right">
              {isLoadingCarrusel02 ? (
                [...Array(8)].map((_, i) => (
                  <div key={`skel2-${i}`} className="h-[220px] md:h-[432px] w-[320px] md:w-[600px] shrink-0 rounded-2xl bg-slate-100 animate-pulse flex items-center justify-center">
                    <span className="material-icons-round text-slate-300 text-4xl">image</span>
                  </div>
                ))
              ) : loopingCarrusel02Images.length > 0 ? (
                loopingCarrusel02Images.slice(0, loopingCarrusel02Images.length / 4).map((item, i) => (
                  <div key={`f2-sb-${i}`} className="h-[220px] md:h-[432px] shrink-0 rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:scale-[1.02] cursor-pointer bg-slate-50">
                    <img
                      src={item.url}
                      alt={`Evidencia Carrusel 02 ${i}`}
                      className="h-full w-auto max-w-none pointer-events-none"
                      style={{
                        objectFit: 'cover',
                        objectPosition: item.position,
                        transform: `scale(${item.scale})`,
                        transformOrigin: item.position,
                      }}
                    />
                  </div>
                ))
              ) : (
                <div className="h-[220px] md:h-[432px] w-full flex items-center justify-center text-slate-400">
                  No hay imágenes disponibles en esta fila.
                </div>
              )}
            </DraggableMarquee>
          </div>

          {/* Fila 3 (Horario / Izquierda con YouTube) */}
          <div className="relative w-full group/marquee3 hover:z-20 [clip-path:inset(-40px_0_-40px_0)]">
            <DraggableMarquee speed={1} direction="left">
              {/* Array duplicado de iframes de YouTube representativos */}
              {[
                "https://www.youtube.com/embed/Y_x-AZPvaOo",
                "https://www.youtube.com/embed/BeIr4iFnArI",
                "https://www.youtube.com/embed/Dfkfrbwpt9o",
                "https://www.youtube.com/embed/5cckHir36gc",
                "https://www.youtube.com/embed/QGCXskwkEgY"
              ].map((url, i) => (
                <InteractiveYouTubeItem key={`yt-${i}`} url={url} index={i} />
              ))}
            </DraggableMarquee>
          </div>
        </div>
      </div>

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-20">
        {/* Transformation Stories */}
        <div className="pt-10 overflow-hidden">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Historias de transformación
            </h2>
            <p className="text-slate-500 mt-1 text-lg">Conoce la experiencia de nuestros estudiantes.</p>
          </div>
          {/* Marquee Container */}
          <div className="relative w-full overflow-hidden pt-6 pb-8 -mt-2 group/marquee">
            {/* Left Fade */}
            <div className="pointer-events-none absolute left-0 top-0 z-30 h-full w-16 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
            {/* Right Fade */}
            <div className="pointer-events-none absolute right-0 top-0 z-30 h-full w-16 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent"></div>

            <DraggableMarquee speed={1} direction="left">
              {isLoadingHistorias ? (
                // Skeleton mientras carga
                [...Array(4)].map((_, i) => (
                  <div key={`skel-hist-${i}`} className="flex flex-col min-w-[340px] max-w-[360px] rounded-[2rem] overflow-hidden bg-slate-100 animate-pulse h-[460px] shrink-0" />
                ))
              ) : historias.length > 0 ? (
                historias.map((h, idx) => (
                  <div
                    key={`hist-${h.id}-${idx}`}
                    className={`flex flex-col min-w-[340px] max-w-[360px] whitespace-normal rounded-[2rem] overflow-hidden shadow-sm relative group transition-all duration-300 hover:-translate-y-4 hover:shadow-xl select-none ${h.clase_css}`}
                  >
                    <div className="p-6 pb-6 flex-1 flex flex-col">
                      <div className="flex items-start justify-end mb-6">
                        <div className="w-8 h-8 bg-black/5 rounded-full flex items-center justify-center shrink-0">
                          <span className="text-slate-700 text-2xl font-serif leading-none mt-2">“</span>
                        </div>
                      </div>

                      <h3 className="text-3xl font-display font-bold tracking-tight mb-3 text-slate-900 leading-tight">
                        {h.nombre_alumno.split(' ')[0]}<br />{h.nombre_alumno.split(' ').slice(1).join(' ')}
                      </h3>
                      <p className="text-slate-800 font-medium text-sm leading-relaxed line-clamp-4 min-h-[80px]">
                        “{h.narracion}”
                      </p>
                    </div>

                    <div className="relative h-[240px] w-full mt-auto overflow-hidden rounded-t-[2rem]">
                      {/* Wrapper: maneja el zoom al hacer hover sobre la card (group-hover) */}
                      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                        {h.foto_url ? (
                          <img
                            src={h.foto_url}
                            className="w-full h-full"
                            draggable={false}
                            alt=""
                            style={{
                              objectFit: 'cover',
                              objectPosition: h.foto_position ?? '50% 50%',
                              transform: `scale(${h.foto_scale ?? 1})`,
                              transformOrigin: h.foto_position ?? '50% 50%',
                            }}
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.style.display = 'none';
                              const placeholder = target.nextElementSibling as HTMLElement;
                              if (placeholder) placeholder.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        {/* Placeholder: visible si no hay foto o si la imagen falla */}
                        <div
                          className="absolute inset-0 items-center justify-center bg-black/10"
                          style={{ display: h.foto_url ? 'none' : 'flex' }}
                        >
                          <span className="material-icons-round text-white/60 text-6xl">person</span>
                        </div>
                      </div>

                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-center py-8 px-12">No hay historias publicadas aún.</p>
              )}
            </DraggableMarquee>
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
              <Link to="/contacto" className="bg-yellow-400 text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2">
                Reservar Diagnóstico Gratuito
                <span className="material-icons-round">arrow_forward</span>
              </Link>
              <a 
                href={`https://wa.me/51960508686?text=${encodeURIComponent("¡Hola! 👋 Quiero llevar mi lectura al siguiente nivel. 🚀 Me gustaría agendar una cita presencial 🏫 para mi diagnóstico gratuito y recibir más información sobre el programa. 📚✨")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                Hablar con un asesor
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResultsContent;