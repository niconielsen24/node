import type { User } from "../../../types/contracts/user";

interface FilledSlotProps {
    player: User;
    isHost: boolean;
    isCurrentUser: boolean;
}

export const FilledSlot = ({ player, isHost, isCurrentUser }: FilledSlotProps) => (
    <div className="flex items-center gap-3 px-4 py-3 bg-zinc-800 rounded-lg">
        <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
        <span className="text-white font-mono text-sm">{player.name}</span>
        {isHost && (
            <span className="ml-auto font-mono text-xs uppercase tracking-widest text-zinc-500">
                Host{isCurrentUser ? " · You" : ""}
            </span>
        )}
        {!isHost && isCurrentUser && (
            <span className="ml-auto font-mono text-xs uppercase tracking-widest text-emerald-400">
                You
            </span>
        )}
    </div>
);

export const EmptySlot = () => (
    <div className="flex items-center gap-3 px-4 py-3 border border-dashed border-zinc-800 rounded-lg">
        <span className="w-2 h-2 rounded-full bg-zinc-700 flex-shrink-0" />
        <span className="text-zinc-600 font-mono text-sm">Waiting for player...</span>
    </div>
);
