import { Repository } from "../internal/repository/repo";
import { Game } from "../models/game";

export class GameService {
    constructor(private repo : Repository<Game>) { }
}