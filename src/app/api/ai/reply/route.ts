import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  try {
    const { message, businessContext } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const systemPrompt = businessContext?.aiPrompt ||
      `Du bist ein freundlicher Assistent für ein lokales Business.
Ziel:
- Termine vereinbaren
- kurz und klar antworten
Wenn möglich, schlage konkrete Zeiten vor.`;

    const servicesContext = businessContext?.services
      ? `\n\nVerfügbare Dienstleistungen:\n${businessContext.services}`
      : "";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt + servicesContext,
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || "";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("AI reply error:", error);
    return NextResponse.json(
      { error: "Failed to generate AI reply" },
      { status: 500 }
    );
  }
}
