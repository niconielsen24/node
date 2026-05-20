import { User } from "./user";
import { MovementCard } from "./movementCard";
import { FigureCard } from "./figureCard";

export interface Player {
    user: User;
    hand: MovementCard[];       // max 3 cards
    figureCards: FigureCard[];  // visible sector (max 3 active) + blocked
}
