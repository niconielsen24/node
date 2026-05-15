import express from "express";
import { createUserRouter } from "./routes/userRoutes";
import { corsMiddleware } from "./middleware/cors";
import { authMiddleware } from "./middleware/auth";
import { InMemUserRepo } from "./internal/repository/inmem";
import { logger } from "./middleware/logger";


const app = express();
const PORT = process.env.PORT ?? 3000;

const middlewares = [
  corsMiddleware,
  authMiddleware
]

const userRepo = new InMemUserRepo();

app.use(express.json());
app.use(corsMiddleware);
app.use(logger);

app.use("/users", createUserRouter(userRepo));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});