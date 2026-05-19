import type { User } from "../../types/contracts/user";
import type { Lobby } from "../../types/contracts/lobby";

class Caller {
  private static instance: Caller;
  private readonly baseUrl: string;

  private constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
  }

  static getInstance(): Caller {
    if (!Caller.instance) {
      Caller.instance = new Caller();
    }
    return Caller.instance;
  }

  private async request<T>(path: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(err.error ?? response.statusText);
    }
    return response.json();
  }

  // Users
  getUser(id: string): Promise<User> {
    return this.request(`/users/${id}`);
  }

  createUser(name: string): Promise<User> {
    return this.request("/users", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
  }

  deleteUser(id: string): Promise<void> {
    return this.request(`/users/${id}`, { method: "DELETE" });
  }

  // Lobbies
  getLobby(id: string): Promise<Lobby> {
    return this.request(`/lobbies/${id}`);
  }

  createLobby(owner: User, name: string, isPrivate = false): Promise<Lobby> {
    return this.request("/lobbies", {
      method: "POST",
      body: JSON.stringify({ owner, name, isPrivate }),
    });
  }

  deleteLobby(id: string): Promise<void> {
    return this.request(`/lobbies/${id}`, { method: "DELETE" });
  }

  addPlayerToLobby(lobbyId: string, player: User): Promise<Lobby> {
    return this.request(`/lobbies/${lobbyId}/players`, {
      method: "POST",
      body: JSON.stringify({ player }),
    });
  }

  removePlayerFromLobby(lobbyId: string, playerId: string): Promise<Lobby> {
    return this.request(`/lobbies/${lobbyId}/players`, {
      method: "DELETE",
      body: JSON.stringify({ playerId }),
    });
  }

  getAllLobbies(): Promise<Lobby[]> {
    return this.request("/lobbies/all");
  }
}

export const caller = Caller.getInstance();
