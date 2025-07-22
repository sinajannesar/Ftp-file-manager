import { NextRequest, NextResponse } from 'next/server';
import { withFtpClient } from '@/lib/ftp-client';

export async function POST(request: NextRequest) {

  const { path, type }: { path: string; type: 1 | 2 } = await request.json();

  if (!path) {
    return NextResponse.json({ success: false, error: 'Path not provided' }, { status: 400 });
  }

  return withFtpClient(async (client) => {
    if (type === 1) { 
      await client.removeDir(path);
    } else { 
      await client.remove(path);
    }
    return NextResponse.json({ success: true, message: 'Item deleted successfully' });
  });
}