import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";
import { USDC_ABI,USDC_ADDRESS,TOKEN_MINTER_ADDRESS,TOKEN_MINTER_ABI,LEADERBOARD_ADDRESS,LEADERBOARD_ABI} from "~~/utils/viem";

const externalContracts = {
  1: {
    USDC: {
      address:USDC_ADDRESS,
      abi: USDC_ABI,
    },
  },
  2:{
    TOKEN_MINTER:{
      address:TOKEN_MINTER_ADDRESS,
      abi: TOKEN_MINTER_ABI,
    }
  },
  3:{
    LEADERBOARD:{
      address:LEADERBOARD_ADDRESS,
      abi: LEADERBOARD_ABI,
    }
  }
} as const;

export default externalContracts satisfies GenericContractsDeclaration;
