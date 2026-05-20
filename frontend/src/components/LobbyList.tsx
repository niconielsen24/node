import type { User } from "../internal/user/user_class";
import type { Lobby } from "../types/contracts/lobby";

interface Props {
  user: User | null;
  lobbies: Lobby[] | null;
  createLobby: () => void;
  joinLobby: (lobbyId: string, user: User) => void;
  refreshLobbies: () => void;
}

export const LobbyList = ({ user, lobbies = null, createLobby, joinLobby, refreshLobbies }: Props) => {
  return (
    <div className="border border-zinc-800 rounded-xl bg-zinc-900 p-6">
      <div className="flex items-start justify-between mb-1">
        <h2 className="font-sans text-lg font-bold text-white tracking-tight">
          Join a lobby
        </h2>
        <button
          onClick={refreshLobbies}
          className="font-mono text-xs text-zinc-500 hover:text-emerald-400 uppercase tracking-widest transition-colors duration-150"
        >
          ↻ Refresh
        </button>
      </div>
      <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-5">
        Create or join a game lobby to start playing
      </p>

      <button
        onClick={createLobby} 
      className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-zinc-950 font-bold text-sm px-4 py-2 rounded-lg transition-all duration-150 mb-5">
        Create lobby
      </button>

      {lobbies && lobbies.length > 0 ? (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left font-mono text-xs uppercase tracking-widest text-zinc-500 pb-2">Name</th>
              <th className="text-left font-mono text-xs uppercase tracking-widest text-zinc-500 pb-2">Players</th>
              <th className="text-left font-mono text-xs uppercase tracking-widest text-zinc-500 pb-2">Type</th>
              <th className="pb-2" />
            </tr>
          </thead>
          <tbody>
            {lobbies.map((lobby) => (
              <tr key={lobby.id} className="border-b border-zinc-800/50 last:border-0">
                <td className="py-3 text-white font-mono">{lobby.name}</td>
                <td className="py-3 text-zinc-400 font-mono">{lobby.players.length} / 4</td>
                <td className="py-3">
                  <span className={`font-mono text-xs uppercase tracking-widest ${lobby.isPrivate ? "text-zinc-500" : "text-emerald-400"}`}>
                    {lobby.isPrivate ? "Private" : "Public"}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <button 
                    onClick={() => joinLobby(lobby.id, user!)}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:cursor-pointer transition-colors duration-150"
                  >
                    Join →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="font-mono text-xs text-zinc-600 uppercase tracking-widest text-center py-6">
          No lobbies currently
        </p>
      )}
    </div>
  );
};
