import { NextResponse } from 'next/server';

export function GET() {
  throw new Error('Test global error');
}