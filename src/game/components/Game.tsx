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
  // ... todos los estados, efectos, manejadores (igual que en el código que te di hace un momento) ...
  // Para no repetir 200 líneas, mantén TODO el código anterior desde useState hasta el return.
  // Solo voy a cambiar lo que está dentro del return.

  // ⚠️ IMPORTANTE: usa exactamente los mismos hooks y lógica que tenías funcionando.
  // La única modificación es la parte visual del return (desde <div className="h-screen...> hasta el final).

  return (
    <div className="h-screen bg-black flex flex-col font-pixel" style={{ imageRendering: 'pixelated' }}>
      {/* Barra superior estilo NES */}
      <div className="bg-[#000] border-b-4 border-[#fff] px-2 py-1 flex justify-between text-white text-[10px] md:text-xs">
        <div className="bg-[#000] border-2 border-[#fff] px-2 py-0.5">FASE {faseActual+1}/{gol.fases.length}</div>
        <div className="bg-[#000] border-2 border-[#fff] px-2 py-0.5 flex items-center gap-1">
          <span className="text-[#f00]">🏆</span> {gol.titulo}
        </div>
        <div className="bg-[#000] border-2 border-[#fff] px-2 py-0.5">⏱️ {Math.ceil(tiempoRestante/1000)}s</div>
        <div className="bg-[#000] border-2 border-[#fff] px-2 py-0.5">
          {gol.autor.apodo}
        </div>
      </div>

      {/* Zona del campo (fondo verde rayado sin líneas) */}
      <div className="relative flex-grow bg-[#2e7d32] overflow-hidden">
        {/* Rayas verticales estilo césped NES */}
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(90deg, #2e7d32 0px, #2e7d32 24px, #388e3c 24px, #388e3c 48px)`
        }} />

        {/* Cuadrícula tipo NES (muy sutil, opcional) */}
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 2px, transparent 2px, transparent 8px)`
        }} />

        {/* Sprites (se mantienen igual que antes pero más grandes) */}
        {!mostrarPrimerPlano && estado !== 'victoria' && estado !== 'derrota' && fase.rival && (
          <div className="absolute left-[10%] bottom-[15%] z-10">
            <img
              src={`/sprites/${fase.rival.sprite}.png`}
              alt={fase.rival.nombre}
              onError={(e) => { if (!e.currentTarget.src.includes('maradona_izq.png')) e.currentTarget.src = '/sprites/maradona_izq.png'; }}
              className="w-32 h-32 md:w-48 md:h-48 object-contain pixelated"
            />
            <div className="bg-black border-2 border-white text-white text-center text-[8px] md:text-[10px] px-1 mt-1 w-full">
              {fase.rival.nombre}
            </div>
          </div>
        )}

        <div className="absolute right-[10%] bottom-[15%] z-10">
          <img
            src="/sprites/maradona_izq.png"
            alt={gol.autor.nombre}
            onError={(e) => { if (!e.currentTarget.src.includes('maradona_izq.png')) e.currentTarget.src = '/sprites/maradona_izq.png'; }}
            className="w-36 h-36 md:w-56 md:h-56 object-contain transition-all duration-300 pixelated"
          />
          <div className="bg-black border-2 border-white text-white text-center text-[8px] md:text-[10px] px-1 mt-1 w-full">
            {gol.autor.apodo}
          </div>
        </div>

        {/* Efectos de flash (éxito/fallo) */}
        {animacionExito && <div className="absolute inset-0 bg-green-500/40 animate-pulse pointer-events-none z-20" />}
        {animacionFallo && <div className="absolute inset-0 bg-red-600/40 animate-pulse pointer-events-none z-20" />}
      </div>

      {/* Panel de decisiones (estilo NES, colores planos, bordes gruesos) */}
      <div className="bg-black border-t-4 border-white px-3 py-2 flex-shrink-0">
        <div className="max-w-3xl mx-auto">
          {estado === 'decision' && !mostrarPrimerPlano && !esIntroAutomatica && (
            <>
              {/* Texto narrativo style NES (corto) */}
              <div className="bg-black border-2 border-white text-white text-[10px] md:text-xs p-2 mb-2 text-center">
                {narrativaCorta}
              </div>

              {/* Opciones en 2x2 con letras A B C D */}
              <div className="grid grid-cols-2 gap-3 my-2">
                {opcionesMezcladas.map((opcion, idx) => {
                  const letra = String.fromCharCode(65 + idx);
                  return (
                    <button
                      key={opcion.id}
                      onClick={() => handleOptionSelect(opcion)}
                      disabled={!!opcionSeleccionada}
                      className="bg-black border-2 border-white text-white text-left px-2 py-2 hover:bg-gray-900 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-3 text-[10px] md:text-xs"
                    >
                      <span className="bg-white text-black font-bold w-6 h-6 flex items-center justify-center border border-black">
                        {letra}
                      </span>
                      <span>{opcion.texto}</span>
                    </button>
                  );
                })}
              </div>

              {/* Barra de tiempo estilo NES (solo si está activa) */}
              {mostrarBarra && (
                <div className="mt-2">
                  <TimingBar isActive={timingActivo} totalTime={gol.tiempoGlobalMaximo} remainingTime={tiempoRestante} />
                </div>
              )}

              <div className="text-center text-yellow-400 text-[8px] md:text-[10px] mt-2 animate-pulse">
                ⟳ ELIGE RÁPIDO ⟳
              </div>
            </>
          )}

          {/* Mensaje de resultado */}
          {estado === 'resultado' && !mostrarPrimerPlano && (
            <div className="bg-black border-4 border-white p-3 text-center">
              <div className={`text-sm md:text-base font-bold ${opcionSeleccionada?.correcta ? 'text-green-400' : 'text-red-400'}`}>
                {opcionSeleccionada?.correcta ? '✓ BIEN HECHO!' : '✗ FALLASTE!'}
              </div>
              <div className="text-white text-[10px] md:text-xs mt-1">{mensajeResultado}</div>
              {mensajeDialogo && <div className="text-yellow-300 text-[8px] mt-1 italic">“{mensajeDialogo}”</div>}
            </div>
          )}
        </div>
      </div>

      {/* Modal de primer plano (igual que antes) */}
      {mostrarPrimerPlano && infoPrimerPlano && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90">
          <div className="bg-black border-4 border-yellow-500 p-4 text-center max-w-sm w-full mx-4 pixelated">
            <img src={infoPrimerPlano.spriteCloseUp} alt={infoPrimerPlano.personaje} className="w-40 h-40 mx-auto object-contain mb-2" />
            <div className="text-yellow-300 text-sm mb-1">{infoPrimerPlano.personaje}</div>
            <div className="text-white text-xs italic">“{infoPrimerPlano.dialogo}”</div>
            <button onClick={cerrarPrimerPlano} className="mt-3 px-4 py-1 bg-yellow-600 text-black text-xs border-2 border-white hover:bg-yellow-500">CONTINUAR</button>
          </div>
        </div>
      )}

      {/* Pantallas finales */}
      {estado === 'victoria' && <GoalCelebration titulo={gol.titulo} subtitulo={`${gol.autor.nombre} - ${gol.partido}`} onContinue={handleRetry} />}
      {estado === 'derrota' && <GameOver razon={mensajeResultado} faseAlcanzada={faseActual} totalFases={gol.fases.length} onRetry={handleRetry} onMenu={onBackToMenu} />}
    </div>
  );
}
