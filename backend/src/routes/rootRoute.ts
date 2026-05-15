import { Router } from "express";
import rootRoute from "../controllers/rootController";

const router = Router();

router.get("/", rootRoute);

export default router;