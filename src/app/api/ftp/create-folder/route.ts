import { NextRequest, NextResponse } from 'next/server';
import { withFtpClient } from '@/lib/ftp-client';

export async function POST(request: NextRequest) {
  const { path } = await request.json();

  if (!path || typeof path !== 'string') {
    return NextResponse.json({ success: false, error: 'Folder path not provided' }, { status: 400 });
  }

  return withFtpClient(async (client) => {
    await client.ensureDir(path);
    return NextResponse.json({ success: true, message: 'Folder created successfully' });
  });
}