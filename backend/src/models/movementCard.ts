export enum MovementType {
    LINE_ADJACENT = "LINE_ADJACENT",         // swap adjacent tile in same row/col
    LINE_WITH_GAP = "LINE_WITH_GAP",         // swap tile skipping one in same row/col
    DIAGONAL_ADJACENT = "DIAGONAL_ADJACENT", // swap diagonally adjacent tile
    DIAGONAL_WITH_GAP = "DIAGONAL_WITH_GAP", // swap diagonal tile skipping one
    L_RIGHT = "L_RIGHT",                     // L-shape: 2 forward + 1 right
    L_LEFT = "L_LEFT",                       // L-shape: 2 forward + 1 left
    LINE_LATERAL = "LINE_LATERAL",           // swap with any of 4 edge tiles in same row/col
}

export interface MovementCard {
    id: number;
    type: MovementType;
    used: boolean;
}
