'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { SocialPost } from '@/types';
import { mockAIScoring } from '@/utils/ai-scoring';
import { calculateTokenAmount } from '@/utils/thirdweb';
import WalletConnect from '@/components/WalletConnect';
import ContentForm from '@/components/ContentForm';
import ScoreDisplay from '@/components/ScoreDisplay';

export default function HomePage() {
  const { isConnected } = useAccount();
  const [currentPost, setCurrentPost] = useState<SocialPost | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [mintStatus, setMintStatus] = useState<string>('');

  const handleAnalyze = async (post: SocialPost) => {
    setIsAnalyzing(true);
    setCurrentPost(post);
    setScore(null);
    
    try {
      const aiScore = await mockAIScoring(post);
      setScore(aiScore);
    } catch (error) {
      console.error('Error analyzing content:', error);
      setMintStatus('Error analyzing content');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleMintNFT = async () => {
    if (!currentPost || !score) return;
    
    setIsMinting(true);
    setMintStatus('Minting NFT...');
    
    try {
      // Simulate NFT minting process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMintStatus('NFT minted successfully! Minting tokens...');
      
      // Simulate token minting
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const tokenAmount = calculateTokenAmount(score);
      setMintStatus(`Success! NFT and ${tokenAmount} CreatorTokens minted!`);
      
    } catch (error) {
      console.error('Error minting:', error);
      setMintStatus('Error minting NFT');
    } finally {
      setIsMinting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI NFT Creator</h1>
          <p className="text-gray-600 mb-8">Connect your wallet to start creating AI-scored NFTs</p>
          <WalletConnect />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI NFT Creator</h1>
          <WalletConnect />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Analyze Your Content</h2>
              <ContentForm onSubmit={handleAnalyze} isLoading={isAnalyzing} />
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {isAnalyzing && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-3 text-gray-600">Analyzing content...</span>
                  </div>
                </div>
              )}

              {score !== null && currentPost && (
                <ScoreDisplay
                  post={currentPost}
                  score={score}
                  onMintNFT={handleMintNFT}
                  isMinting={isMinting}
                />
              )}

              {mintStatus && (
                <div className="bg-white rounded-lg shadow-lg p-4">
                  <p className="text-sm text-gray-600">{mintStatus}</p>
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">How it works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Submit Content</h4>
                <p className="text-sm text-gray-600">Paste your social media post URL and select a category</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">AI Analysis</h4>
                <p className="text-sm text-gray-600">Our AI analyzes your content and provides a score from 0-100</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Mint & Earn</h4>
                <p className="text-sm text-gray-600">If score &gt; 60, mint an NFT and earn CreatorTokens</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
