import { io, Socket } from "socket.io-client";

export class WsClient {
    private static instance: Socket | null = null;
    private static readonly SERVER_URL = import.meta.env.VITE_WS_URL || "http://localhost:3000";

    public static getInstance(): Socket {
        if (!WsClient.instance) {
            WsClient.instance = io(WsClient.SERVER_URL, {
                withCredentials: true,
            });
        }
        return WsClient.instance;
    }
}

export const socket = WsClient.getInstance();