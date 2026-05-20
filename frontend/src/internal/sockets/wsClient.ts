import { io, Socket } from "socket.io-client";

export class WsClient {
    private static instance: Socket | null = null;
    private static readonly SERVER_URL = import.meta.env.VITE_WS_URL || "http://localhost:3000";

    public static getInstance(): Socket {
        if (!WsClient.instance) {
            WsClient.instance = io(WsClient.SERVER_URL, {
                withCredentials: false,
            });
        }

        return WsClient.instance;
    }

    public static joinRoom(roomId: string): void {
        WsClient.getInstance().emit("join-room", roomId);
    }

    public static leaveRoom(roomId: string): void {
        WsClient.getInstance().emit("leave-room", roomId);
    }

    public static notify(roomId: string, event: string): void {
        WsClient.getInstance().emit("notify", { roomId, event });
    }
}

export const socket = WsClient.getInstance();