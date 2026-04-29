import { useEffect, useState } from 'react';

interface TimingBarProps {
  isActive: boolean;
  totalTime: number;      // 12000 ms
  remainingTime: number;  // tiempo restante actual
}

export function TimingBar({ isActive, totalTime, remainingTime }: TimingBarProps) {
  const [progress, setProgress] = useState(0);
  const [isCritical, setIsCritical] = useState(false);

  useEffect(() => {
    if (totalTime > 0) {
      const newProgress = (remainingTime / totalTime) * 100;
      setProgress(Math.max(0, Math.min(100, newProgress)));
      setIsCritical(remainingTime <= totalTime * 0.2); // rojo cuando queda menos del 20%
    }
  }, [remainingTime, totalTime]);

  // Determinar color según el estado
  let barColor = 'bg-yellow-400';
  if (isCritical) barColor = 'bg-red-500';
  else if (progress > 50) barColor = 'bg-green-400';

  // Tiempo restante formateado en segundos
  const secondsLeft = Math.ceil(remainingTime / 1000);

  return (
    <div className="w-full max-w-sm">
      <div className="relative h-6 bg-gray-800 border-3 border-white rounded overflow-hidden">
        {/* Barra de progreso (decreciente: va vaciándose de derecha a izquierda) */}
        <div
          className={`absolute top-0 left-0 h-full transition-all duration-100 ${barColor}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between mt-1 text-xs font-bold text-white">
        <span>⏱️ {secondsLeft}s</span>
        <span className={isActive ? 'text-yellow-300 animate-pulse' : 'text-gray-400'}>
          {isActive ? '¡DECIDE!' : 'ESPERA'}
        </span>
        <span>⚡</span>
      </div>
    </div>
  );
}
