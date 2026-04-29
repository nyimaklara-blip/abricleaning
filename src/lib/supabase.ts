import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  approved: boolean;
  created_at: string;
}
