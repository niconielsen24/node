interface Props {
  visible: boolean;
  onPlayClick: () => void;
}

export function HeroCTA({ visible, onPlayClick }: Props) {
  return (
    <div
      className={`mt-8 flex items-center gap-4 transition-all duration-500 delay-[400ms] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <button
        className="bg-emerald-500 hover:bg-emerald-400 hover:cursor-pointer active:scale-95 text-zinc-950 font-bold text-sm px-6 py-3 rounded-lg transition-all duration-150"
        onClick={onPlayClick}
      >
        Play now — it's free
      </button>
      <button className="text-zinc-400 hover:text-white text-sm underline underline-offset-4 transition-colors duration-150">
        How it works →
      </button>
    </div>
  );
}
