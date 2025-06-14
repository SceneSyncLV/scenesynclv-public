import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const storage = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadFlyer(file: File): Promise<string> {
  const filePath = `flyers/${Date.now()}-${file.name}`;
  const { data, error } = await storage.storage.from('flyers').upload(filePath, file);
  if (error) throw error;
  const { data: urlData } = storage.storage.from('flyers').getPublicUrl(filePath);
  if (!urlData?.publicUrl) throw new Error('Failed to get public URL');
  return urlData.publicUrl;
}
