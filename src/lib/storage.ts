// Client-side Supabase Storage helpers.
import { getBrowserSupabase } from './supabase/client';

export async function uploadFile(bucket: string, path: string, file: File): Promise<{ path?: string; error?: string }> {
  const supa = getBrowserSupabase();
  if (!supa) return { error: 'not-configured' };
  const { data, error } = await supa.storage.from(bucket).upload(path, file, { upsert: true, contentType: file.type });
  if (error) return { error: error.message };
  return { path: data.path };
}

export function publicUrl(bucket: string, path: string): string {
  const supa = getBrowserSupabase();
  return supa ? supa.storage.from(bucket).getPublicUrl(path).data.publicUrl : '';
}

export const fileExt = (name: string): string => {
  const parts = name.split('.');
  return parts.length > 1 ? parts.pop()!.toLowerCase() : 'bin';
};
