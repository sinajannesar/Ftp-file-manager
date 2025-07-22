import { NextRequest, NextResponse } from 'next/server';
import { withFtpClient } from '@/lib/ftp-client';

export async function POST(request: NextRequest) {
  const { path } = await request.json();

  if (typeof path !== 'string') {
    return NextResponse.json({ success: false, error: 'Invalid path provided' }, { status: 400 });
  }

  return withFtpClient(async (client) => {
    const list = await client.list(path || '/');
    return NextResponse.json(list);
  });
}