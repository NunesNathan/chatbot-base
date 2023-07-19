import { prisma } from '@/lib/prisma';
import Bcryptjs from '@/services/bcryptServices';
import Token from '@/services/jwtService';
import { User } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const findedUser = await prisma.user.findUnique({
    where: {
      email,
    }
  }) as Omit<User, 'password'> & {password?: string};

  if (!findedUser) {
    return NextResponse.json({error: "Invalid email"}, {status: 400})
  }
  if (!(await Bcryptjs.verify(password, (findedUser?.password || "")))) {
    return NextResponse.json({error: "Invalid password"}, {status: 401})
  }

  delete findedUser.password;
  return NextResponse.json({ user: findedUser, token: Token.create(findedUser) },
    {
      status: 200,
    });
}