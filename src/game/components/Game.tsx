import { useState, useCallback, useEffect, useMemo } from 'react';
import type { Gol, Opcion, Fase } from '../types';
import { golDelSiglo } from '../data/golDelSiglo';
import { TimingBar } from './TimingBar';
import { DecisionOptions } from './DecisionOptions';
import { NarrativeDisplay } from './NarrativeDisplay';
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

  const fase: Fase = gol.fases[faseActual];
  const [spritesListos, setSpritesListos] = useState(true);
  const timingActivo = estado === 'decision' && tiempoRestante > 0;

  const opcionesMezcladas = useMemo(() => {
    if (!fase.opciones) return [];
    const shuffled = [...fase.opciones];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [fase.opciones]);

  useEffect(() => {
    setEstado('decision');
    setOpcionSeleccionada(null);
    setMensajeResultado('');
    setMensajeDialogo('');
    setAnimacionExito(false);
    setAnimacionFallo(false);
    setSpritesListos(true);
  }, [faseActual]);

  useEffect(() => {
    if (estado !== 'decision' || tiempoRestante <= 0) return;

    const interval = setInterval(() => {
      setTiempoRestante((prev: number) => {
        const next = Math.max(0, prev - 100);
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [estado, tiempoRestante]);

  useEffect(() => {
    if (estado === 'decision' && tiempoRestante <= 0) {
      setEstado('derrota');
      setMensajeResultado('Se acabó el tiempo. La jugada no se completó.');
    }
  }, [estado, tiempoRestante]);

  const handleOptionSelect = useCallback((opcion: Opcion) => {
    if (!timingActivo) return;

    setOpcionSeleccionada(opcion);
    setEstado('resultado');
    setMensajeDialogo(opcion.dialogo || '');

    if (opcion.correcta) {
      setAnimacionExito(true);
      setMensajeResultado(opcion.descripcionExito || '¡Excelente decision!');

      setTimeout(() => {
        setAnimacionExito(false);
        if (opcion.resultado === 'gol') {
          setEstado('victoria');
        } else {
          setFaseActual((prev) => prev + 1);
          setOpcionSeleccionada(null);
        }
      }, RESULT_DISPLAY_DURATION);
    } else {
      setAnimacionFallo(true);
      setMensajeResultado(opcion.descripcionFallo || '¡Mala decision! Perdiste la pelota.');
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
    setMensajeDialogo('');
    setTiempoRestante(gol.tiempoGlobalMaximo);
    setOpcionSeleccionada(null);
    setAnimacionExito(false);
    setAnimacionFallo(false);
  }, [gol.tiempoGlobalMaximo]);

  const narrativaCorta =
    fase.narrativa
      .split(/[.!?]/)
      .map((segmento) => segmento.trim())
      .find(Boolean) || fase.narrativa;

  return (
    <div className="h-screen flex flex-col bg-black overflow-hidden">
      <div className="relative flex-[3] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/sprites/campo_futbol.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/45" />

        <div className="absolute top-0 left-0 right-0 z-20 bg-black/55 border-b-2 border-white/60 px-4 py-2">
          <div className="flex justify-between items-center text-white">
            <div>
              <h1 className="text-sm md:text-base text-yellow-300" style={{ fontFamily: '"Press Start 2P", monospace' }}>
                {gol.titulo}
              </h1>
              <p className="text-[10px] md:text-xs text-gray-300 mt-1" style={{ fontFamily: '"Press Start 2P", monospace' }}>
                {gol.partido}
              </p>
            </div>
            <p className="text-[10px] md:text-xs text-right" style={{ fontFamily: '"Press Start 2P", monospace' }}>
              Fase {faseActual + 1}/{gol.fases.length}
            </p>
          </div>
        </div>

        {animacionExito && <div className="absolute inset-0 bg-green-400/30 animate-pulse z-10 pointer-events-none" />}
        {animacionFallo && <div className="absolute inset-0 bg-red-600/40 animate-pulse z-10 pointer-events-none" />}

        <div className="absolute inset-0 z-20">
          {spritesListos && fase.rival && estado !== 'victoria' && estado !== 'derrota' && (
            <div className="absolute left-[22%] bottom-8 md:bottom-10 transform -translate-x-1/2 text-center">
              <img
                src={`/sprites/${fase.rival.sprite}.png`}
                alt={fase.rival.nombre}
                onError={(e) => {
                  if (e.currentTarget.src.includes('maradona_izq.png')) return;
                  e.currentTarget.src = '/sprites/maradona_izq.png';
                }}
                className={`w-36 h-36 md:w-48 md:h-48 object-contain ${
                  estado === 'decision' && spritesListos ? 'animate-bounce' : ''
                }`}
                style={{
                  filter: animacionFallo ? 'brightness(0.5) sepia(1) hue-rotate(-50deg) saturate(5)' : 'none'
                }}
              />
              <p className="text-white text-[10px] md:text-xs mt-1 bg-red-900/70 px-2 py-0.5 rounded inline-block" style={{ fontFamily: '"Press Start 2P", monospace' }}>
                {fase.rival.nombre}
              </p>
            </div>
          )}

          <div className="absolute left-[78%] bottom-8 md:bottom-10 transform -translate-x-1/2 text-center">
            <img
              src="/sprites/maradona_izq.png"
              alt={gol.autor.nombre}
              onError={(e) => {
                if (e.currentTarget.src.includes('maradona_izq.png')) return;
                e.currentTarget.src = '/sprites/maradona_izq.png';
              }}
              className={`w-40 h-40 md:w-56 md:h-56 object-contain transition-all duration-300 ${
                estado === 'decision' && spritesListos ? 'animate-pulse' : ''
              } ${animacionExito ? 'scale-110' : ''}`}
              style={{
                filter: animacionExito
                  ? 'drop-shadow(0 0 20px #00ff00)'
                  : animacionFallo
                    ? 'grayscale(0.7) brightness(0.6)'
                    : 'none'
              }}
            />
            <p className="text-white text-[10px] md:text-xs mt-1 bg-blue-600/70 px-2 py-0.5 rounded inline-block" style={{ fontFamily: '"Press Start 2P", monospace' }}>
              {gol.autor.apodo}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-[1] bg-black/95 border-t-4 border-white px-3 py-3 md:px-4 md:py-4 overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto space-y-3">
          <NarrativeDisplay texto={`${narrativaCorta}.`} titulo={fase.titulo} />

          {estado === 'decision' && spritesListos && (
            <div className="space-y-3">
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
            </div>
          )}

          {estado === 'resultado' && (
            <div className="bg-black/80 border-4 border-white rounded-lg p-3">
              <h3
                className={`text-sm mb-2 text-center ${opcionSeleccionada?.correcta ? 'text-green-400' : 'text-red-400'}`}
                style={{
                  fontFamily: '"Press Start 2P", monospace',
                  textShadow: '2px 2px 0px #000'
                }}
              >
                {opcionSeleccionada?.correcta ? '¡BIEN HECHO!' : '¡FALLASTE!'}
              </h3>
              <p
                className="text-white text-xs text-center"
                style={{
                  fontFamily: '"Press Start 2P", monospace',
                  lineHeight: '1.5',
                  textShadow: '2px 2px 0px #000'
                }}
              >
                {mensajeResultado}
              </p>
              {mensajeDialogo && (
                <p
                  className="mt-3 text-center text-cyan-300 text-xs border-t-2 border-cyan-300/40 pt-2 italic"
                  style={{
                    fontFamily: '"Press Start 2P", monospace',
                    lineHeight: '1.5',
                    textShadow: '2px 2px 0px #000'
                  }}
                >
                  “{mensajeDialogo}”
                </p>
              )}
            </div>
          )}
        </div>
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
