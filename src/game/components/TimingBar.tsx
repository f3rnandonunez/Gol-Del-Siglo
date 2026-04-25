import { useEffect, useState } from 'react';

interface TimingBarProps {
  isActive: boolean;
  duration: number;
  timingWindow: { inicio: number; fin: number };
  onComplete: () => void;
}

export function TimingBar({ 
  isActive, 
  duration, 
  timingWindow, 
  onComplete
}: TimingBarProps) {
  const [progress, setProgress] = useState(0);
  const [isInWindow, setIsInWindow] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setProgress(0);
      setIsInWindow(false);
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / duration) * 100;
      
      if (newProgress >= 100) {
        clearInterval(interval);
        setProgress(100);
        onComplete();
      } else {
        setProgress(newProgress);
        setIsInWindow(newProgress >= timingWindow.inicio && newProgress <= timingWindow.fin);
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [isActive, duration, timingWindow, onComplete]);

  return (
    <div className="w-full max-w-sm">
      <div className="relative h-6 bg-gray-800 border-3 border-white rounded overflow-hidden">
        {/* Zona de timing correcto */}
        <div 
          className="absolute h-full bg-green-500/30"
          style={{
            left: `${timingWindow.inicio}%`,
            width: `${timingWindow.fin - timingWindow.inicio}%`
          }}
        />
        
        {/* Barra de progreso */}
        <div 
          className={`absolute h-full transition-all duration-75 ${
            isInWindow ? 'bg-green-400' : 'bg-yellow-400'
          }`}
          style={{ width: `${progress}%` }}
        />
        
        {/* Marcador de posición */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-red-500 shadow-lg"
          style={{ left: `${progress}%` }}
        />
      </div>
      
      {/* Indicador de zona */}
      <div className="flex justify-between mt-1 text-xs font-bold text-white">
        <span>RÁPIDO</span>
        <span className={isInWindow ? 'text-green-400 animate-pulse' : 'text-yellow-400'}>
          {isInWindow ? 'PERFECTO' : 'ESPERA'}
        </span>
        <span>¡YA!</span>
      </div>
    </div>
  );
}
