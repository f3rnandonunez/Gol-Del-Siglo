import type { Opcion } from '../types';

interface DecisionOptionsProps {
  opciones: Opcion[];
  onSelect: (opcion: Opcion) => void;
  disabled: boolean;
  isTimingActive: boolean;
}

export function DecisionOptions({ opciones, onSelect, disabled, isTimingActive }: DecisionOptionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
      {opciones.map((opcion) => (
        <button
          key={opcion.id}
          onClick={() => onSelect(opcion)}
          disabled={disabled || !isTimingActive}
          className={`
            px-4 py-4 md:py-5 text-left font-bold text-sm md:text-base
            border-4 rounded-sm transition-all duration-150
            ${
              disabled || !isTimingActive
                ? 'bg-slate-700 border-slate-500 text-slate-300 cursor-not-allowed'
                : 'bg-blue-900 border-yellow-400 text-yellow-100 hover:bg-blue-800 active:scale-[0.99] cursor-pointer'
            }
          `}
          style={{
            fontFamily: '"Press Start 2P", monospace',
            textShadow: '2px 2px 0px #000',
            boxShadow: disabled || !isTimingActive ? 'none' : 'inset 0 0 0 2px rgba(255,255,255,0.08)'
          }}
        >
          {opcion.texto}
        </button>
      ))}
    </div>
  );
}
