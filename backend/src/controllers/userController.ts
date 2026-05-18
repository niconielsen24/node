import { Request, Response } from "express";
import { constants } from "http2";
import { UserService } from "../services/userService";

export class UserController {
  constructor(private userService: UserService) { }

  getById = async (req: Request, res: Response): Promise<void> => {
    const user = await this.userService.getUserById(req.params.id);

    if (!user) {
      res.status(constants.HTTP_STATUS_NOT_FOUND).json({ message: "User not found" });
      return;
    }

    res.json(user);
  };

  createUser = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body;

    if (!name) {
      res.status(constants.HTTP_STATUS_BAD_REQUEST).json({ message: "Name is required" });
      return;
    }

    const created = await this.userService.createUser(name);
    res.status(constants.HTTP_STATUS_CREATED).json(created);
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    await this.userService.deleteUser(req.params.id);
    res.status(constants.HTTP_STATUS_NO_CONTENT).send();  
  };
}