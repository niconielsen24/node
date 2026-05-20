import type { User } from "./user";

// --- Board ---

export const TileColor = {
    Red:    0,
    Green:  1,
    Blue:   2,
    Yellow: 3,
} as const;
export type TileColor = typeof TileColor[keyof typeof TileColor];

export interface Tile {
    color: TileColor;
}

export interface Board {
    tiles: Tile[][];
}

// --- Movement cards ---

export const MovementType = {
    LINE_ADJACENT:     "LINE_ADJACENT",
    LINE_WITH_GAP:     "LINE_WITH_GAP",
    DIAGONAL_ADJACENT: "DIAGONAL_ADJACENT",
    DIAGONAL_WITH_GAP: "DIAGONAL_WITH_GAP",
    L_RIGHT:           "L_RIGHT",
    L_LEFT:            "L_LEFT",
    LINE_LATERAL:      "LINE_LATERAL",
} as const;
export type MovementType = typeof MovementType[keyof typeof MovementType];

export interface MovementCard {
    id: number;
    type: MovementType;
    used: boolean;
}

// --- Figure cards ---

export type Shape = [number, number][];

export const FigureType = {
    EASY_1:  "EASY_1",
    EASY_2:  "EASY_2",
    EASY_3:  "EASY_3",
    EASY_4:  "EASY_4",
    EASY_5:  "EASY_5",
    EASY_6:  "EASY_6",
    EASY_7:  "EASY_7",
    HARD_1:  "HARD_1",
    HARD_2:  "HARD_2",
    HARD_3:  "HARD_3",
    HARD_4:  "HARD_4",
    HARD_5:  "HARD_5",
    HARD_6:  "HARD_6",
    HARD_7:  "HARD_7",
    HARD_8:  "HARD_8",
    HARD_9:  "HARD_9",
    HARD_10: "HARD_10",
    HARD_11: "HARD_11",
    HARD_12: "HARD_12",
    HARD_13: "HARD_13",
    HARD_14: "HARD_14",
    HARD_15: "HARD_15",
    HARD_16: "HARD_16",
    HARD_17: "HARD_17",
    HARD_18: "HARD_18",
} as const;
export type FigureType = typeof FigureType[keyof typeof FigureType];

export const FigureCardStatus = {
    IN_DECK:   "IN_DECK",
    ACTIVE:    "ACTIVE",
    BLOCKED:   "BLOCKED",
    COMPLETED: "COMPLETED",
} as const;
export type FigureCardStatus = typeof FigureCardStatus[keyof typeof FigureCardStatus];

export interface FigureCard {
    id: number;
    type: FigureType;
    status: FigureCardStatus;
}

// --- Player ---

export interface Player {
    user: User;
    hand: MovementCard[];
    figureCards: FigureCard[];
}

// --- Game ---

export interface Game {
    id: string;
    name: string;
    players: Player[];
    movementDeck: MovementCard[];
    movementDiscard: MovementCard[];
    boardState: Board;
    turn: Player;
    lastFigureColor: TileColor | null;
}
