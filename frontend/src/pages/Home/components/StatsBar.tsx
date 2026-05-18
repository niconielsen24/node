const stats = [
  { value: "∞", label: "Board layouts" },
  { value: "1–4", label: "Players" },
  { value: "0", label: "Downloads needed" },
];

interface Props {
  visible: boolean;
}

export function StatsBar({ visible }: Props) {
  return (
    <div
      className={`grid grid-cols-3 border border-zinc-800 rounded-xl overflow-hidden transition-all duration-500 delay-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          className={`flex flex-col gap-0.5 px-4 py-4 bg-zinc-900 ${
            i < stats.length - 1 ? "border-r border-zinc-800" : ""
          }`}
        >
          <span className="text-xl font-extrabold font-sans text-emerald-400 tracking-tight">
            {s.value}
          </span>
          <span className="text-lg tracking-widest uppercase text-zinc-500">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
