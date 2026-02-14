// app/api/check-headers/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Check your response headers',
    instructions: 'Look at the Network tab in DevTools'
  });
}