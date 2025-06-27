'use client';

import { SocialPost } from '@/types';
import { calculateTokenAmount } from '@/utils/thirdweb';

interface ScoreDisplayProps {
  post: SocialPost;
  score: number;
  onMintNFT: () => void;
  isMinting: boolean;
}

export default function ScoreDisplay({ post, score, onMintNFT, isMinting }: ScoreDisplayProps) {
  const tokenAmount = calculateTokenAmount(score);
  const canMint = score > 60;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Analysis Results</h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600">Content Category</p>
          <p className="font-medium text-gray-900 capitalize">{post.category}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Original URL</p>
          <a 
            href={post.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm break-all"
          >
            {post.url}
          </a>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">AI Score</p>
            <span className="text-2xl font-bold text-gray-900">{score}/100</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                score >= 80 ? 'bg-green-500' : 
                score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
        
        <div className="border-t pt-4">
          <p className="text-sm text-gray-600 mb-2">Rewards</p>
          <p className="text-lg font-semibold text-gray-900">
            {tokenAmount} CreatorTokens
          </p>
        </div>
        
        {canMint ? (
          <button
            onClick={onMintNFT}
            disabled={isMinting}
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isMinting ? 'Minting...' : 'Mint NFT'}
          </button>
        ) : (
          <div className="text-center py-3 px-4 bg-gray-100 rounded-md">
            <p className="text-gray-600 text-sm">
              Score must be above 60 to mint NFT
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 