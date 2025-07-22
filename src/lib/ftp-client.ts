import { Client } from 'basic-ftp';
import { NextResponse } from 'next/server';


export async function withFtpClient(handler: (client: Client) => Promise<NextResponse>) {
  const client = new Client();
  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: true ,
      secureOptions: {
        rejectUnauthorized: false
      }
    });
   
    return await handler(client);
  } catch (error) {
    console.error("FTP Error:", error);
    const message = error instanceof Error ? error.message : "An unknown FTP error occurred.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  } finally {
    if (!client.closed) {
      client.close();
    }
  }
}