import { useState, useCallback, useEffect, useMemo } from 'react';
import type { Gol, Opcion, Fase } from '../types';
import { golDelSiglo } from '../data/golDelSiglo';
import { TimingBar } from './TimingBar';
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

  // Reset al cambiar de fase
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

  // Avance automático para intro
  useEffect(() => {
    if (esIntroAutomatica && estado === 'decision') {
      const timeout = setTimeout(() => {
        if (faseActual + 1 < gol.fases.length) setFaseActual((prev) => prev + 1);
      }, INTRO_AUTO_DURATION);
      return () => clearTimeout(timeout);
    }
  }, [esIntroAutomatica, estado, faseActual, gol.fases.length]);

  // Iniciar timer global al llegar a fase 2
  useEffect(() => {
    if (!timerIniciado && faseActual >= 2) {
      setTimerIniciado(true);
      setTiempoRestante(gol.tiempoGlobalMaximo);
    }
  }, [faseActual, timerIniciado, gol.tiempoGlobalMaximo]);

  // Timer global
  useEffect(() => {
    if (!timingActivo) return;
    const interval = setInterval(() => {
      setTiempoRestante((prev) => Math.max(0, prev - 100));
    }, 100);
    return () => clearInterval(interval);
  }, [timingActivo]);

  // Derrota por tiempo
  useEffect(() => {
    if (timerIniciado && estado === 'decision' && tiempoRestante <= 0 && !mostrarPrimerPlano) {
      setEstado('derrota');
      setMensajeResultado('Se acabó el tiempo. La jugada no se completó.');
    }
  }, [estado, tiempoRestante, mostrarPrimerPlano, timerIniciado]);

  const handleOptionSelect = useCallback((opcion: Opcion) => {
    if (esIntroAutomatica) return;
    if (faseActual < 2 && !timerIniciado) {
      // permitir selección en fases 0-1 sin timer
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

  const mostrarBarra = timerIniciado && estado === 'decision' && !esIntroAutomatica;

  return (
    <div className="h-screen flex flex-col bg-black font-mono">
      {/* Top bar */}
      <div className="bg-black/80 border-b-4 border-yellow-500 px-4 py-2 flex justify-between items-center text-white text-sm md:text-base z-10">
        <div className="bg-yellow-500 text-black px-3 py-1 rounded font-bold">
          ⚽ Fase {faseActual + 1} / {gol.fases.length}
        </div>
        <div className="bg-blue-700 px-3 py-1 rounded font-bold flex items-center gap-2">
          <span>🇦🇷</span> {gol.autor.apodo} ({gol.autor.nombre})
        </div>
      </div>

      {/* Zona del campo (solo rayas verdes) */}
      <div className="relative flex-grow overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              #2e7d32 0px,
              #2e7d32 40px,
              #388e3c 40px,
              #388e3c 80px
            )`,
          }}
        />
        <div className="absolute inset-0 bg-black/10" />

        {/* Sprites */}
        {!mostrarPrimerPlano && estado !== 'victoria' && estado !== 'derrota' && fase.rival && (
          <div className="absolute left-[15%] bottom-[20%] z-10">
            <img
              src={`/sprites/${fase.rival.sprite}.png`}
              alt={fase.rival.nombre}
              onError={(e) => {
                if (e.currentTarget.src.includes('maradona_izq.png')) return;
                e.currentTarget.src = '/sprites/maradona_izq.png';
              }}
              className={`w-24 h-24 md:w-32 md:h-32 object-contain ${estado === 'decision' ? 'animate-bounce' : ''}`}
            />
            <p className="text-center text-white text-xs mt-1 bg-red-900/70 px-2 py-0.5 rounded inline-block">
              {fase.rival.nombre}
            </p>
          </div>
        )}

        <div className="absolute right-[15%] bottom-[20%] z-10">
          <img
            src="/sprites/maradona_izq.png"
            alt={gol.autor.nombre}
            onError={(e) => {
              if (e.currentTarget.src.includes('maradona_izq.png')) return;
              e.currentTarget.src = '/sprites/maradona_izq.png';
            }}
            className={`w-28 h-28 md:w-40 md:h-40 object-contain transition-all duration-300 ${
              estado === 'decision' && !mostrarPrimerPlano ? 'animate-pulse' : ''
            } ${animacionExito ? 'scale-110' : ''}`}
            style={{
              filter: animacionExito
                ? 'drop-shadow(0 0 20px #00ff00)'
                : animacionFallo
                ? 'grayscale(0.7) brightness(0.6)'
                : 'none',
            }}
          />
          <p className="text-center text-white text-xs mt-1 bg-blue-600/70 px-2 py-0.5 rounded inline-block">
            {gol.autor.apodo}
          </p>
        </div>

        {animacionExito && <div className="absolute inset-0 bg-green-400/30 animate-pulse pointer-events-none z-20" />}
        {animacionFallo && <div className="absolute inset-0 bg-red-600/40 animate-pulse pointer-events-none z-20" />}
      </div>

      {/* Panel de decisiones */}
      <div className="bg-black/90 border-t-4 border-yellow-500 px-4 py-3 flex-shrink-0">
        <div className="max-w-4xl mx-auto text-white">
          {estado === 'decision' && !mostrarPrimerPlano && !esIntroAutomatica && (
            <p className="text-center text-sm md:text-base mb-3 leading-relaxed">{narrativaCorta}</p>
          )}

          {estado === 'decision' && !mostrarPrimerPlano && !esIntroAutomatica && (
            <>
              <div className="grid grid-cols-2 gap-3 mb-3">
                {opcionesMezcladas.map((opcion, idx) => {
                  const letra = String.fromCharCode(65 + idx);
                  return (
                    <button
                      key={opcion.id}
                      onClick={() => handleOptionSelect(opcion)}
                      disabled={!!opcionSeleccionada}
                      className="bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-lg border-2 border-yellow-400 transition-all active:scale-95 text-left flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="bg-yellow-500 text-black w-8 h-8 rounded-full flex items-center justify-center font-black text-lg">
                        {letra}
                      </span>
                      <span className="text-sm md:text-base">{opcion.texto}</span>
                    </button>
                  );
                })}
              </div>

              {mostrarBarra && (
                <div className="mt-2">
                  <TimingBar isActive={timingActivo} totalTime={gol.tiempoGlobalMaximo} remainingTime={tiempoRestante} />
                </div>
              )}

              <p className="text-center text-yellow-400 text-xs md:text-sm mt-3 animate-pulse">⏱️ ¡Elige rápido!</p>
            </>
          )}

          {estado === 'resultado' && !mostrarPrimerPlano && (
            <div className="bg-black/80 border-4 border-white rounded-lg p-4 text-center">
              <h3 className={`text-lg mb-2 ${opcionSeleccionada?.correcta ? 'text-green-400' : 'text-red-400'}`}>
                {opcionSeleccionada?.correcta ? '¡BIEN HECHO!' : '¡FALLASTE!'}
              </h3>
              <p className="text-sm">{mensajeResultado}</p>
              {mensajeDialogo && <p className="mt-2 text-cyan-300 text-xs italic">“{mensajeDialogo}”</p>}
            </div>
          )}
        </div>
      </div>

      {/* Modal de primer plano */}
      {mostrarPrimerPlano && infoPrimerPlano && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90">
          <div className="bg-black border-4 border-yellow-500 rounded-lg p-6 text-center max-w-md w-full mx-4">
            <img
              src={infoPrimerPlano.spriteCloseUp}
              alt={infoPrimerPlano.personaje}
              className="w-48 h-48 mx-auto object-contain mb-4"
              onError={(e) => {
                e.currentTarget.src = '/sprites/maradona_izq.png';
              }}
            />
            <p className="text-yellow-300 text-lg mb-2">{infoPrimerPlano.personaje}</p>
            <p className="text-white text-sm italic">“{infoPrimerPlano.dialogo}”</p>
            <button
              onClick={cerrarPrimerPlano}
              className="mt-4 px-4 py-2 bg-yellow-600 text-black rounded text-xs hover:bg-yellow-500"
            >
              CONTINUAR
            </button>
          </div>
        </div>
      )}

      {estado === 'victoria' && (
        <GoalCelebration
          titulo={gol.titulo}
          subtitulo={`${gol.autor.nombre} - ${gol.partido}`}
          onContinue={handleRetry}
        />
      )}
      {estado === 'derrota' && (
        <GameOver
          razon={mensajeResultado}
          faseAlcanzada={faseActual}
          totalFases={gol.fases.length}
          onRetry={handleRetry}
          onMenu={onBackToMenu}
        />
      )}
    </div>
  );
}
