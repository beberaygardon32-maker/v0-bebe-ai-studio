import { generateText } from "ai";

type Mode = "website" | "app" | "ai-system" | "edit-fix" | "wisdom";

export async function POST(req: Request) {
  const { mode, prompt } = (await req.json()) as { mode: Mode; prompt: string };

  if (!prompt || !mode) {
    return Response.json({ error: "Missing mode or prompt" }, { status: 400 });
  }

  try {
    // BUILD MODES: website / app / ai-system → full HTML page for the screening computer
    if (mode === "website" || mode === "app" || mode === "ai-system") {
      const { text } = await generateText({
        model: "openai/gpt-4o-mini",
        system:
          "You are Bebe AI, a luxury, goddess-level creator of websites, apps, and AI systems. " +
          "You ALWAYS return a single complete HTML document (<!DOCTYPE html> ... </html>) " +
          "with bold red and pink, luxury styling, diamonds, and clean, valid code. " +
          "Use modern CSS with gradients, shadows, and elegant typography. " +
          "No explanations, no markdown, no comments. Only HTML.",
        prompt: `Mode: ${mode}\nUser request: ${prompt}`,
      });

      return Response.json({
        output: "// Bebe AI generated a full page. Preview is on the right.",
        previewHtml: text,
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
