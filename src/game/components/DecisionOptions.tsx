interface DecisionOptionsProps {
  opciones: Opcion[];
  onSelect: (opcion: Opcion) => void;
  disabled: boolean;
  isTimingActive: boolean;
}

export function DecisionOptions({ opciones, onSelect, disabled, isTimingActive }: DecisionOptionsProps) {
  if (!opciones || opciones.length === 0) return null;

  // Calcular letras para hasta 4 opciones
  const letra = (index: number) => {
    switch (index) {
      case 0: return 'A)';
      case 1: return 'B)';
      case 2: return 'C)';
      case 3: return 'D)';
      default: return `${String.fromCharCode(65 + index)})`; // para más opciones (E, F, etc.)
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 w-full max-w-sm mx-auto">
      {opciones.map((opcion, idx) => (
        <button
          key={opcion.id}
          onClick={() => onSelect(opcion)}
          disabled={disabled || !isTimingActive}
          className={`
            px-3 py-2 text-xs md:text-sm font-bold rounded
            bg-gray-800 border-2 border-white text-white
            hover:bg-gray-700 active:scale-95 transition-all
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          style={{ fontFamily: '"Press Start 2P", monospace' }}
        >
          {letra(idx)} {opcion.texto}
        </button>
      ))}
    </div>
  );
}
