import type { User } from "./user";

export interface Lobby {
  id: string;
  name: string;
  isPrivate: boolean;
  players: User[];
}
