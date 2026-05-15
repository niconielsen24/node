import { Router } from "express";
import * as userController from "../controllers/userController";
import { Repository } from "../internal/repository/repo";

export function createUserRouter(repo: Repository) {
    const router = Router();

    router.get("/:id", userController.getById(repo));
    return router;
}

