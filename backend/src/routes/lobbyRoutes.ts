import { Router } from "express";
import { LobbyController } from "../controllers/lobbyController";

export function createLobbyRouter(controller: LobbyController): Router {
    const router = Router();

    return router;
}