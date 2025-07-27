'use client';

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { useZoraCoinCreator, generateCoinSalt, createDefaultPoolConfig } from '../hooks/useZoraCoinCreator';

interface ZoraCoinCreatorProps {
  contractAddress: string;
}

export function ZoraCoinCreator({ contractAddress }: ZoraCoinCreatorProps) {
  const { address } = useAccount();
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    uri: '',
    payoutRecipient: '',
  });

  const {
    createCoin,
    isCreating,
    isConfirming,
    isConfirmed,
    createError,
    transactionError,
    hash,
  } = useZoraCoinCreator(contractAddress);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      const params = {
        payoutRecipient: formData.payoutRecipient || address,
        owners: [address], // Creator is the owner
        uri: formData.uri || 'https://example.com/metadata.json',
        name: formData.name,
        symbol: formData.symbol,
        poolConfig: createDefaultPoolConfig(),
        platformReferrer: '0x0000000000000000000000000000000000000000', // No referrer
        coinSalt: generateCoinSalt(),
      };

      createCoin(params);
    } catch (error) {
      console.error('Error creating coin:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Your Zora Coin</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Coin Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="My Awesome Coin"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Symbol
          </label>
          <input
            type="text"
            name="symbol"
            value={formData.symbol}
            onChange={handleInputChange}
            placeholder="MAC"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Metadata URI (optional)
          </label>
          <input
            type="text"
            name="uri"
            value={formData.uri}
            onChange={handleInputChange}
            placeholder="https://example.com/metadata.json"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payout Recipient (optional)
          </label>
          <input
            type="text"
            name="payoutRecipient"
            value={formData.payoutRecipient}
            onChange={handleInputChange}
            placeholder={address || "0x..."}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isCreating || isConfirming || !address}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isCreating ? 'Creating Coin...' : 
           isConfirming ? 'Confirming Transaction...' : 
           'Create Coin'}
        </button>
      </form>

      {createError && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {createError.message}
        </div>
      )}

      {transactionError && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Transaction Error: {transactionError.message}
        </div>
      )}

      {isConfirmed && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          <p>✅ Coin created successfully!</p>
          {hash && (
            <p className="text-sm mt-1">
              Transaction: <a 
                href={`https://sepolia.basescan.org/tx/${hash}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline"
              >
                View on BaseScan
              </a>
            </p>
          )}
        </div>
      )}

      {!address && (
        <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          Please connect your wallet to create a coin.
        </div>
      )}
    </div>
  );
}
