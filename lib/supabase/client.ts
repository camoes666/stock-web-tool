import { createClient } from '@supabase/supabase-js'
import { supabaseEnv } from '@/lib/supabase/env'

export const supabase = createClient(supabaseEnv.url, supabaseEnv.anonKey)
