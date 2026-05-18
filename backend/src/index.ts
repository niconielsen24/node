import express from "express";
import { createUserRouter } from "./routes/userRoutes";
import { corsMiddleware } from "./middleware/cors";
import { authMiddleware } from "./middleware/auth";
import { InMemGameRepo, InMemLobbyRepo, InMemUserRepo } from "./internal/repository/inmem";
import { logger } from "./middleware/logger";
import { UserService } from "./services/userService";
import { UserController } from "./controllers/userController";
import { LobbyController } from "./controllers/lobbyController";
import { LobbyService } from "./services/lobbyService";
import { createLobbyRouter } from "./routes/lobbyRoutes";
import { GameService } from "./services/gameService";
import { GameController } from "./controllers/gameController";
import { createGameRouter } from "./routes/gameRoutes";


const app = express();
const PORT = process.env.PORT ?? 3000;

// Repositories
const userRepo = new InMemUserRepo();
const lobbyRepo = new InMemLobbyRepo();
const gameRepo = new InMemGameRepo();

// Services
const userService = new UserService(userRepo);
const lobbyService = new LobbyService(lobbyRepo);
const gameService = new GameService(gameRepo);

// Controllers
const userController = new UserController(userService);
const lobbyController = new LobbyController(lobbyService);
const gameController = new GameController(gameService);

app.use(express.json());
app.use(corsMiddleware);
app.use(logger);

app.use("/users", createUserRouter(userController));
app.use("/lobbies", createLobbyRouter(lobbyController));
app.use("/games", createGameRouter(gameController));

const server = app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

function shutdown() {

  // Gracefully close the server
  server.close(() => {
    console.log("Server closed");
  });


  // Forcefully exit after 15 seconds if not closed
  setTimeout(() => {
    console.error("Failed to close server gracefully, exiting...");
    process.exit(1);
  }, 15000);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);