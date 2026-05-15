import { User } from "../../models/user";
import { Repository } from "./repo";

export class InMemUserRepo implements Repository<User> {
  private data: Map<string, User> = new Map();

  async create(data: User): Promise<User> {
    this.data.set(data.id, data);
    return data;
  }

  async read(id: string): Promise<User | null> {
    return this.data.get(id) ?? null;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const existing = this.data.get(id);
    if (!existing) {
      throw new Error(`User ${id} not found`);
    }
    const updated = { ...existing, ...data };
    this.data.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    this.data.delete(id);
  }
}

export class InMemGameRepo implements Repository<unknown> {
  async create(data: unknown): Promise<unknown> { return data; }
  async read(_id: string): Promise<unknown | null> { return null; }
  async update(_id: string, data: unknown): Promise<unknown> { return data; }
  async delete(_id: string): Promise<void> { }
}
