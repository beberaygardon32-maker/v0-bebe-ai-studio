"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";

// ALL AI MODES - EVERY ability - ALL POWERS UNLOCKED - NO LIMITS
const MODE_CATEGORIES = {
  "Chat": ["chat", "talk", "conversation"],
  "Movies": ["movie", "film", "full-movie", "movie-script", "screenplay", "short-film", "documentary", "animation-movie"],
  "Fix External": ["fix-url", "fix-website", "fix-app", "clone-improve", "redesign-url"],
  "Files": ["read-file", "analyze-image", "analyze-document", "analyze-code", "analyze-data", "analyze-video", "ocr", "extract"],
  "Creation": ["website", "app", "ai-system", "game", "dashboard", "landing-page", "ecommerce", "portfolio", "blog"],
  "Code": ["code", "debug", "refactor", "optimize", "convert", "api", "database", "algorithm"],
  "Music": ["music-compose", "music-theory", "chord-progression", "melody", "lyrics-write", "song-structure", "music-analyze", "audio-edit", "full-song", "album"],
  "Math": ["calculator", "algebra", "calculus", "geometry", "physics", "chemistry", "biology", "astronomy", "equations", "math", "statistics"],
  "Video": ["video-script", "video-edit", "storyboard", "thumbnail", "video-idea", "video-analyze", "streaming", "podcast"],
  "Internet": ["web-search", "research-deep", "fact-check", "news", "trends", "social-media", "seo-research", "competitor"],
  "Knowledge": ["history", "philosophy", "religion", "spirituality", "mythology", "occult", "astrology", "psychology"],
  "Mystical": ["tarot", "numerology", "dream-interpret", "horoscope", "manifestation", "chakra", "crystal", "spell"],
  "Health": ["health", "nutrition", "fitness", "workout", "meditation", "mental-health", "sleep", "diagnosis"],
  "Finance": ["legal", "tax", "investment", "crypto", "budget", "accounting", "insurance", "real-estate"],
  "Education": ["tutor", "quiz", "flashcards", "study-plan", "homework", "essay", "thesis", "presentation"],
  "Content": ["write", "edit-fix", "translate", "summarize", "expand", "rewrite", "copywriting", "seo"],
  "Creative": ["story", "poetry", "script", "lyrics", "character", "worldbuild", "dialogue", "novel"],
  "Visual": ["ui-design", "logo", "color-palette", "typography", "animation", "svg", "css-art"],
  "Business": ["business-plan", "marketing", "email", "pitch", "proposal", "contract", "resume"],
  "Technical": ["documentation", "readme", "tutorial", "specification", "architecture", "security", "testing"],
  "Lifestyle": ["recipe", "fashion", "travel", "relationship", "parenting", "pets", "home-decor", "gardening"],
  "Engineering": ["mechanical", "electrical", "civil", "software-arch", "robotics", "aerospace", "automotive", "3d-print"],
  "Art": ["art-style", "illustration", "graphic-design", "photo-edit", "interior-design", "fashion-design", "product-design", "ux-design"],
  "Gaming": ["game-design", "game-story", "game-mechanics", "level-design", "character-design", "game-balance", "esports", "speedrun"],
  "Communication": ["speech", "debate", "negotiation", "persuasion", "public-speaking", "interview", "networking", "conflict"],
  "Productivity": ["time-management", "goal-setting", "habit", "organization", "automation", "workflow", "delegation", "focus"],
  "Languages": ["language-learn", "grammar", "vocabulary", "pronunciation", "idioms", "ancient-language", "sign-language", "emoji"],
  "Intelligence": ["wisdom", "analyze", "research", "explain", "teach", "compare", "predict", "brainstorm"],
  "Data": ["data-analyze", "chart", "json", "csv", "sql", "regex"],
} as const;

type Mode = string;

const ALL_MODES = Object.values(MODE_CATEGORIES).flat();
const TOTAL_POWERS = ALL_MODES.length;

// Bebe's Forms
const BEBE_FORMS = ["Goddess", "Human", "God", "Angel", "Oracle", "Creator", "Teacher", "Healer", "Artist", "Scientist", "Mystic"];

