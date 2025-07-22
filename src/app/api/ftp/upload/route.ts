import { NextRequest, NextResponse } from 'next/server';
import { withFtpClient } from '@/lib/ftp-client';
import { Readable } from 'stream';
import path from 'path';

// Force the Node.js runtime
export const runtime = 'nodejs'; 

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const destinationPath = formData.get('path') as string | null;

  if (!file || !destinationPath) {
    return NextResponse.json({ 
      success: false, 
      error: 'File or path not provided' 
    }, { status: 400 });
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return withFtpClient(async (client) => {
      const remotePath = path.join(destinationPath, file.name);
      
      const stream = Readable.from(buffer);
      
      await client.uploadFrom(stream, remotePath);
      
      return NextResponse.json({ 
        success: true, 
        message: 'File uploaded successfully',
        fileName: file.name,
        size: file.size,
        remotePath: remotePath
      });
    });

  } catch (error) {
    console.error('FTP Upload error:', error);
    
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to upload file',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}