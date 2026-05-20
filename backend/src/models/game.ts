import { User } from "./user";
import { Board, createInitialBoard } from "./board";
import { MovementCard, MovementType } from "./movementCard";
import { FigureCard, FigureCardStatus, FigureType } from "./figureCard";
import { Player } from "./player";
import { TileColor } from "./tile";
import { randomUUID } from "crypto";

export interface Game {
    id: string;
    name: string;
    players: Player[];
    movementDeck: MovementCard[];
    movementDiscard: MovementCard[];
    boardState: Board;
    turn: Player;
    lastFigureColor: TileColor | null; // Rule 3: same colour can't be used in consecutive figures
}

function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function buildMovementDeck(): MovementCard[] {
    // 7 types × 7 cards each = 49 cards
    const types = Object.values(MovementType);
    let id = 0;
    const deck: MovementCard[] = [];
    for (const type of types) {
        for (let i = 0; i < 7; i++) {
            deck.push({ id: id++, type, used: false });
        }
    }
    return shuffle(deck);
}

function buildFigureDeck(): FigureCard[] {
    // Each player gets 23 of the 25 figure types, randomly selected, shuffled.
    // First 3 are immediately set to ACTIVE (face-up in the player's sector).
    const allTypes = shuffle(Object.values(FigureType) as FigureType[]);
    const selected = allTypes.slice(0, 23);

    return selected.map((type, i) => ({
        id: i,
        type,
        status: i < 3 ? FigureCardStatus.ACTIVE : FigureCardStatus.IN_DECK,
    }));
}

export function createInitialGame(name: string, users: User[]): Game {
    let movementDeck = buildMovementDeck();
    let id = randomUUID();

    // Deal 3 movement cards to each player from the top of the deck
    const players: Player[] = users.map(user => {
        const hand = movementDeck.splice(0, 3);
        return {
            user,
            hand,
            figureCards: buildFigureDeck(),
        };
    });

    return {
        id,
        name,
        players,
        movementDeck,
        movementDiscard: [],
        boardState: createInitialBoard(),
        turn: players[0],
        lastFigureColor: null,
    };
}
