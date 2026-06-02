import Link from "next/link";

const MODE_CATEGORIES = {
  "Files": {
    description: "Read and understand ANY file - images, documents, code, data, videos, everything",
    modes: [
      { name: "read-file", desc: "Read and understand any file type" },
      { name: "analyze-image", desc: "See and analyze images with AI vision" },
      { name: "analyze-document", desc: "Understand PDFs, Word docs, text files" },
      { name: "analyze-code", desc: "Deep code analysis in any language" },
      { name: "analyze-data", desc: "CSV, JSON, Excel, database analysis" },
      { name: "analyze-video", desc: "Video content analysis" },
      { name: "ocr", desc: "Extract text from images (OCR)" },
      { name: "extract", desc: "Extract specific info from any content" },
    ]
  },
  "Creation": {
    description: "Build complete websites, apps, games, and digital experiences",
    modes: [
      { name: "website", desc: "Multi-page websites with navigation and luxury styling" },
      { name: "app", desc: "Interactive web applications with forms and state" },
      { name: "ai-system", desc: "AI-powered interfaces and intelligent systems" },
      { name: "game", desc: "Browser games with Canvas/DOM, controls, scoring" },
      { name: "dashboard", desc: "Admin panels with charts, metrics, analytics" },
      { name: "landing-page", desc: "High-converting single pages with CTAs" },
      { name: "ecommerce", desc: "Online stores with products, cart, checkout" },
      { name: "portfolio", desc: "Showcase work with stunning galleries" },
      { name: "blog", desc: "Blog platforms with posts and categories" },
    ]
  },
  "Code": {
    description: "Write, fix, optimize, and transform code in any language",
    modes: [
      { name: "code", desc: "Production-ready code in ANY programming language" },
      { name: "debug", desc: "Find and fix bugs, errors, and issues" },
      { name: "refactor", desc: "Clean up code for maintainability" },
      { name: "optimize", desc: "Improve speed, memory, performance" },
      { name: "convert", desc: "Transform code between languages/frameworks" },
      { name: "api", desc: "Design REST, GraphQL, WebSocket APIs" },
      { name: "database", desc: "Schemas, queries, SQL/NoSQL optimization" },
      { name: "algorithm", desc: "Solve problems with optimal algorithms" },
    ]
  },
  "Content": {
    description: "Write, edit, translate, and transform any text content",
    modes: [
      { name: "write", desc: "Articles, blogs, scripts, social posts, ads" },
      { name: "edit-fix", desc: "Fix grammar, improve clarity, polish text" },
      { name: "translate", desc: "Translate between 100+ languages" },
      { name: "summarize", desc: "Condense content while keeping key points" },
      { name: "expand", desc: "Turn outlines into detailed content" },
      { name: "rewrite", desc: "Change style/tone while keeping meaning" },
      { name: "copywriting", desc: "Persuasive copy that converts" },
      { name: "seo", desc: "Optimize content for search engines" },
    ]
  },
  "Visual": {
    description: "Design UIs, logos, colors, typography, and animations",
    modes: [
      { name: "ui-design", desc: "UI specifications and design systems" },
      { name: "logo", desc: "SVG logos with multiple variations" },
      { name: "color-palette", desc: "Perfect color schemes with hex/RGB/HSL" },
      { name: "typography", desc: "Font pairings and type systems" },
      { name: "animation", desc: "CSS/JS animations and micro-interactions" },
      { name: "svg", desc: "Vector graphics, icons, illustrations" },
      { name: "css-art", desc: "Stunning art using pure CSS" },
    ]
  },
  "Intelligence": {
    description: "Get wisdom, analysis, research, and strategic guidance",
    modes: [
      { name: "wisdom", desc: "Deep guidance and life strategy" },
      { name: "analyze", desc: "Break down anything into insights" },
      { name: "research", desc: "Comprehensive topic research" },
      { name: "explain", desc: "Make complex topics simple" },
      { name: "teach", desc: "Lessons, exercises, learning paths" },
      { name: "compare", desc: "Objective comparisons and decisions" },
      { name: "predict", desc: "Trend analysis and forecasting" },
      { name: "brainstorm", desc: "Generate creative ideas without limits" },
    ]
  },
  "Data": {
    description: "Analyze data, create charts, work with SQL, JSON, and more",
    modes: [
      { name: "data-analyze", desc: "Extract insights from datasets" },
      { name: "chart", desc: "Charts and data visualizations" },
      { name: "json", desc: "Parse, format, transform JSON" },
      { name: "csv", desc: "Work with CSV and tabular data" },
      { name: "sql", desc: "Perfect SQL queries for any database" },
      { name: "regex", desc: "Pattern matching with regex" },
      { name: "math", desc: "Solve any math problem" },
      { name: "statistics", desc: "Statistical analysis and probability" },
    ]
  },
  "Business": {
    description: "Business plans, marketing, emails, pitches, and professional docs",
    modes: [
      { name: "business-plan", desc: "Comprehensive business plans" },
      { name: "marketing", desc: "Marketing strategies and campaigns" },
      { name: "email", desc: "Professional email writing" },
      { name: "pitch", desc: "Investor and sales pitches" },
      { name: "proposal", desc: "Winning project proposals" },
      { name: "contract", desc: "Contracts and legal documents" },
      { name: "resume", desc: "ATS-optimized resumes and CVs" },
    ]
  },
  "Creative": {
    description: "Stories, poetry, scripts, lyrics, and worldbuilding",
    modes: [
      { name: "story", desc: "Captivating narratives and fiction" },
      { name: "poetry", desc: "Beautiful verse in any style" },
      { name: "script", desc: "Screenplays and scripts" },
      { name: "lyrics", desc: "Song lyrics for any genre" },
      { name: "character", desc: "Deep character development" },
      { name: "worldbuild", desc: "Immersive fictional universes" },
      { name: "dialogue", desc: "Natural, compelling conversations" },
    ]
  },
  "Technical": {
    description: "Documentation, specifications, architecture, and testing",
    modes: [
      { name: "documentation", desc: "Clear technical docs and guides" },
      { name: "readme", desc: "Perfect project READMEs" },
      { name: "tutorial", desc: "Step-by-step learning guides" },
      { name: "specification", desc: "Detailed technical specs" },
      { name: "architecture", desc: "System design and diagrams" },
      { name: "security", desc: "Security analysis and hardening" },
      { name: "testing", desc: "Comprehensive test suites" },
    ]
  },
};

