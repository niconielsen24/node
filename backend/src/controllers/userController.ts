import { Request, Response } from "express";
import * as userService from "../services/userService";
import { Repository } from "../internal/repository/repo";
import { User, newUser } from "../models/user";
import { constants } from "http2";

export function getById(repo: Repository<User>) {
  return async function (req: Request, res: Response): Promise<void> {
    const user = await userService.getUserById(req.params.id, repo);

    if (!user) {
      res.status(constants.HTTP_STATUS_NOT_FOUND).json({ message: "User not found" });
      return;
    }

    res.json(user);
  };
}

export function createUser(repo: Repository<User>) {
  return async function (req: Request, res: Response): Promise<void> {
    const { name } = req.body;

    if (!name) {
      res.status(constants.HTTP_STATUS_BAD_REQUEST).json({ message: "Name is required" });
      return;
    }

    const created = await userService.createUser(newUser(name), repo);
    res.status(constants.HTTP_STATUS_CREATED).json(created);
  };
}
