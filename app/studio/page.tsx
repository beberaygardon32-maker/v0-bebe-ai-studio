"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

const MODES = ["website", "app", "ai-system", "edit-fix", "wisdom"] as const;
type Mode = (typeof MODES)[number];

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
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState(
    "// Bebe AI is ready.\n// Tell her what to build, fix, or explain."
  );
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [projectName, setProjectName] = useState("bebe-creation");
  const [loading, setLoading] = useState(false);

  // Create preview URL for current page with navigation handler
  const createPreviewUrl = useCallback((html: string, allPages: Page[]) => {
    // Inject navigation script to handle internal links
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
    
    // Add page list for navigation display
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

  // Handle navigation messages from iframe
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

  // Update preview when page changes
  useEffect(() => {
    if (pages.length > 0 && pages[currentPageIndex]) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const url = createPreviewUrl(pages[currentPageIndex].html, pages);
      setPreviewUrl(url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageIndex, pages]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

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
    
    // Create a simple HTML with all pages
    const indexContent = pages.map((page, i) => {
      // Replace #page: links with actual .html file links
      let html = page.html;
      pages.forEach(p => {
        html = html.replace(new RegExp(`href="#page:${p.name}"`, 'g'), `href="${p.name}.html"`);
      });
      return { name: `${page.name}.html`, content: html };
    });

    // Download as individual files or zip
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

  async function handleGenerate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setPages([]);
    setCurrentPageIndex(0);
    try {
      const res = await fetch("/api/bebe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, prompt }),
      });
      const data = await res.json();
      setOutput(data.output || "// No output returned.");
      
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
      }
    } catch {
      setOutput("// Error talking to Bebe AI backend. Check /api/bebe.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-500 via-fuchsia-900 to-black text-white flex flex-col">
      <header className="flex items-center justify-between px-6 py-3 border-b border-white/20 bg-black/40 backdrop-blur">
        <Link
          href="/"
          className="uppercase tracking-[0.2em] text-xs font-bold hover:text-pink-300 transition-colors"
        >
          Bebe AI Studio - Box Press
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/projects"
            className="text-[0.6rem] uppercase tracking-[0.18em] hover:underline"
          >
            Projects
          </Link>
          <div className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.18em]">
            <span className="inline-flex w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
            <span>Online - Goddess Mode</span>
          </div>
        </div>
      </header>

      <main className="flex-1 grid lg:grid-cols-[1.1fr_1.2fr_1.4fr] gap-3 p-3 min-h-0">
        {/* Left: Modes + Prompt */}
        <section className="bg-black/80 border border-white/20 rounded-2xl p-3 flex flex-col gap-3 shadow-2xl">
          <div className="flex items-center justify-between text-[0.6rem] uppercase tracking-[0.18em]">
            <span>Bebe AI Powers</span>
            <span className="px-2 py-1 border border-white/30 rounded-full">
              Mode Select
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {MODES.map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1 rounded-full border text-[0.6rem] uppercase tracking-[0.18em] transition-all ${
                  mode === m
                    ? "bg-gradient-to-r from-pink-500 to-rose-600 border-white shadow-[0_0_14px_rgba(244,114,182,0.9)]"
                    : "bg-black/60 border-white/40 hover:border-white/60"
                }`}
              >
                {m.replace("-", " ")}
              </button>
            ))}
          </div>
          <textarea
            className="flex-1 mt-1 rounded-xl border border-white/25 bg-black/70 text-xs p-3 outline-none resize-none focus:border-pink-500/50 transition-colors placeholder:text-white/40"
            placeholder={`Tell Bebe AI exactly what to do. Example:\nCreate a luxury landing page for 'My Fault' with bold red/pink, diamonds, and a huge play button.`}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setPrompt("")}
              className="px-3 py-1 rounded-full border border-white/40 bg-black/70 text-[0.6rem] uppercase tracking-[0.18em] hover:bg-black/90 transition-colors"
            >
              Clear
            </button>
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="px-4 py-1 rounded-full border border-white/90 bg-gradient-to-r from-pink-500 to-rose-600 text-[0.6rem] uppercase tracking-[0.18em] shadow-[0_0_16px_rgba(244,114,182,0.9)] disabled:opacity-60 hover:shadow-[0_0_24px_rgba(244,114,182,1)] transition-shadow"
            >
              {loading ? "Bebe AI Working..." : "Let Bebe AI Work"}
            </button>
          </div>
        </section>

        {/* Middle: Output */}
        <section className="bg-black/80 border border-white/20 rounded-2xl p-3 flex flex-col gap-3 shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between text-[0.6rem] uppercase tracking-[0.18em]">
            <span>Bebe AI Output</span>
            <span className="px-2 py-1 border border-white/30 rounded-full">
              Code - Copy - Layout
            </span>
          </div>
          <pre className="flex-1 rounded-xl border border-white/25 bg-black/80 text-[0.7rem] p-3 overflow-auto font-mono whitespace-pre-wrap">
            {output}
          </pre>
          {pages.length > 0 && (
            <button
              onClick={downloadProject}
              className="px-4 py-2 rounded-full border border-emerald-400/60 bg-emerald-500/20 text-[0.6rem] uppercase tracking-[0.18em] hover:bg-emerald-500/30 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Project ({pages.length} pages)
            </button>
          )}
        </section>

        {/* Right: Screening Computer */}
        <section className="bg-black/80 border border-white/20 rounded-2xl p-3 flex flex-col gap-3 shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between text-[0.6rem] uppercase tracking-[0.18em]">
            <span>Screening Computer</span>
            <span className="px-2 py-1 border border-white/30 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Preview
            </span>
          </div>
          
          {/* Page tabs */}
          {pages.length > 1 && (
            <div className="flex gap-1 flex-wrap">
              {pages.map((page, i) => (
                <button
                  key={page.name}
                  onClick={() => setCurrentPageIndex(i)}
                  className={`px-3 py-1 rounded-full text-[0.55rem] uppercase tracking-[0.15em] transition-all ${
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

          <div className="relative flex-1 rounded-xl border border-white/25 bg-black overflow-hidden">
            <div className="absolute top-2 left-3 text-[0.55rem] uppercase tracking-[0.18em] text-white/70 z-10 bg-black/60 px-2 py-1 rounded">
              {projectName} - {pages[currentPageIndex]?.title || "Bebe AI Building"}
            </div>
            {previewUrl ? (
              <iframe
                src={previewUrl}
                className="w-full h-full border-0 bg-white"
                title="Bebe AI Preview"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[0.7rem] text-white/60">
                <div className="text-center p-6">
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-pink-500/20 to-fuchsia-600/20 border border-white/10 mb-3 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white/40"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="uppercase tracking-[0.18em]">
                    Run a build to see preview
                  </p>
                  <p className="text-[0.6rem] mt-2 text-white/40">
                    Bebe AI creates multi-page sites with working links
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