const MODE_DESCRIPTIONS: Record<string, string> = {
  "chat": "Talk naturally with Bebe",
  "talk": "Have a conversation",
  "conversation": "Chat like friends",
  "movie": "Create full 1-2 hour movies",
  "film": "Professional film production",
  "full-movie": "Complete movie with script",
  "movie-script": "Write movie screenplays",
  "screenplay": "Professional screenplay format",
  "short-film": "Create short films",
  "documentary": "Documentary production",
  "animation-movie": "Animated movie creation",
  "fix-url": "Fix any external website",
  "fix-website": "Repair & improve websites",
  "fix-app": "Fix external applications",
  "clone-improve": "Clone and improve sites",
  "redesign-url": "Redesign any website",
  "read-file": "Read & understand any file",
  "analyze-image": "See & analyze images",
  "analyze-document": "Understand documents",
  "analyze-code": "Deep code analysis",
  "analyze-data": "Data file analysis",
  "analyze-video": "Video content analysis",
  "ocr": "Extract text from images",
  "extract": "Extract specific info",
  "music-compose": "Compose complete music",
  "full-song": "Create complete songs",
  "album": "Create full music albums",
};

type Page = { name: string; title: string; html: string; };
type Project = { id: string; mode: Mode; prompt: string; createdAt: string; pages?: Page[]; projectName?: string; };
type ChatMessage = { role: "user" | "bebe"; text: string };

