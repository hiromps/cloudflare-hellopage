import { NextRequest, NextResponse } from 'next/server';

// Mock user data for testing
const users = [
  { id: 1, name: 'Tanaka Taro', email: 'tanaka@example.com', role: 'admin' },
  { id: 2, name: 'Suzuki Hanako', email: 'suzuki@example.com', role: 'user' },
  { id: 3, name: 'Sato Ichiro', email: 'sato@example.com', role: 'user' }
];

export async function GET() {
  return NextResponse.json({
    users,
    count: users.length,
    status: 'success'
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newUser = {
      id: users.length + 1,
      ...body
    };
    users.push(newUser);

    return NextResponse.json({
      message: 'User created successfully',
      user: newUser,
      status: 'success'
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Invalid data',
        status: 'error'
      },
      { status: 400 }
    );
  }
}