import { supabase } from '@/lib/supabase';
import { Saree } from '@/lib/supabase';

export async function getSarees(): Promise<Saree[]> {
  const { data, error } = await supabase
    .from('sarees')
    .select('*')
    .neq('status', 'archived')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching sarees:', error);
    throw new Error('Failed to fetch sarees');
  }

  return data ?? [];
}

export async function getSareeById(id: string): Promise<Saree | null> {
  const { data, error } = await supabase
    .from('sarees')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching saree:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    return null;
  }

  return data;
}