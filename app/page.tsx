import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-500 via-fuchsia-900 to-black text-white flex flex-col">
      <header className="flex items-center justify-between px-8 py-4 border-b border-white/20 bg-black/40 backdrop-blur">
        <div className="flex items-center gap-3 uppercase tracking-[0.2em] font-extrabold text-sm">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-white via-zinc-300 to-zinc-600 shadow-[0_0_18px_rgba(255,255,255,0.8)]" />
          <span>Bebe AI • Box Press</span>
        </div>
        <nav className="flex gap-6 text-[0.7rem] uppercase tracking-[0.18em]">
          <Link href="/studio" className="hover:underline">
            Studio
          </Link>
          <Link href="/projects" className="hover:underline">
            Projects
          </Link>
          <Link href="/help" className="hover:underline">
            Help
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <section className="max-w-5xl w-full grid md:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center px-3 py-1 border border-white/40 rounded-full text-[0.6rem] uppercase tracking-[0.2em] bg-black/40">
              Bebe AI • Goddess Level Studio
            </div>
            <h1 className="mt-4 text-3xl md:text-4xl font-extrabold uppercase tracking-[0.22em] text-balance">
              Build. Fix. Create. Command.
            </h1>
            <p className="mt-4 text-sm md:text-base text-white/80 max-w-xl leading-relaxed">
              Bebe AI is your personal AI Goddess of creation. One studio where
              she builds websites, apps, and AI systems, edits and fixes
              anything you give her, and shows every move on a live screening
              computer.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/studio"
                className="px-6 py-2 rounded-full border border-white/90 bg-gradient-to-r from-pink-500 to-rose-600 text-[0.7rem] uppercase tracking-[0.2em] shadow-[0_0_18px_rgba(244,114,182,0.9)] hover:shadow-[0_0_28px_rgba(244,114,182,1)] transition-shadow"
              >
                Enter Bebe AI Studio
              </Link>
              <Link
                href="/projects"
                className="px-6 py-2 rounded-full border border-white/50 bg-black/60 text-[0.7rem] uppercase tracking-[0.2em] hover:bg-black/80 transition-colors"
              >
                View Active Creations
              </Link>
            </div>
          </div>

          <div className="relative bg-black/70 border border-white/25 rounded-2xl p-4 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between text-[0.6rem] uppercase tracking-[0.18em] mb-2">
              <span>Screening Computer</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
                Live Project View
              </span>
            </div>
            <div className="relative rounded-xl border border-white/20 bg-black h-64 overflow-hidden flex items-center justify-center">
              <div className="absolute top-2 left-3 text-[0.55rem] uppercase tracking-[0.18em] text-white/70">
                Current Project • Bebe AI Ready
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-600 shadow-[0_0_30px_rgba(244,114,182,0.6)] mb-4 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-white/70">
                  Enter Studio to Begin
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-4 py-3 text-[0.6rem] uppercase tracking-[0.18em] text-white/70 flex justify-between">
        <span>Bebe AI • Box Press</span>
        <span>Designed for Darren • Luxury • Red • Pink • Diamonds</span>
      </footer>
    </div>
  );
}
