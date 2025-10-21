import { NextRequest, NextResponse } from 'next/server';

// Use the internal Docker service name for backend communication
// Use the backend service name for reliable Docker networking
const BACKEND_URL = process.env.INTERNAL_API_URL || 'http://backend:8000/api';

// Fix image URLs to use our media proxy instead of direct backend URLs
const fixImageUrls = (obj: any): any => {
  if (typeof obj === 'string' && obj.includes('http://localhost:8000/media/')) {
    return obj.replace('http://localhost:8000/media/', 'http://localhost:3000/api/media/');
  }
  if (typeof obj === 'string' && obj.includes('http://backend:8000/media/')) {
    return obj.replace('http://backend:8000/media/', 'http://localhost:3000/api/media/');
  }
  if (typeof obj === 'string' && obj.includes('http://172.19.0.3:8000/media/')) {
    return obj.replace('http://172.19.0.3:8000/media/', 'http://localhost:3000/api/media/');
  }
  if (Array.isArray(obj)) {
    return obj.map(fixImageUrls);
  }
  if (obj && typeof obj === 'object') {
    const fixed: any = {};
    for (const [key, value] of Object.entries(obj)) {
      fixed[key] = fixImageUrls(value);
    }
    return fixed;
  }
  return obj;
};

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/');
    const searchParams = request.nextUrl.searchParams.toString();
    // Add trailing slash to match Django REST framework expectations
    const url = `${BACKEND_URL}/${path}/${searchParams ? `?${searchParams}` : ''}`;
    
    console.log(`Proxying GET request to: ${url}`);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    const fixedData = fixImageUrls(data);
    return NextResponse.json(fixedData);
  } catch (error: any) {
    console.error('API proxy error:', error);
    
    // Handle specific error types
    if (error.name === 'AbortError') {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Request timeout - backend service may be unavailable',
          code: 'TIMEOUT_ERROR'
        },
        { status: 504 }
      );
    }
    
    if (error.cause?.code === 'ECONNREFUSED') {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Unable to connect to backend service',
          code: 'CONNECTION_ERROR'
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Internal server error',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/');
    const body = await request.text();
    const url = `${BACKEND_URL}/${path}`;
    
    console.log(`Proxying POST request to: ${url}`);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: body,
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    const fixedData = fixImageUrls(data);
    return NextResponse.json(fixedData);
  } catch (error: any) {
    console.error('API proxy error:', error);
    
    // Handle specific error types
    if (error.name === 'AbortError') {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Request timeout - backend service may be unavailable',
          code: 'TIMEOUT_ERROR'
        },
        { status: 504 }
      );
    }
    
    if (error.cause?.code === 'ECONNREFUSED') {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Unable to connect to backend service',
          code: 'CONNECTION_ERROR'
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Internal server error',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}