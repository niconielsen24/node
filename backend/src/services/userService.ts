import { Repository } from "../internal/repository/repo";
import { User } from "../models/user";

export function getUserById(id: string, repo: Repository<User>): Promise<User | null> {
  return repo.read(id);
}

export function createUser(user: User, repo: Repository<User>): Promise<User> {
  return repo.create(user);
}
