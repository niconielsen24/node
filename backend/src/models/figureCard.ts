// Each shape is a list of [row, col] offsets from the anchor tile at [0, 0].
// The shape is normalized: anchor is always the top-leftmost tile of the figure.
export type Shape = [number, number][];

// 7 easy figures + 18 hard figures = 25 unique figure types in the game.
export enum FigureType {
    // Easy figures (figuras fáciles)
    EASY_1 = "EASY_1",   // 2x2 square
    EASY_2 = "EASY_2",   // S-shape (2 left, 2 right offset by 1 row)
    EASY_3 = "EASY_3",   // Z-shape (mirror of S)
    EASY_4 = "EASY_4",   // L-shape (3 down + 1 right at bottom)
    EASY_5 = "EASY_5",   // J-shape (mirror of L)
    EASY_6 = "EASY_6",   // T-shape (3 across + 1 down from center)
    EASY_7 = "EASY_7",   // Straight line of 4

    // Hard figures (figuras difíciles)
    HARD_1  = "HARD_1",  // Plus/cross (center + 4 orthogonal)
    HARD_2  = "HARD_2",  // L with extra (3 down + 2 right at bottom)
    HARD_3  = "HARD_3",  // Mirror of HARD_2
    HARD_4  = "HARD_4",  // S extended (3 tiles offset)
    HARD_5  = "HARD_5",  // Z extended
    HARD_6  = "HARD_6",  // U-shape (2 rows: ends filled, center empty)
    HARD_7  = "HARD_7",  // C-shape (3 tall + top and bottom right)
    HARD_8  = "HARD_8",  // Corner with tail (L + 1 branching)
    HARD_9  = "HARD_9",  // Zigzag 3-step
    HARD_10 = "HARD_10", // Straight line of 5
    HARD_11 = "HARD_11", // T with extra (T + 1 on top)
    HARD_12 = "HARD_12", // 2x3 minus one corner (top-left)
    HARD_13 = "HARD_13", // 2x3 minus one corner (top-right)
    HARD_14 = "HARD_14", // 2x3 minus one corner (bottom-left)
    HARD_15 = "HARD_15", // 2x3 minus one corner (bottom-right)
    HARD_16 = "HARD_16", // W-shape (staircase 3 steps)
    HARD_17 = "HARD_17", // P-shape (2x2 + 1 below left)
    HARD_18 = "HARD_18", // F-shape (asymmetric branch)
}

export const FIGURE_SHAPES: Record<FigureType, Shape> = {
    [FigureType.EASY_1]: [[0,0],[0,1],[1,0],[1,1]],
    [FigureType.EASY_2]: [[0,0],[0,1],[1,1],[1,2]],
    [FigureType.EASY_3]: [[0,1],[0,2],[1,0],[1,1]],
    [FigureType.EASY_4]: [[0,0],[1,0],[2,0],[2,1]],
    [FigureType.EASY_5]: [[0,1],[1,1],[2,0],[2,1]],
    [FigureType.EASY_6]: [[0,0],[0,1],[0,2],[1,1]],
    [FigureType.EASY_7]: [[0,0],[1,0],[2,0],[3,0]],

    [FigureType.HARD_1]:  [[0,1],[1,0],[1,1],[1,2],[2,1]],
    [FigureType.HARD_2]:  [[0,0],[1,0],[2,0],[2,1],[2,2]],
    [FigureType.HARD_3]:  [[0,2],[1,2],[2,0],[2,1],[2,2]],
    [FigureType.HARD_4]:  [[0,0],[0,1],[1,1],[1,2],[2,2]],
    [FigureType.HARD_5]:  [[0,1],[0,2],[1,0],[1,1],[2,0]],
    [FigureType.HARD_6]:  [[0,0],[0,2],[1,0],[1,1],[1,2]],
    [FigureType.HARD_7]:  [[0,0],[1,0],[1,1],[2,0],[3,0]],
    [FigureType.HARD_8]:  [[0,0],[0,1],[1,0],[2,0],[2,1]],
    [FigureType.HARD_9]:  [[0,0],[1,0],[1,1],[2,1],[2,2]],
    [FigureType.HARD_10]: [[0,0],[1,0],[2,0],[3,0],[4,0]],
    [FigureType.HARD_11]: [[0,1],[1,0],[1,1],[1,2],[2,1],[3,1]],
    [FigureType.HARD_12]: [[0,1],[0,2],[1,0],[1,1],[1,2]],
    [FigureType.HARD_13]: [[0,0],[0,1],[1,0],[1,1],[1,2]],
    [FigureType.HARD_14]: [[0,0],[0,1],[0,2],[1,0],[1,1]],
    [FigureType.HARD_15]: [[0,0],[0,1],[0,2],[1,1],[1,2]],
    [FigureType.HARD_16]: [[0,0],[1,0],[1,1],[2,1],[2,2]],
    [FigureType.HARD_17]: [[0,0],[0,1],[1,0],[1,1],[2,0]],
    [FigureType.HARD_18]: [[0,1],[1,0],[1,1],[2,1],[2,2]],
};

export enum FigureCardStatus {
    IN_DECK   = "IN_DECK",   // not yet drawn
    ACTIVE    = "ACTIVE",    // face up in player's sector
    BLOCKED   = "BLOCKED",   // flipped by an opponent
    COMPLETED = "COMPLETED", // formed by owner, discarded
}

export interface FigureCard {
    id: number;
    type: FigureType;
    status: FigureCardStatus;
}
