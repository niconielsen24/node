import type { User } from "../../../types/contracts/user";
import { FilledSlot, EmptySlot } from "./PlayerSlot";

const MAX_PLAYERS = 4;

interface PlayerListProps {
    players: User[];
    currentUserId: string | undefined;
}

export const PlayerList = ({ players, currentUserId }: PlayerListProps) => {
    const emptySlots = MAX_PLAYERS - players.length;

    return (
        <div className="border border-zinc-800 rounded-xl bg-zinc-900 p-6 mb-4">
            <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-4">
                Players — {players.length} / {MAX_PLAYERS}
            </p>
            <div className="flex flex-col gap-2">
                {players.map((player, i) => (
                    <FilledSlot
                        key={player.id}
                        player={player}
                        isHost={i === 0}
                        isCurrentUser={player.id === currentUserId}
                    />
                ))}
                {Array.from({ length: emptySlots }).map((_, i) => (
                    <EmptySlot key={i} />
                ))}
            </div>
        </div>
    );
};
