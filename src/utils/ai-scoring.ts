import { SocialPost } from '@/types';

export const contentCategories = [
  { value: 'technology', label: 'Technology' },
  { value: 'art', label: 'Art & Design' },
  { value: 'music', label: 'Music' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'fitness', label: 'Fitness & Health' },
  { value: 'food', label: 'Food & Cooking' },
  { value: 'travel', label: 'Travel' },
  { value: 'education', label: 'Education' },
  { value: 'business', label: 'Business' },
  { value: 'entertainment', label: 'Entertainment' },
];

export const mockAIScoring = async (post: SocialPost): Promise<number> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock scoring algorithm based on URL and category
  let baseScore = 50;
  
  // Add randomness
  const randomFactor = Math.random() * 30;
  
  // Category-based scoring
  const categoryScores: { [key: string]: number } = {
    'technology': 75,
    'art': 80,
    'music': 70,
    'gaming': 65,
    'fitness': 60,
    'food': 55,
    'travel': 70,
    'education': 75,
    'business': 60,
    'entertainment': 50,
  };
  
  baseScore = categoryScores[post.category] || 50;
  
  // URL-based scoring (simple hash-based)
  const urlHash = post.url.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const urlFactor = (urlHash % 20) - 10; // -10 to +10
  
  const finalScore = Math.max(0, Math.min(100, baseScore + randomFactor + urlFactor));
  
  return Math.round(finalScore);
}; 