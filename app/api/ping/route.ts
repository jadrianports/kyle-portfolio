// /app/api/ping/route.ts  (Next.js App Router)
import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'




export async function GET() {

  const supabase = await createClient();
  // Small query to keep the DB active
  const { data, error } = await supabase
    .from('hero')   // replace with a small table
    .select('id')
    .limit(1)

  if (error) {
    console.error('Ping failed:', error)
    return NextResponse.json({ status: 'error', error: error.message }, { status: 500 })
  }

  return NextResponse.json({ status: 'ok', data })
}
