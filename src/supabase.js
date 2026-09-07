import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/+$/, '')
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

export const isSupabaseConfigured = Boolean(
	supabaseUrl?.startsWith('https://') && supabaseAnonKey,
)
export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null
