import { Repository } from "../internal/repository/repo";
import { User } from "../models/user";

export function getUserById(id: number, repo: Repository): Promise<User | null> {
  return repo.read<User>(id.toString());
}

export function createUser(user : User, repo : Repository): Promise<User> {
  return repo.create(user);
}