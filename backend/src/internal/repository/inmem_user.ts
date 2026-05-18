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
