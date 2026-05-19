import { LobbyList } from "../../../components/LobbyList";
import type { Lobby } from "../../../types/contracts/lobby";

interface Props {
  visible: boolean;
  lobbies: Lobby[] | null;
  createLobby: () => void;
}

export const LobbyPanel = ({ visible, lobbies, createLobby }: Props) => {
  return (
    <div className={`transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <LobbyList lobbies={lobbies} createLobby={createLobby} />
    </div>
  );
};
