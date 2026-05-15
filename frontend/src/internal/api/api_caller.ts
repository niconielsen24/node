import type { User } from "../../types/contracts/user";

class Caller {
    private static instance: Caller;
    private readonly baseUrl: string;

    private constructor() {
        this.baseUrl = import.meta.env.VITE_API_URL;
    }

    static getInstance(): Caller {
        if (!Caller.instance) {
            Caller.instance = new Caller();
        }
        return Caller.instance;
    }

    async postUser(name : string): Promise<User> {
        const response = await fetch(`${this.baseUrl}/users/newUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: name }), 
        });

        if (!response.ok) {
            throw new Error(`Failed to create user: ${response.statusText}`);
        }

        return response.json();
    }
}

export const caller = Caller.getInstance();