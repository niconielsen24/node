import { Lobby, newEmptyLobby } from "../models/lobby";
import { Repository } from "../internal/repository/repo";
import { User } from "../models/user";

export class LobbyService {
    constructor(private repo: Repository<Lobby>) { } 

    async createLobby(owner: User, name: string, isPrivate: boolean = false): Promise<Lobby> {
        const lobby = newEmptyLobby(owner, name, isPrivate);
        await this.repo.create(lobby);
        return lobby;
    }
}