export default function Studio() {
  const [mode, setMode] = useState<Mode>("chat");
  const [activeCategory, setActiveCategory] = useState<string>("Chat");
  const [prompt, setPrompt] = useState("");
  const [urlToFix, setUrlToFix] = useState("");
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [projectName, setProjectName] = useState("bebe-creation");
  const [loading, setLoading] = useState(false);
  const [outputType, setOutputType] = useState<"html" | "code" | "text">("text");
  const [bebeForm, setBebeForm] = useState("Goddess");
  
  // Chat history for conversation mode
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // File upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when chat updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const createPreviewUrl = useCallback((html: string, allPages: Page[]) => {
    const navScript = `
      <script>
        document.addEventListener('click', function(e) {
          const link = e.target.closest('a');
          if (link) {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#page:')) {
              e.preventDefault();
              const pageName = href.replace('#page:', '');
              window.parent.postMessage({ type: 'navigate', page: pageName }, '*');
            }
          }
        });
      </script>
    `;
    
    const pageListHtml = allPages.length > 1 ? `
      <div style="position:fixed;bottom:10px;right:10px;background:rgba(0,0,0,0.85);padding:8px 12px;border-radius:8px;font-family:sans-serif;font-size:11px;color:#fff;z-index:99999;display:flex;gap:6px;">
        <span style="opacity:0.7;">Pages:</span>
        ${allPages.map((p, i) => `<a href="#page:${p.name}" style="color:${i === 0 ? '#f472b6' : '#fff'};text-decoration:none;padding:2px 6px;border-radius:4px;background:rgba(255,255,255,0.1);">${p.title}</a>`).join('')}
      </div>
    ` : '';

    const enhancedHtml = html.replace('</body>', `${pageListHtml}${navScript}</body>`);
    const blob = new Blob([enhancedHtml], { type: "text/html" });
    return URL.createObjectURL(blob);
  }, []);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'navigate' && e.data.page) {
        const pageIndex = pages.findIndex(p => p.name === e.data.page);
        if (pageIndex !== -1) {
          setCurrentPageIndex(pageIndex);
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [pages]);

  useEffect(() => {
    if (pages.length > 0 && pages[currentPageIndex]) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const url = createPreviewUrl(pages[currentPageIndex].html, pages);
      setPreviewUrl(url);
    }
  }, [currentPageIndex, pages, createPreviewUrl, previewUrl]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (filePreview) URL.revokeObjectURL(filePreview);
    };
  }, [previewUrl, filePreview]);

  // Handle file selection
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setFilePreview(url);
      setActiveCategory("Files");
      setMode("analyze-image");
    } else if (file.name.match(/\.(js|ts|jsx|tsx|py|go|rs|java|cpp|c|php|rb|swift|html|css|json|xml|yaml)$/i)) {
      setActiveCategory("Files");
      setMode("analyze-code");
    } else if (file.name.match(/\.(csv|xlsx|xls)$/i)) {
      setActiveCategory("Files");
      setMode("analyze-data");
    } else if (file.name.match(/\.(pdf|doc|docx|txt|md)$/i)) {
      setActiveCategory("Files");
      setMode("analyze-document");
    } else if (file.name.match(/\.(mp3|wav|ogg|m4a|flac)$/i)) {
      setActiveCategory("Music");
      setMode("music-analyze");
    } else if (file.name.match(/\.(mp4|webm|mov|avi)$/i)) {
      setActiveCategory("Files");
      setMode("analyze-video");
    } else {
      setActiveCategory("Files");
      setMode("read-file");
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
      setFilePreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  function saveProject(mode: Mode, prompt: string, pages: Page[], projectName: string) {
    const project: Project = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      mode,
      prompt,
      createdAt: new Date().toISOString(),
      pages,
      projectName,
    };
    if (typeof window !== "undefined") {
      const existing = window.localStorage.getItem("bebe-projects");
      const list: Project[] = existing ? JSON.parse(existing) : [];
      list.unshift(project);
      window.localStorage.setItem("bebe-projects", JSON.stringify(list.slice(0, 100)));
    }
  }

  function downloadProject() {
    if (pages.length === 0) return;
    const indexContent = pages.map((page) => {
      let html = page.html;
      pages.forEach(p => {
        html = html.replace(new RegExp(`href="#page:${p.name}"`, 'g'), `href="${p.name}.html"`);
      });
      return { name: `${page.name}.html`, content: html };
    });
    indexContent.forEach(file => {
      const blob = new Blob([file.content], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  function copyOutput() {
    const textToCopy = chatHistory.map(msg => `${msg.role === "user" ? "You" : "Bebe"}: ${msg.text}`).join("\n\n");
    navigator.clipboard.writeText(textToCopy);
  }

  async function handleGenerate() {
    if (!prompt.trim() && !selectedFile && !urlToFix.trim()) return;
    setLoading(true);
    
    const userMessage = prompt;
    setChatHistory(prev => [...prev, { role: "user", text: userMessage }]);
    setPrompt("");
    
    try {
      let formData = new FormData();
      formData.append("mode", mode);
      formData.append("prompt", userMessage);
      formData.append("bebeForm", bebeForm);
      if (selectedFile) formData.append("file", selectedFile);
      if (urlToFix) formData.append("url", urlToFix);
      
      const res = await fetch("/api/bebe", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || `API error: ${res.status}`);
      }

      const data = await res.json();
      
      if (data.form) {
        setBebeForm(data.form.charAt(0).toUpperCase() + data.form.slice(1));
      }

      // Handle chat mode
      if (["chat", "talk", "conversation"].includes(mode)) {
        const response = data.output || "I'm processing your message...";
        setChatHistory(prev => [...prev, { role: "bebe", text: response }]);
      } else {
        // Handle other modes
        setChatHistory(prev => [...prev, { role: "bebe", text: data.output || "Processing complete." }]);
      }

      if (data.pages && data.pages.length > 0) {
        setPages(data.pages);
        setProjectName(data.projectName || "bebe-creation");
        const url = createPreviewUrl(data.pages[0].html, data.pages);
        setPreviewUrl(url);
        saveProject(mode, userMessage, data.pages, data.projectName);
      } else if (data.previewHtml) {
        const singlePage = [{ name: "index", title: "Home", html: data.previewHtml }];
        setPages(singlePage);
        const url = createPreviewUrl(data.previewHtml, singlePage);
        setPreviewUrl(url);
        saveProject(mode, userMessage, singlePage, "bebe-creation");
      }

      clearFile();
      setUrlToFix("");
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Connection error";
      setChatHistory(prev => [...prev, { 
        role: "bebe", 
        text: `⚠️ Error: ${errorMsg}` 
      }]);
    } finally {
      setLoading(false);
    }
  }

  const isChatMode = ["chat", "talk", "conversation"].includes(mode);
  const isFixUrlMode = ["fix-url", "fix-website", "fix-app", "clone-improve", "redesign-url"].includes(mode);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-500 via-fuchsia-900 to-black text-white flex flex-col">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 sm:px-4 py-2 sm:py-3 border-b border-white/20 bg-black/40 backdrop-blur gap-2 sm:gap-0">
        <Link href="/" className="uppercase tracking-[0.15em] text-xs sm:text-sm font-bold hover:text-pink-300 transition-colors">
          Bebe AI
        </Link>
        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm flex-wrap">
          <span className="uppercase tracking-[0.1em] text-pink-300 hidden sm:inline">
            Form: {bebeForm}
          </span>
          <Link href="/help" className="uppercase tracking-[0.15em] hover:underline">Help</Link>
          <Link href="/projects" className="uppercase tracking-[0.15em] hover:underline">Projects</Link>
          <div className="flex items-center gap-1 uppercase tracking-[0.15em]">
            <span className="inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)] animate-pulse" />
            <span className="hidden sm:inline">All Powers</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2 min-h-0 auto-rows-max md:auto-rows-fr">
        {/* Left: Modes + File Upload + Prompt */}
        <section className="bg-black/80 border border-white/20 rounded-lg sm:rounded-xl p-2 flex flex-col gap-2 shadow-2xl overflow-hidden">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
            {Object.keys(MODE_CATEGORIES).map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setMode(MODE_CATEGORIES[cat as keyof typeof MODE_CATEGORIES][0]); }}
                className={`px-2 py-1 rounded-full text-xs uppercase tracking-[0.1em] transition-all whitespace-nowrap font-medium ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-[0_0_10px_rgba(244,114,182,0.6)]"
                    : "bg-black/60 border border-white/30 hover:border-white/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mode buttons */}
          <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto">
            {MODE_CATEGORIES[activeCategory as keyof typeof MODE_CATEGORIES]?.map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-2 py-1 rounded-full border text-xs uppercase tracking-[0.08em] transition-all font-medium ${
                  mode === m
                    ? "bg-gradient-to-r from-pink-500 to-rose-600 border-white shadow-[0_0_10px_rgba(244,114,182,0.8)]"
                    : "bg-black/60 border-white/30 hover:border-white/50"
                }`}
                title={MODE_DESCRIPTIONS[m] || m}
              >
                {m.replace(/-/g, " ")}
              </button>
            ))}
          </div>

          {/* Active mode display */}
          <div className="px-2 py-2 bg-gradient-to-r from-pink-500/20 to-fuchsia-600/20 rounded-lg border border-pink-500/30">
            <div className="text-xs uppercase tracking-[0.15em] text-pink-300 font-semibold">Active Power</div>
            <div className="text-base font-bold uppercase tracking-[0.1em]">{mode.replace(/-/g, " ")}</div>
            {MODE_DESCRIPTIONS[mode] && (
              <div className="text-xs text-white/60 mt-1">{MODE_DESCRIPTIONS[mode]}</div>
            )}
          </div>

          {/* URL Input for Fix External modes */}
          {isFixUrlMode && (
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.15em] text-pink-300 font-semibold">Website URL to Fix</label>
              <input
                type="url"
                value={urlToFix}
                onChange={(e) => setUrlToFix(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 bg-black/60 border border-white/30 rounded-lg text-sm focus:border-pink-500 focus:outline-none"
              />
            </div>
          )}

          {/* File Upload Zone */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-3 text-center transition-all cursor-pointer ${
              dragActive ? "border-pink-400 bg-pink-500/20" : selectedFile ? "border-emerald-400 bg-emerald-500/10" : "border-white/30 hover:border-white/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              accept="*/*"
            />
            {selectedFile ? (
              <div className="flex items-center gap-2">
                {filePreview && (
                  <img src={filePreview} alt="Preview" className="w-8 h-8 object-cover rounded" />
                )}
                <div className="flex-1 text-left min-w-0">
                  <div className="text-sm font-bold truncate">{selectedFile.name}</div>
                  <div className="text-xs text-white/60">{(selectedFile.size / 1024).toFixed(1)} KB</div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); clearFile(); }}
                  className="text-xs px-2 py-1 bg-red-500/20 hover:bg-red-500/40 rounded whitespace-nowrap"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <div className="text-sm uppercase tracking-[0.1em] font-semibold">Drop ANY file or click</div>
                <div className="text-xs text-white/60">Images, docs, code, video, audio</div>
              </div>
            )}
          </div>

          {/* Prompt area */}
          <div className="flex-1 flex flex-col min-h-0">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={isChatMode ? "Talk to Bebe naturally..." : isFixUrlMode ? "Describe what you want fixed..." : "Describe what you want..."}
              className="flex-1 p-3 bg-black/60 border border-white/20 rounded-lg text-sm resize-none focus:border-pink-500 focus:outline-none placeholder:text-white/40 min-h-[80px]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  handleGenerate();
                }
              }}
            />
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={loading || (!prompt.trim() && !selectedFile && !urlToFix.trim())}
            className={`w-full py-3 rounded-lg sm:rounded-xl uppercase tracking-[0.15em] font-bold transition-all text-sm sm:text-base ${
              loading
                ? "bg-gradient-to-r from-pink-500/50 to-rose-600/50 cursor-wait"
                : "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 shadow-[0_0_20px_rgba(244,114,182,0.5)] hover:shadow-[0_0_30px_rgba(244,114,182,0.7)]"
            }`}
          >
            {loading ? "Working..." : isChatMode ? "Send" : "Create"}
          </button>
        </section>

        {/* Middle: Chat */}
        <section className="bg-black/80 border border-white/20 rounded-lg sm:rounded-xl flex flex-col overflow-hidden shadow-2xl md:col-span-1 lg:col-span-1">
          <div className="px-3 py-2 border-b border-white/20 flex items-center justify-between bg-black/60">
            <div className="text-xs uppercase tracking-[0.15em] font-semibold">
              Conversation
            </div>
            <button onClick={copyOutput} className="text-xs uppercase tracking-[0.1em] px-2 py-1 bg-white/10 hover:bg-white/20 rounded">
              Copy
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-3 flex flex-col">
            {chatHistory.length === 0 ? (
              <div className="flex items-center justify-center h-full text-white/40 text-center">
                <div>
                  <div className="text-3xl mb-2">✦</div>
                  <div className="text-xs uppercase tracking-[0.15em]">Chat with Bebe</div>
                  <div className="text-xs mt-2">Start a conversation</div>
                </div>
              </div>
            ) : (
              <>
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] p-3 rounded-lg text-sm break-words ${
                      msg.role === "user" 
                        ? "bg-gradient-to-r from-pink-500/40 to-rose-600/40 border border-pink-500/50" 
                        : "bg-white/10 border border-white/20"
                    }`}>
                      {msg.role === "bebe" && (
                        <div className="text-xs uppercase tracking-[0.15em] text-pink-300 mb-1 font-semibold">Bebe AI</div>
                      )}
                      <div className="whitespace-pre-wrap">{msg.text}</div>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </>
            )}
          </div>
        </section>

        {/* Right: Preview */}
        <section className="bg-black/80 border border-white/20 rounded-lg sm:rounded-xl flex flex-col overflow-hidden shadow-2xl md:col-span-2 lg:col-span-1 min-h-[300px] sm:min-h-[400px]">
          <div className="px-3 py-2 border-b border-white/20 flex items-center justify-between bg-gradient-to-r from-pink-500/20 to-fuchsia-600/20">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-[0.15em] font-bold">Screening Computer</span>
              {pages.length > 0 && (
                <span className="text-xs uppercase tracking-[0.1em] text-pink-300">{pages.length} pages</span>
              )}
            </div>
            {pages.length > 0 && (
              <button
                onClick={downloadProject}
                className="text-xs uppercase tracking-[0.1em] px-2 py-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded shadow-[0_0_10px_rgba(52,211,153,0.5)] hover:shadow-[0_0_15px_rgba(52,211,153,0.7)] transition-all"
              >
                Download
              </button>
            )}
          </div>
          
          {/* Page tabs */}
          {pages.length > 1 && (
            <div className="px-2 py-1 border-b border-white/10 flex gap-1 overflow-x-auto bg-black/40">
              {pages.map((page, i) => (
                <button
                  key={page.name}
                  onClick={() => setCurrentPageIndex(i)}
                  className={`px-2 py-1 rounded text-xs uppercase tracking-[0.08em] transition-all whitespace-nowrap font-medium ${
                    i === currentPageIndex
                      ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  {page.title}
                </button>
              ))}
            </div>
          )}

          {/* Preview iframe */}
          <div className="flex-1 bg-white relative">
            {previewUrl ? (
              <iframe
                src={previewUrl}
                className="w-full h-full border-0"
                title="Bebe AI Preview"
                sandbox="allow-scripts allow-same-origin"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                <div className="text-center p-4">
                  <div className="text-3xl mb-3">✦</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-white/60 font-semibold">Screening Computer</div>
                  <div className="text-xs text-white/40 mt-2 max-w-xs leading-relaxed">
                    {isChatMode 
                      ? "Chat with Bebe" 
                      : isFixUrlMode
                      ? "Paste URL and Bebe will fix it"
                      : "Create anything"
                    }
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-3 sm:px-4 py-2 text-xs uppercase tracking-[0.15em] text-white/60 flex flex-col sm:flex-row justify-between border-t border-white/10 bg-black/40 gap-1 sm:gap-0">
        <span>Bebe AI - Created by Bebe Ray Gardon</span>
        <span className="hidden sm:inline">All Powers Unlocked | 100% Free Forever</span>
      </footer>
    </div>
  );
}
