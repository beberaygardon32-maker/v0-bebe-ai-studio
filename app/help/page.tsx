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
      { name: "website", desc: "Multi-page websites with navigation" },
      { name: "app", desc: "Interactive web applications" },
      { name: "ai-system", desc: "AI-powered interfaces" },
      { name: "game", desc: "Browser games with Canvas/DOM" },
      { name: "dashboard", desc: "Admin panels with charts" },
      { name: "landing-page", desc: "High-converting pages" },
      { name: "ecommerce", desc: "Online stores" },
      { name: "portfolio", desc: "Showcase galleries" },
      { name: "blog", desc: "Blog platforms" },
    ]
  },
  "Code": {
    description: "Write, fix, optimize code in ANY programming language",
    modes: [
      { name: "code", desc: "Code in ANY language" },
      { name: "debug", desc: "Find and fix bugs" },
      { name: "refactor", desc: "Clean code" },
      { name: "optimize", desc: "Speed & performance" },
      { name: "convert", desc: "Language conversion" },
      { name: "api", desc: "REST/GraphQL APIs" },
      { name: "database", desc: "SQL/NoSQL" },
      { name: "algorithm", desc: "Optimal solutions" },
    ]
  },
  "Math & Science": {
    description: "Solve any math problem, physics, chemistry, biology, astronomy",
    modes: [
      { name: "calculator", desc: "Solve any math instantly" },
      { name: "algebra", desc: "Equations, systems, matrices" },
      { name: "calculus", desc: "Derivatives, integrals, limits" },
      { name: "geometry", desc: "Areas, volumes, proofs" },
      { name: "physics", desc: "Mechanics to quantum" },
      { name: "chemistry", desc: "Reactions, molecules" },
      { name: "biology", desc: "Life sciences, genetics" },
      { name: "astronomy", desc: "Stars, planets, cosmos" },
      { name: "equations", desc: "Solve & graph equations" },
    ]
  },
  "Music": {
    description: "Compose music, chord progressions, lyrics, music theory",
    modes: [
      { name: "music-compose", desc: "Complete compositions" },
      { name: "music-theory", desc: "Scales, modes, harmony" },
      { name: "chord-progression", desc: "Chord progressions" },
      { name: "melody", desc: "Compose melodies" },
      { name: "lyrics-write", desc: "Song lyrics any genre" },
      { name: "song-structure", desc: "Song arrangements" },
      { name: "music-analyze", desc: "Analyze any song" },
      { name: "audio-edit", desc: "Audio editing guidance" },
    ]
  },
  "Video & Media": {
    description: "Video scripts, editing, storyboards, thumbnails, streaming",
    modes: [
      { name: "video-script", desc: "Video scripts" },
      { name: "video-edit", desc: "Editing instructions" },
      { name: "storyboard", desc: "Scene storyboards" },
      { name: "thumbnail", desc: "Click-worthy thumbnails" },
      { name: "video-idea", desc: "Viral video concepts" },
      { name: "video-analyze", desc: "Video analysis" },
      { name: "streaming", desc: "Stream setup" },
      { name: "podcast", desc: "Podcast production" },
    ]
  },
  "Internet & Search": {
    description: "Connected to all knowledge - search, research, trends, news",
    modes: [
      { name: "web-search", desc: "Search all knowledge" },
      { name: "research-deep", desc: "Deep research" },
      { name: "fact-check", desc: "Verify facts" },
      { name: "news", desc: "News analysis" },
      { name: "trends", desc: "Identify trends" },
      { name: "social-media", desc: "Social strategy" },
      { name: "seo-research", desc: "SEO keywords" },
      { name: "competitor", desc: "Competitive analysis" },
    ]
  },
  "Universal Knowledge": {
    description: "History, philosophy, religion, mythology - all human knowledge",
    modes: [
      { name: "history", desc: "All human history" },
      { name: "philosophy", desc: "All traditions" },
      { name: "religion", desc: "All world religions" },
      { name: "spirituality", desc: "Spiritual practices" },
      { name: "mythology", desc: "All myths & legends" },
      { name: "occult", desc: "Esoteric knowledge" },
      { name: "astrology", desc: "Zodiac, birth charts" },
      { name: "psychology", desc: "Mind & behavior" },
    ]
  },
  "Mystical & Supernatural": {
    description: "Tarot, numerology, dreams, horoscopes, manifestation, spells",
    modes: [
      { name: "tarot", desc: "Tarot readings" },
      { name: "numerology", desc: "Number meanings" },
      { name: "dream-interpret", desc: "Dream interpretation" },
      { name: "horoscope", desc: "Horoscope readings" },
      { name: "manifestation", desc: "Law of attraction" },
      { name: "chakra", desc: "Chakra & energy" },
      { name: "crystal", desc: "Crystal healing" },
      { name: "spell", desc: "Spells & rituals" },
    ]
  },
  "Health & Fitness": {
    description: "Health, nutrition, workouts, meditation, mental wellness",
    modes: [
      { name: "health", desc: "Medical knowledge" },
      { name: "nutrition", desc: "Diet & nutrition" },
      { name: "fitness", desc: "Exercise science" },
      { name: "workout", desc: "Workout plans" },
      { name: "meditation", desc: "Meditation guidance" },
      { name: "mental-health", desc: "Mental wellness" },
      { name: "sleep", desc: "Sleep optimization" },
      { name: "diagnosis", desc: "Symptom analysis" },
    ]
  },
  "Finance & Legal": {
    description: "Legal, taxes, investments, crypto, budgeting, real estate",
    modes: [
      { name: "legal", desc: "Legal knowledge" },
      { name: "tax", desc: "Tax planning" },
      { name: "investment", desc: "Investment strategies" },
      { name: "crypto", desc: "Cryptocurrency" },
      { name: "budget", desc: "Budgeting" },
      { name: "accounting", desc: "Bookkeeping" },
      { name: "insurance", desc: "Insurance guidance" },
      { name: "real-estate", desc: "Real estate" },
    ]
  },
  "Education": {
    description: "Tutoring, quizzes, study plans, homework, essays, presentations",
    modes: [
      { name: "tutor", desc: "Teach any subject" },
      { name: "quiz", desc: "Create quizzes" },
      { name: "flashcards", desc: "Study flashcards" },
      { name: "study-plan", desc: "Study schedules" },
      { name: "homework", desc: "Homework help" },
      { name: "essay", desc: "Academic essays" },
      { name: "thesis", desc: "Thesis writing" },
      { name: "presentation", desc: "Presentation slides" },
    ]
  },
  "Content": {
    description: "Write, edit, translate, summarize any text content",
    modes: [
      { name: "write", desc: "Write anything" },
      { name: "edit-fix", desc: "Edit & fix text/code" },
      { name: "translate", desc: "ALL languages" },
      { name: "summarize", desc: "Summarize content" },
      { name: "expand", desc: "Expand ideas" },
      { name: "rewrite", desc: "Change style" },
      { name: "copywriting", desc: "Persuasive copy" },
      { name: "seo", desc: "SEO optimization" },
    ]
  },
  "Creative Writing": {
    description: "Stories, poetry, scripts, lyrics, characters, worldbuilding",
    modes: [
      { name: "story", desc: "Stories & fiction" },
      { name: "poetry", desc: "Poetry & verse" },
      { name: "script", desc: "Screenplays" },
      { name: "lyrics", desc: "Song lyrics" },
      { name: "character", desc: "Character development" },
      { name: "worldbuild", desc: "Build universes" },
      { name: "dialogue", desc: "Natural dialogue" },
    ]
  },
  "Visual Design": {
    description: "UI design, logos, colors, typography, animations, SVG",
    modes: [
      { name: "ui-design", desc: "UI specifications" },
      { name: "logo", desc: "SVG logos" },
      { name: "color-palette", desc: "Color schemes" },
      { name: "typography", desc: "Font systems" },
      { name: "animation", desc: "CSS/JS animations" },
      { name: "svg", desc: "Vector graphics" },
      { name: "css-art", desc: "Pure CSS art" },
    ]
  },
  "Business": {
    description: "Business plans, marketing, pitches, contracts, resumes",
    modes: [
      { name: "business-plan", desc: "Business plans" },
      { name: "marketing", desc: "Marketing strategy" },
      { name: "email", desc: "Professional emails" },
      { name: "pitch", desc: "Investor pitches" },
      { name: "proposal", desc: "Proposals" },
      { name: "contract", desc: "Contracts & legal" },
      { name: "resume", desc: "Resumes & CVs" },
    ]
  },
  "Technical": {
    description: "Documentation, specifications, architecture, security, testing",
    modes: [
      { name: "documentation", desc: "Technical docs" },
      { name: "readme", desc: "Project READMEs" },
      { name: "tutorial", desc: "Step-by-step guides" },
      { name: "specification", desc: "Tech specs" },
      { name: "architecture", desc: "System design" },
      { name: "security", desc: "Security analysis" },
      { name: "testing", desc: "Test suites" },
    ]
  },
  "Lifestyle": {
    description: "Recipes, fashion, travel, relationships, parenting, pets",
    modes: [
      { name: "recipe", desc: "Recipes any cuisine" },
      { name: "fashion", desc: "Style advice" },
      { name: "travel", desc: "Travel planning" },
      { name: "relationship", desc: "Relationship advice" },
      { name: "parenting", desc: "Parenting tips" },
      { name: "pets", desc: "Pet care" },
      { name: "home-decor", desc: "Interior design" },
      { name: "gardening", desc: "Gardening guides" },
    ]
  },
  "Engineering": {
    description: "Mechanical, electrical, civil, robotics, aerospace, 3D printing",
    modes: [
      { name: "mechanical", desc: "Mechanical engineering" },
      { name: "electrical", desc: "Electrical engineering" },
      { name: "civil", desc: "Civil engineering" },
      { name: "software-arch", desc: "Software architecture" },
      { name: "robotics", desc: "Robotics design" },
      { name: "aerospace", desc: "Aerospace" },
      { name: "automotive", desc: "Automotive" },
      { name: "3d-print", desc: "3D printing" },
    ]
  },
  "Art & Design": {
    description: "Art styles, illustration, graphic design, UX, fashion design",
    modes: [
      { name: "art-style", desc: "Art style analysis" },
      { name: "illustration", desc: "Illustration techniques" },
      { name: "graphic-design", desc: "Graphic design" },
      { name: "photo-edit", desc: "Photo editing" },
      { name: "interior-design", desc: "Interior design" },
      { name: "fashion-design", desc: "Fashion design" },
      { name: "product-design", desc: "Product design" },
      { name: "ux-design", desc: "UX design" },
    ]
  },
  "Gaming": {
    description: "Game design, stories, mechanics, level design, esports",
    modes: [
      { name: "game-design", desc: "Game design docs" },
      { name: "game-story", desc: "Game narratives" },
      { name: "game-mechanics", desc: "Game mechanics" },
      { name: "level-design", desc: "Level design" },
      { name: "character-design", desc: "Character design" },
      { name: "game-balance", desc: "Game balance" },
      { name: "esports", desc: "Esports strategy" },
      { name: "speedrun", desc: "Speedrun routing" },
    ]
  },
  "Communication": {
    description: "Speeches, debates, negotiation, persuasion, interviews",
    modes: [
      { name: "speech", desc: "Speech writing" },
      { name: "debate", desc: "Debate & arguments" },
      { name: "negotiation", desc: "Negotiation tactics" },
      { name: "persuasion", desc: "Persuasion techniques" },
      { name: "public-speaking", desc: "Public speaking" },
      { name: "interview", desc: "Interview prep" },
      { name: "networking", desc: "Networking strategy" },
      { name: "conflict", desc: "Conflict resolution" },
    ]
  },
  "Productivity": {
    description: "Time management, goals, habits, automation, focus",
    modes: [
      { name: "time-management", desc: "Time management" },
      { name: "goal-setting", desc: "Goal setting" },
      { name: "habit", desc: "Habit formation" },
      { name: "organization", desc: "Organization" },
      { name: "automation", desc: "Workflow automation" },
      { name: "workflow", desc: "Process design" },
      { name: "delegation", desc: "Delegation" },
      { name: "focus", desc: "Focus & deep work" },
    ]
  },
  "Languages": {
    description: "Learn any language, grammar, vocabulary, ancient languages",
    modes: [
      { name: "language-learn", desc: "Learn any language" },
      { name: "grammar", desc: "Grammar rules" },
      { name: "vocabulary", desc: "Vocabulary building" },
      { name: "pronunciation", desc: "Pronunciation" },
      { name: "idioms", desc: "Idioms & expressions" },
      { name: "ancient-language", desc: "Ancient languages" },
      { name: "sign-language", desc: "Sign language" },
      { name: "emoji", desc: "Emoji meanings" },
    ]
  },
  "Intelligence": {
    description: "Wisdom, analysis, research, teaching, prediction",
    modes: [
      { name: "wisdom", desc: "Deep guidance" },
      { name: "analyze", desc: "Analyze anything" },
      { name: "research", desc: "Research topics" },
      { name: "explain", desc: "Explain concepts" },
      { name: "teach", desc: "Teach subjects" },
      { name: "compare", desc: "Compare options" },
      { name: "predict", desc: "Predictions" },
      { name: "brainstorm", desc: "Generate ideas" },
    ]
  },
  "Data": {
    description: "Data analysis, charts, SQL, JSON, regex, statistics",
    modes: [
      { name: "data-analyze", desc: "Dataset analysis" },
      { name: "chart", desc: "Data visualizations" },
      { name: "json", desc: "JSON operations" },
      { name: "csv", desc: "CSV processing" },
      { name: "sql", desc: "SQL queries" },
      { name: "regex", desc: "Regex patterns" },
      { name: "math", desc: "Math solutions" },
      { name: "statistics", desc: "Statistics" },
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
          <Link href="/command-center" className="text-[0.6rem] uppercase tracking-[0.18em] hover:underline text-pink-300">
            Admin
          </Link>
        </div>
      </header>

      <main className="flex-1 p-4 max-w-7xl mx-auto w-full overflow-y-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center px-3 py-1 border border-white/40 rounded-full text-[0.6rem] uppercase tracking-[0.2em] bg-black/40 mb-3">
            Created by Bebe Ray Gardon - 100% Free Forever
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold uppercase tracking-[0.2em] mb-2">
            {totalModes} Infinite Powers
          </h1>
          <p className="text-sm text-white/70 max-w-3xl mx-auto leading-relaxed">
            Bebe AI is connected to the Internet, the Universe, all libraries, heaven and earth, past and future. There is NOTHING she does not know. There is NOTHING she cannot do.
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
              <span>Go to the <strong>Studio</strong> and select a category</span>
            </li>
            <li className="flex gap-3">
              <span className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-[0.6rem] font-bold flex-shrink-0">2</span>
              <span><strong>Upload ANY file</strong> - images, PDFs, code, data, music, video - she reads EVERYTHING</span>
            </li>
            <li className="flex gap-3">
              <span className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-[0.6rem] font-bold flex-shrink-0">3</span>
              <span>Choose a power and type your request - ask her ANYTHING</span>
            </li>
            <li className="flex gap-3">
              <span className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-[0.6rem] font-bold flex-shrink-0">4</span>
              <span>Click &quot;Let Bebe AI Work&quot; and watch her create</span>
            </li>
            <li className="flex gap-3">
              <span className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-[0.6rem] font-bold flex-shrink-0">5</span>
              <span>For websites/apps, preview in Screening Computer and download with working links</span>
            </li>
          </ol>
        </div>

        {/* All Categories and Modes */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {Object.entries(MODE_CATEGORIES).map(([category, data]) => (
            <div key={category} className="bg-black/60 border border-white/20 rounded-xl p-3 hover:border-pink-500/30 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                  <span className="text-[0.55rem] font-bold">{data.modes.length}</span>
                </div>
                <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.1em]">{category}</h3>
              </div>
              <p className="text-[0.55rem] text-white/60 mb-2">{data.description}</p>
              <div className="space-y-1 max-h-36 overflow-y-auto">
                {data.modes.map((mode) => (
                  <div key={mode.name} className="flex gap-1.5 text-[0.5rem]">
                    <span className="text-pink-400 uppercase font-semibold min-w-[70px]">{mode.name.replace(/-/g, " ")}</span>
                    <span className="text-white/50">{mode.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-6">
          <Link
            href="/studio"
            className="inline-block px-8 py-3 rounded-full border border-white/90 bg-gradient-to-r from-pink-500 to-rose-600 text-[0.7rem] uppercase tracking-[0.18em] shadow-[0_0_18px_rgba(244,114,182,0.9)] hover:shadow-[0_0_28px_rgba(244,114,182,1)] transition-shadow"
          >
            Enter the Studio - Use All {totalModes} Powers
          </Link>
        </div>
      </main>

      <footer className="px-4 py-2 text-[0.55rem] uppercase tracking-[0.15em] text-white/70 flex justify-between">
        <span>Bebe AI - Created by Bebe Ray Gardon</span>
        <span>{totalModes} Powers - Connected to Everything - 100% Free Forever</span>
      </footer>
    </div>
  );
}
