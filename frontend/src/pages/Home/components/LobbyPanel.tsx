import { LobbyList } from "../../../components/LobbyList";
import type { User } from "../../../internal/user/user_class";
import { useUserStore } from "../../../state/user_store";
import type { Lobby } from "../../../types/contracts/lobby";

interface Props {
  visible: boolean;
  lobbies: Lobby[] | null;
  createLobby: () => void;
  joinLobby: (lobbyId: string, user: User) => void;
  refreshLobbies: () => void;
}

export const LobbyPanel = ({ visible, lobbies, createLobby, joinLobby, refreshLobbies }: Props) => {
  const { user } = useUserStore();

  return (
    <div className={`transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <LobbyList user={user} lobbies={lobbies} createLobby={createLobby} joinLobby={joinLobby} refreshLobbies={refreshLobbies} />
    </div>
  );
};
