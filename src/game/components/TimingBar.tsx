interface TimingBarProps {
  isActive: boolean;
  totalTime: number;
  remainingTime: number;
}

export function TimingBar({ isActive, totalTime, remainingTime }: TimingBarProps) {
  const safeTotal = Math.max(totalTime, 1);
  const percentage = Math.max(0, Math.min(100, (remainingTime / safeTotal) * 100));

  return (
    <div className="w-full max-w-sm">
      <div className="relative h-6 bg-gray-800 border-3 border-white rounded overflow-hidden">
        <div
          className={`absolute h-full transition-all duration-75 ${isActive ? 'bg-yellow-400' : 'bg-gray-500'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-between mt-1 text-xs font-bold text-white">
        <span>TIEMPO</span>
        <span className={isActive ? 'text-yellow-400' : 'text-red-400'}>
          {Math.ceil(remainingTime / 1000)}s
        </span>
        <span>GLOBAL</span>
      </div>
    </div>
  );
}
