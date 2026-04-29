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

export function Game({ onBackToMenu }: GameProps) {
  const [gol] = useState<Gol>(golDelSiglo);
  const [faseActual, setFaseActual] = useState(0);
  const [estado, setEstado] = useState<'decision' | 'resultado' | 'victoria' | 'derrota'>('decision');
  const [mensajeResultado, setMensajeResultado] = useState('');
  const [timingActivo, setTimingActivo] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<Opcion | null>(null);
  const [animacionExito, setAnimacionExito] = useState(false);
  const [animacionFallo, setAnimacionFallo] = useState(false);

  const fase: Fase = gol.fases[faseActual];

  // Mezclar las opciones en cada fase (para que la correcta no sea siempre la primera)
  const opcionesMezcladas = useMemo(() => {
    if (!fase.opciones) return [];
    const shuffled = [...fase.opciones];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [fase.opciones]);

  // Narrativa corta (primera oración)
  const narrativaCorta = fase.narrativa
    .split(/[.!?]/)
    .map((segmento) => segmento.trim())
    .find(Boolean) || fase.narrativa;

  // Iniciar la fase
  useEffect(() => {
    setEstado('decision');
    setOpcionSeleccionada(null);
    setMensajeResultado('');
    setAnimacionExito(false);
    setAnimacionFallo(false);
    const timingTimeout = setTimeout(() => {
      setTimingActivo(true);
    }, 500);
    return () => clearTimeout(timingTimeout);
  }, [faseActual]);

  const handleTimingComplete = useCallback(() => {
    if (estado === 'decision' && !opcionSeleccionada) {
      setEstado('derrota');
      setMensajeResultado('¡Se acabó el tiempo! La defensa recuperó la pelota.');
    }
  }, [estado, opcionSeleccionada]);

  const handleOptionSelect = useCallback((opcion: Opcion) => {
    if (!timingActivo) return;

    setOpcionSeleccionada(opcion);
    setTimingActivo(false);
    setEstado('resultado');

    if (opcion.correcta) {
      setAnimacionExito(true);
      setMensajeResultado(opcion.descripcionExito || '¡Excelente decisión!');

      setTimeout(() => {
        setAnimacionExito(false);
        if (opcion.resultado === 'gol') {
          setEstado('victoria');
        } else {
          setFaseActual(prev => prev + 1);
          setOpcionSeleccionada(null);
        }
      }, 2500);
    } else {
      setAnimacionFallo(true);
      setMensajeResultado(opcion.descripcionFallo || '¡Mala decisión! Perdiste la pelota.');
      setTimeout(() => {
        setAnimacionFallo(false);
        setEstado('derrota');
      }, 2000);
    }
  }, [timingActivo]);

  const handleRetry = useCallback(() => {
    setFaseActual(0);
    setEstado('decision');
    setMensajeResultado('');
    setTimingActivo(true);
    setOpcionSeleccionada(null);
    setAnimacionExito(false);
    setAnimacionFallo(false);
  }, []);

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

        {/* SPRITES dentro del campo */}
        {estado !== 'victoria' && estado !== 'derrota' && fase.rival && (
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
            <p
              className="text-center text-white text-xs mt-1 bg-red-900/70 px-2 py-0.5 rounded"
              style={{ fontFamily: '"Press Start 2P", monospace' }}
            >
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
              estado === 'decision' ? 'animate-pulse' : ''
            } ${animacionExito ? 'scale-110' : ''}`}
            style={{
              filter: animacionExito ? 'drop-shadow(0 0 20px #00ff00)' :
                      animacionFallo ? 'grayscale(0.7) brightness(0.6)' : 'none'
            }}
          />
          <p
            className="text-center text-white text-xs mt-1 bg-blue-600/70 px-2 py-0.5 rounded"
            style={{ fontFamily: '"Press Start 2P", monospace' }}
          >
            {gol.autor.apodo}
          </p>
        </div>

        <div
          className="absolute top-4 left-4 bg-black/60 text-white text-xs px-2 py-1 rounded"
          style={{ fontFamily: '"Press Start 2P", monospace' }}
        >
          Fase {faseActual + 1} / {gol.fases.length}
        </div>
        <div
          className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded"
          style={{ fontFamily: '"Press Start 2P", monospace' }}
        >
          {gol.autor.nombre}
        </div>
      </div>

      {/* ZONA DE UI (25% inferior) */}
      <div className="flex-1 bg-black/80 border-t-4 border-yellow-600 shadow-2xl px-4 py-3 flex flex-col justify-center">
        {estado === 'decision' && (
          <div className="w-full max-w-4xl mx-auto space-y-3">
            <h3
              className="text-yellow-400 text-sm md:text-base text-center"
              style={{ fontFamily: '"Press Start 2P", monospace' }}
            >
              {fase.titulo}
            </h3>

            <div className="bg-gray-900/80 border border-gray-600 rounded p-2">
              <p
                className="text-white text-xs md:text-sm leading-relaxed text-center"
                style={{ fontFamily: '"Press Start 2P", monospace' }}
              >
                {narrativaCorta}
              </p>
            </div>

            <TimingBar
              isActive={timingActivo}
              duration={fase.tiempoLimite}
              timingWindow={fase.timingWindow}
              onComplete={handleTimingComplete}
            />

            <DecisionOptions
              opciones={opcionesMezcladas}
              onSelect={handleOptionSelect}
              disabled={!!opcionSeleccionada}
              isTimingActive={timingActivo}
            />

            <p
              className="text-yellow-400 text-[10px] md:text-xs text-center animate-pulse"
              style={{ fontFamily: '"Press Start 2P", monospace' }}
            >
              ¡Elige rápido!
            </p>
          </div>
        )}

        {estado === 'resultado' && (
          <div className="w-full max-w-2xl mx-auto">
            <div className="bg-black/90 border-4 border-white rounded-lg p-4">
              <h3
                className={`text-lg mb-3 text-center ${opcionSeleccionada?.correcta ? 'text-green-400' : 'text-red-400'}`}
                style={{
                  fontFamily: '"Press Start 2P", monospace',
                  textShadow: '3px 3px 0px #000'
                }}
              >
                {opcionSeleccionada?.correcta ? '¡BIEN HECHO!' : '¡FALLASTE!'}
              </h3>
              <p
                className="text-white text-sm leading-relaxed text-center"
                style={{
                  fontFamily: '"Press Start 2P", monospace',
                  lineHeight: '1.6',
                  textShadow: '2px 2px 0px #000'
                }}
              >
                {mensajeResultado}
              </p>
            </div>
          </div>
        )}
      </div>

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
