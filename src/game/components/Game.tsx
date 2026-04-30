import { useState, useCallback, useEffect, useMemo } from 'react';
import type { Gol, Opcion, Fase } from '../types';
import { golDelSiglo } from '../data/golDelSiglo';
import { GoalCelebration } from './GoalCelebration';
import { GameOver } from './GameOver';

interface GameProps {
  onBackToMenu: () => void;
}

const RESULT_DISPLAY_DURATION = 1800;
const INTRO_AUTO_DURATION = 2500;

export function Game({ onBackToMenu }: GameProps) {
  const [gol] = useState<Gol>(golDelSiglo);
  const [faseActual, setFaseActual] = useState(0);
  const [estado, setEstado] = useState<'decision' | 'resultado' | 'victoria' | 'derrota'>('decision');
  const [mensajeResultado, setMensajeResultado] = useState('');
  const [mensajeDialogo, setMensajeDialogo] = useState('');
  const [tiempoRestante, setTiempoRestante] = useState(gol.tiempoGlobalMaximo);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<Opcion | null>(null);
  const [animacionExito, setAnimacionExito] = useState(false);
  const [animacionFallo, setAnimacionFallo] = useState(false);
  const [mostrarPrimerPlano, setMostrarPrimerPlano] = useState(false);
  const [infoPrimerPlano, setInfoPrimerPlano] = useState<{ personaje: string; dialogo: string; spriteCloseUp: string } | null>(null);
  const [timerIniciado, setTimerIniciado] = useState(false);
  const [esFallo, setEsFallo] = useState(false);

  const fase: Fase = gol.fases[faseActual];
  const timingActivo = timerIniciado && estado === 'decision' && tiempoRestante > 0 && !mostrarPrimerPlano;
  const esIntroAutomatica = fase.tipo === 'intro' && (!fase.opciones || fase.opciones.length === 0);

  const opcionesMezcladas = useMemo(() => {
    if (fase.tipo !== 'decision' || !fase.opciones) return [];
    const shuffled = [...fase.opciones];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [fase.opciones, fase.tipo]);

  const narrativaCorta = fase.narrativa
    .split(/[.!?]/)
    .map((s) => s.trim())
    .find(Boolean) || fase.narrativa;

  useEffect(() => {
    setEstado('decision');
    setOpcionSeleccionada(null);
    setMensajeResultado('');
    setMensajeDialogo('');
    setAnimacionExito(false);
    setAnimacionFallo(false);
    setMostrarPrimerPlano(false);
    setInfoPrimerPlano(null);
    setEsFallo(false);
  }, [faseActual]);

  useEffect(() => {
    if (esIntroAutomatica && estado === 'decision') {
      const timeout = setTimeout(() => {
        if (faseActual + 1 < gol.fases.length) setFaseActual((prev) => prev + 1);
      }, INTRO_AUTO_DURATION);
      return () => clearTimeout(timeout);
    }
  }, [esIntroAutomatica, estado, faseActual, gol.fases.length]);

  useEffect(() => {
    if (!timerIniciado && faseActual >= 2) {
      setTimerIniciado(true);
      setTiempoRestante(gol.tiempoGlobalMaximo);
    }
  }, [faseActual, timerIniciado, gol.tiempoGlobalMaximo]);

  useEffect(() => {
    if (!timingActivo) return;
    const interval = setInterval(() => {
      setTiempoRestante((prev) => Math.max(0, prev - 100));
    }, 100);
    return () => clearInterval(interval);
  }, [timingActivo]);

  useEffect(() => {
    if (timerIniciado && estado === 'decision' && tiempoRestante <= 0 && !mostrarPrimerPlano) {
      setEstado('derrota');
      setMensajeResultado('Se acabó el tiempo. La jugada no se completó.');
    }
  }, [estado, tiempoRestante, mostrarPrimerPlano, timerIniciado]);

  const handleOptionSelect = useCallback((opcion: Opcion) => {
    if (esIntroAutomatica) return;
    if (faseActual < 2 && !timerIniciado) {
      // permitir
    } else if (!timingActivo) return;

    setOpcionSeleccionada(opcion);
    setEstado('resultado');
    setMensajeDialogo(opcion.dialogo || '');

    if (opcion.correcta) {
      setAnimacionExito(true);
      setMensajeResultado(opcion.descripcionExito || '¡Excelente decisión!');
      if (fase.primerPlano) {
        setMostrarPrimerPlano(true);
        setInfoPrimerPlano(fase.primerPlano);
        setEsFallo(false);
      } else {
        setTimeout(() => {
          setAnimacionExito(false);
          if (opcion.resultado === 'gol') setEstado('victoria');
          else setFaseActual((prev) => prev + 1);
          setOpcionSeleccionada(null);
        }, RESULT_DISPLAY_DURATION);
      }
    } else {
      setAnimacionFallo(true);
      setMensajeResultado(opcion.descripcionFallo || '¡Mala decisión! Perdiste la pelota.');
      if (opcion.primerPlanoFallo) {
        setMostrarPrimerPlano(true);
        setInfoPrimerPlano(opcion.primerPlanoFallo);
        setEsFallo(true);
      } else {
        setTimeout(() => {
          setAnimacionFallo(false);
          setEstado('derrota');
        }, 2000);
      }
    }
  }, [esIntroAutomatica, faseActual, timerIniciado, timingActivo, fase.primerPlano]);

  const handleRetry = useCallback(() => {
    setFaseActual(0);
    setEstado('decision');
    setMensajeResultado('');
    setMensajeDialogo('');
    setTiempoRestante(gol.tiempoGlobalMaximo);
    setTimerIniciado(false);
    setOpcionSeleccionada(null);
    setAnimacionExito(false);
    setAnimacionFallo(false);
    setMostrarPrimerPlano(false);
    setInfoPrimerPlano(null);
    setEsFallo(false);
  }, [gol.tiempoGlobalMaximo]);

  const cerrarPrimerPlano = () => {
    setMostrarPrimerPlano(false);
    setInfoPrimerPlano(null);
    setAnimacionExito(false);
    setAnimacionFallo(false);
    if (esFallo) {
      setEstado('derrota');
    } else {
      if (opcionSeleccionada?.resultado === 'gol') {
        setEstado('victoria');
      } else {
        setFaseActual((prev) => prev + 1);
        setOpcionSeleccionada(null);
      }
    }
  };

  const segundos = Math.ceil(tiempoRestante / 1000);

  // Placeholder narrativo (repetido 8 veces como en tu collage)
  const textoPlaceholder = narrativaCorta || "1, hacia la derecha, donde está Diego Maradona";

  return (
    <div className="h-screen bg-[#0a0c12] font-['VT323','Courier New',monospace]">
      {/* DOS COLUMNAS: izquierda (texto) y derecha (sprites, timer, opciones) */}
      <div className="flex h-full">
        {/* COLUMNA IZQUIERDA: bloque de diálogo */}
        <div className="w-1/2 bg-[#0f1120] border-r-2 border-[#c0c0c0] flex flex-col p-4">
          {/* Fase y nombre del rival arriba */}
          <div className="bg-[#1a1c2a] border border-[#c0c0c0] px-3 py-1 mb-4 flex justify-between text-[#e0e0e0] text-sm">
            <span>FASE {faseActual+1}/{gol.fases.length}</span>
            <span>{fase.rival?.nombre || 'ARGENTINA'}</span>
          </div>
          {/* Texto narrativo (repetido para simular el collage) */}
          <div className="flex-1 overflow-y-auto text-[#d0d0e0] text-sm leading-relaxed space-y-2">
            {Array(10).fill(textoPlaceholder).map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
        </div>

        {/* COLUMNA DERECHA: recuadro de sprites, timer, opciones */}
        <div className="w-1/2 bg-[#0f1120] p-4 flex flex-col">
          {/* Recuadro de sprites */}
          <div className="bg-[#1a1c2a] border-2 border-[#c0c0c0] flex-grow flex items-center justify-center relative min-h-[200px]">
            {!mostrarPrimerPlano && estado !== 'victoria' && estado !== 'derrota' && (
              <div className="flex items-center justify-center gap-8">
                {fase.rival && (
                  <div className="text-center">
                    <img
                      src={`/sprites/${fase.rival.sprite}.png`}
                      alt={fase.rival.nombre}
                      onError={(e) => { if (!e.currentTarget.src.includes('maradona_izq.png')) e.currentTarget.src = '/sprites/maradona_izq.png'; }}
                      className="w-28 h-28 md:w-36 md:h-36 object-contain pixelated"
                    />
                    <div className="bg-black border border-[#c0c0c0] text-white text-xs px-1 mt-1">{fase.rival.nombre}</div>
                  </div>
                )}
                <div className="text-center">
                  <img
                    src="/sprites/maradona_izq.png"
                    alt={gol.autor.nombre}
                    onError={(e) => { if (!e.currentTarget.src.includes('maradona_izq.png')) e.currentTarget.src = '/sprites/maradona_izq.png'; }}
                    className="w-32 h-32 md:w-44 md:h-44 object-contain pixelated"
                  />
                  <div className="bg-black border border-[#c0c0c0] text-white text-xs px-1 mt-1">{gol.autor.apodo}</div>
                </div>
              </div>
            )}
            {animacionExito && <div className="absolute inset-0 bg-green-500/20 animate-pulse pointer-events-none" />}
            {animacionFallo && <div className="absolute inset-0 bg-red-600/20 animate-pulse pointer-events-none" />}
          </div>

          {/* Timer */}
          <div className="mt-4 text-center">
            <div className="text-4xl md:text-5xl text-white font-bold">{segundos}s</div>
            <div className="text-[#f7d44a] text-xl md:text-2xl animate-pulse">¡DECIDE!</div>
          </div>

          {/* Opciones */}
          {estado === 'decision' && !mostrarPrimerPlano && !esIntroAutomatica && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              {opcionesMezcladas.map((opcion, idx) => {
                const letra = String.fromCharCode(65 + idx);
                return (
                  <button
                    key={opcion.id}
                    onClick={() => handleOptionSelect(opcion)}
                    disabled={!!opcionSeleccionada}
                    className="bg-[#1a1c2a] border-2 border-[#c0c0c0] text-[#d0d0e0] text-left px-3 py-2 hover:bg-[#2a2c3a] active:scale-95 transition-all disabled:opacity-50 flex items-center gap-3 text-sm"
                  >
                    <span className="bg-[#c0c0c0] text-[#0a0c12] font-bold w-6 h-6 flex items-center justify-center">
                      {letra}
                    </span>
                    <span>{opcion.texto}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Resultado */}
          {estado === 'resultado' && !mostrarPrimerPlano && (
            <div className="mt-4 bg-[#1a1c2a] border-2 border-[#c0c0c0] p-3 text-center">
              <div className={`font-bold ${opcionSeleccionada?.correcta ? 'text-[#80e0a0]' : 'text-[#e08080]'}`}>
                {opcionSeleccionada?.correcta ? '✓ ¡BIEN HECHO!' : '✗ ¡FALLASTE!'}
              </div>
              <div className="text-[#d0d0e0] text-sm mt-1">{mensajeResultado}</div>
              {mensajeDialogo && <div className="text-[#f7d44a] text-xs mt-1 italic">“{mensajeDialogo}”</div>}
            </div>
          )}
        </div>
      </div>

      {/* Modal primer plano (igual) */}
      {mostrarPrimerPlano && infoPrimerPlano && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0c12]/90">
          <div className="bg-[#1a1c2a] border-2 border-[#c0c0c0] p-4 text-center max-w-sm w-full mx-4">
            <img src={infoPrimerPlano.spriteCloseUp} alt={infoPrimerPlano.personaje} className="w-40 h-40 mx-auto object-contain mb-2 pixelated" />
            <div className="text-[#f7d44a] text-lg mb-1">{infoPrimerPlano.personaje}</div>
            <div className="text-[#d0d0e0] text-sm italic">“{infoPrimerPlano.dialogo}”</div>
            <button onClick={cerrarPrimerPlano} className="mt-3 px-4 py-1 bg-[#c0c0c0] text-[#0a0c12] text-sm border border-[#808080] hover:bg-[#d0d0d0]">
              CONTINUAR
            </button>
          </div>
        </div>
      )}

      {estado === 'victoria' && <GoalCelebration titulo={gol.titulo} subtitulo={`${gol.autor.nombre} - ${gol.partido}`} onContinue={handleRetry} />}
      {estado === 'derrota' && <GameOver razon={mensajeResultado} faseAlcanzada={faseActual} totalFases={gol.fases.length} onRetry={handleRetry} onMenu={onBackToMenu} />}
    </div>
  );
}
