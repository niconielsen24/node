interface Props {
  handleCreateUser: (name: string) => void;
}

export const CreateUser = ({ handleCreateUser }: Props) => {
  return (
    <div className="border border-zinc-800 rounded-xl bg-zinc-900 p-6">
      <h2 className="font-sans text-lg font-bold text-white mb-5 tracking-tight">
        Create a player
      </h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        const name = (e.currentTarget.elements.namedItem("name") as HTMLInputElement).value;
        handleCreateUser(name);
      }} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="name"
            className="font-mono text-xs uppercase tracking-widest text-zinc-500"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Enter your name"
            className="bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white font-mono placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors duration-150"
          />
        </div>
        <button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-zinc-950 font-bold text-sm px-6 py-3 rounded-lg transition-all duration-150 self-start"
        >
          Create player
        </button>
      </form>
    </div>
  );
};
