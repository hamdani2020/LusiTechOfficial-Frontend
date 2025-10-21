import { NextRequest, NextResponse } from 'next/server';

// Backend media URL
const BACKEND_MEDIA_URL = 'http://backend:8000/media';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/');
    const url = `${BACKEND_MEDIA_URL}/${path}`;
    
    console.log(`Proxying media request to: ${url}`);
    
    const response = await fetch(url, {
      method: 'GET',
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      console.error(`Backend media responded with status: ${response.status}`);
      return new NextResponse('Media not found', { status: 404 });
    }

    // Get the content type from the backend response
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    
    // Stream the response
    const buffer = await response.arrayBuffer();
    
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    console.error('Media proxy error:', error);
    return new NextResponse('Media proxy error', { status: 500 });
  }
}