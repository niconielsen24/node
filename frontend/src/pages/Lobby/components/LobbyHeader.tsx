interface LobbyHeaderProps {
    name: string;
    isPrivate: boolean;
}

export const LobbyHeader = ({ name, isPrivate }: LobbyHeaderProps) => (
    <>
        <p className="flex items-center gap-3 text-xs tracking-widest uppercase text-zinc-500 mb-6">
            <span className="block w-6 h-px bg-zinc-500" />
            Game lobby
            <span className={`ml-auto text-xs uppercase tracking-widest ${isPrivate ? "text-zinc-500" : "text-emerald-400"}`}>
                {isPrivate ? "Private" : "Public"}
            </span>
        </p>
        <h1 className="font-sans text-4xl font-extrabold tracking-tighter mb-8">
            {name}
        </h1>
    </>
);
