import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Hello from API!',
    timestamp: new Date().toISOString(),
    status: 'success'
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({
      message: 'Data received successfully',
      receivedData: body,
      timestamp: new Date().toISOString(),
      status: 'success'
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Invalid JSON',
        status: 'error'
      },
      { status: 400 }
    );
  }
}