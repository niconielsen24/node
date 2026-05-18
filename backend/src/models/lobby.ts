import { User } from "./user";

export type LobbyVisibility = "public" | "private";

export interface Lobby {
    id: string;
    name: string;
    isPrivate: LobbyVisibility;
    players: User[];
};

function newEmptyLobby(owner: User, name: string, isPrivate: LobbyVisibility = "public"): Lobby {
    return {
        id: crypto.randomUUID(),
        name,
        isPrivate: isPrivate,
        players: [owner]
    };
}

export function newPrivateLobby(owner: User, name: string): Lobby {
    return newEmptyLobby(owner, name, "private");
}

export function newPublicLobby(owner: User, name: string): Lobby {
    return newEmptyLobby(owner, name, "public");
}