export interface User {
  id: number;
  name: string;
}

export function withName(user: User, name: string): User & { name : string } {
  return { ...user, name };
}
