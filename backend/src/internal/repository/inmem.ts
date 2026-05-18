import { Game } from "../../models/game";
import { Lobby } from "../../models/lobby";
import { User } from "../../models/user";
import { Repository } from "./repo";

export class InMemUserRepo implements Repository<User> {
  private users: Map<string, User> = new Map();

  async create(data: User): Promise<User> {
    this.users.set(data.id, data);
    return data;
  }

  async read(id: string): Promise<User | null> {
    return this.users.get(id) ?? null;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const existing = this.users.get(id);
    if (!existing) {
      throw new Error(`User ${id} not found`);
    }
    const updated = { ...existing, ...data };
    this.users.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    this.users.delete(id);
  }
}

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
}

export class InMemGameRepo implements Repository<Game> {
  async create(data: Game): Promise<Game> { return data; }
  async read(_id: string): Promise<Game | null> { return null; }
  async update(_id: string, data: Partial<Game>): Promise<Game> { return { ...data }; }
  async delete(_id: string): Promise<void> { }
}
