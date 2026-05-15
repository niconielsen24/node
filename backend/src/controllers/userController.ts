import { Request, Response } from "express";
import * as userService from "../services/userService";
import { Repository } from "../internal/repository/repo";
import { newUser } from "../models/user";
import {constants } from "http2";

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

export function createUser(repo: Repository) {
  return function (req: Request, res: Response): void {
    const { name } = req.body;

    if (!name) {
      res.status(constants.HTTP_STATUS_BAD_REQUEST).json({ message: "Name is required" });
      return;
    }

    const user = newUser(name);
    const createdUser = userService.createUser(user, repo);
    res.status(201).json(createdUser);
  }
}