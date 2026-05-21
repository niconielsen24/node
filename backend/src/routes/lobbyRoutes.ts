import { Router } from "express";
import { LobbyController } from "../controllers/lobbyController";
import { asyncHandler } from "../utils/asyncHandler";

export function createLobbyRouter(controller: LobbyController): Router {
  const router = Router();
  router.get("/all", asyncHandler(controller.getAllLobbies));
  router.get("/:id", asyncHandler(controller.getLobbyById));
  router.post("/", asyncHandler(controller.createLobby));
  router.delete("/:id", asyncHandler(controller.deleteLobby));
  router.post("/:lobbyId/players", asyncHandler(controller.addPlayerToLobby));
  router.delete("/:lobbyId/players", asyncHandler(controller.removePlayerFromLobby));
  router.post("/:lobbyId/create-game", asyncHandler(controller.createGame));
  return router;
}
