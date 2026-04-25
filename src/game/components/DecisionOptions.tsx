import type { Opcion } from '../types';

interface DecisionOptionsProps {
  opciones: Opcion[];
  onSelect: (opcion: Opcion) => void;
  disabled: boolean;
  isTimingActive: boolean;
}

export function DecisionOptions({ 
  opciones, 
  onSelect, 
  disabled,
  isTimingActive 
}: DecisionOptionsProps) {
  return (
    <div className="grid grid-cols-1 gap-2 w-full max-w-md">
      {opciones.map((opcion, index) => (
        <button
          key={opcion.id}
          onClick={() => onSelect(opcion)}
          disabled={disabled || !isTimingActive}
          className={`
            relative px-4 py-2 text-left font-bold text-sm
            border-3 rounded transition-all duration-150
            ${disabled || !isTimingActive 
              ? 'bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-600 border-blue-400 text-white hover:bg-blue-500 hover:scale-105 active:scale-95 cursor-pointer'
            }
          `}
          style={{
            fontFamily: '"Press Start 2P", monospace',
            textShadow: '1px 1px 0px #000'
          }}
        >
          <span className="inline-block w-6 text-yellow-300">
            {index === 0 ? 'A)' : index === 1 ? 'B)' : 'C)'}
          </span>
          {opcion.texto}
        </button>
      ))}
    </div>
  );
}
