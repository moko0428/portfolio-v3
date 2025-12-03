import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const safeSlug = params.slug.replace(/[^a-zA-Z0-9-_]/g, '');
  const filePath = path.join(process.cwd(), 'data', `${safeSlug}.md`);

  try {
    const content = await fs.readFile(filePath, 'utf8');
    return NextResponse.json({ content });
  } catch {
    return NextResponse.json(
      { error: 'Markdown file not found' },
      { status: 404 }
    );
  }
}
