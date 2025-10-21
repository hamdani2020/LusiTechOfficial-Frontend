import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        status: 'healthy',
        message: 'LusiTech Frontend is running',
        timestamp: new Date().toISOString()
    });
}