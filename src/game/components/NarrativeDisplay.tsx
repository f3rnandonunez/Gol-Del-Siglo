interface NarrativeDisplayProps {
  texto: string;
  titulo?: string;
}

export function NarrativeDisplay({ 
  texto, 
  titulo 
}: NarrativeDisplayProps) {
  return (
    <div className="bg-black/80 border-3 border-white rounded-lg p-3 w-full max-w-2xl overflow-y-auto max-h-32">
      {titulo && (
        <h3 
          className="text-yellow-400 text-sm mb-2 text-center"
          style={{
            fontFamily: '"Press Start 2P", monospace',
            textShadow: '2px 2px 0px #8B4513'
          }}
        >
          {titulo}
        </h3>
      )}
      <p 
        className="text-white text-xs leading-snug"
        style={{
          fontFamily: '"Press Start 2P", monospace',
          lineHeight: '1.4',
          textShadow: '1px 1px 0px #000'
        }}
      >
        {texto}
      </p>
    </div>
  );
}
