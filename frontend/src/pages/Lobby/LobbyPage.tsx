const MAX_PLAYERS = 4;

const mockPlayers = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
];

export const LobbyPage = () => {
  const emptySlots = MAX_PLAYERS - mockPlayers.length;

  return (
    <section className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-8 py-20 font-mono">
      <div className="w-full max-w-xl opacity-100 translate-y-0 transition-all duration-500">

        <p className="flex items-center gap-3 text-xs tracking-widest uppercase text-zinc-500 mb-6">
          <span className="block w-6 h-px bg-zinc-500" />
          Game lobby
          <span className="ml-auto text-xs uppercase tracking-widest text-emerald-400">
            Public
          </span>
        </p>

        <h1 className="font-sans text-4xl font-extrabold tracking-tighter mb-8">
          Alice's Lobby
        </h1>

        <div className="border border-zinc-800 rounded-xl bg-zinc-900 p-6 mb-4">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-4">
            Players — {mockPlayers.length} / {MAX_PLAYERS}
          </p>
          <div className="flex flex-col gap-2">
            {mockPlayers.map((player, i) => (
              <div key={player.id} className="flex items-center gap-3 px-4 py-3 bg-zinc-800 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                <span className="text-white font-mono text-sm">{player.name}</span>
                {i === 0 && (
                  <span className="ml-auto font-mono text-xs uppercase tracking-widest text-zinc-500">
                    Host
                  </span>
                )}
                {i === 1 && (
                  <span className="ml-auto font-mono text-xs uppercase tracking-widest text-emerald-400">
                    You
                  </span>
                )}
              </div>
            ))}
            {Array.from({ length: emptySlots }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 border border-dashed border-zinc-800 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-zinc-700 flex-shrink-0" />
                <span className="text-zinc-600 font-mono text-sm">Waiting for player...</span>
              </div>
            ))}
          </div>
        </div>

        <p className="font-mono text-xs uppercase tracking-widest text-center mb-6 text-emerald-400">
          Ready to start
        </p>

        <div className="flex items-center gap-4">
          <button className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-zinc-950 font-bold text-sm px-6 py-3 rounded-lg transition-all duration-150">
            Start game
          </button>
          <button className="text-zinc-400 hover:text-white text-sm underline underline-offset-4 transition-colors duration-150">
            Leave lobby
          </button>
        </div>

      </div>
    </section>
  );
};
