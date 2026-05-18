import { useEffect, useState } from "react";
import { caller } from "../../internal/api/api_caller";
import { useUserStore } from "../../state/user_store";
import { NodeChain } from "./components/NodeChain";
import { StatsBar } from "./components/StatsBar";
import { HeroCTA } from "./components/HeroCTA";
import { CreateUserPanel } from "./components/CreateUserPanel";

export default function HomePage() {
  const [visible, setVisible] = useState(false);
  const [createUserVisible, setCreateUserVisible] = useState(false);
  const setUser = useUserStore((state) => state.setUser);

  const handleCreateUser = async (name: string) => {
    try {
      const user = await caller.createUser(name);
      setUser(user);
      console.log("User created:", user);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-8 py-20 font-mono w-screen">
      <div className="flex items-start w-full max-w-5xl mx-auto">

        <div className="max-w-2xl w-full flex-shrink-0">

          <p className={`flex items-center gap-3 text-xs tracking-widest uppercase text-zinc-500 mb-6 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            <span className="block w-6 h-px bg-zinc-500" />
            Turn-based strategy · Browser native
          </p>

          <h1 className={`font-sans text-5xl md:text-6xl font-extrabold leading-tight tracking-tighter mb-6 transition-all duration-500 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Think in nodes.
            <br />
            Win by <em className="not-italic text-emerald-400">design.</em>
          </h1>

          <NodeChain visible={visible} />

          <p className="font-mono text-lg leading-loose text-zinc-400 mb-7 max-w-xl">
            <strong className="text-white font-bold">NodeSter </strong>
            is a turn-based strategy game played on a shared grid of colored tiles.
            Each turn you play a movement card to swap tiles around the board,
            racing to arrange your color into the exact shapes on your figure cards — before your opponents do the same.
            Form a rival's figure and you lock them out; let them lock yours and you're fighting uphill.
            With only 3 cards in hand, 2 minutes per turn, and a board that shifts with every move, every decision carries weight.
            <strong className="text-white font-bold"> The winner is the first to complete all their figures.</strong>
            {" "}No installs. No accounts. Just pure color, pattern, and timing — right in your browser.
          </p>

          <StatsBar visible={visible} />

          <HeroCTA visible={visible} onPlayClick={() => setCreateUserVisible(true)} />

        </div>

        <CreateUserPanel visible={createUserVisible} handleCreateUser={handleCreateUser} />

      </div>
    </section>
  );
}
