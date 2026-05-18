import { Router } from "express";
import { UserController } from "../controllers/userController";

export function createUserRouter(controller: UserController): Router {
    const router = Router();
    router.get("/:id", controller.getById);
    router.post("/newUser", controller.createUser);
    router.delete("/:id", controller.deleteUser);
    return router;
}

