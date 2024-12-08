import { NextResponse } from 'next/server';
import { publicClientop } from './../../../utils/viem';
import { createWalletClient, http, getAddress } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { optimism } from 'viem/chains';
import { LEADERBOARD_ADDRESS, LEADERBOARD_ABI } from'./../../../utils/viem';

const account = privateKeyToAccount("0x0de2a48962a89fa20a8467c387e3e6f496b3950b7a881f8af3f751d1a761a67d" as `0x${string}`);

const walletClient = createWalletClient({
  account,
  chain: optimism,
  transport: http("https://optimism-mainnet.infura.io/v3/bb3c393659a24f3996eca7d6cc266dfb")
});

export async function POST(req: Request) {
  try {
    const { addresses } = await req.json();
    console.log('Received addresses:', addresses);

    // Validate array length
    if (!Array.isArray(addresses)) {
      return NextResponse.json(
        { error: 'Invalid input: Must provide an array of addresses' },
        { status: 400 }
      );
    }

    // Format addresses to ensure they're valid checksummed addresses
    const formattedAddresses: `0x${string}`[] = addresses.map(addr => {
      try {
        return getAddress(addr) as `0x${string}`;
      } catch (e) {
        throw new Error(`Invalid address format: ${addr}`);
      }
    });

    console.log('Attempting to call setLeaderboard with:', formattedAddresses);

    // Simulate with explicit typing
    const { request } = await publicClientop.simulateContract({
      address: LEADERBOARD_ADDRESS,
      abi: LEADERBOARD_ABI,
      functionName: 'setLeaderboard',
      args: [formattedAddresses], // Pass as single array argument
      account: account.address
    });

    console.log('Simulation successful');

    const hash = await walletClient.writeContract(request);
    console.log('Transaction submitted:', hash);

    const receipt = await publicClientop.waitForTransactionReceipt({ hash });
    console.log('Transaction mined:', receipt);

    return NextResponse.json({
      success: true,
      transactionHash: hash,
      blockNumber: receipt.blockNumber,
      addresses: formattedAddresses // Return the formatted addresses used
    });

  } catch (error: any) {
    console.error('Detailed error:', {
      error,
      message: error.message,
      cause: error.cause,
      details: error.details
    });

    return NextResponse.json(
      { 
        error: 'Failed to update leaderboard',
        details: error.message,
        cause: error.cause?.shortMessage || error.cause,
      },
      { status: 500 }
    );
  }
} 