import Groq from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const response = await groq.chat.completions.create({
    model: 'deepseek-r1-distill-llama-70b',
    messages: messages,
  });

  return NextResponse.json(response.choices[0].message);
}
