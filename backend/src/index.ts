import express from "express";
import { createUserRouter } from "./routes/userRoutes";
import rootRoute from "./routes/rootRoute";
import { corsMiddleware } from "./middleware/cors";
import { authMiddleware } from "./middleware/auth";
import { InMemUserRepo } from "./internal/repository/inmem";


const app = express();
const PORT = process.env.PORT ?? 3000;

const middlewares = [
  corsMiddleware,
  authMiddleware
]

const userRepo = new InMemUserRepo();

app.use(express.json());

app.get("/", rootRoute);

app.use("/users", ...middlewares, createUserRouter(userRepo));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});