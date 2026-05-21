import { BadRequestError } from "../errors/httpErrors";
import { GameService } from "../services/gameService";
import { Request, Response } from "express";

export class GameController {
    constructor(private gameService: GameService) { }

    
}