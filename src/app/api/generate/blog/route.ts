import { getServerSession } from "next-auth";
import OpenAI from "openai";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Generation from "@/models/Generation";
import User from "@/models/User";

const LENGTH_MAP: Record<string, number> = {
  short: 500,
  medium: 1000,
  long: 1500,
};

function buildPrompt(p: {
  title: string;
  keywords: string;
  tone: string;
  length: string;
  language: string;
  audience: string;
  style: string;
}): string {
  const words = LENGTH_MAP[p.length] ?? 1000;
  return `You are an expert SEO content writer and professional blogger. Write a high-quality, original blog post.

Title: "${p.title}"
Writing Style: ${p.style}
Tone of Voice: ${p.tone}
Target Audience: ${p.audience}
Language: ${p.language}
Target Length: ~${words} words
${p.keywords ? `SEO Keywords (weave in naturally, never stuff): ${p.keywords}` : ""}

Formatting requirements:
- Open with # (H1) for the title
- Use ## for main sections (H2), ### for subsections (H3)
- Write a compelling 2–3 sentence intro that hooks the reader immediately
- Include 4–6 well-structured body sections packed with real, actionable value
- Use bullet points or numbered lists where they aid clarity
- Keep paragraphs to 2–4 sentences for readability
- Close with a strong conclusion and a clear call-to-action
- Match the ${p.tone.toLowerCase()} tone throughout consistently
- Write for ${p.audience.toLowerCase()} readers — calibrate depth accordingly
- This must read as genuinely useful, not generic filler`;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "OpenAI is not configured." },
        { status: 500 },
      );
    }

    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized." },
        { status: 401 },
      );
    }

    const body = (await request.json()) as {
      title?: string;
      keywords?: string;
      tone?: string;
      length?: string;
      language?: string;
      audience?: string;
      style?: string;
    };

    const title = body.title?.trim();
    if (!title) {
      return NextResponse.json(
        { success: false, error: "Title is required." },
        { status: 400 },
      );
    }

    const keywords = body.keywords?.trim() ?? "";
    const tone = body.tone ?? "Professional";
    const length = body.length ?? "medium";
    const language = body.language ?? "English";
    const audience = body.audience ?? "General";
    const style = body.style ?? "How-to Guide";

    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found." },
        { status: 404 },
      );
    }
    if (user.credits.used >= user.credits.total) {
      return NextResponse.json(
        { success: false, error: "Credit limit reached. Please upgrade your plan." },
        { status: 429 },
      );
    }

    const openai = new OpenAI({ apiKey });
    const prompt = buildPrompt({ title, keywords, tone, length, language, audience, style });

    let fullContent = "";
    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          const stream = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content:
                  "You are a professional content writer and SEO specialist. Always respond in well-structured Markdown. Be specific, insightful, and genuinely helpful.",
              },
              { role: "user", content: prompt },
            ],
            stream: true,
            temperature: 0.72,
            max_tokens: 3500,
          });

          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) {
              fullContent += text;
              controller.enqueue(encoder.encode(text));
            }
          }

          const actualWords = fullContent.trim().split(/\s+/).filter(Boolean).length;

          await Promise.all([
            Generation.create({
              userId: user._id,
              toolId: "blog-writer",
              toolName: "Blog Writer",
              input: { title, keywords, tone, length, language, audience, style },
              output: fullContent,
              wordCount: actualWords,
            }),
            User.findByIdAndUpdate(user._id, {
              $inc: { "credits.used": actualWords },
            }),
          ]);

          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to generate content." },
      { status: 500 },
    );
  }
}
