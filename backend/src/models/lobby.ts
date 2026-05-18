import { User } from "./user";

export interface Lobby {
    id: string;
    name: string;
    isPrivate: boolean;
    players: User[];
};

export function newEmptyLobby(owner: User, name: string, isPrivate: boolean = false): Lobby {
    return {
        id: crypto.randomUUID(),
        name,
        isPrivate: isPrivate,
        players: [owner]
    };
}