import type { RootRes } from "../types/contracts/user";

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

    async getRoot(): Promise<RootRes> {
        const response = await fetch(`${this.baseUrl}/`);
        return response.json();
    }
}

export const caller = Caller.getInstance();