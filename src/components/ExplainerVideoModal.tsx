import React, { useState, useEffect, useRef } from 'react';

interface ExplainerVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateScreen?: (screen: any) => void;
}

interface Chapter {
  id: 'intro' | 'openhub' | 'micopay' | 'raiz' | 'soroban';
  title: string;
  badge: string;
  durationSec: number;
  icon: string;
  color: string;
  headline: string;
  narration: string;
  highlights: string[];
  visualTag: string;
  bgGradient: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 'intro',
    title: '1. Introducción',
    badge: 'Visión General',
    durationSec: 16,
    icon: 'school',
    color: '#032517',
    headline: 'Ecosistema de Innovación Comunitaria en la Mixteca',
    narration:
      'Bienvenidos. El Instituto Tecnológico de Tlaxiaco presenta la infraestructura socio-tecnológica que une a campesinos, artesanos, estudiantes y compradores en un circuito de economía justa, cerrando la brecha con tecnología de frontera.',
    highlights: [
      'Iniciativa del Instituto Tecnológico de Tlaxiaco (TecNM)',
      'Tecnología de frontera para comunidades originarias',
      'Protección contra el despojo y el intermediarismo abusivo'
    ],
    visualTag: '🌿 Mixteca Alta Oaxaqueña',
    bgGradient: 'from-emerald-950 via-[#032517] to-neutral-900'
  },
  {
    id: 'openhub',
    title: '2. Open Hub',
    badge: 'Innovación & TecNM',
    durationSec: 20,
    icon: 'hub',
    color: '#0e7490',
    headline: 'Open Hub: El Centro de Innovación Abierta de Tlaxiaco',
    narration:
      'Open Hub es el nodo de desarrollo tecnológico y vinculación académica del Tec de Tlaxiaco. Aquí los estudiantes de ingeniería programan módulos, validan sensores agrícolas y dan soporte directo a las comunidades. Gracias al protocolo Drips, cada estudiante recibe micro-becas programables al resolver tareas y mantener la plataforma viva por generaciones.',
    highlights: [
      'Nodo de investigación y desarrollo comunitario',
      'Protocolo Drips en Stellar: micro-becas a estudiantes por código y soporte',
      'Laboratorio físico de acopio, análisis de suelo y laboratorio de calidad'
    ],
    visualTag: '🏫 TecNM Campus Tlaxiaco',
    bgGradient: 'from-cyan-950 via-slate-900 to-neutral-900'
  },
  {
    id: 'micopay',
    title: '3. MicoPay',
    badge: 'Billetera & Efectivo',
    durationSec: 22,
    icon: 'account_balance_wallet',
    color: '#b45309',
    headline: 'MicoPay: Pagos Inmediatos, Escrow y Cajero en Parcela',
    narration:
      'MicoPay es el sistema de pagos comunitarios sin volatilidad ni trampas bancarias. Funciona con custodia en Escrow: el comprador deposita con certeza y el dinero se libera al productor al momento de pesar la cosecha. Además, los transportistas locales operan como cajeros móviles, entregando efectivo directamente en la parcela al escanear un código QR.',
    highlights: [
      'Cero volatilidad: Respaldado 1:1 en moneda estable sobre Stellar',
      'Custodia Escrow: El productor sabe que su pago está asegurado antes de entregar',
      'Cajero móvil en parcela: Retiro de efectivo al instante sin bancos lejanos'
    ],
    visualTag: '💳 Liquidez Rural Protegida',
    bgGradient: 'from-amber-950 via-stone-900 to-neutral-900'
  },
  {
    id: 'raiz',
    title: '4. Raíz',
    badge: 'Plataforma & Trazabilidad',
    durationSec: 22,
    icon: 'spa',
    color: '#15803d',
    headline: 'Raíz: Registro Universal, IA y Pasaporte Digital',
    narration:
      'Raíz es la aplicación comunitaria diseñada para todos: permite registrar café, pulque, miel, telar y artesanías por voz en mixteco o español en menos de dos minutos. La inteligencia artificial evalúa la calidad con una foto, y cada lote recibe un Pasaporte Digital inmutable con código QR para venta directa al consumidor final.',
    highlights: [
      'Registro universal por voz en Tu’un Savi y Español (sin contraseñas)',
      'Evaluación fitosanitaria y de calidad por foto con Inteligencia Artificial',
      'Pasaporte Digital con sello criptográfico en Stellar y vitrina de comercio directo'
    ],
    visualTag: '🌱 Pasaporte Digital Inmutable',
    bgGradient: 'from-emerald-950 via-teal-950 to-neutral-900'
  },
  {
    id: 'soroban',
    title: '5. Regalías y Futuro',
    badge: 'Smart Contracts',
    durationSec: 18,
    icon: 'verified',
    color: '#be123c',
    headline: '10% de Regalías Perpetuas para las Creadoras',
    narration:
      'A través de contratos inteligentes Soroban, cada pieza artesanal conserva el 10% de regalías perpetuas para la creadora original en cualquier reventa secundaria en galerías o el extranjero. Con Open Hub, MicoPay y Raíz, el valor de la Mixteca florece y se queda en sus manos.',
    highlights: [
      'Smart contracts en Soroban para protección de artesanía textil y barro',
      '10% automático a la billetera de la artesana en reventas de galerías',
      'Alianza integral comunitaria: TecNM, productores y tecnología libre'
    ],
    visualTag: '💎 Blindaje On-Chain',
    bgGradient: 'from-rose-950 via-neutral-900 to-stone-950'
  }
];

