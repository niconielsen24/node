import { Router } from "express";
import { GameController } from "../controllers/gameController";

export function createGameRouter(controller : GameController): Router {
    const router = Router();

    return router;
}