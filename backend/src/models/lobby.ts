
export interface Lobby {
    id: string;
    name: string;
    isPrivate: boolean;
    players: string[];
};

export function newEmptyLobby(name: string): Lobby {
    return {
        id: crypto.randomUUID(),
        name,
        isPrivate: false,
        players: []
    };
}