import Groq from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const response = await groq.chat.completions.create({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: messages,
    });
    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ role: 'assistant', content: 'Something went wrong!' }, { status: 500 });
  }
}
