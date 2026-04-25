import { useState, useCallback, useEffect } from 'react';
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
  const [spritesListos, setSpritesListos] = useState(true);

  // Iniciar la fase - se ejecuta cada vez que cambia la fase
  useEffect(() => {
    setEstado('decision');
    setOpcionSeleccionada(null);
    setMensajeResultado('');
    setAnimacionExito(false);
    setAnimacionFallo(false);
    setSpritesListos(true);

    // Activar timing después de un pequeño delay para permitir que el usuario vea la pantalla
    const timingTimeout = setTimeout(() => {
      setTimingActivo(true);
    }, 500);

    return () => clearTimeout(timingTimeout);
  }, [faseActual]);


  const handleTimingComplete = useCallback(() => {
    if (estado === 'decision' && !opcionSeleccionada) {
      setEstado('derrota');
      setMensajeResultado('¡Se acabo el tiempo! La defensa recupero la pelota.');
    }
  }, [estado, opcionSeleccionada]);

  // Manejar seleccion de opcion
  const handleOptionSelect = useCallback((opcion: Opcion) => {
    if (!timingActivo) return;
    
    setOpcionSeleccionada(opcion);
    setTimingActivo(false);
    setEstado('resultado');

    if (opcion.correcta) {
      setAnimacionExito(true);
      setMensajeResultado(opcion.descripcionExito || '¡Excelente decision!');
      
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
      setMensajeResultado(opcion.descripcionFallo || '¡Mala decision! Perdiste la pelota.');
      setTimeout(() => {
        setAnimacionFallo(false);
        setEstado('derrota');
      }, 2000);
    }
  }, [timingActivo]);

  // Reiniciar el juego
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
    <div className="h-screen bg-gradient-to-b from-green-800 to-green-900 relative overflow-hidden flex flex-col">
      {/* Fondo del campo */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(/sprites/campo_futbol.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Header con info del partido */}
      <div className="relative z-10 bg-black/70 border-b-2 border-white px-4 py-2 flex-shrink-0">
        <div className="max-w-full flex justify-between items-center">
          <div className="text-white">
            <h1 
              className="text-lg md:text-xl font-bold text-yellow-400"
              style={{ fontFamily: '"Press Start 2P", monospace' }}
            >
              {gol.titulo}
            </h1>
            <p 
              className="text-xs text-gray-300 mt-0.5"
              style={{ fontFamily: '"Press Start 2P", monospace' }}
            >
              {gol.partido}
            </p>
          </div>
          <div 
            className="text-white text-right"
            style={{ fontFamily: '"Press Start 2P", monospace' }}
          >
            <p className="text-xs">Fase {faseActual + 1} / {gol.fases.length}</p>
            <p className="text-xs text-gray-400 mt-0.5">{gol.autor.nombre}</p>
          </div>
        </div>
      </div>

      {/* Area principal del juego - flex para distribuir espacio */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-between overflow-hidden p-3">
        
        {/* Sprites de personajes - RIVAL IZQUIERDA, MARADONA DERECHA (enfrentados) */}
        <div className="flex justify-center items-end gap-12 md:gap-16 flex-shrink-0">
          {/* Efecto de flash en exito */}
          {animacionExito && (
            <div className="absolute inset-0 bg-green-400/30 animate-pulse z-20 pointer-events-none" />
          )}
          {/* Efecto de flash en fallo */}
          {animacionFallo && (
            <div className="absolute inset-0 bg-red-600/40 animate-pulse z-20 pointer-events-none" />
          )}

          {/* Rival (izquierda) - solo si sprites están listos */}
          {spritesListos && fase.rival && estado !== 'victoria' && estado !== 'derrota' && (
            <div className="relative">
              <img 
                src={`/sprites/${fase.rival.sprite}.png`}
                alt={fase.rival.nombre}
                className={`w-24 h-24 md:w-32 md:h-32 object-contain ${estado === 'decision' && spritesListos ? 'animate-bounce' : ''}`}
                style={{ 
                  filter: animacionFallo ? 'brightness(0.5) sepia(1) hue-rotate(-50deg) saturate(5)' : 'none'
                }}
              />
              <p 
                className="text-center text-white text-xs mt-1 bg-red-900/70 px-2 py-0.5 rounded"
                style={{ fontFamily: '"Press Start 2P", monospace' }}
              >
                {fase.rival.nombre}
              </p>
            </div>
          )}

          {/* Jugador protagonista (derecha) - Maradona mirando a la izquierda */}
          <div className="relative">
            <img 
              src="/sprites/maradona_izq.png" 
              alt={gol.autor.nombre}
              className={`w-28 h-28 md:w-40 md:h-40 object-contain transition-all duration-300 ${
                estado === 'decision' && spritesListos ? 'animate-pulse' : ''
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
        </div>

        {/* Narrativa + Barra de timing + Opciones - TODO JUNTO */}
        {estado === 'decision' && spritesListos && (
          <div className="w-full max-w-2xl space-y-3 flex-1 flex flex-col items-center justify-center overflow-hidden px-2">
            {/* Texto de la narrativa completo */}
            <NarrativeDisplay 
              texto={fase.narrativa}
              titulo={fase.titulo}
            />
            
            {/* Barra de timing */}
            <TimingBar 
              isActive={timingActivo}
              duration={fase.tiempoLimite}
              timingWindow={fase.timingWindow}
              onComplete={handleTimingComplete}
            />
            
            {/* Opciones de decision */}
            <DecisionOptions 
              opciones={fase.opciones}
              onSelect={handleOptionSelect}
              disabled={!!opcionSeleccionada}
              isTimingActive={timingActivo}
            />
            
            <p 
              className="text-yellow-400 text-xs text-center animate-pulse"
              style={{ fontFamily: '"Press Start 2P", monospace' }}
            >
              ¡Elige rapido!
            </p>
          </div>
        )}

        {/* Mensaje de resultado (exito o fallo) */}
        {estado === 'resultado' && (
          <div className="w-full max-w-2xl px-2 flex-1 flex items-center justify-center">
            <div className="bg-black/80 border-4 border-white rounded-lg p-4 max-w-2xl">
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
                className="text-white text-sm leading-relaxed"
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

      {/* Pantalla de Victoria */}
      {estado === 'victoria' && (
        <GoalCelebration 
          titulo={gol.titulo}
          subtitulo={`${gol.autor.nombre} - ${gol.partido}`}
          onContinue={handleRetry}
        />
      )}

      {/* Pantalla de Derrota */}
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
