import Groq from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';

const groq = new Groq({
    apiKey: process.env.Groq_API_KEY,
});

export async function POST(req: NextRequest){
    const { messages } = await req.json();

    const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: messages,

    })
    return NextResponse.json(response.choices[0].message)
}