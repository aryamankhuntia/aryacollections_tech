import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createClient(supabaseUrl, supabasePublishableKey);

export interface Saree {
  id: string;
  title: string;
  description: string;
  price_gbp: number;
  cost_inr: number;
  fabric_type: string;
  color: string;
  image_url: string;
  status: 'available' | 'sold' | 'archived';
  created_at: string;
}