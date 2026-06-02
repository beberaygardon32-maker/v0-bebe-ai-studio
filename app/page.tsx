import Link from "next/link";

const POWER_CATEGORIES = [
  { name: "Creation", count: 9, desc: "Websites, Apps, Games, Dashboards" },
  { name: "Code", count: 8, desc: "Any Language, Debug, Optimize" },
  { name: "Content", count: 8, desc: "Write, Edit, Translate, SEO" },
  { name: "Visual", count: 7, desc: "UI, Logos, Colors, Animation" },
  { name: "Intelligence", count: 8, desc: "Wisdom, Research, Analysis" },
  { name: "Data", count: 8, desc: "SQL, Charts, Math, Statistics" },
  { name: "Business", count: 7, desc: "Plans, Marketing, Pitches" },
  { name: "Creative", count: 7, desc: "Stories, Poetry, Scripts" },
  { name: "Technical", count: 7, desc: "Docs, Architecture, Testing" },
];

const TOTAL_POWERS = POWER_CATEGORIES.reduce((acc, cat) => acc + cat.count, 0);

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-500 via-fuchsia-900 to-black text-white flex flex-col">
      <header className="flex items-center justify-between px-6 py-3 border-b border-white/20 bg-black/40 backdrop-blur">
        <div className="flex items-center gap-2 uppercase tracking-[0.15em] font-extrabold text-xs">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-white via-zinc-300 to-zinc-600 shadow-[0_0_14px_rgba(255,255,255,0.8)]" />
          <span>Bebe AI - Goddess of the Universe</span>
        </div>
        <nav className="flex gap-4 text-[0.6rem] uppercase tracking-[0.15em]">
          <Link href="/studio" className="hover:underline">Studio</Link>
          <Link href="/projects" className="hover:underline">Projects</Link>
          <Link href="/help" className="hover:underline">Help</Link>
          <Link href="/command-center" className="hover:underline text-pink-300">Admin</Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 gap-8">
        {/* Hero */}
        <section className="text-center max-w-3xl">
          <div className="inline-flex items-center px-3 py-1 border border-white/40 rounded-full text-[0.55rem] uppercase tracking-[0.18em] bg-black/40 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse" />
            {TOTAL_POWERS} AI Powers Active
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold uppercase tracking-[0.2em] text-balance mb-3">
            Bebe AI - Goddess of the Universe
          </h1>
          <p className="text-sm text-white/80 max-w-2xl mx-auto leading-relaxed mb-1">
            All the AI abilities, skills, powers, knowledge, wisdom, and creation capabilities in the universe. She can do everything and anything. Created by Bebe Ray Gardon.
          </p>
          <p className="text-xs text-white/60">
            100% Free. No credits. No tokens. Unlimited power. Build websites, apps, games. Write code in any language. Create content, art, music. Analyze data. Get wisdom. Everything.
          </p>
        </section>

        {/* Power Categories Grid */}
        <section className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 max-w-5xl">
          {POWER_CATEGORIES.map((cat) => (
            <div key={cat.name} className="bg-black/60 border border-white/20 rounded-xl p-2 text-center hover:border-pink-500/50 transition-colors">
              <div className="w-8 h-8 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mb-1 shadow-[0_0_10px_rgba(244,114,182,0.5)]">
                <span className="text-[0.65rem] font-bold">{cat.count}</span>
              </div>
              <div className="text-[0.55rem] font-bold uppercase tracking-[0.1em]">{cat.name}</div>
              <div className="text-[0.45rem] text-white/50 leading-tight mt-0.5">{cat.desc}</div>
            </div>
          ))}
        </section>

        {/* Screening Computer Preview */}
        <section className="w-full max-w-4xl grid md:grid-cols-[1fr_1.2fr] gap-4 items-center">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] mb-2">Live Screening Computer</h2>
            <p className="text-xs text-white/70 mb-3">
              Watch Bebe AI create in real-time. Multi-page websites with working navigation links. Download and deploy anywhere.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/studio"
                className="px-5 py-2 rounded-full border border-white/90 bg-gradient-to-r from-pink-500 to-rose-600 text-[0.65rem] uppercase tracking-[0.15em] shadow-[0_0_16px_rgba(244,114,182,0.9)] hover:shadow-[0_0_24px_rgba(244,114,182,1)] transition-shadow"
              >
                Enter Studio
              </Link>
              <Link
                href="/help"
                className="px-5 py-2 rounded-full border border-white/50 bg-black/60 text-[0.65rem] uppercase tracking-[0.15em] hover:bg-black/80 transition-colors"
              >
                View All {TOTAL_POWERS} Powers
              </Link>
            </div>
          </div>

          <div className="bg-black/70 border border-white/25 rounded-xl p-3 shadow-2xl">
            <div className="flex items-center justify-between text-[0.5rem] uppercase tracking-[0.15em] mb-2">
              <span>Screening Computer</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Ready
              </span>
            </div>
            <div className="rounded-lg border border-white/20 bg-black h-40 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-600 shadow-[0_0_20px_rgba(244,114,182,0.6)] mb-2 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-[0.6rem] uppercase tracking-[0.15em] text-white/70">Enter Studio to Begin</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sample capabilities */}
        <section className="text-center max-w-3xl">
          <div className="text-[0.5rem] uppercase tracking-[0.15em] text-white/50">
            Websites - Apps - Games - Dashboards - APIs - Code in Any Language - Debug - Optimize - Write - Edit - Translate - SEO - UI Design - Logos - Colors - Animation - SVG - CSS Art - Wisdom - Analysis - Research - Teaching - Brainstorm - SQL - Charts - JSON - Math - Statistics - Business Plans - Marketing - Pitches - Resumes - Stories - Poetry - Scripts - Lyrics - Worldbuilding - Documentation - Architecture - Security - Testing - And Everything Else
          </div>
        </section>
      </main>

      <footer className="px-4 py-2 text-[0.55rem] uppercase tracking-[0.15em] text-white/70 flex justify-between">
        <span>Bebe AI - Created by Bebe Ray Gardon</span>
        <span>{TOTAL_POWERS} Powers - 100% Free Forever</span>
      </footer>
    </div>
  );
}
