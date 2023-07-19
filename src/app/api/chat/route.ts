import { prisma } from '@/lib/prisma';
import { IChat } from '@/services/chatBotService';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const searchParams = new URL(req.url).searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: "bad request" }, { status: 400 })
    }

    const findedChats = await prisma.chat.findMany({
      where: {
        userId: id,
      }
    });

    return NextResponse.json({ chats: findedChats }, { status: 200 })
  } catch (err) {
    return NextResponse.json({error: "bad request"}, {status: 400})
  }
}

export async function POST(req: Request) {
  try {
    const searchParams = new URL(req.url).searchParams
    const id = searchParams.get('id')
  
    if (!id) {
      const { message } = await req.json()
      await prisma.chat.create({ data: message });
    } else {
      const { messages }: { messages: IChat[] } = await req.json()
      messages.forEach(async (message) => {
        await prisma.chat.create({ data: message });
      });
    }

    return NextResponse.json({ content: "Chat created" }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: "bad request" }, { status: 400 })
  }
}