export default function Help() {
  const totalModes = Object.values(MODE_CATEGORIES).reduce((acc, cat) => acc + cat.modes.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-500 via-fuchsia-900 to-black text-white flex flex-col">
      <header className="flex items-center justify-between px-6 py-3 border-b border-white/20 bg-black/40 backdrop-blur">
        <Link
          href="/"
          className="uppercase tracking-[0.2em] text-xs font-bold hover:text-pink-300 transition-colors"
        >
          Bebe AI - Help
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/studio" className="text-[0.6rem] uppercase tracking-[0.18em] hover:underline">
            Studio
          </Link>
          <Link href="/projects" className="text-[0.6rem] uppercase tracking-[0.18em] hover:underline">
            Projects
          </Link>
        </div>
      </header>

      <main className="flex-1 p-4 max-w-6xl mx-auto w-full overflow-y-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-3 py-1 border border-white/40 rounded-full text-[0.6rem] uppercase tracking-[0.2em] bg-black/40 mb-3">
            Bebe AI - Goddess of the Universe
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold uppercase tracking-[0.2em] mb-2">
            {totalModes} AI Powers
          </h1>
          <p className="text-sm text-white/70 max-w-2xl mx-auto leading-relaxed">
            Bebe AI contains ALL the AI abilities in the universe. She can read and understand ANY file - images, documents, code, data, videos - EVERYTHING. Created by Bebe Ray Gardon. 100% Free Forever.
          </p>
        </div>

        {/* Getting Started */}
        <div className="bg-black/60 border border-white/20 rounded-2xl p-5 mb-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.15em] mb-3">
            How to Use Bebe AI
          </h2>
          <ol className="space-y-2 text-sm text-white/80">
            <li className="flex gap-3">
              <span className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-[0.6rem] font-bold flex-shrink-0">1</span>
              <span>Go to the <strong>Studio</strong> and select a category (Files, Creation, Code, etc.)</span>
            </li>
            <li className="flex gap-3">
              <span className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-[0.6rem] font-bold flex-shrink-0">2</span>
              <span><strong>Upload any file</strong> (drag & drop or click) - images, PDFs, code, data, documents</span>
            </li>
            <li className="flex gap-3">
              <span className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-[0.6rem] font-bold flex-shrink-0">3</span>
              <span>Choose a specific power/mode and type your request</span>
            </li>
            <li className="flex gap-3">
              <span className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-[0.6rem] font-bold flex-shrink-0">4</span>
              <span>Click &quot;Let Bebe AI Work&quot; - she understands EVERYTHING</span>
            </li>
            <li className="flex gap-3">
              <span className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-[0.6rem] font-bold flex-shrink-0">5</span>
              <span>For websites/apps, preview in Screening Computer and download your project</span>
            </li>
          </ol>
        </div>

        {/* All Categories and Modes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(MODE_CATEGORIES).map(([category, data]) => (
            <div key={category} className="bg-black/60 border border-white/20 rounded-xl p-4 hover:border-pink-500/30 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                  <span className="text-[0.6rem] font-bold">{data.modes.length}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.12em]">{category}</h3>
                </div>
              </div>
              <p className="text-[0.65rem] text-white/60 mb-3">{data.description}</p>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {data.modes.map((mode) => (
                  <div key={mode.name} className="flex gap-2 text-[0.6rem]">
                    <span className="text-pink-400 uppercase font-semibold min-w-[80px]">{mode.name.replace(/-/g, " ")}</span>
                    <span className="text-white/50">{mode.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Link
            href="/studio"
            className="inline-block px-8 py-3 rounded-full border border-white/90 bg-gradient-to-r from-pink-500 to-rose-600 text-[0.7rem] uppercase tracking-[0.18em] shadow-[0_0_18px_rgba(244,114,182,0.9)] hover:shadow-[0_0_28px_rgba(244,114,182,1)] transition-shadow"
          >
            Enter the Studio - Use All {totalModes} Powers
          </Link>
        </div>
      </main>

      <footer className="px-4 py-2 text-[0.55rem] uppercase tracking-[0.15em] text-white/70 flex justify-between">
        <span>Bebe AI - Goddess of the Universe</span>
        <span>All AI Powers - Creation - Knowledge - Wisdom</span>
      </footer>
    </div>
  );
}
