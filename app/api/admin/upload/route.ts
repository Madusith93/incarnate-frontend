import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/cms/auth';
import { saveImage, UploadError } from '@/lib/cms/uploads';

/** Image upload for the rich-text editor. Admin only. */
export async function POST(request: Request) {
  if (!(await getCurrentUser())) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });
  const form = await request.formData();
  const file = form.get('file');
  if (!(file instanceof File)) return NextResponse.json({ error: 'No file received.' }, { status: 400 });
  try {
    return NextResponse.json({ url: await saveImage(file) });
  } catch (e) {
    const msg = e instanceof UploadError ? e.message : 'Upload failed.';
    return NextResponse.json({ error: msg }, { status: e instanceof UploadError ? 400 : 500 });
  }
}
