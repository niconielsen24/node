import { Request, Response } from "express";
import * as userService from "../services/userService";
import { Repository } from "../internal/repository/repo";

export function getById(repo: Repository) {
  return function (req: Request, res: Response): void {

    const id = parseInt(req.params.id, 10);
    const user = userService.getUserById(id, repo);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  }
}