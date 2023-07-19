import { prisma } from '@/lib/prisma';
import Bcryptjs from '@/services/bcryptServices';
import Token from '@/services/jwtService';
import { User } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) { 
  const user = await req.json();

  const findedUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    }
  });

  if (findedUser) {
    return NextResponse.json({error: "Email already in use"}, {status: 409})
  }

  const createdUser = await prisma.user.create({
    data: {
      ...user,
      password: await Bcryptjs.encrypt(user.password)
    }
  }) as Omit<User, 'password'> & {password?: string};

  delete createdUser.password;

  return NextResponse.json({ user: { ...createdUser }, token: Token.create(user) },
    {
      status: 201,
    });
}