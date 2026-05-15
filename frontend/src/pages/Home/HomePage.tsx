import { useEffect, useState } from "react";

const nodes = [0, 1, 2, 3, 4, 5];

const stats = [
  { value: "∞", label: "Board layouts" },
  { value: "1–4", label: "Players" },
  { value: "0", label: "Downloads needed" },
];

const nodeColors = [
  "bg-emerald-500",
  "bg-emerald-600",
  "bg-emerald-400",
  "bg-emerald-500",
  "bg-teal-400",
  "bg-emerald-700",
];

export default function HomePage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="min-h-screen min-w-screen bg-zinc-950 text-white flex items-center px-8 py-20 font-mono w-screen">
      <div className="max-w-2xl w-full mx-auto">

        {/* Eyebrow */}
        <p
          className={`flex items-center gap-3 text-xs tracking-widest uppercase text-zinc-500 mb-6 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
        >
          <span className="block w-6 h-px bg-zinc-500" />
          Turn-based strategy · Browser native
        </p>

        {/* Headline */}
        <h1
          className={`font-sans text-5xl md:text-6xl font-extrabold leading-tight tracking-tighter mb-6 transition-all duration-500 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          Think in nodes.
          <br />
          Win by{" "}
          <em className="not-italic text-emerald-400">design.</em>
        </h1>

        {/* Animated node chain */}
        <div
          className={`flex items-center gap-1.5 flex-wrap mb-8 transition-all duration-500 delay-150 ${visible ? "opacity-100" : "opacity-0"
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
              {i < nodes.length - 1 && (
                <span className="block w-4 h-px bg-zinc-700" />
              )}
            </span>
          ))}
        </div>

        {/* Body copy */}

        <p className="font-mono text-lg leading-loose text-zinc-400 mb-7 max-w-xl">
          <strong className="text-white font-bold">NodeSter </strong>   
          is a turn-based strategy game played on a shared grid of colored tiles.
          Each turn you play a movement card to swap tiles around the board,
          racing to arrange your color into the exact shapes on your figure cards — before your opponents do the same. 
          Form a rival's figure and you lock them out; let them lock yours and you're fighting uphill. 
          With only 3 cards in hand, 2 minutes per turn, and a board that shifts with every move, every decision carries weight. 
          <strong className="text-white font-bold">The winner is the first to complete all their figures.</strong> 
          No installs. No accounts. Just pure color, pattern, and timing — right in your browser.
        </p>

        {/* Stats bar */}
        <div
          className={`grid grid-cols-3 border border-zinc-800 rounded-xl overflow-hidden transition-all duration-500 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col gap-0.5 px-4 py-4 bg-zinc-900 ${i < stats.length - 1 ? "border-r border-zinc-800" : ""
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

        {/* CTA */}
        <div
          className={`mt-8 flex items-center gap-4 transition-all duration-500 delay-[400ms] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          <button className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-zinc-950 font-bold text-sm px-6 py-3 rounded-lg transition-all duration-150">
            Play now — it's free
          </button>
          <button className="text-zinc-400 hover:text-white text-sm underline underline-offset-4 transition-colors duration-150">
            How it works →
          </button>
        </div>

      </div>
    </section>
  );
}