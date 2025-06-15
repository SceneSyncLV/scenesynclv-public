import { supabase } from '../../../lib/supabase';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { data: ev } = await supabase.from('events').select('*').eq('id', params.id).single();
  if (!ev) return { title: 'Event Not Found – SceneSyncLV' };
  return {
    title: `${ev.title} – SceneSyncLV`,
    description: `${ev.venue_name} · ${new Date(ev.starts_at).toLocaleDateString()}`,
    openGraph: {
      images: [ev.flyer_url ?? '/og-default.png']
    }
  };
}
