const nodes = [0, 1, 2, 3, 4, 5];
const nodeColors = [
  "bg-emerald-500",
  "bg-emerald-600",
  "bg-emerald-400",
  "bg-emerald-500",
  "bg-teal-400",
  "bg-emerald-700",
];

interface Props {
  visible: boolean;
}

export function NodeChain({ visible }: Props) {
  return (
    <div
      className={`flex items-center gap-1.5 flex-wrap mb-8 transition-all duration-500 delay-150 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {nodes.map((i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span
            className={`block w-2.5 h-2.5 rounded-full ${nodeColors[i]} transition-all duration-300`}
            style={{
              transitionDelay: `${i * 80 + 200}ms`,
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.3)",
            }}
          />
          {i < nodes.length - 1 && <span className="block w-4 h-px bg-zinc-700" />}
        </span>
      ))}
    </div>
  );
}