export const ExplainerVideoModal: React.FC<ExplainerVideoModalProps> = ({
  isOpen,
  onClose,
  onNavigateScreen
}) => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackProgress, setPlaybackProgress] = useState<number>(0);
  const [isVoiceMuted, setIsVoiceMuted] = useState<boolean>(false);
  const [voiceSupported, setVoiceSupported] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const activeChapter = CHAPTERS[currentChapterIndex];
  const timerRef = useRef<any>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Check speech synthesis support
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setVoiceSupported(false);
    }
  }, []);

  // Handle Speech narration whenever chapter changes or playback state changes
  useEffect(() => {
    if (!isOpen) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    if (isVoiceMuted || !isPlaying) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(activeChapter.narration);
      utterance.lang = 'es-MX';
      utterance.rate = 0.95 * playbackSpeed;
      utterance.pitch = 1.0;
      utteranceRef.current = utterance;

      try {
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Speech synthesis error:', err);
      }
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isOpen, currentChapterIndex, isPlaying, isVoiceMuted, playbackSpeed]);

  // Tick animation and auto-advancement for chapter
  useEffect(() => {
    if (!isOpen || !isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalMs = 100;
    const stepPercent = (intervalMs / (activeChapter.durationSec * 1000)) * 100 * playbackSpeed;

    timerRef.current = setInterval(() => {
      setPlaybackProgress((prev) => {
        const next = prev + stepPercent;
        if (next >= 100) {
          // Advance to next chapter or loop
          if (currentChapterIndex < CHAPTERS.length - 1) {
            setCurrentChapterIndex((curr) => curr + 1);
            return 0;
          } else {
            // End of video reached
            setIsPlaying(false);
            return 100;
          }
        }
        return next;
      });
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isPlaying, currentChapterIndex, activeChapter.durationSec, playbackSpeed]);

  if (!isOpen) return null;

  const handleSelectChapter = (idx: number) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setCurrentChapterIndex(idx);
    setPlaybackProgress(0);
    setIsPlaying(true);
  };

  const handleTogglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleRestart = () => {
    setCurrentChapterIndex(0);
    setPlaybackProgress(0);
    setIsPlaying(true);
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < CHAPTERS.length - 1) {
      handleSelectChapter(currentChapterIndex + 1);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      handleSelectChapter(currentChapterIndex - 1);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Video explicativo interactivo: Open Hub, MicoPay y Raíz"
    >
      <div className="w-full max-w-2xl bg-neutral-950 rounded-3xl overflow-hidden shadow-2xl border border-white/15 flex flex-col max-h-[95vh] text-white">
        {/* Header Bar */}
        <div className="bg-[#032517] px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">smart_display</span>
            </div>
            <div>
              <h2 className="text-[14px] font-extrabold tracking-tight flex items-center gap-1.5">
                <span>Video Explicativo: Open Hub • MicoPay • Raíz</span>
                <span className="text-[10px] bg-red-600 px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                  HD
                </span>
              </h2>
              <span className="text-[11px] text-emerald-200/80 block">
                Instituto Tecnológico de Tlaxiaco • Mixteca Oaxaqueña
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer text-[14px]"
            title="Cerrar video"
          >
            ✕
          </button>
        </div>

        {/* Cinematic Video Stage (Screen) */}
        <div
          className={`relative w-full aspect-video bg-linear-to-br ${activeChapter.bgGradient} flex flex-col justify-between p-4 sm:p-6 overflow-hidden border-b border-white/10 transition-all duration-700 select-none`}
        >
          {/* Subtle animated background elements */}
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          {/* Top Stage Bar: Badges & Live Status */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-extrabold tracking-wide uppercase border border-white/20 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-emerald-400">
                  {activeChapter.icon}
                </span>
                {activeChapter.badge}
              </span>
              <span className="text-[11px] text-white/70 font-medium hidden sm:inline-block">
                {activeChapter.visualTag}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-white/80 bg-black/40 px-2 py-0.5 rounded-md border border-white/10">
                Capítulo {currentChapterIndex + 1} de {CHAPTERS.length}
              </span>
              {isPlaying && (
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/40">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  REPRODUCIENDO
                </span>
              )}
            </div>
          </div>

          {/* Center Stage: Title, Graphic Card & Bullet Highlights */}
          <div className="relative z-10 my-auto py-2">
            <h3 className="text-[18px] sm:text-[22px] font-black tracking-tight leading-tight text-white mb-2 drop-shadow-md">
              {activeChapter.headline}
            </h3>

            {/* Key Visual Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
              {activeChapter.highlights.map((h, i) => (
                <div
                  key={i}
                  className="bg-black/45 backdrop-blur-sm p-2.5 rounded-xl border border-white/15 shadow-sm flex items-start gap-2"
                >
                  <span className="material-symbols-outlined text-emerald-400 text-[18px] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span className="text-[11px] sm:text-[12px] font-medium leading-snug text-neutral-200">
                    {h}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Stage Subtitles / Narration Banner */}
          <div className="relative z-10 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/15 flex items-center justify-between gap-3">
            <div className="flex items-start gap-2 min-w-0">
              <span className="material-symbols-outlined text-[20px] text-emerald-400 shrink-0 mt-0.5">
                record_voice_over
              </span>
              <p className="text-[12px] sm:text-[13px] text-emerald-100 font-medium leading-snug line-clamp-2">
                "{activeChapter.narration}"
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsVoiceMuted((prev) => !prev)}
              className={`p-2 rounded-xl border shrink-0 transition-colors cursor-pointer ${
                isVoiceMuted
                  ? 'bg-red-500/20 border-red-500/40 text-red-300'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              }`}
              title={isVoiceMuted ? 'Activar voz' : 'Silenciar voz'}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isVoiceMuted ? 'volume_off' : 'volume_up'}
              </span>
            </button>
          </div>
        </div>

        {/* Video Player Controls & Progress Timeline */}
        <div className="bg-neutral-900 p-3 sm:p-4 flex flex-col gap-3">
          {/* Chapter Timeline Progress Bar */}
          <div className="flex items-center gap-1">
            {CHAPTERS.map((ch, idx) => {
              const isPast = idx < currentChapterIndex;
              const isCurrent = idx === currentChapterIndex;
              const barWidth = isPast ? 100 : isCurrent ? playbackProgress : 0;

              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => handleSelectChapter(idx)}
                  className="flex-1 group py-1.5 flex flex-col gap-1 cursor-pointer text-left"
                  title={`Ir a ${ch.title}`}
                >
                  <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 transition-all duration-150 rounded-full"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                  <span
                    className={`text-[9.5px] sm:text-[10px] font-bold truncate ${
                      isCurrent ? 'text-emerald-400 font-black' : 'text-neutral-400 group-hover:text-white'
                    }`}
                  >
                    {ch.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Transport Controls Bar */}
          <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={handlePrevChapter}
                disabled={currentChapterIndex === 0}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 flex items-center justify-center text-white cursor-pointer transition-colors"
                title="Capítulo anterior"
              >
                <span className="material-symbols-outlined text-[20px]">skip_previous</span>
              </button>

              <button
                type="button"
                onClick={handleTogglePlayPause}
                className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-[13px] flex items-center gap-1.5 shadow-lg active:scale-95 transition-all cursor-pointer"
                title={isPlaying ? 'Pausar' : 'Reproducir'}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
                <span>{isPlaying ? 'Pausa' : 'Reproducir'}</span>
              </button>

              <button
                type="button"
                onClick={handleNextChapter}
                disabled={currentChapterIndex === CHAPTERS.length - 1}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 flex items-center justify-center text-white cursor-pointer transition-colors"
                title="Siguiente capítulo"
              >
                <span className="material-symbols-outlined text-[20px]">skip_next</span>
              </button>

              <button
                type="button"
                onClick={handleRestart}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
                title="Reiniciar video"
              >
                <span className="material-symbols-outlined text-[18px]">replay</span>
              </button>
            </div>

            {/* Quick Actions / Navigation shortcuts */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setPlaybackSpeed((s) => (s === 1 ? 1.25 : s === 1.25 ? 0.8 : 1))}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-mono text-emerald-300 font-bold border border-white/10 cursor-pointer"
                title="Cambiar velocidad de reproducción"
              >
                {playbackSpeed}x
              </button>

              {onNavigateScreen && (
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                      window.speechSynthesis.cancel();
                    }
                    onClose();
                    onNavigateScreen('catalogo_producto');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#a73918] hover:bg-[#8c2e12] text-white font-bold text-[12px] flex items-center gap-1 shadow cursor-pointer active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">add_circle</span>
                  <span>Probar Raíz</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer Summary Accordion / Synopsis */}
        <div className="bg-black/70 px-4 py-2.5 text-[11px] text-neutral-400 flex items-center justify-between border-t border-white/5">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Resumen clave:</span>
            <span className="text-neutral-300">
              Open Hub (Innovación TecNM) + MicoPay (Pagos seguros en efectivo) + Raíz (Trazabilidad y Pasaporte Digital)
            </span>
          </div>
          <span className="text-emerald-400 font-semibold shrink-0">Stellar &amp; Soroban</span>
        </div>
      </div>
    </div>
  );
};
