import { Tile, TileColor } from "./tile";

export interface Board {
    tiles: Tile[][];
}

export function createInitialBoard(): Board {
    // 6x6 = 36 tiles, exactly 9 of each of the 4 colours
    const pool: TileColor[] = [
        ...Array(9).fill(TileColor.Red),
        ...Array(9).fill(TileColor.Green),
        ...Array(9).fill(TileColor.Blue),
        ...Array(9).fill(TileColor.Yellow),
    ];

    // Fisher-Yates shuffle
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    const tiles: Tile[][] = [];
    for (let r = 0; r < 6; r++) {
        tiles.push(pool.slice(r * 6, r * 6 + 6).map(color => ({ color })));
    }

    return { tiles };
}
