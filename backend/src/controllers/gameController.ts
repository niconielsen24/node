import { BadRequestError } from "../errors/httpErrors";
import { GameService } from "../services/gameService";
import { Request, Response } from "express";

export class GameController {
    constructor(private gameService: GameService) { }

    createGame = async (req: Request, res: Response): Promise<void> => {
        if (!req.body.users || !req.body.name) throw new BadRequestError("Missing required fields: users and name");

        const { users, name } = req.body;
        const game = await this.gameService.create(users, name);
        res.status(201).json(game);
    };
}