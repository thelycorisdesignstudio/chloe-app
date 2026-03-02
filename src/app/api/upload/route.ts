import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const hasVercelBlob = !!process.env.BLOB_READ_WRITE_TOKEN &&
  process.env.BLOB_READ_WRITE_TOKEN !== 'vercel_blob_REPLACE_ME';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: 'Invalid file type. Allowed: JPG, PNG, WEBP' },
      { status: 400 }
    );
  }
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: 'File too large. Max 10MB' },
      { status: 400 }
    );
  }

  try {
    if (hasVercelBlob) {
      // Production: use Vercel Blob
      const { put } = await import('@vercel/blob');
      const blob = await put(`venue-photos/${Date.now()}-${file.name}`, file, {
        access: 'public',
      });
      return NextResponse.json({ url: blob.url, pathname: blob.pathname });
    }

    // Development fallback: save to public/uploads/
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });
    const filepath = join(uploadsDir, filename);
    await writeFile(filepath, buffer);
    const url = `/uploads/${filename}`;
    return NextResponse.json({ url, pathname: url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { url } = await request.json();
  if (!url) {
    return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
  }

  try {
    if (hasVercelBlob && url.includes('vercel-storage.com')) {
      // Production: delete from Vercel Blob
      const { del } = await import('@vercel/blob');
      await del(url);
    } else if (url.startsWith('/uploads/')) {
      // Development: delete from local filesystem
      const filepath = join(process.cwd(), 'public', url);
      await unlink(filepath);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
