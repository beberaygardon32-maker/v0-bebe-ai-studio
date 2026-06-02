"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";

// ALL AI MODES - Every ability in the universe (now 71 powers with file analysis)
const MODE_CATEGORIES = {
  "Files": ["read-file", "analyze-image", "analyze-document", "analyze-code", "analyze-data", "analyze-video", "ocr", "extract"],
  "Creation": ["website", "app", "ai-system", "game", "dashboard", "landing-page", "ecommerce", "portfolio", "blog"],
  "Code": ["code", "debug", "refactor", "optimize", "convert", "api", "database", "algorithm"],
  "Content": ["write", "edit-fix", "translate", "summarize", "expand", "rewrite", "copywriting", "seo"],
  "Visual": ["ui-design", "logo", "color-palette", "typography", "animation", "svg", "css-art"],
  "Intelligence": ["wisdom", "analyze", "research", "explain", "teach", "compare", "predict", "brainstorm"],
  "Data": ["data-analyze", "chart", "json", "csv", "sql", "regex", "math", "statistics"],
  "Business": ["business-plan", "marketing", "email", "pitch", "proposal", "contract", "resume"],
  "Creative": ["story", "poetry", "script", "lyrics", "character", "worldbuild", "dialogue"],
  "Technical": ["documentation", "readme", "tutorial", "specification", "architecture", "security", "testing"]
} as const;

type Mode = typeof MODE_CATEGORIES[keyof typeof MODE_CATEGORIES][number];

const ALL_MODES = Object.values(MODE_CATEGORIES).flat() as Mode[];

const MODE_DESCRIPTIONS: Record<string, string> = {
  "read-file": "Read & understand any file",
  "analyze-image": "See & analyze images",
  "analyze-document": "Understand PDFs, docs, etc.",
  "analyze-code": "Deep code analysis",
  "analyze-data": "CSV, JSON, Excel analysis",
  "analyze-video": "Video content analysis",
  "ocr": "Extract text from images",
  "extract": "Extract specific info"
};

type Page = {
  name: string;
  title: string;
  html: string;
};

type Project = {
  id: string;
  mode: Mode;
  prompt: string;
  createdAt: string;
  pages?: Page[];
  projectName?: string;
};

