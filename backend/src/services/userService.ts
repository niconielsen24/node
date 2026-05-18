import { Repository } from "../internal/repository/repo";
import { newUser, User } from "../models/user";

export class UserService {
  constructor(private repo: Repository<User>) { }

  getUserById(id: string): Promise<User | null> {
    return this.repo.read(id);
  }

  createUser(name: string): Promise<User> {
    const user = newUser(name);
    return this.repo.create(user);
  }

  deleteUser(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}