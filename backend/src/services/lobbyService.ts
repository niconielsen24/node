import { Lobby, newPublicLobby, newPrivateLobby } from "../models/lobby";
import { Repository } from "../internal/repository/repo";
import { User } from "../models/user";
import { createInitialGame, Game } from "../models/game";
import { create } from "domain";

export class LobbyService {
    constructor(
        private repo: Repository<Lobby>,
        private gameRepo: Repository<Game>
    ) { } 

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
        const lobbies = await this.repo.readAll();
         
        return lobbies;
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

    async createGame(lobbyId: string, name: string): Promise<Game | null> {
        const lobby = await this.repo.read(lobbyId);
        if (!lobby) {
            return null;
        }

        const game = createInitialGame(name, lobby.players);
        await this.gameRepo.create(game);
        await this.deleteLobby(lobbyId);

        return game;
    }
}