interface GameOverProps {
  razon: string;
  faseAlcanzada: number;
  totalFases: number;
  onRetry: () => void;
  onMenu: () => void;
}

export function GameOver({ 
  razon, 
  faseAlcanzada, 
  totalFases, 
  onRetry, 
  onMenu 
}: GameOverProps) {
  return (
    <div className="fixed inset-0 bg-red-900/95 flex flex-col items-center justify-center z-50">
      <div className="text-center">
        <h1 
          className="text-5xl md:text-7xl font-bold text-white mb-6"
          style={{
            fontFamily: '"Press Start 2P", monospace',
            textShadow: '4px 4px 0px #8B0000'
          }}
        >
          ¡JUGADA PERDIDA!
        </h1>
        
        <div className="bg-black/50 border-4 border-white rounded-lg p-6 mb-8 max-w-lg mx-auto">
          <p 
            className="text-xl text-yellow-300 mb-4"
            style={{
              fontFamily: '"Press Start 2P", monospace',
              lineHeight: '1.8'
            }}
          >
            {razon}
          </p>
          
          <div className="border-t-2 border-white/30 pt-4 mt-4">
            <p 
              className="text-lg text-white"
              style={{
                fontFamily: '"Press Start 2P", monospace'
              }}
            >
              Fases superadas: {faseAlcanzada} / {totalFases}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRetry}
            className="px-8 py-4 bg-green-600 border-4 border-green-400 text-white font-bold text-lg rounded-lg
                       hover:bg-green-500 hover:scale-105 transition-all duration-200"
            style={{
              fontFamily: '"Press Start 2P", monospace',
              textShadow: '2px 2px 0px #000'
            }}
          >
            INTENTAR DE NUEVO
          </button>
          
          <button
            onClick={onMenu}
            className="px-8 py-4 bg-blue-600 border-4 border-blue-400 text-white font-bold text-lg rounded-lg
                       hover:bg-blue-500 hover:scale-105 transition-all duration-200"
            style={{
              fontFamily: '"Press Start 2P", monospace',
              textShadow: '2px 2px 0px #000'
            }}
          >
            MENÚ PRINCIPAL
          </button>
        </div>
      </div>
    </div>
  );
}
