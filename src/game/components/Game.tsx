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

  const mostrarBarra = timerIniciado && estado === 'decision' && !esIntroAutomatica;

  return (
    <div className="h-screen bg-[#0a0c12] flex flex-col" style={{ fontFamily: '"VT323", "Courier New", monospace' }}>
      {/* Barra superior NES con contraste suave */}
      <div className="bg-[#1a1c2a] border-b-2 border-[#c0c0c0] px-3 py-2 flex justify-between items-center text-[#e0e0e0] text-[10px] md:text-xs">
        <div className="bg-[#2a2c3a] border border-[#c0c0c0] px-2 py-0.5">FASE {faseActual+1}/{gol.fases.length}</div>
        <div className="bg-[#2a2c3a] border border-[#c0c0c0] px-2 py-0.5">{gol.titulo}</div>
        <div className="bg-[#2a2c3a] border border-[#c0c0c0] px-2 py-0.5">⏱ {Math.ceil(tiempoRestante/1000)}s</div>
        <div className="bg-[#2a2c3a] border border-[#c0c0c0] px-2 py-0.5">{gol.autor.apodo}</div>
      </div>

      {/* Campo (fondo rayado) */}
      <div className="relative flex-grow overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(90deg, #2a6b2f 0px, #2a6b2f 32px, #3e8643 32px, #3e8643 64px)`
        }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/30 pointer-events-none" />

        {/* Sprite rival */}
        {!mostrarPrimerPlano && estado !== 'victoria' && estado !== 'derrota' && fase.rival && (
          <div className="absolute left-[10%] bottom-[15%] z-10 text-center">
            <img
              src={`/sprites/${fase.rival.sprite}.png`}
              alt={fase.rival.nombre}
              onError={(e) => { if (!e.currentTarget.src.includes('maradona_izq.png')) e.currentTarget.src = '/sprites/maradona_izq.png'; }}
              className="w-28 h-28 md:w-36 md:h-36 object-contain pixelated"
            />
            <div className="bg-[#1a1c2a] border border-[#c0c0c0] text-[#e0e0e0] text-[8px] md:text-[10px] px-1 py-0.5 mt-1 inline-block">
              {fase.rival.nombre}
            </div>
          </div>
        )}

        {/* Sprite Maradona */}
        <div className="absolute right-[10%] bottom-[15%] z-10 text-center">
          <img
            src="/sprites/maradona_izq.png"
            alt={gol.autor.nombre}
            onError={(e) => { if (!e.currentTarget.src.includes('maradona_izq.png')) e.currentTarget.src = '/sprites/maradona_izq.png'; }}
            className="w-32 h-32 md:w-44 md:h-44 object-contain transition-all duration-300 pixelated"
          />
          <div className="bg-[#1a1c2a] border border-[#c0c0c0] text-[#e0e0e0] text-[8px] md:text-[10px] px-1 py-0.5 mt-1 inline-block">
            {gol.autor.apodo}
          </div>
        </div>

        {animacionExito && <div className="absolute inset-0 bg-green-500/20 animate-pulse pointer-events-none z-20" />}
        {animacionFallo && <div className="absolute inset-0 bg-red-600/20 animate-pulse pointer-events-none z-20" />}
      </div>

      {/* Panel de decisiones NES con contraste ajustado */}
      <div className="bg-[#1a1c2a] border-t-2 border-[#c0c0c0] px-3 py-2 flex-shrink-0">
        <div className="max-w-3xl mx-auto">
          {estado === 'decision' && !mostrarPrimerPlano && !esIntroAutomatica && (
            <>
              <div className="bg-[#0f1120] border border-[#c0c0c0] text-[#d0d0e0] text-[10px] md:text-xs p-2 mb-2 text-center">
                {narrativaCorta}
              </div>
              <div className="grid grid-cols-2 gap-3 my-2">
                {opcionesMezcladas.map((opcion, idx) => {
                  const letra = String.fromCharCode(65 + idx);
                  return (
                    <button
                      key={opcion.id}
                      onClick={() => handleOptionSelect(opcion)}
                      disabled={!!opcionSeleccionada}
                      className="bg-[#0f1120] border border-[#c0c0c0] text-[#d0d0e0] text-left px-2 py-2 hover:bg-[#2a2c3a] active:scale-95 transition-all disabled:opacity-50 flex items-center gap-3 text-[10px] md:text-xs"
                    >
                      <span className="bg-[#c0c0c0] text-[#0a0c12] font-bold w-6 h-6 flex items-center justify-center border border-[#808080]">
                        {letra}
                      </span>
                      <span>{opcion.texto}</span>
                    </button>
                  );
                })}
              </div>
              {mostrarBarra && (
                <div className="mt-2">
                  <TimingBar isActive={timingActivo} totalTime={gol.tiempoGlobalMaximo} remainingTime={tiempoRestante} />
                </div>
              )}
              <div className="text-center text-[#f7d44a] text-[8px] md:text-[10px] mt-2 animate-pulse">
                ⚡ ELIGE RÁPIDO ⚡
              </div>
            </>
          )}
          {estado === 'resultado' && !mostrarPrimerPlano && (
            <div className="bg-[#0f1120] border-2 border-[#c0c0c0] p-3 text-center">
              <div className={`text-sm md:text-base font-bold ${opcionSeleccionada?.correcta ? 'text-[#80e0a0]' : 'text-[#e08080]'}`}>
                {opcionSeleccionada?.correcta ? '✓ ¡BIEN HECHO!' : '✗ ¡FALLASTE!'}
              </div>
              <div className="text-[#d0d0e0] text-[10px] md:text-xs mt-1">{mensajeResultado}</div>
              {mensajeDialogo && <div className="text-[#f7d44a] text-[8px] mt-1 italic">“{mensajeDialogo}”</div>}
            </div>
          )}
        </div>
      </div>

      {/* Modal de primer plano adaptado a la paleta */}
      {mostrarPrimerPlano && infoPrimerPlano && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0c12]/90">
          <div className="bg-[#1a1c2a] border-2 border-[#c0c0c0] p-4 text-center max-w-sm w-full mx-4">
            <img src={infoPrimerPlano.spriteCloseUp} alt={infoPrimerPlano.personaje} className="w-40 h-40 mx-auto object-contain mb-2 pixelated" />
            <div className="text-[#f7d44a] text-sm mb-1">{infoPrimerPlano.personaje}</div>
            <div className="text-[#d0d0e0] text-xs italic">“{infoPrimerPlano.dialogo}”</div>
            <button onClick={cerrarPrimerPlano} className="mt-3 px-4 py-1 bg-[#c0c0c0] text-[#0a0c12] text-xs border border-[#808080] hover:bg-[#d0d0d0]">CONTINUAR</button>
          </div>
        </div>
      )}

      {estado === 'victoria' && <GoalCelebration titulo={gol.titulo} subtitulo={`${gol.autor.nombre} - ${gol.partido}`} onContinue={handleRetry} />}
      {estado === 'derrota' && <GameOver razon={mensajeResultado} faseAlcanzada={faseActual} totalFases={gol.fases.length} onRetry={handleRetry} onMenu={onBackToMenu} />}
    </div>
  );
