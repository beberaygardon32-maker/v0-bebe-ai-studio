import Link from "next/link";

const FEATURES = [
  {
    title: "Website Mode",
    description:
      "Build complete, luxury-styled websites with bold colors, clean layouts, and stunning visuals.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
      />
    ),
  },
  {
    title: "App Mode",
    description:
      "Create interactive applications with forms, buttons, and dynamic elements.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    ),
  },
  {
    title: "AI System Mode",
    description:
      "Design AI-powered interfaces and intelligent system architectures.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
  },
  {
    title: "Edit/Fix Mode",
    description:
      "Improve, clean, and fix any text or code you provide. Bebe AI makes it perfect.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    ),
  },
  {
    title: "Wisdom Mode",
    description:
      "Get goddess-level guidance, strategy, and step-by-step insights for any challenge.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    ),
  },
];

export default function Help() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-500 via-fuchsia-900 to-black text-white flex flex-col">
      <header className="flex items-center justify-between px-6 py-3 border-b border-white/20 bg-black/40 backdrop-blur">
        <Link
          href="/"
          className="uppercase tracking-[0.2em] text-xs font-bold hover:text-pink-300 transition-colors"
        >
          Bebe AI • Help
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/studio"
            className="text-[0.6rem] uppercase tracking-[0.18em] hover:underline"
          >
            Studio
          </Link>
          <Link
            href="/projects"
            className="text-[0.6rem] uppercase tracking-[0.18em] hover:underline"
          >
            Projects
          </Link>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-3 py-1 border border-white/40 rounded-full text-[0.6rem] uppercase tracking-[0.2em] bg-black/40 mb-4">
            Bebe AI • Guide
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-[0.22em] mb-3">
            How to Use Bebe AI
          </h1>
          <p className="text-sm text-white/70 max-w-xl mx-auto leading-relaxed">
            Bebe AI is your personal goddess of creation. She builds, fixes, and
            guides you through anything digital. Here&apos;s how to command her
            powers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="bg-black/60 border border-white/20 rounded-2xl p-5 hover:border-pink-500/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/20 to-fuchsia-600/20 border border-white/10 mb-3 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-pink-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {feature.icon}
                </svg>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] mb-2">
                {feature.title}
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-black/60 border border-white/20 rounded-2xl p-6 mb-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.15em] mb-4">
            Getting Started
          </h2>
          <ol className="space-y-3 text-sm text-white/80">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-[0.65rem] font-bold flex-shrink-0">
                1
              </span>
              <span>
                Go to the <strong>Studio</strong> and select your mode
                (Website, App, AI System, Edit/Fix, or Wisdom).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-[0.65rem] font-bold flex-shrink-0">
                2
              </span>
              <span>
                Type your request in the prompt box. Be specific about what you
                want.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-[0.65rem] font-bold flex-shrink-0">
                3
              </span>
              <span>
                Click <strong>&quot;Let Bebe AI Work&quot;</strong> and watch
                the magic happen in the Screening Computer.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-[0.65rem] font-bold flex-shrink-0">
                4
              </span>
              <span>
                All your creations are saved in <strong>Projects</strong> for
                future reference.
              </span>
            </li>
          </ol>
        </div>

        <div className="text-center">
          <Link
            href="/studio"
            className="inline-block px-8 py-3 rounded-full border border-white/90 bg-gradient-to-r from-pink-500 to-rose-600 text-[0.75rem] uppercase tracking-[0.2em] shadow-[0_0_18px_rgba(244,114,182,0.9)] hover:shadow-[0_0_28px_rgba(244,114,182,1)] transition-shadow"
          >
            Enter the Studio
          </Link>
        </div>
      </main>

      <footer className="px-4 py-3 text-[0.6rem] uppercase tracking-[0.18em] text-white/70 flex justify-between">
        <span>Bebe AI • Box Press</span>
        <span>Designed for Darren • Luxury • Red • Pink • Diamonds</span>
      </footer>
    </div>
  );
}
