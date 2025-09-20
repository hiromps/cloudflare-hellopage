import { NextResponse } from 'next/server';

export async function GET() {
  const now = new Date();
  const japanTime = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(now);

  return NextResponse.json({
    utc: now.toISOString(),
    japan: japanTime,
    timestamp: now.getTime(),
    timezone: 'Asia/Tokyo',
    status: 'success'
  });
}