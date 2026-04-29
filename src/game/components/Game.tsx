import { useState, useCallback, useEffect, useMemo } from 'react';
import type { Gol, Opcion, Fase } from '../types';
import { golDelSiglo } from '../data/golDelSiglo';
import { TimingBar } from './TimingBar';
import { DecisionOptions } from './DecisionOptions';
import { GoalCelebration } from './GoalCelebration';
import { GameOver } from './GameOver';

interface GameProps {
  onBackToMenu: () => void;
}

const RESULT_DISPLAY_DURATION = 1800;

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

  // Estados para el primer plano (close-up)
  const [mostrarPrimerPlano, setMostrarPrimerPlano] = useState(false);
  const [infoPrimerPlano, setInfoPrimerPlano] = useState<{ personaje: string; dialogo: string; spriteCloseUp: string } | null>(null);

  const fase: Fase = gol.fases[faseActual];
  const timingActivo = estado === 'decision' && tiempoRestante > 0 && !mostrarPrimerPlano;

  // Mezclar opciones
  const opcionesMezcladas = useMemo(() => {
    if (!fase.opciones) return [];
    const shuffled = [...fase.opciones];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [fase.opciones]);

  // Narrativa corta
  const narrativaCorta = fase.narrativa
    .split(/[.!?]/)
    .map((segmento) => segmento.trim())
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
  }, [faseActual]);

  // Timer global (con pausa si mostrarPrimerPlano es true)
  useEffect(() => {
    if (!timingActivo) return;

    const interval = setInterval(() => {
      setTiempoRestante((prev) => {
        const next = Math.max(0, prev - 100);
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [timingActivo]);

  // Verificar fin del tiempo
  useEffect(() => {
    if (estado === 'decision' && tiempoRestante <= 0 && !mostrarPrimerPlano) {
      setEstado('derrota');
      setMensajeResultado('Se acabó el tiempo. La jugada no se completó.');
    }
  }, [estado, tiempoRestante, mostrarPrimerPlano]);

  const handleOptionSelect = useCallback((opcion: Opcion) => {
    if (!timingActivo) return;

    setOpcionSeleccionada(opcion);
    setEstado('resultado');
    setMensajeDialogo(opcion.dialogo || '');

    if (opcion.correcta) {
      setAnimacionExito(true);
      setMensajeResultado(opcion.descripcionExito || '¡Excelente decisión!');

      // Verificar si la fase actual tiene primerPlano
      if (fase.primerPlano) {
        // Pausar el timer y mostrar el primer plano
        setMostrarPrimerPlano(true);
        setInfoPrimerPlano({
          personaje: fase.primerPlano.personaje,
          dialogo: fase.primerPlano.dialogo,
          spriteCloseUp: fase.primerPlano.spriteCloseUp
        });
        // Programar cierre automático después de 2 segundos (se puede modificar)
        const closeTimer = setTimeout(() => {
          setMostrarPrimerPlano(false);
          setInfoPrimerPlano(null);
          // Después del primer plano, procesar el resultado del acierto
          setTimeout(() => {
            setAnimacionExito(false);
            if (opcion.resultado === 'gol') {
              setEstado('victoria');
            } else {
              setFaseActual((prev) => prev + 1);
              setOpcionSeleccionada(null);
            }
          }, 100);
        }, 2500);
        return () => clearTimeout(closeTimer);
      } else {
        // Sin primer plano, comportamiento normal
        setTimeout(() => {
          setAnimacionExito(false);
          if (opcion.resultado === 'gol') {
            setEstado('victoria');
          } else {
            setFaseActual((prev) => prev + 1);
            setOpcionSeleccionada(null);
          }
        }, RESULT_DISPLAY_DURATION);
      }
    } else {
      setAnimacionFallo(true);
      setMensajeResultado(opcion.descripcionFallo || '¡Mala decisión! Perdiste la pelota.');
      setTimeout(() => {
        setAnimacionFallo(false);
        setEstado('derrota');
      }, 2000);
    }
  }, [timingActivo, fase.primerPlano]);

  const handleRetry = useCallback(() => {
    setFaseActual(0);
    setEstado('decision');
    setMensajeResultado('');
    setMensajeDialogo('');
    setTiempoRestante(gol.tiempoGlobalMaximo);
    setOpcionSeleccionada(null);
    setAnimacionExito(false);
    setAnimacionFallo(false);
    setMostrarPrimerPlano(false);
    setInfoPrimerPlano(null);
  }, [gol.tiempoGlobalMaximo]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-green-800 to-green-900">
      {/* ZONA DEL CAMPO (75% de la altura) */}
      <div className="relative flex-[3] bg-cover bg-center" style={{ backgroundImage: 'url(/sprites/campo_futbol.png)' }}>
        <div className="absolute inset-0 bg-black/20" />

        {animacionExito && (
          <div className="absolute inset-0 bg-green-400/30 animate-pulse pointer-events-none z-20" />
        )}
        {animacionFallo && (
          <div className="absolute inset-0 bg-red-600/40 animate-pulse pointer-events-none z-20" />
        )}

        {/* Sprites del campo */}
        {estado !== 'victoria' && estado !== 'derrota' && !mostrarPrimerPlano && fase.rival && (
          <div className="absolute left-[15%] bottom-[20%] z-10">
            <img
              src={`/sprites/${fase.rival.sprite}.png`}
              alt={fase.rival.nombre}
              onError={(e) => {
                if (e.currentTarget.src.includes("maradona_izq.png")) return;
                e.currentTarget.src = "/sprites/maradona_izq.png";
              }}
              className={`w-24 h-24 md:w-32 md:h-32 object-contain ${
                estado === 'decision' ? 'animate-bounce' : ''
              }`}
              style={{ filter: animacionFallo ? 'brightness(0.5) sepia(1) hue-rotate(-50deg) saturate(5)' : 'none' }}
            />
            <p className="text-center text-white text-xs mt-1 bg-red-900/70 px-2 py-0.5 rounded" style={{ fontFamily: '"Press Start 2P", monospace' }}>
              {fase.rival.nombre}
            </p>
          </div>
        )}

        <div className="absolute right-[15%] bottom-[20%] z-10">
          <img
            src="/sprites/maradona_izq.png"
            alt={gol.autor.nombre}
            onError={(e) => {
              if (e.currentTarget.src.includes("maradona_izq.png")) return;
              e.currentTarget.src = "/sprites/maradona_izq.png";
            }}
            className={`w-28 h-28 md:w-40 md:h-40 object-contain transition-all duration-300 ${
              estado === 'decision' && !mostrarPrimerPlano ? 'animate-pulse' : ''
            } ${animacionExito ? 'scale-110' : ''}`}
            style={{
              filter: animacionExito ? 'drop-shadow(0 0 20px #00ff00)' :
                      animacionFallo ? 'grayscale(0.7) brightness(0.6)' : 'none'
            }}
          />
          <p className="text-center text-white text-xs mt-1 bg-blue-600/70 px-2 py-0.5 rounded" style={{ fontFamily: '"Press Start 2P", monospace' }}>
            {gol.autor.apodo}
          </p>
        </div>

        <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-2 py-1 rounded" style={{ fontFamily: '"Press Start 2P", monospace' }}>
          Fase {faseActual + 1} / {gol.fases.length}
        </div>
        <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded" style={{ fontFamily: '"Press Start 2P", monospace' }}>
          {gol.autor.nombre}
        </div>
      </div>

      {/* ZONA DE UI (25% inferior) */}
      <div className="flex-1 bg-black/80 border-t-4 border-yellow-600 shadow-2xl px-4 py-3 flex flex-col justify-center">
        {estado === 'decision' && !mostrarPrimerPlano && (
          <div className="w-full max-w-4xl mx-auto space-y-3">
            <h3 className="text-yellow-400 text-sm md:text-base text-center" style={{ fontFamily: '"Press Start 2P", monospace' }}>
              {fase.titulo}
            </h3>

            <div className="bg-gray-900/80 border border-gray-600 rounded p-2">
              <p className="text-white text-xs md:text-sm leading-relaxed text-center" style={{ fontFamily: '"Press Start 2P", monospace' }}>
                {narrativaCorta}
              </p>
            </div>

            <TimingBar
              isActive={timingActivo}
              totalTime={gol.tiempoGlobalMaximo}
              remainingTime={tiempoRestante}
            />

            <DecisionOptions
              opciones={opcionesMezcladas}
              onSelect={handleOptionSelect}
              disabled={!!opcionSeleccionada}
              isTimingActive={timingActivo}
            />

            <p className="text-yellow-400 text-[10px] md:text-xs text-center animate-pulse" style={{ fontFamily: '"Press Start 2P", monospace' }}>
              ¡Elige rápido!
            </p>
          </div>
        )}

        {estado === 'resultado' && !mostrarPrimerPlano && (
          <div className="w-full max-w-2xl mx-auto">
            <div className="bg-black/90 border-4 border-white rounded-lg p-4">
              <h3
                className={`text-lg mb-3 text-center ${opcionSeleccionada?.correcta ? 'text-green-400' : 'text-red-400'}`}
                style={{ fontFamily: '"Press Start 2P", monospace', textShadow: '2px 2px 0px #000' }}
              >
                {opcionSeleccionada?.correcta ? '¡BIEN HECHO!' : '¡FALLASTE!'}
              </h3>
              <p className="text-white text-sm leading-relaxed text-center" style={{ fontFamily: '"Press Start 2P", monospace', lineHeight: '1.5', textShadow: '2px 2px 0px #000' }}>
                {mensajeResultado}
              </p>
              {mensajeDialogo && (
                <p className="mt-3 text-center text-cyan-300 text-xs border-t-2 border-cyan-300/40 pt-2 italic" style={{ fontFamily: '"Press Start 2P", monospace', lineHeight: '1.5', textShadow: '2px 2px 0px #000' }}>
                  “{mensajeDialogo}”
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* MODAL / PRIMER PLANO (close-up) */}
      {mostrarPrimerPlano && infoPrimerPlano && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="bg-black border-4 border-yellow-500 rounded-lg p-6 text-center max-w-md w-full">
            {infoPrimerPlano.spriteCloseUp && (
              <img
                src={infoPrimerPlano.spriteCloseUp}
                alt={infoPrimerPlano.personaje}
                className="w-48 h-48 mx-auto object-contain mb-4"
                onError={(e) => {
                  // Si falla el close-up, usar el sprite de campo de Maradona como fallback
                  if (e.currentTarget.src.includes("maradona_izq.png")) return;
                  e.currentTarget.src = "/sprites/maradona_izq.png";
                }}
              />
            )}
            <p className="text-yellow-300 text-lg mb-2" style={{ fontFamily: '"Press Start 2P", monospace' }}>
              {infoPrimerPlano.personaje}
            </p>
            <p className="text-white text-sm italic" style={{ fontFamily: '"Press Start 2P", monospace', lineHeight: '1.5' }}>
              “{infoPrimerPlano.dialogo}”
            </p>
            <button
              onClick={() => {
                setMostrarPrimerPlano(false);
                setInfoPrimerPlano(null);
                // Reanudar la lógica después del primer plano
                setTimeout(() => {
                  setAnimacionExito(false);
                  if (opcionSeleccionada?.resultado === 'gol') {
                    setEstado('victoria');
                  } else {
                    setFaseActual((prev) => prev + 1);
                    setOpcionSeleccionada(null);
                  }
                }, 100);
              }}
              className="mt-4 px-4 py-2 bg-yellow-600 text-black rounded text-xs hover:bg-yellow-500 transition-colors"
              style={{ fontFamily: '"Press Start 2P", monospace' }}
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
