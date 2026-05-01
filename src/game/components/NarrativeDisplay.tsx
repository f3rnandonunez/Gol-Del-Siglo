interface NarrativeDisplayProps {
  texto: string;
  titulo?: string;
}

export function NarrativeDisplay({ texto, titulo }: NarrativeDisplayProps) {
  return (
    <div className="w-full border-4 border-yellow-500 bg-black shadow-[0_0_0_2px_#7c1d00] p-4 md:p-5">
      {titulo && (
        <div className="mb-3 flex items-center gap-2">
          <span className="text-yellow-400 text-lg leading-none">◀</span>
          <h3
            className="text-yellow-300 text-sm md:text-base"
            style={{
              fontFamily: '"Press Start 2P", monospace',
              textShadow: '2px 2px 0px #000'
            }}
          >
            {titulo}
          </h3>
        </div>
      )}
      <p
        className="text-white text-xs md:text-sm leading-relaxed"
        style={{
          fontFamily: '"Press Start 2P", monospace',
          textShadow: '2px 2px 0px #000'
        }}
      >
        {texto}
      </p>
    </div>
  );
}
