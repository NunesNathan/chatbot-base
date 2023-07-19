import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams
  const id = searchParams.get('id')

  try {
    return NextResponse.json({ id })
  } catch (err) {
    return NextResponse.json({error: "bad request"}, {status: 400})
  }
}