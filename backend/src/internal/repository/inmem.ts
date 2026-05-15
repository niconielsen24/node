import { Repository } from "./repo";

export class InMemUserRepo implements Repository {
  private data: Map<string, any> = new Map();

  async create<T>(data: T): Promise<T> {
    const id = Math.random().toString(36).substr(2, 9);
    this.data.set(id, { ...data, id });
    return { ...data, id };
  }

  async read<T>(id: string): Promise<T | null> {
    const item = this.data.get(id);
    return item || null;
  }

  async update<T>(id: string, data: T): Promise<T> {
    const item = await this.read(id);
    if (!item) {
      throw new Error("Item not found");
    }
    this.data.set(id, { ...item, ...data });
    return { ...item, ...data };
  }

  async delete(id: string): Promise<void> {
    this.data.delete(id);
  }
}

export class InMemGameRepo implements Repository {
    //implement empty methosds for now, as we will implement them later when we have the game logic
    async create<T>(data: T): Promise<T> {
        return data;
    }
    async read<T>(id: string): Promise<T | null> {
        return null;
    }
    async update<T>(id: string, data: T): Promise<T> {
        return data;
    }
    async delete(id: string): Promise<void> {
        return;
    }

} 