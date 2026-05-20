import {create} from "zustand";
import type { Lobby } from "../types/contracts/lobby";

interface LobbyState {
    lobbies: Lobby[] | null;
    myLobbies: Lobby[] | null;
    setLobbies: (lobbies: Lobby[] | null) => void;
    setMyLobbies: (myLobbies: Lobby[] | null) => void;
    addLobby: (lobby: Lobby) => void;
    removeMyLobby: (lobbyId: string) => void;
    addMyLobby: (lobby: Lobby) => void;
    updateMyLobby: (lobby: Lobby) => void;
}

export const useLobbyStore = create<LobbyState>((set) => ({
    lobbies: null,
    myLobbies: null,
    setLobbies: (lobbies: Lobby[] | null) => set({ lobbies }),
    setMyLobbies: (myLobbies: Lobby[] | null) => set({ myLobbies }),
    addLobby: (lobby: Lobby) => set((state) => ({ lobbies: state.lobbies ? [...state.lobbies, lobby] : [lobby] })),
    addMyLobby: (lobby: Lobby) => set((state) => ({ myLobbies: state.myLobbies ? [...state.myLobbies, lobby] : [lobby] })),
    updateMyLobby: (lobby: Lobby) => set((state) => ({
        myLobbies: state.myLobbies ? state.myLobbies.map((l) => l.id === lobby.id ? lobby : l) : null
    })),
    removeMyLobby: (lobbyId: string) => set((state) => ({
        myLobbies: state.myLobbies ? state.myLobbies.filter((l) => l.id !== lobbyId) : null
    })),
}));