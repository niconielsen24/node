import { LobbyService } from "../services/lobbyService";
import { Request, Response } from "express";
import { constants } from "http2";

export class LobbyController {
    constructor(private lobbyService: LobbyService) { }

    async createLobby(req: Request, res: Response): Promise<Response> {
        const { owner, name, isPrivate } = req.body;
        if (!name) {
            return res.status(constants.HTTP_STATUS_BAD_REQUEST)
                .json({ error: "Lobby name is required" });
        }

        if (!owner) {
            return res.status(constants.HTTP_STATUS_BAD_REQUEST)
                .json({ error: "Owner is required" });
        }

        try {
            let lobby;
            if (isPrivate) {
                lobby = await this.lobbyService.createPrivateLobby(owner, name);
            } else {
                lobby = await this.lobbyService.createPublicLobby(owner, name);
            }
            return res.status(constants.HTTP_STATUS_CREATED).json(lobby);
        } catch (error) {
            console.error("Error creating lobby:", error);
            return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({ error: "Failed to create lobby" });
        }
    }

    async getLobbyById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const lobby = await this.lobbyService.getLobbyById(id);
            if (!lobby) {
                return res.status(constants.HTTP_STATUS_NOT_FOUND)
                    .json({ error: "Lobby not found" });
            }
            return res.json(lobby);
        } catch (error) {
            console.error("Error fetching lobby:", error);
            return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({ error: "Failed to fetch lobby" });
        }
    }

    async deleteLobby(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            await this.lobbyService.deleteLobby(id);
            return res.status(constants.HTTP_STATUS_NO_CONTENT).send();
        } catch (error) {
            console.error("Error deleting lobby:", error);
            return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({ error: "Failed to delete lobby" });
        }
    }

    async addPlayerToLobby(req: Request, res: Response): Promise<Response> {
        const { lobbyId } = req.params;
        const { player } = req.body;

        if (!player) {
            return res.status(constants.HTTP_STATUS_BAD_REQUEST)
                .json({ error: "Player is required" });
        }

        try {
            const lobby = await this.lobbyService.addPlayerToLobby(lobbyId, player);
            if (!lobby) {
                return res.status(constants.HTTP_STATUS_NOT_FOUND)
                    .json({ error: "Lobby not found" });
            }
            return res.json(lobby);
        } catch (error) {
            console.error("Error adding player to lobby:", error);
            return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({ error: "Failed to add player to lobby" });
        }
    }

    async removePlayerFromLobby(req: Request, res: Response): Promise<Response> {
        const { lobbyId } = req.params;
        const { playerId } = req.body;

        if (!playerId) {
            return res.status(constants.HTTP_STATUS_BAD_REQUEST)
                .json({ error: "Player ID is required" });
        }

        try {
            const lobby = await this.lobbyService.removePlayerFromLobby(lobbyId, playerId);
            if (!lobby) {
                return res.status(constants.HTTP_STATUS_NOT_FOUND)
                    .json({ error: "Lobby not found" });
            }
            return res.json(lobby);
        } catch (error) {
            console.error("Error removing player from lobby:", error);
            return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({ error: "Failed to remove player from lobby" });
        }
    }
}