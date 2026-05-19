interface Props {
  handleCreateUser: (name: string) => void;
  name?: string;
}

export const CreateUser = ({ handleCreateUser, name }: Props) => {
  return (
    <div className="border border-zinc-800 rounded-xl bg-zinc-900 p-6 relative min-h-52">

      {/* Form — fades out downward when name is set */}
      <div
        className={`absolute inset-0 p-6 transition-all duration-300 ease-out ${
          name ? "opacity-0 translate-y-2 pointer-events-none" : "opacity-100 translate-y-0"
        }`}
      >
        <h2 className="font-sans text-lg font-bold text-white mb-5 tracking-tight">
          Create a player
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const value = (e.currentTarget.elements.namedItem("name") as HTMLInputElement).value;
            handleCreateUser(value);
          }}
          className="flex flex-col gap-4"
        >
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

      {/* Welcome — fades in upward when name is set */}
      <div
        className={`absolute inset-0 p-6 flex flex-col items-center justify-center transition-all duration-300 ease-out ${
          name ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-3">
          Player ready
        </span>
        <h2 className="font-sans text-xl font-bold text-white tracking-tight text-center">
          Welcome, <span className="text-emerald-400">{name}</span>
        </h2>
      </div>

    </div>
  );
};
