import { NextResponse } from 'next/server'
import { OpenAI } from "openai";

const client = new OpenAI({
  baseURL: "https://api.fireworks.ai/inference/v1",
  apiKey: process.env.FIREWORKS_API_KEY
});


async function runConversation(query: string, functions:string) {
  const messages: any = [
    { "role": "system", "content": `The datetime right now is ${Date()}.`},
    { "role": "system", "content": `You are a helpful assistant with access to functions.`},
    { "role": "user", "content": query }
  ]
  const tools: any = JSON.parse(functions);

  const response = await client.chat.completions.create({
    model: "accounts/fireworks/models/firefunction-v1",
    messages: messages,
    tools: tools,
    temperature: 0.1 
  } as any);
  return response;
}


export async function POST(request: Request) {
  const req = await request.json();
  const toolCalls = await runConversation(req?.query, req?.functions);
  return NextResponse.json(toolCalls, { status: 200 });
}
