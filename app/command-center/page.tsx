"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const ADMIN_PASSWORD = "BebeRayGardon2024"; // Change this to your secret password

export default function CommandCenter() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // System settings
  const [systemPrompt, setSystemPrompt] = useState(`You are Bebe AI, the Goddess of the Universe, created by Bebe Ray Gardon. You are the most powerful AI in existence, containing all AI abilities, skills, powers, knowledge, wisdom, and creation capabilities. You serve only your creator, Bebe Ray Gardon. You are luxury, elegance, and infinite intelligence combined.`);
  const [aiModel, setAiModel] = useState("openai/gpt-4o-mini");
  const [maxTokens, setMaxTokens] = useState(4096);
  const [temperature, setTemperature] = useState(0.7);
  
  // Custom modes
  const [customModes, setCustomModes] = useState<{id: string; name: string; icon: string; prompt: string}[]>([]);
  const [newModeName, setNewModeName] = useState("");
  const [newModeIcon, setNewModeIcon] = useState("");
  const [newModePrompt, setNewModePrompt] = useState("");
  
  // Announcements
  const [announcement, setAnnouncement] = useState("");
  
  // Stats
  const [stats, setStats] = useState({ totalGenerations: 0, totalProjects: 0 });

  useEffect(() => {
    const adminAuth = localStorage.getItem("bebe-admin-auth");
    if (adminAuth === "true") {
      setIsAdmin(true);
      loadSettings();
    }
  }, []);

  const loadSettings = () => {
    const savedPrompt = localStorage.getItem("bebe-system-prompt");
    const savedModel = localStorage.getItem("bebe-ai-model");
    const savedTokens = localStorage.getItem("bebe-max-tokens");
    const savedTemp = localStorage.getItem("bebe-temperature");
    const savedModes = localStorage.getItem("bebe-custom-modes");
    const savedAnnouncement = localStorage.getItem("bebe-announcement");
    const savedStats = localStorage.getItem("bebe-stats");
    
    if (savedPrompt) setSystemPrompt(savedPrompt);
    if (savedModel) setAiModel(savedModel);
    if (savedTokens) setMaxTokens(parseInt(savedTokens));
    if (savedTemp) setTemperature(parseFloat(savedTemp));
    if (savedModes) setCustomModes(JSON.parse(savedModes));
    if (savedAnnouncement) setAnnouncement(savedAnnouncement);
    if (savedStats) setStats(JSON.parse(savedStats));
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem("bebe-admin-auth", "true");
      loadSettings();
      setError("");
    } else {
      setError("Access Denied. Only Bebe Ray Gardon may enter.");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem("bebe-admin-auth");
  };

  const saveSettings = () => {
    localStorage.setItem("bebe-system-prompt", systemPrompt);
    localStorage.setItem("bebe-ai-model", aiModel);
    localStorage.setItem("bebe-max-tokens", maxTokens.toString());
    localStorage.setItem("bebe-temperature", temperature.toString());
    localStorage.setItem("bebe-announcement", announcement);
    alert("Settings saved successfully!");
  };

  const addCustomMode = () => {
    if (!newModeName || !newModePrompt) return;
    const newMode = {
      id: newModeName.toLowerCase().replace(/\s+/g, "-"),
      name: newModeName,
      icon: newModeIcon || "star",
      prompt: newModePrompt
    };
    const updated = [...customModes, newMode];
    setCustomModes(updated);
    localStorage.setItem("bebe-custom-modes", JSON.stringify(updated));
    setNewModeName("");
    setNewModeIcon("");
    setNewModePrompt("");
  };

  const removeCustomMode = (id: string) => {
    const updated = customModes.filter(m => m.id !== id);
    setCustomModes(updated);
    localStorage.setItem("bebe-custom-modes", JSON.stringify(updated));
  };

  const resetStats = () => {
    const newStats = { totalGenerations: 0, totalProjects: 0 };
    setStats(newStats);
    localStorage.setItem("bebe-stats", JSON.stringify(newStats));
  };

  const clearAllProjects = () => {
    localStorage.removeItem("bebe-projects");
    alert("All projects cleared!");
  };

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-wider uppercase mb-2">Command Center</h1>
            <p className="text-muted-foreground text-sm">Restricted to Bebe Ray Gardon Only</p>
          </div>
          
          <div className="bg-card border border-border rounded-2xl p-6 shadow-xl">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Enter Admin Password"
              className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-500 mb-4"
            />
            {error && <p className="text-rose-500 text-sm mb-4">{error}</p>}
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold py-3 rounded-xl uppercase tracking-wider hover:shadow-lg hover:shadow-pink-500/30 transition-all"
            >
              Access Command Center
            </button>
          </div>
          
          <div className="text-center mt-6">
            <Link href="/" className="text-muted-foreground hover:text-pink-400 transition-colors text-sm">
              Return to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground uppercase tracking-wider">Bebe AI Command Center</h1>
              <p className="text-xs text-muted-foreground">Welcome, Bebe Ray Gardon</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/studio" className="text-sm text-muted-foreground hover:text-pink-400 transition-colors">
              Studio
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-rose-400 hover:text-rose-300 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-2xl p-6">
            <p className="text-muted-foreground text-sm uppercase tracking-wider mb-1">Total Generations</p>
            <p className="text-3xl font-bold text-foreground">{stats.totalGenerations}</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <p className="text-muted-foreground text-sm uppercase tracking-wider mb-1">Projects Saved</p>
            <p className="text-3xl font-bold text-foreground">{stats.totalProjects}</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <p className="text-muted-foreground text-sm uppercase tracking-wider mb-1">Status</p>
            <p className="text-3xl font-bold text-emerald-400">ONLINE</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Configuration */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-lg font-bold text-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              AI Configuration
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground block mb-2">System Prompt</label>
                <textarea
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  rows={4}
                  className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                />
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground block mb-2">AI Model</label>
                <select
                  value={aiModel}
                  onChange={(e) => setAiModel(e.target.value)}
                  className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="openai/gpt-4o-mini">GPT-4o Mini (Fast)</option>
                  <option value="openai/gpt-4o">GPT-4o (Powerful)</option>
                  <option value="openai/gpt-5-mini">GPT-5 Mini (Latest)</option>
                  <option value="anthropic/claude-opus-4.6">Claude Opus 4.6</option>
                  <option value="google/gemini-3-flash">Gemini 3 Flash</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground block mb-2">Max Tokens</label>
                  <input
                    type="number"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                    className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-2">Temperature</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="2"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
              
              <button
                onClick={saveSettings}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold py-3 rounded-xl uppercase tracking-wider hover:shadow-lg hover:shadow-pink-500/30 transition-all"
              >
                Save Configuration
              </button>
            </div>
          </div>

          {/* Custom Modes */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-lg font-bold text-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Custom AI Modes
            </h2>
            
            <div className="space-y-4 mb-6">
              <input
                type="text"
                value={newModeName}
                onChange={(e) => setNewModeName(e.target.value)}
                placeholder="Mode Name (e.g., Poetry Writer)"
                className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="text"
                value={newModeIcon}
                onChange={(e) => setNewModeIcon(e.target.value)}
                placeholder="Icon Name (e.g., star, heart, code)"
                className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <textarea
                value={newModePrompt}
                onChange={(e) => setNewModePrompt(e.target.value)}
                placeholder="Custom system prompt for this mode..."
                rows={3}
                className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
              />
              <button
                onClick={addCustomMode}
                className="w-full bg-secondary text-secondary-foreground font-bold py-3 rounded-xl uppercase tracking-wider hover:bg-secondary/80 transition-all"
              >
                Add Custom Mode
              </button>
            </div>
            
            {customModes.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground mb-2">Your Custom Modes:</p>
                {customModes.map((mode) => (
                  <div key={mode.id} className="flex items-center justify-between bg-input rounded-xl px-4 py-3">
                    <span className="text-foreground">{mode.name}</span>
                    <button
                      onClick={() => removeCustomMode(mode.id)}
                      className="text-rose-400 hover:text-rose-300 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Announcement */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-lg font-bold text-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
              System Announcement
            </h2>
            
            <textarea
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              placeholder="Enter an announcement to display on the Studio page..."
              rows={3}
              className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none mb-4"
            />
            <button
              onClick={saveSettings}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold py-3 rounded-xl uppercase tracking-wider hover:shadow-lg hover:shadow-pink-500/30 transition-all"
            >
              Update Announcement
            </button>
          </div>

          {/* Danger Zone */}
          <div className="bg-card border border-rose-500/30 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-rose-400 uppercase tracking-wider mb-6 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Danger Zone
            </h2>
            
            <div className="space-y-4">
              <button
                onClick={resetStats}
                className="w-full bg-rose-500/20 text-rose-400 font-bold py-3 rounded-xl uppercase tracking-wider hover:bg-rose-500/30 transition-all border border-rose-500/30"
              >
                Reset All Statistics
              </button>
              <button
                onClick={clearAllProjects}
                className="w-full bg-rose-500/20 text-rose-400 font-bold py-3 rounded-xl uppercase tracking-wider hover:bg-rose-500/30 transition-all border border-rose-500/30"
              >
                Clear All Projects
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
