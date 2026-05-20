import { Repository } from "../internal/repository/repo";
import { createInitialGame, Game } from "../models/game";
import { User } from "../models/user";

export class GameService {
    constructor(private repo : Repository<Game>) { }

    async create(users: User[], name: string): Promise<Game> {
        const game = createInitialGame(name, users);
        return await this.repo.create(game);
    }
}