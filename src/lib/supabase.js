import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = url && key ? createClient(url, key) : null

export async function saveLead({ email, first_name, company, source, recommended_process, payload }) {
  if (!supabase) return
  try {
    await supabase.from('leads').insert([{ email, first_name, company, source, recommended_process, payload }])
  } catch (e) { console.warn('saveLead', e) }
}
