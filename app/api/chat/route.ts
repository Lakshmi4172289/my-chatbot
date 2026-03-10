import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const history = messages.slice(0, -1).map((m: {role: string, content: string}) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const chat = model.startChat({ history });
  const last = messages[messages.length - 1];
  const result = await chat.sendMessage(last.content);

  return NextResponse.json({ role: 'assistant', content: result.response.text() });
}