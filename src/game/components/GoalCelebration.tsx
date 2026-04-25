import { useEffect, useState } from 'react';

interface GoalCelebrationProps {
  titulo: string;
  subtitulo: string;
  onContinue: () => void;
}

export function GoalCelebration({ titulo, subtitulo, onContinue }: GoalCelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50">
      {/* Confetti animado */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#6CACE4', '#FFFFFF', '#FFD700', '#FF6B6B'][Math.floor(Math.random() * 4)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Sprite de Maradona celebrando */}
      <div className="mb-8">
        <img 
          src="/sprites/maradona_izq.png" 
          alt="Maradona"
          className="w-40 h-40 md:w-56 md:h-56 object-contain animate-bounce"
          style={{ 
            filter: 'drop-shadow(0 0 30px #00ff00)'
          }}
        />
      </div>

      {/* Texto de celebración */}
      <div className="text-center animate-pulse">
        <h1 
          className="text-5xl md:text-7xl font-bold text-yellow-400 mb-4"
          style={{
            fontFamily: '"Press Start 2P", monospace',
            textShadow: '4px 4px 0px #FF0000, -2px -2px 0px #0000FF',
            animation: 'pulse 0.5s infinite'
          }}
        >
          ¡GOOOOL!
        </h1>
        
        <h2 
          className="text-2xl md:text-3xl font-bold text-white mb-4"
          style={{
            fontFamily: '"Press Start 2P", monospace',
            textShadow: '3px 3px 0px #000'
          }}
        >
          {titulo}
        </h2>
        
        <p 
          className="text-lg text-blue-300 mb-8"
          style={{
            fontFamily: '"Press Start 2P", monospace'
          }}
        >
          {subtitulo}
        </p>

        <button
          onClick={onContinue}
          className="px-8 py-4 bg-green-600 border-4 border-green-400 text-white font-bold text-lg rounded-lg
                     hover:bg-green-500 hover:scale-110 transition-all duration-200 animate-bounce"
          style={{
            fontFamily: '"Press Start 2P", monospace',
            textShadow: '2px 2px 0px #000'
          }}
        >
          ¡JUGAR DE NUEVO!
        </button>
      </div>

      {/* Efecto de estrellas */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute text-yellow-400 text-2xl animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random()}s`
            }}
          >
            ★
          </div>
        ))}
      </div>
    </div>
  );
}
