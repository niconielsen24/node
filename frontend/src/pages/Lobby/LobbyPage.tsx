import { useEffect } from "react";
import { WsClient, socket } from "../../internal/sockets/wsClient";
import { useLobbyStore } from "../../state/lobby_store";
import { useUserStore } from "../../state/user_store";
import { useNavigate, useParams } from "react-router-dom";
import { caller } from "../../internal/api/api_caller";
import { Footer } from "../../components/Footer";
import { LobbyHeader } from "./components/LobbyHeader";
import { PlayerList } from "./components/PlayerList";


export const LobbyPage = () => {
    const { myLobbies, removeMyLobby } = useLobbyStore();
    const { user } = useUserStore();
    const { id: lobbyId } = useParams();

    const navigate = useNavigate();

    const lobby = myLobbies?.find((lobby) => lobby.id === lobbyId);

    const leaveLobby = async () => {
        if (!lobby || !user) return;
        try {
            await caller.removePlayerFromLobby(lobby.id, user.id);
            WsClient.leaveRoom(lobby.id);
            removeMyLobby(lobby.id);
            navigate("/");
            console.log("Left lobby:", lobby.id);
        } catch (error) {
            console.error("Error leaving lobby:", error);
        }
    };

    const createGame = async () => {
        if (!lobby) return;
        try {
            const game = await caller.createGame(lobby.players, lobby.name);
            console.log("Game created:", game);
        } catch (error) {
            console.error("Error creating game:", error);
        }
    };

    useEffect(() => {
        if (!myLobbies || myLobbies.length === 0 || !lobby) {
            navigate("/");
        }
    }, [myLobbies, lobby, navigate]);

    useEffect(() => {
        if (!lobbyId) return;
        WsClient.joinRoom(lobbyId);
        socket.on("lobby:changed", () => {
            console.log("Lobby updated:", lobbyId)
            const refreshLobby = async () => {
                if (!lobbyId) return;
                try {
                    const updatedLobby = await caller.getLobby(lobbyId);
                    if (updatedLobby) {
                        useLobbyStore.getState().updateMyLobby(updatedLobby);
                        console.log("Lobby refreshed:", updatedLobby);
                    }
                } catch (error) {
                    console.error("Error refreshing lobby:", error);
                }
            }
            refreshLobby();
        });
        return () => {
            socket.off("lobby:changed");
            WsClient.leaveRoom(lobbyId);
        };
    }, [lobbyId]);


    if (!myLobbies || myLobbies.length === 0 || !lobby) {
        return null;
    }

    const canStart = lobby.players.length >= 2;

    return (
        <section className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-8 py-20 font-mono">
            <div className="w-full max-w-xl opacity-100 translate-y-0 transition-all duration-500">

                <LobbyHeader name={lobby.name} isPrivate={lobby.isPrivate} />

                <PlayerList players={lobby.players} currentUserId={user?.id} />

                <p className={`font-mono text-xs uppercase tracking-widest text-center mb-6 ${canStart ? "text-emerald-400" : "text-zinc-600"}`}>
                    {canStart ? "Ready to start" : `Waiting for ${2 - lobby.players.length} more player${lobby.players.length === 1 ? "" : "s"}...`}
                </p>

                <div className="flex items-center gap-4">
                    <button
                        disabled={!canStart}
                        onClick={createGame}
                        className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed text-zinc-950 font-bold text-sm px-6 py-3 rounded-lg transition-all duration-150"
                    >
                        Start game
                    </button>
                    <button 
                    onClick={leaveLobby}
                    className="text-zinc-400 hover:text-white text-sm underline underline-offset-4 transition-colors duration-150">
                        Leave lobby
                    </button>
                </div>

            </div>
            <Footer />
        </section>
    );
};
