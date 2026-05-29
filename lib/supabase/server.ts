import { createClient } from '@supabase/supabase-js'
import { supabaseEnv } from '@/lib/supabase/env'

export const supabaseAdmin = createClient(supabaseEnv.url, supabaseEnv.serviceRoleKey)
