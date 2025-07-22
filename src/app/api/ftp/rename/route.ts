import { NextRequest, NextResponse } from 'next/server';
import { withFtpClient } from '@/lib/ftp-client';

export async function POST(request: NextRequest) {
  const { fromPath, toPath } = await request.json();

  if (!fromPath || !toPath) {
    return NextResponse.json({ success: false, error: 'Original or new path not provided' }, { status: 400 });
  }

  return withFtpClient(async (client) => {
    await client.rename(fromPath, toPath);
    return NextResponse.json({ success: true, message: 'Renamed successfully' });
  });
}