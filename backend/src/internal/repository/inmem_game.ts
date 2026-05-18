import { Game } from "../../models/game";
import { Repository } from "./repo";

export class InMemGameRepo implements Repository<Game> {
  async create(data: Game): Promise<Game> { return data; }
  async read(_id: string): Promise<Game | null> { return null; }
  async update(_id: string, data: Partial<Game>): Promise<Game> { return { ...data }; }
  async delete(_id: string): Promise<void> { }
}
