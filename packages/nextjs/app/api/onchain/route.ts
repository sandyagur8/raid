import { NextResponse } from 'next/server';
import { LEADERBOARD_ABI ,publicClient,LEADERBOARD_ADDRESS} from '~~/utils/viem';
export async function GET() {
  try {
    console.log(LEADERBOARD_ADDRESS)
   const response=await publicClient.readContract({
    address: LEADERBOARD_ADDRESS,
    abi: LEADERBOARD_ABI,
    functionName: 'getLeaderboard'
   })
    return NextResponse.json(response);
  } catch (error) {
    console.log(error)
  }
} 