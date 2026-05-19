import { Request, Response } from "express";
import { constants } from "http2";
import { LobbyService } from "../services/lobbyService";
import { WsServer } from "../ws/wsServer";
import { BadRequestError, NotFoundError } from "../errors/httpErrors";

export class LobbyController {
  constructor(private lobbyService: LobbyService, private wsServer: typeof WsServer) {}

  createLobby = async (req: Request, res: Response): Promise<void> => {
    const { owner, name, isPrivate } = req.body;
    if (!name) throw new BadRequestError("Lobby name is required");
    if (!owner) throw new BadRequestError("Owner is required");

    const lobby = isPrivate
      ? await this.lobbyService.createPrivateLobby(owner, name)
      : await this.lobbyService.createPublicLobby(owner, name);

    this.wsServer.openRoom(lobby.id);
    res.status(constants.HTTP_STATUS_CREATED).json(lobby);
  };

  getLobbyById = async (req: Request, res: Response): Promise<void> => {
    const lobby = await this.lobbyService.getLobbyById(req.params.id);
    if (!lobby) throw new NotFoundError("Lobby not found");
    res.json(lobby);
  };

  deleteLobby = async (req: Request, res: Response): Promise<void> => {
    await this.lobbyService.deleteLobby(req.params.id);
    this.wsServer.closeRoom(req.params.id);
    res.status(constants.HTTP_STATUS_NO_CONTENT).send();
  };

  addPlayerToLobby = async (req: Request, res: Response): Promise<void> => {
    const { lobbyId } = req.params;
    const { player } = req.body;
    if (!player) throw new BadRequestError("Player is required");

    const lobby = await this.lobbyService.addPlayerToLobby(lobbyId, player);
    if (!lobby) throw new NotFoundError("Lobby not found");

    this.wsServer.notify(lobbyId, "lobby:changed");
    res.json(lobby);
  };

  removePlayerFromLobby = async (req: Request, res: Response): Promise<void> => {
    const { lobbyId } = req.params;
    const { playerId } = req.body;
    if (!playerId) throw new BadRequestError("Player ID is required");

    const lobby = await this.lobbyService.removePlayerFromLobby(lobbyId, playerId);
    if (!lobby) throw new NotFoundError("Lobby not found");

    this.wsServer.notify(lobbyId, "lobby:changed");
    res.json(lobby);
  };

  getAllLobbies = async (_req: Request, res: Response): Promise<void> => {
    const lobbies = await this.lobbyService.getAllLobbies();
    res.json(lobbies);
  };
}
