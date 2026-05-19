export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-zinc-800/60 bg-zinc-950/80 backdrop-blur-sm px-8 py-3 z-10">
      <div className="max-w-[88rem] mx-auto flex items-center justify-between gap-4">
        <p className="font-mono text-xs text-zinc-600">
          NodeSter is a fan remake of{" "}
          <a
            href="https://maldon.com.ar/blog/projects/el-switcher/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-emerald-400 transition-colors duration-150 underline underline-offset-2"
          >
            El Switcher
          </a>{" "}
          — all rights belong to its original creators. Educational use only.
        </p>
        <p className="font-mono text-xs text-zinc-700 flex-shrink-0">
          &copy; {new Date().getFullYear()} NodeSter
        </p>
      </div>
    </footer>
  );
};
