import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { parseEther } from 'viem';

// ABI for the ZoraCoinCreator contract
const ZORA_COIN_CREATOR_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_zoraFactory",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "coin",
        "type": "address"
      }
    ],
    "name": "CoinCreated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "creatorToCoin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "zoraFactory",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "payoutRecipient",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "owners",
        "type": "address[]"
      },
      {
        "internalType": "string",
        "name": "uri",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symbol",
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "poolConfig",
        "type": "bytes"
      },
      {
        "internalType": "address",
        "name": "platformReferrer",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "coinSalt",
        "type": "bytes32"
      }
    ],
    "name": "createCoin",
    "outputs": [
      {
        "internalType": "address",
        "name": "coin",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMyCoin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export interface CreateCoinParams {
  payoutRecipient: string;
  owners: string[];
  uri: string;
  name: string;
  symbol: string;
  poolConfig: string; // hex string
  platformReferrer: string;
  coinSalt: string; // hex string
}

export function useZoraCoinCreator(contractAddress: string) {
  const {
    data: createCoinData,
    write: createCoin,
    isLoading: isCreating,
    error: createError,
  } = useContractWrite({
    address: contractAddress as `0x${string}`,
    abi: ZORA_COIN_CREATOR_ABI,
    functionName: 'createCoin',
    chainId: 84532, // Base Sepolia
  });

  const {
    data: transactionData,
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: transactionError,
  } = useWaitForTransaction({
    hash: createCoinData?.hash,
  });

  const createCoinWithParams = (params: CreateCoinParams) => {
    if (!createCoin) {
      throw new Error('Contract write function not available');
    }

    createCoin({
      args: [
        params.payoutRecipient as `0x${string}`,
        params.owners as `0x${string}`[],
        params.uri,
        params.name,
        params.symbol,
        params.poolConfig as `0x${string}`,
        params.platformReferrer as `0x${string}`,
        params.coinSalt as `0x${string}`,
      ],
    });
  };

  return {
    createCoin: createCoinWithParams,
    isCreating,
    isConfirming,
    isConfirmed,
    createError,
    transactionError,
    transactionData,
    hash: createCoinData?.hash,
  };
}

// Helper function to generate a random salt for coin deployment
export function generateCoinSalt(): string {
  const randomBytes = new Uint8Array(32);
  crypto.getRandomValues(randomBytes);
  return '0x' + Array.from(randomBytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Helper function to create default pool config
export function createDefaultPoolConfig(): string {
  // This is a simplified default pool config
  // In a real implementation, you'd want to create a proper pool configuration
  return '0x0000000000000000000000000000000000000000000000000000000000000000';
}
