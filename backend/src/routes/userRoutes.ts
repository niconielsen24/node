import { Router } from "express";
import { UserController } from "../controllers/userController";
import { asyncHandler } from "../utils/asyncHandler";

export function createUserRouter(controller: UserController): Router {
  const router = Router();
  router.get("/:id", asyncHandler(controller.getById));
  router.post("/", asyncHandler(controller.createUser));
  router.delete("/:id", asyncHandler(controller.deleteUser));
  return router;
}
