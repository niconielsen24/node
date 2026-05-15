export interface Repository {
    create<T>(data: T): Promise<T>;
    read<T>(id: string): Promise<T | null>;
    update<T>(id: string, data: T): Promise<T>;
    delete(id: string): Promise<void>;
}