import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { topic, situation } = await req.json();

    if (!topic || !situation) {
      return NextResponse.json(
        { error: '주제와 상황을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a creative assistant.' },
        {
          role: 'user',
          content: `Suggest a creative cake lettering message for the topic "${topic}" and the situation "${situation}".`,
        },
      ],
      max_tokens: 50,
      temperature: 0.7,
    });

    const suggestion = response.choices[0]?.message?.content?.trim();

    return NextResponse.json({ suggestion }, { status: 200 });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate lettering' },
      { status: 500 }
    );
  }
}
