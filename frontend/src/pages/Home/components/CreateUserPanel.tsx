import { CreateUser } from "../../../components/CreateUser";

interface Props {
  handleCreateUser: (name: string) => void;
  name?: string;
}

export function CreateUserPanel({ handleCreateUser, name }: Props) {
  return <CreateUser handleCreateUser={handleCreateUser} name={name} />;
}
