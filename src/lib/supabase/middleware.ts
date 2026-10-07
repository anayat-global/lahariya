import { NextResponse, type NextRequest } from 'next/server'

// Auth is mocked — all routes are open until Supabase is wired up
export async function updateSession(request: NextRequest) {
  return NextResponse.next({ request })
}
