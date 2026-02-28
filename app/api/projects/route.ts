import { getVercelProjects } from '@/lib/vercel';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const projects = await getVercelProjects();
    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
