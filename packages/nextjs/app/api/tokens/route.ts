import { NextResponse } from 'next/server';
import { supabase } from './../../../lib/supabase'

export async function GET() {
  try {
    const { data: tokens, error } = await supabase
      .from('tokens')
      .select('*')
      .order('votes', { ascending: false });

    if (error) throw error;

    return NextResponse.json(tokens);
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return NextResponse.json({ error: 'Failed to fetch tokens' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const vote = await req.json();
    const { data, error } = await supabase
      .from('token_votes')
      .insert([vote])
      .select();

    if (error) throw error;

    // Update token votes count
    await supabase.rpc('increment_token_votes', { token_id: vote.token_id });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error processing vote:', error);
    return NextResponse.json({ error: 'Failed to process vote' }, { status: 500 });
  }
} 