import { Lobby, newPublicLobby, newPrivateLobby } from "../models/lobby";
import { Repository } from "../internal/repository/repo";
import { User } from "../models/user";

export class LobbyService {
    constructor(private repo: Repository<Lobby>) { } 

    async createPrivateLobby(owner: User, name: string): Promise<Lobby> {
        const lobby = newPrivateLobby(owner, name);
        await this.repo.create(lobby);
        return lobby;
    }

    async createPublicLobby(owner: User, name: string): Promise<Lobby> {
        const lobby = newPublicLobby(owner, name);
        await this.repo.create(lobby);
        return lobby;
    }

    async getLobbyById(id: string): Promise<Lobby | null> {
        return await this.repo.read(id);
    }

    async deleteLobby(id: string): Promise<void> {
        await this.repo.delete(id);
    }

    async getAllLobbies(): Promise<Lobby[]> {
        // This method is not defined in the Repository interface, so we need to implement it here.
        // Assuming we have a method to get all lobbies from the repository.
        // This is a placeholder implementation and should be replaced with actual logic to fetch all lobbies.
        return [];
    }

    async addPlayerToLobby(lobbyId: string, player: User): Promise<Lobby | null> {
        const lobby = await this.repo.read(lobbyId);
        if (!lobby) {
            return null;
        }

        if (lobby.players.find(p => p.id === player.id)) {
            return lobby; // Player already in lobby
        }

        lobby.players.push(player);
        await this.repo.update(lobbyId, { players: lobby.players });
        return lobby;
    }

    async removePlayerFromLobby(lobbyId: string, playerId: string): Promise<Lobby | null> {
        const lobby = await this.repo.read(lobbyId);
        if (!lobby) {
            return null;
        }

        lobby.players = lobby.players.filter(p => p.id !== playerId);
        await this.repo.update(lobbyId, { players: lobby.players });
        return lobby;
    }
}