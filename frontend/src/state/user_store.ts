import { create } from "zustand";
import type { User } from "../internal/user/user_class";

interface UserState {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user: User | null) => set({ user }),
}));