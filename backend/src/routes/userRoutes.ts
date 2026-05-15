import { Router } from "express";
import * as userController from "../controllers/userController";
import { Repository } from "../internal/repository/repo";
import { User } from "../models/user";

export function createUserRouter(repo: Repository<User>) {
    const router = Router();
    router.get("/:id", userController.getById(repo));
    router.post("/newUser", userController.createUser(repo));
    return router;
}

