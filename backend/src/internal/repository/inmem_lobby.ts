import { Lobby } from "../../models/lobby";
import { Repository } from "./repo";

export class InMemLobbyRepo implements Repository<Lobby> {
  private lobbies: Map<string, Lobby> = new Map();

  async create(data: Lobby): Promise<Lobby> {
    this.lobbies.set(data.id, data);
    return data;
  }

  async read(id: string): Promise<Lobby | null> {
    return this.lobbies.get(id) ?? null;
  }

  async update(id: string, data: Partial<Lobby>): Promise<Lobby> {
    const existing = this.lobbies.get(id);
    if (!existing) {
      throw new Error(`Lobby ${id} not found`);
    }
    const updated = { ...existing, ...data };
    this.lobbies.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    this.lobbies.delete(id);
  }

  async readAll(): Promise<Lobby[]> {
    return Array.from(this.lobbies.values());
  }
}
