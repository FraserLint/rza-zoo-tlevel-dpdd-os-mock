import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hashPassword, createToken, setAuthCookie } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

// Use a single PrismaClient instance
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export async function POST(request: Request) {
  try {
    const { fullName, email, password } = await request.json();
    
    // Validate input
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        id: uuidv4(), // Add this line to generate a unique ID
        fullName,
        email,
        password: hashedPassword,
        updatedAt: new Date(), // Add the required updatedAt field
      },
    });

    // Create and set auth token
    const token = createToken(user.id);
    
    const response = NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );

    // Set the auth cookie in the response
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}