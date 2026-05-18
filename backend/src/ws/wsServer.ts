import { Server } from "socket.io";
import { Server as HttpServer } from "http";

export class WsServer {
  private static io: Server;
  private static activeRooms = new Set<string>();

  static init(httpServer: HttpServer): void {
    WsServer.io = new Server(httpServer, {
      cors: { origin: "*" },
    });

    WsServer.io.on("connection", (socket) => {
      socket.on("join-room", (roomId: string) => {
        if (!WsServer.activeRooms.has(roomId)) {
          socket.emit("room:not-found");
          return;
        }
        socket.join(roomId);
      });

      socket.on("leave-room", (roomId: string) => {
        socket.leave(roomId);
      });
    });
  }

  static openRoom(roomId: string): void {
    WsServer.activeRooms.add(roomId);
  }

  static closeRoom(roomId: string): void {
    WsServer.io.to(roomId).emit("room:closed");
    WsServer.activeRooms.delete(roomId);
  }

  static notify(roomId: string, event: string): void {
    WsServer.io.to(roomId).emit(event);
  }
}
