import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: message,
        }
      ],
    });

    return Response.json({
      reply: response.choices[0].message.content,
    });

  } catch (error) {
    console.error("OpenAI API Error:", error);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
