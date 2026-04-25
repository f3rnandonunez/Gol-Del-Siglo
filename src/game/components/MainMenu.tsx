interface MainMenuProps {
  onStartGame: () => void;
}

export function MainMenu({ onStartGame }: MainMenuProps) {
  return (
    <div className="h-screen bg-gradient-to-b from-green-800 via-green-900 to-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Fondo con patrón de campo */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 50px,
                rgba(255,255,255,0.1) 50px,
                rgba(255,255,255,0.1) 52px
              )
            `
          }}
        />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 text-center px-4">
        {/* Logo/Título */}
        <div className="mb-12">
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
            style={{
              fontFamily: '"Press Start 2P", monospace',
              textShadow: '4px 4px 0px #6CACE4, 8px 8px 0px #000'
            }}
          >
            GOLES
          </h1>
          <h2 
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-yellow-400"
            style={{
              fontFamily: '"Press Start 2P", monospace',
              textShadow: '3px 3px 0px #8B4513, 6px 6px 0px #000'
            }}
          >
            HISTÓRICOS
          </h2>
        </div>

        {/* Subtítulo */}
        <p 
          className="text-lg md:text-xl text-gray-300 mb-12 max-w-lg mx-auto"
          style={{
            fontFamily: '"Press Start 2P", monospace',
            lineHeight: '1.8'
          }}
        >
          Revive los goles más épicos del fútbol mundial
        </p>

        {/* Botón de inicio */}
        <button
          onClick={onStartGame}
          className="group relative px-12 py-6 bg-blue-600 border-4 border-blue-400 text-white font-bold text-xl rounded-lg
                     hover:bg-blue-500 hover:scale-110 transition-all duration-300
                     shadow-lg hover:shadow-blue-500/50"
          style={{
            fontFamily: '"Press Start 2P", monospace',
            textShadow: '2px 2px 0px #000'
          }}
        >
          <span className="relative z-10">JUGAR</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
        </button>

        {/* Info del juego actual */}
        <div className="mt-16 bg-black/60 border-2 border-white/30 rounded-lg p-6 max-w-md mx-auto">
          <p 
            className="text-yellow-400 text-sm mb-2"
            style={{ fontFamily: '"Press Start 2P", monospace' }}
          >
            GOL DISPONIBLE:
          </p>
          <p 
            className="text-white text-lg"
            style={{ fontFamily: '"Press Start 2P", monospace' }}
          >
            El Gol del Siglo
          </p>
          <p 
            className="text-gray-400 text-xs mt-2"
            style={{ fontFamily: '"Press Start 2P", monospace' }}
          >
            Argentina vs Inglaterra - México '86
          </p>
          <p 
            className="text-blue-300 text-xs mt-1"
            style={{ fontFamily: '"Press Start 2P", monospace' }}
          >
            Diego Maradona
          </p>
        </div>
      </div>

      {/* Decoración de pelotas */}
      <div className="absolute bottom-10 left-10 opacity-30">
        <div className="w-16 h-16 rounded-full bg-white border-4 border-black flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-black" />
        </div>
      </div>
      <div className="absolute top-20 right-10 opacity-30">
        <div className="w-12 h-12 rounded-full bg-white border-4 border-black flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-black" />
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p 
          className="text-gray-500 text-xs"
          style={{ fontFamily: '"Press Start 2P", monospace' }}
        >
          Estilo Retro 8-bit • NES/Famicom
        </p>
      </div>
    </div>
  );
}
