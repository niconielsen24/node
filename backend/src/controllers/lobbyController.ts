import { LobbyService } from "../services/lobbyService";
import { Request, Response } from "express";

export class LobbyController {
    constructor(private lobbyService: LobbyService) { }

    async createLobby(req: Request, res: Response): Promise<Response> {
        const { owner, name, isPrivate } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Lobby name is required" });
        }

        if (!owner) {
            return res.status(400).json({ error: "Owner is required" });
        }

        try {
            const lobby = await this.lobbyService.createLobby(owner, name, isPrivate);
            return res.status(201).json(lobby);
        } catch (error) {
            console.error("Error creating lobby:", error);
            return res.status(500).json({ error: "Failed to create lobby" });
        }
    }
}