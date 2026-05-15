import { UUID } from "crypto";

export interface User {
  id: UUID;
  name: string;
}

export function newUser(name: string): User {
  return {
    id: crypto.randomUUID(),
    name,
  };
}
