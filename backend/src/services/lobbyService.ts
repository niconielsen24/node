import { Lobby } from "../models/lobby";
import { Repository } from "../internal/repository/repo";

export class LobbyService {
    constructor(private repo: Repository<Lobby>) { } 
}