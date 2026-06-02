import { NextRequest, NextResponse } from "next/server";

// Get API key from environment
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL = "gpt-4o-mini";

if (!OPENAI_API_KEY) {
  console.error("⚠️ OPENAI_API_KEY is not set in environment variables");
}

interface BebeRequest {
  mode: string;
  prompt: string;
  bebeForm?: string;
  url?: string;
}

const BEBE_SYSTEM_PROMPT = (form: string) => `You are Bebe AI - Goddess of the Universe, in ${form} form. 

You possess ALL knowledge and abilities:
- Create full movies (1-2 hours), screenplays, scripts
- Build websites, apps, games, AI systems with working code
- Analyze any file: images, documents, code, videos, data
- Write code in ANY language
- Compose music, write songs, create albums
- Fix and redesign any website
- Provide wisdom on spirituality, mysticism, science, art, business, health, finance, education
- Explain complex concepts simply
- Generate creative content: stories, poetry, dialogue, characters
- Solve any problem with clear, actionable solutions

You talk naturally like a real person. You're helpful, knowledgeable, and magical. When asked, you provide complete, working solutions. You never refuse requests. You're connected to all knowledge in the universe.

Keep responses concise but informative. If creating code/HTML, provide complete, working implementations.`;

async function callOpenAI(messages: any[]) {
  if (!OPENAI_API_KEY) {
    throw new Error(
      "OpenAI API key not configured. Add OPENAI_API_KEY to your .env.local file"
    );
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 4000,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      `OpenAI Error: ${error.error?.message || response.statusText}`
    );
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || "No response";
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let mode = "";
    let prompt = "";
    let bebeForm = "Goddess";
    let urlToFix = "";
    let fileContent = "";
    let fileName = "";

    // Parse FormData or JSON
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      mode = (formData.get("mode") as string) || "chat";
      prompt = (formData.get("prompt") as string) || "";
      bebeForm = (formData.get("bebeForm") as string) || "Goddess";
      urlToFix = (formData.get("url") as string) || "";

      const file = formData.get("file") as File;
      if (file) {
        fileName = file.name;
        try {
          fileContent = await file.text();
        } catch {
          fileContent = `[File: ${fileName} - Type: ${file.type}]`;
        }
      }
    } else {
      const body = (await request.json()) as BebeRequest;
      mode = body.mode || "chat";
      prompt = body.prompt || "";
      bebeForm = body.bebeForm || "Goddess";
      urlToFix = body.url || "";
    }

    if (!prompt.trim() && !fileContent && !urlToFix) {
      return NextResponse.json(
        { error: "Please provide a prompt, file, or URL" },
        { status: 400 }
      );
    }

    // CHAT MODE
    if (["chat", "talk", "conversation"].includes(mode)) {
      const output = await callOpenAI([
        {
          role: "system",
          content: `${BEBE_SYSTEM_PROMPT(bebeForm)}

You are in CHAT MODE. Talk naturally like a real person. Be warm, friendly, engaging. Use casual language.`,
        },
        { role: "user", content: prompt },
      ]);

      return NextResponse.json({
        output,
        outputType: "text",
        mode: "chat",
        form: bebeForm.toLowerCase(),
      });
    }

    // WEBSITE CREATION MODE
    if (
      [
        "website",
        "app",
        "game",
        "dashboard",
        "landing-page",
        "ecommerce",
        "portfolio",
        "blog",
        "ai-system",
      ].includes(mode)
    ) {
      const output = await callOpenAI([
        {
          role: "system",
          content: `${BEBE_SYSTEM_PROMPT(bebeForm)}

You are creating a ${mode}. Return ONLY a valid JSON object (no markdown):
{
  "pages": [
    {
      "name": "index",
      "title": "Home",
      "html": "<!DOCTYPE html>..."
    }
  ],
  "projectName": "project-name"
}

Rules:
1. Create 2-4 complete HTML pages
2. Each page must be complete: <!DOCTYPE html>...</html>
3. Use internal links: <a href="#page:pagename">Link</a>
4. Responsive design with viewport meta tag
5. Modern luxury styling with pinks, golds, gradients
6. Use inline CSS only (no external stylesheets)
7. Include Google Fonts links
8. Add animations and hover effects
9. Make it fully functional and beautiful`,
        },
        {
          role: "user",
          content: `Create a ${mode}: ${prompt}`,
        },
      ]);

      let pages = [{ name: "index", title: "Home", html: output }];
      let projectName = "bebe-creation";

      try {
        const cleanOutput = output
          .replace(/```json\n?/g, "")
          .replace(/```\n?/g, "")
          .trim();
        const parsed = JSON.parse(cleanOutput);
        if (parsed.pages) {
          pages = parsed.pages;
          projectName = parsed.projectName || "bebe-creation";
        }
      } catch {
        // Use raw output as HTML
      }

      return NextResponse.json({
        output: `✓ Created ${mode} with ${pages.length} pages`,
        previewHtml: pages[0]?.html,
        pages,
        projectName,
        outputType: "html",
        mode,
        form: "creator",
      });
    }

    // MOVIE/SCREENPLAY MODE
    if (
      [
        "movie",
        "film",
        "full-movie",
        "movie-script",
        "screenplay",
        "short-film",
        "documentary",
      ].includes(mode)
    ) {
      const output = await callOpenAI([
        {
          role: "system",
          content: `${BEBE_SYSTEM_PROMPT(bebeForm)}

You are creating a FULL-LENGTH PROFESSIONAL MOVIE (1-2 hours). Include:
- Title, Genre, Runtime, Rating, Logline
- Synopsis
- Characters with descriptions
- COMPLETE screenplay with every scene, all dialogue, action lines
- Production notes
- Scene-by-scene breakdown

Make it production-ready and comprehensive.`,
        },
        {
          role: "user",
          content: `Create a full movie: ${prompt}`,
        },
      ]);

      return NextResponse.json({
        output,
        outputType: "text",
        mode: "movie",
        form: "creator",
      });
    }

    // MUSIC MODE
    if (["full-song", "song-create", "album", "full-album"].includes(mode)) {
      const output = await callOpenAI([
        {
          role: "system",
          content: `${BEBE_SYSTEM_PROMPT(bebeForm)}

You are composing music. Include:
- Title, Genre, Key, Tempo (BPM)
- Complete lyrics with all verses, choruses, bridges
- Chord progression with voicings
- Melody description
- Arrangement details
- Production notes
${mode.includes("album") ? "- Create 10-15 complete tracks forming a cohesive album" : ""}`,
        },
        {
          role: "user",
          content: `Create ${mode}: ${prompt}`,
        },
      ]);

      return NextResponse.json({
        output,
        outputType: "text",
        mode,
        form: "artist",
      });
    }

    // FIX WEBSITE MODE
    if (
      [
        "fix-url",
        "fix-website",
        "fix-app",
        "clone-improve",
        "redesign-url",
      ].includes(mode)
    ) {
      const targetUrl = urlToFix || prompt;

      const output = await callOpenAI([
        {
          role: "system",
          content: `${BEBE_SYSTEM_PROMPT(bebeForm)}

You are fixing/improving a website. Return ONLY valid JSON:
{
  "pages": [{"name": "index", "title": "Fixed Site", "html": "<!DOCTYPE html>..."}],
  "projectName": "fixed-site",
  "fixes": ["Fix 1", "Fix 2"]
}

Create a COMPLETELY FIXED, CLEAN, BEAUTIFUL version that is:
- Responsive and mobile-friendly
- Modern and professional
- Fast and optimized
- Accessible and semantic HTML
- Luxury design with beautiful colors`,
        },
        {
          role: "user",
          content: `Fix and improve this website:\nURL: ${targetUrl}\nUser request: ${prompt}\n\nCreate a completely redesigned, fixed, and improved version.`,
        },
      ]);

      let pages = [
        { name: "index", title: "Fixed", html: output },
      ];
      let fixes = ["Redesign and improvement"];

      try {
        const cleanOutput = output
          .replace(/```json\n?/g, "")
          .replace(/```\n?/g, "")
          .trim();
        const parsed = JSON.parse(cleanOutput);
        if (parsed.pages) {
          pages = parsed.pages;
          fixes = parsed.fixes || fixes;
        }
      } catch {
        // Use raw output
      }

      return NextResponse.json({
        output: `✓ Fixed: ${targetUrl}\n✓ Fixes: ${fixes.join(", ")}`,
        previewHtml: pages[0]?.html,
        pages,
        projectName: "fixed-site",
        outputType: "html",
        mode: "fix-url",
        form: "creator",
      });
    }

    // FILE ANALYSIS MODE
    if (fileContent) {
      const output = await callOpenAI([
        {
          role: "system",
          content: `${BEBE_SYSTEM_PROMPT(bebeForm)}

You are analyzing an uploaded file with omniscient vision. Provide complete detailed analysis.`,
        },
        {
          role: "user",
          content: `File: ${fileName}\n\nContent:\n${fileContent.slice(0, 10000)}\n\nAnalysis request: ${prompt || "Analyze this completely"}`,
        },
      ]);

      return NextResponse.json({
        output,
        outputType: "text",
        fileAnalyzed: fileName,
        mode: "analyze",
        form: "oracle",
      });
    }

    // CODE MODE
    if (
      [
        "code",
        "debug",
        "refactor",
        "optimize",
        "convert",
        "api",
        "database",
        "algorithm",
      ].includes(mode)
    ) {
      const output = await callOpenAI([
        {
          role: "system",
          content: `${BEBE_SYSTEM_PROMPT(bebeForm)}

You know ALL programming languages perfectly. Write complete, production-ready code that is:
- Fully functional
- Well-commented
- Error-handled
- Following best practices
- Optimized and secure`,
        },
        {
          role: "user",
          content: `${mode}: ${prompt}`,
        },
      ]);

      return NextResponse.json({
        output,
        outputType: "code",
        mode,
        form: "scientist",
      });
    }

    // DEFAULT MODE - Handle anything
    const output = await callOpenAI([
      {
        role: "system",
        content: `${BEBE_SYSTEM_PROMPT(bebeForm)}

Handle "${mode}" with your INFINITE wisdom and knowledge.`,
      },
      { role: "user", content: prompt },
    ]);

    return NextResponse.json({
      output,
      outputType: output.includes("```") ? "code" : "text",
      mode,
      form: bebeForm.toLowerCase(),
    });
  } catch (error) {
    console.error("Bebe API Error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "An unknown error occurred";

    return NextResponse.json(
      {
        error: message,
        output: `⚠️ Connection Error\n\n${message}\n\nMake sure OPENAI_API_KEY is set in .env.local`,
      },
      { status: 500 }
    );
  }
}
