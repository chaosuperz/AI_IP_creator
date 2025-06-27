import { NFTMetadata, SocialPost } from '@/types';

export const createNFTMetadata = (post: SocialPost, score: number): NFTMetadata => {
  const category = post.category.charAt(0).toUpperCase() + post.category.slice(1);
  
  return {
    name: `AI Scored Content - ${category}`,
    description: `AI-scored social media content with a score of ${score}/100. Original URL: ${post.url}`,
    image: `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(post.url)}&backgroundColor=1a1a1a&shape1Color=ff6b6b&shape2Color=4ecdc4&shape3Color=45b7d1`,
    attributes: [
      {
        trait_type: 'Category',
        value: category,
      },
      {
        trait_type: 'AI Score',
        value: score,
      },
      {
        trait_type: 'Original URL',
        value: post.url,
      },
      {
        trait_type: 'Mint Date',
        value: new Date().toISOString(),
      },
    ],
  };
};

export const calculateTokenAmount = (score: number): number => {
  return score * 10;
}; 