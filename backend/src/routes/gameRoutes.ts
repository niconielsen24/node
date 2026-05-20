import { Router } from "express";
import { GameController } from "../controllers/gameController";
import { asyncHandler } from "../utils/asyncHandler";

export function createGameRouter(controller : GameController): Router {
    const router = Router();

    router.post("/create", asyncHandler(controller.createGame));

    return router;
}