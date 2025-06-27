export interface SocialPost {
  url: string;
  category: string;
  score?: number;
}

export interface ContentCategory {
  value: string;
  label: string;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
} 