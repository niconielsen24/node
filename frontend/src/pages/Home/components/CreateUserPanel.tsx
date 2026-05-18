import { CreateUser } from "../../../components/CreateUser";

interface Props {
  visible: boolean;
  handleCreateUser: (name: string) => void;
}

export function CreateUserPanel({ visible, handleCreateUser }: Props) {
  return (
    <div
      className={`transition-all duration-300 ease-out overflow-hidden flex-shrink-0 ${
        visible ? "w-80 opacity-100 ml-8" : "w-0 opacity-0 ml-0"
      }`}
    >
      <div className="border-l border-zinc-800 pl-8 w-80">
        <CreateUser handleCreateUser={handleCreateUser} />
      </div>
    </div>
  );
}
