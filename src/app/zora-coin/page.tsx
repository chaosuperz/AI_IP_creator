'use client';

import { ZoraCoinCreator } from '../../components/ZoraCoinCreator';

export default function ZoraCoinPage() {
  // Replace this with your actual deployed ZoraCoinCreator contract address
  const CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000'; // PLACEHOLDER

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Zora Coin Creator
          </h1>
          <p className="text-lg text-gray-600">
            Deploy your own ERC-20 token using Zora's protocol on Base Sepolia
          </p>
        </div>

        <ZoraCoinCreator contractAddress={CONTRACT_ADDRESS} />

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Make sure you have Base Sepolia ETH in your wallet to pay for gas fees.
          </p>
          <p className="mt-2">
            Contract Address: {CONTRACT_ADDRESS}
          </p>
        </div>
      </div>
    </div>
  );
}
