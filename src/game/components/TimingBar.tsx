interface TimingBarProps {
  isActive: boolean;
  totalTime: number;
  remainingTime: number;
}

export function TimingBar({ isActive, totalTime, remainingTime }: TimingBarProps) {
  const safeTotal = Math.max(totalTime, 1);
  const percentage = Math.max(0, Math.min(100, (remainingTime / safeTotal) * 100));

  return (
    <div className="w-full">
      <div className="relative h-14 border-4 border-yellow-500 bg-[#0a1534] overflow-hidden shadow-[0_0_0_2px_#1e2b57_inset]">
        <div
          className={`absolute left-0 top-0 h-full transition-all duration-100 ${isActive ? 'bg-yellow-400' : 'bg-gray-500'}`}
          style={{ width: `${percentage}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-xl text-yellow-300"
            style={{ fontFamily: '"Press Start 2P", monospace', textShadow: '2px 2px 0px #000' }}
          >
            {Math.ceil(remainingTime / 1000)}s
          </span>
        </div>
      </div>
      <p
        className="text-center text-yellow-400 text-lg mt-2"
        style={{ fontFamily: '"Press Start 2P", monospace', textShadow: '2px 2px 0px #000' }}
      >
        · ¡DECIDE! ·
      </p>
    </div>
  );
}
