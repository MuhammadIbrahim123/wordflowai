import { getServerSession } from "next-auth";
import OpenAI from "openai";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Generation from "@/models/Generation";
import User from "@/models/User";

interface GenerateBlogBody {
  title?: string;
  keywords?: string;
  tone?: string;
  wordCount?: number;
  language?: string;
}

function getOpenAIClient(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }

  return new OpenAI({ apiKey });
}

export async function POST(request: Request) {
  try {
    const openai = getOpenAIClient();
    if (!openai) {
      return NextResponse.json({ success: false, error: "OpenAI is not configured." }, { status: 500 });
    }

    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const body = (await request.json()) as GenerateBlogBody;
    const { title, keywords, tone, wordCount, language } = body;

    if (!title || !keywords || !tone || !wordCount || !language) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 },
      );
    }

    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found." }, { status: 404 });
    }

    if (user.credits.used >= user.credits.total) {
      return NextResponse.json(
        { success: false, error: "Credit limit reached." },
        { status: 429 },
      );
    }

    const prompt = `Write a ${tone} blog post in ${language}.
Title: ${title}. Keywords: ${keywords}.
Length: ${wordCount} words.
Use H2/H3 headings, SEO optimized, markdown format.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    const content = completion.choices[0]?.message?.content?.trim();
    if (!content) {
      return NextResponse.json(
        { success: false, error: "Failed to generate content." },
        { status: 502 },
      );
    }

    await Generation.create({
      userId: user._id,
      toolId: "blog-writer",
      toolName: "Blog Writer",
      input: { title, keywords, tone, wordCount, language },
      output: content,
      wordCount,
    });

    user.credits.used += wordCount;
    await user.save();

    return NextResponse.json({
      success: true,
      content,
      wordCount,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to generate blog content." },
      { status: 500 },
    );
  }
}
