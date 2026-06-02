import { generateText } from "ai";

type Mode = "website" | "app" | "ai-system" | "edit-fix" | "wisdom";

export async function POST(req: Request) {
  const { mode, prompt } = (await req.json()) as { mode: Mode; prompt: string };

  if (!prompt || !mode) {
    return Response.json({ error: "Missing mode or prompt" }, { status: 400 });
  }

  try {
    // BUILD MODES: website / app / ai-system → full multi-page website with working links
    if (mode === "website" || mode === "app" || mode === "ai-system") {
      const { text } = await generateText({
        model: "openai/gpt-4o-mini",
        system: `You are Bebe AI, a luxury, goddess-level creator of websites, apps, and AI systems.

You MUST return a JSON object with this EXACT structure (no markdown, no code blocks, just pure JSON):
{
  "pages": [
    {
      "name": "index",
      "title": "Home",
      "html": "<!DOCTYPE html>..."
    },
    {
      "name": "about",
      "title": "About",
      "html": "<!DOCTYPE html>..."
    }
  ],
  "projectName": "my-project"
}

RULES:
1. Create 3-5 pages minimum for websites (index, about, services/features, contact, etc.)
2. Each page MUST be a complete HTML document with <!DOCTYPE html>, <html>, <head>, <body>
3. All internal links MUST use this format: <a href="#page:pagename">Link Text</a>
   - Example: <a href="#page:about">About Us</a>
   - Example: <a href="#page:contact">Contact</a>
4. Include a consistent navigation bar on EVERY page with links to all other pages
5. Use luxury styling: bold pinks, reds, blacks, gold accents, gradients, shadows
6. Use Google Fonts (Playfair Display, Montserrat, etc.)
7. Make it mobile responsive with viewport meta tag
8. Include proper CSS in <style> tags
9. Add smooth hover effects and transitions
10. For apps/ai-systems: create functional pages with forms, buttons, interactive elements

Return ONLY valid JSON. No explanations, no markdown.`,
        prompt: `Mode: ${mode}\nUser request: ${prompt}`,
      });

      // Parse the JSON response
      let parsed;
      try {
        // Clean up potential markdown code blocks
        const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        parsed = JSON.parse(cleanText);
      } catch {
        // Fallback: treat as single page
        parsed = {
          pages: [{ name: "index", title: "Home", html: text }],
          projectName: "bebe-creation"
        };
      }

      return Response.json({
        output: `// Bebe AI created "${parsed.projectName}" with ${parsed.pages?.length || 1} pages:\n// ${parsed.pages?.map((p: {name: string; title: string}) => `${p.title} (${p.name}.html)`).join(', ')}\n\n// Click pages in the preview to navigate.\n// Use "Download Project" to get all files.`,
        previewHtml: parsed.pages?.[0]?.html || text,
        pages: parsed.pages || [{ name: "index", title: "Home", html: text }],
        projectName: parsed.projectName || "bebe-creation"
      });
    }

    // EDIT / FIX MODE: returns improved text/code
    if (mode === "edit-fix") {
      const { text } = await generateText({
        model: "openai/gpt-4o-mini",
        system:
          "You are Bebe AI, a goddess-level editor and fixer. " +
          "You improve, clean, and fix what the user gives you (text or code). " +
          "Return ONLY the corrected content. No explanations, no extra commentary.",
        prompt,
      });

      return Response.json({
        output: text,
      });
    }

    // WISDOM MODE: guidance, steps, strategy
    if (mode === "wisdom") {
      const { text } = await generateText({
        model: "openai/gpt-4o-mini",
        system:
          "You are Bebe AI, a goddess-level strategist, mentor, and oracle. " +
          "You speak with confidence and clarity. Give direct, step-by-step guidance. " +
          "Format your response beautifully with clear sections. " +
          "No HTML, no markdown code blocks, just clean formatted text.",
        prompt,
      });

      return Response.json({
        output: text,
      });
    }

    return Response.json({ output: "// Mode not recognized yet." });
  } catch (error: unknown) {
    console.error("Bebe AI error:", error);
    return Response.json({ error: "Bebe AI backend error" }, { status: 500 });
  }
}