export default function Studio() {
  const [mode, setMode] = useState<Mode>("website");
  const [activeCategory, setActiveCategory] = useState<string>("Creation");
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState(
    "// Bebe AI - Goddess of the Universe\n// All AI Powers Active - 71 Modes Ready\n// 100% FREE - No Credits - No Limits\n\n// Created by Bebe Ray Gardon\n\n// Upload any file or enter a prompt.\n// Bebe AI can read and understand EVERYTHING."
  );
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [projectName, setProjectName] = useState("bebe-creation");
  const [loading, setLoading] = useState(false);
  const [outputType, setOutputType] = useState<"html" | "code" | "text">("html");
  
  // File upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      <div style="position:fixed;bottom:10px;right:10px;background:rgba(0,0,0,0.85);padding:8px 12px;border-radius:8px;font-family:sans-serif;font-size:11px;color:#fff;z-index:99999;display:flex;gap:8px;align-items:center;">
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageIndex, pages]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (filePreview) URL.revokeObjectURL(filePreview);
    };
  }, [previewUrl, filePreview]);

  // Handle file selection
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    
    // Create preview for images
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
    } else {
      setActiveCategory("Files");
      setMode("read-file");
    }
  };

  // Drag and drop handlers
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
      window.localStorage.setItem(
        "bebe-projects",
        JSON.stringify(list.slice(0, 100))
      );
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
    navigator.clipboard.writeText(output);
  }

  async function handleGenerate() {
    if (!prompt.trim() && !selectedFile) return;
    setLoading(true);
    setPages([]);
    setCurrentPageIndex(0);
    
    try {
      let res: Response;
      
      if (selectedFile) {
        // Use FormData for file upload
        const formData = new FormData();
        formData.append("mode", mode);
        formData.append("prompt", prompt);
        formData.append("file", selectedFile);
        
        res = await fetch("/api/bebe", {
          method: "POST",
          body: formData,
        });
      } else {
        // Use JSON for text-only requests
        res = await fetch("/api/bebe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mode, prompt }),
        });
      }
      
      const data = await res.json();
      
      if (data.fileAnalyzed) {
        setOutput(`// Analyzed: ${data.fileAnalyzed}\n// Type: ${data.fileType}\n\n${data.output || "// No output returned."}`);
      } else {
        setOutput(data.output || "// No output returned.");
      }
      
      setOutputType(data.outputType || "text");
      
      if (data.pages && data.pages.length > 0) {
        setPages(data.pages);
        setProjectName(data.projectName || "bebe-creation");
        const url = createPreviewUrl(data.pages[0].html, data.pages);
        setPreviewUrl(url);
        saveProject(mode, prompt, data.pages, data.projectName);
      } else if (data.previewHtml) {
        const singlePage = [{ name: "index", title: "Home", html: data.previewHtml }];
        setPages(singlePage);
        const url = createPreviewUrl(data.previewHtml, singlePage);
        setPreviewUrl(url);
        saveProject(mode, prompt, singlePage, "bebe-creation");
      } else {
        setPages([]);
        setPreviewUrl(null);
      }
    } catch {
      setOutput("// Error talking to Bebe AI backend. Check /api/bebe.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-500 via-fuchsia-900 to-black text-white flex flex-col">
      <header className="flex items-center justify-between px-4 py-2 border-b border-white/20 bg-black/40 backdrop-blur">
        <Link
          href="/"
          className="uppercase tracking-[0.15em] text-[0.65rem] font-bold hover:text-pink-300 transition-colors"
        >
          Bebe AI - Goddess of the Universe
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/help" className="text-[0.55rem] uppercase tracking-[0.15em] hover:underline">
            Help
          </Link>
          <Link href="/projects" className="text-[0.55rem] uppercase tracking-[0.15em] hover:underline">
            Projects
          </Link>
          <Link href="/command-center" className="text-[0.55rem] uppercase tracking-[0.15em] hover:underline text-pink-300">
            Admin
          </Link>
          <div className="flex items-center gap-1.5 text-[0.55rem] uppercase tracking-[0.15em]">
            <span className="inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)] animate-pulse" />
            <span>Free Forever</span>
          </div>
        </div>
      </header>

      <main className="flex-1 grid lg:grid-cols-[1fr_1.2fr_1.4fr] gap-2 p-2 min-h-0">
        {/* Left: Modes + File Upload + Prompt */}
        <section className="bg-black/80 border border-white/20 rounded-xl p-2 flex flex-col gap-2 shadow-2xl overflow-hidden">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-1">
            {Object.keys(MODE_CATEGORIES).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2 py-0.5 rounded-full text-[0.5rem] uppercase tracking-[0.12em] transition-all ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white"
                    : "bg-black/60 border border-white/30 hover:border-white/50"
                }`}
              >
                {cat === "Files" ? `${cat} (Upload)` : cat}
              </button>
            ))}
          </div>

          {/* Mode buttons for active category */}
          <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
            {MODE_CATEGORIES[activeCategory as keyof typeof MODE_CATEGORIES].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-2 py-0.5 rounded-full border text-[0.5rem] uppercase tracking-[0.1em] transition-all ${
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

          {/* Current mode display */}
          <div className="px-2 py-1 bg-gradient-to-r from-pink-500/20 to-fuchsia-600/20 rounded-lg border border-pink-500/30">
            <div className="text-[0.5rem] uppercase tracking-[0.15em] text-pink-300">Active Power</div>
            <div className="text-sm font-bold uppercase tracking-[0.1em]">{mode.replace(/-/g, " ")}</div>
            {MODE_DESCRIPTIONS[mode] && (
              <div className="text-[0.5rem] text-white/60">{MODE_DESCRIPTIONS[mode]}</div>
            )}
          </div>

          {/* File Upload Zone */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-3 text-center transition-all cursor-pointer ${
              dragActive
                ? "border-pink-400 bg-pink-500/20"
                : selectedFile
                ? "border-emerald-400 bg-emerald-500/10"
                : "border-white/30 hover:border-white/50 bg-black/40"
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
                {filePreview ? (
                  <img src={filePreview} alt="Preview" className="w-10 h-10 object-cover rounded" />
                ) : (
                  <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                )}
                <div className="flex-1 text-left">
                  <div className="text-[0.6rem] font-medium truncate">{selectedFile.name}</div>
                  <div className="text-[0.5rem] text-white/50">{(selectedFile.size / 1024).toFixed(1)} KB</div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); clearFile(); }}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div>
                <svg className="w-6 h-6 mx-auto mb-1 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <div className="text-[0.55rem] uppercase tracking-[0.1em] text-white/60">
                  Drop any file or click to upload
                </div>
                <div className="text-[0.45rem] text-white/40 mt-0.5">
                  Images, PDFs, Code, Data, Documents - EVERYTHING
                </div>
              </div>
            )}
          </div>

          {/* Prompt input */}
          <textarea
            className="flex-1 rounded-lg border border-white/20 bg-black/70 text-[0.7rem] p-2 outline-none resize-none focus:border-pink-500/50 transition-colors placeholder:text-white/40 min-h-[80px]"
            placeholder={selectedFile 
              ? `What do you want Bebe AI to do with "${selectedFile.name}"?\n\nExamples:\n- "Explain this code"\n- "Find bugs and fix them"\n- "Extract all text"\n- "Summarize this document"`
              : `Tell Bebe AI what to create...\n\nExamples:\n- "Build a fitness tracking dashboard"\n- "Write a love poem about stars"\n- "Debug this Python code: ..."`
            }
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => { setPrompt(""); clearFile(); }}
              className="px-2 py-1 rounded-full border border-white/30 bg-black/70 text-[0.5rem] uppercase tracking-[0.12em] hover:bg-black/90"
            >
              Clear All
            </button>
            <button
              onClick={handleGenerate}
              disabled={loading || (!prompt.trim() && !selectedFile)}
              className="px-3 py-1 rounded-full border border-white/90 bg-gradient-to-r from-pink-500 to-rose-600 text-[0.55rem] uppercase tracking-[0.12em] shadow-[0_0_14px_rgba(244,114,182,0.9)] disabled:opacity-60 hover:shadow-[0_0_20px_rgba(244,114,182,1)]"
            >
              {loading ? "Working..." : selectedFile ? "Analyze File" : "Let Bebe AI Work"}
            </button>
          </div>
        </section>

        {/* Middle: Output */}
        <section className="bg-black/80 border border-white/20 rounded-xl p-2 flex flex-col gap-2 shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[0.55rem] uppercase tracking-[0.15em]">Bebe AI Output</span>
            <div className="flex gap-1">
              <span className={`px-2 py-0.5 rounded-full text-[0.45rem] uppercase ${outputType === 'html' ? 'bg-pink-500' : outputType === 'code' ? 'bg-blue-500' : 'bg-emerald-500'}`}>
                {outputType}
              </span>
              <button onClick={copyOutput} className="px-2 py-0.5 border border-white/30 rounded-full text-[0.45rem] uppercase hover:bg-white/10">
                Copy
              </button>
            </div>
          </div>
          <pre className="flex-1 rounded-lg border border-white/20 bg-black/80 text-[0.65rem] p-2 overflow-auto font-mono whitespace-pre-wrap">
            {output}
          </pre>
          {pages.length > 0 && (
            <button
              onClick={downloadProject}
              className="px-3 py-1.5 rounded-full border border-emerald-400/60 bg-emerald-500/20 text-[0.55rem] uppercase tracking-[0.12em] hover:bg-emerald-500/30 flex items-center justify-center gap-2"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download ({pages.length} pages)
            </button>
          )}
        </section>

        {/* Right: Screening Computer */}
        <section className="bg-black/80 border border-white/20 rounded-xl p-2 flex flex-col gap-2 shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[0.55rem] uppercase tracking-[0.15em]">Screening Computer</span>
            <span className="px-2 py-0.5 border border-white/30 rounded-full flex items-center gap-1 text-[0.45rem] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          </div>
          
          {pages.length > 1 && (
            <div className="flex gap-1 flex-wrap">
              {pages.map((page, i) => (
                <button
                  key={page.name}
                  onClick={() => setCurrentPageIndex(i)}
                  className={`px-2 py-0.5 rounded-full text-[0.45rem] uppercase tracking-[0.1em] ${
                    currentPageIndex === i
                      ? "bg-pink-500 text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  {page.title}
                </button>
              ))}
            </div>
          )}

          <div className="relative flex-1 rounded-lg border border-white/20 bg-black overflow-hidden min-h-[300px]">
            {previewUrl ? (
              <>
                <div className="absolute top-1 left-2 text-[0.5rem] uppercase tracking-[0.15em] text-white/70 z-10 bg-black/60 px-2 py-0.5 rounded">
                  {projectName} - {pages[currentPageIndex]?.title}
                </div>
                <iframe
                  src={previewUrl}
                  className="w-full h-full border-0 bg-white"
                  title="Bebe AI Preview"
                />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[0.65rem] text-white/60">
                <div className="text-center p-4">
                  <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-pink-500/20 to-fuchsia-600/20 border border-white/10 mb-2 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="uppercase tracking-[0.15em] text-[0.6rem]">
                    {outputType === "html" ? "Run a build to see preview" : "Preview for HTML modes"}
                  </p>
                  <p className="text-[0.5rem] text-white/40 mt-1">
                    {ALL_MODES.length} Powers Ready
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-4 py-1.5 text-[0.5rem] uppercase tracking-[0.15em] text-white/50 flex justify-between border-t border-white/10">
        <span>Created by Bebe Ray Gardon</span>
        <span>{ALL_MODES.length} Powers - 100% Free - Unlimited</span>
      </footer>
    </div>
  );
}
