import { Game } from "../../models/game";
import { Repository } from "./repo";

export class InMemGameRepo implements Repository<Game> {
  private games: Map<string, Game> = new Map();

  async create(data: Game): Promise<Game> {
    this.games.set(data.id, data);
    return data;
  }

  async read(id: string): Promise<Game | null> {
    return this.games.get(id) || null;
  }

  async update(id: string, data: Partial<Game>): Promise<Game> {
    const game = await this.read(id);
    if (!game) throw new Error("Game not found");
    this.games.set(id, { ...game, ...data });
    return { ...game, ...data };
  }

  async delete(id: string): Promise<void> {
    this.games.delete(id);
  }

  async readAll(): Promise<Game[]> {
    return Array.from(this.games.values());
  }
}
