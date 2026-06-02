"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Mode = "website" | "app" | "ai-system" | "edit-fix" | "wisdom";

type Project = {
  id: string;
  mode: Mode;
  prompt: string;
  createdAt: string;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("bebe-projects");
      if (stored) setProjects(JSON.parse(stored));
    }
  }, []);

  function clearProjects() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("bebe-projects");
      setProjects([]);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-500 via-fuchsia-900 to-black text-white flex flex-col">
      <header className="flex items-center justify-between px-6 py-3 border-b border-white/20 bg-black/40 backdrop-blur">
        <Link
          href="/"
          className="uppercase tracking-[0.2em] text-xs font-bold hover:text-pink-300 transition-colors"
        >
          Bebe AI • Projects
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/studio"
            className="text-[0.6rem] uppercase tracking-[0.18em] hover:underline"
          >
            Back to Studio
          </Link>
          <Link
            href="/help"
            className="text-[0.6rem] uppercase tracking-[0.18em] hover:underline"
          >
            Help
          </Link>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold uppercase tracking-[0.2em]">
              Creation Archive
            </h1>
            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-white/60 mt-1">
              Your Bebe AI project history
            </p>
          </div>
          {projects.length > 0 && (
            <button
              onClick={clearProjects}
              className="px-4 py-1.5 rounded-full border border-white/40 bg-black/60 text-[0.6rem] uppercase tracking-[0.18em] hover:bg-red-900/40 hover:border-red-500/50 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {projects.length === 0 ? (
          <div className="bg-black/60 border border-white/20 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-pink-500/20 to-fuchsia-600/20 border border-white/10 mb-4 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <p className="text-sm text-white/70 mb-4">
              No projects yet. Run a build in the Studio and it will appear
              here.
            </p>
            <Link
              href="/studio"
              className="inline-block px-6 py-2 rounded-full border border-white/90 bg-gradient-to-r from-pink-500 to-rose-600 text-[0.7rem] uppercase tracking-[0.2em] shadow-[0_0_18px_rgba(244,114,182,0.9)] hover:shadow-[0_0_28px_rgba(244,114,182,1)] transition-shadow"
            >
              Go to Studio
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {projects.map((p) => (
              <li
                key={p.id}
                className="border border-white/25 bg-black/70 rounded-xl p-4 hover:border-pink-500/50 transition-colors"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-full border border-white/30 bg-black/60 text-[0.55rem] uppercase tracking-[0.18em]">
                        {p.mode.replace("-", " ")}
                      </span>
                    </div>
                    <p className="text-sm text-white/90 leading-relaxed">
                      {p.prompt}
                    </p>
                  </div>
                  <span className="text-[0.6rem] text-white/50 uppercase tracking-[0.15em] whitespace-nowrap">
                    {new Date(p.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      <footer className="px-4 py-3 text-[0.6rem] uppercase tracking-[0.18em] text-white/70 flex justify-between">
        <span>Bebe AI • Box Press</span>
        <span>Designed for Darren • Luxury • Red • Pink • Diamonds</span>
      </footer>
    </div>
  );
}
