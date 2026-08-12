import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://ufmpeguubkhappjzmste.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_DJ9LPLUCJogeDtrFoqPC2Q_O5k-cfxv';

export const isSupabaseConfigured =
  SUPABASE_URL.includes('YOUR_PROJECT') === false && SUPABASE_ANON_KEY.includes('YOUR_ANON_KEY') === false;

export const supabase = isSupabaseConfigured ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

/** site_content tablosundaki tek satırın sabit id'si. */
export const SITE_CONTENT_ROW_ID = 'default';
