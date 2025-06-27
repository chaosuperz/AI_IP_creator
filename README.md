# AI NFT Creator

A Next.js application that allows users to create AI-scored NFTs from their social media content. The app features wallet connection, AI content scoring, NFT minting, and ERC-20 token rewards.

## Features

- 🔗 **Wallet Connection**: Connect using RainbowKit + Wagmi
- 🤖 **AI Content Scoring**: Mock AI analysis that scores content from 0-100
- 🎨 **NFT Minting**: Mint NFTs for high-scoring content (>60)
- 🪙 **Token Rewards**: Earn CreatorTokens based on your content score
- 📱 **Responsive Design**: Beautiful UI built with TailwindCSS
- ⚡ **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Wallet**: RainbowKit + Wagmi + Ethers.js
- **Web3**: Thirdweb SDK
- **UI**: Custom components with modern design

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MetaMask or any Web3 wallet

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nextjs-ai-nft
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here
```

4. Get a WalletConnect Project ID:
- Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
- Create a new project
- Copy the Project ID
- Add it to your `.env.local` file

5. Update the Wagmi configuration:
Edit `src/lib/wagmi.ts` and replace `YOUR_PROJECT_ID` with your actual WalletConnect Project ID.

### Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

3. Connect your wallet and start creating AI-scored NFTs!

## How It Works

1. **Submit Content**: Paste a social media post URL and select a content category
2. **AI Analysis**: The mock AI analyzes your content and provides a score (0-100)
3. **Mint NFT**: If your score is above 60, you can mint an NFT
4. **Earn Tokens**: Receive CreatorTokens based on your score (score × 10)

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout with providers
│   └── page.tsx        # Main homepage
├── components/         # React components
│   ├── WalletConnect.tsx
│   ├── ContentForm.tsx
│   └── ScoreDisplay.tsx
├── lib/               # Configuration files
│   └── wagmi.ts       # Wagmi configuration
├── types/             # TypeScript type definitions
│   └── index.ts
└── utils/             # Utility functions
    ├── ai-scoring.ts  # Mock AI scoring logic
    └── thirdweb.ts    # Thirdweb utilities
```

## Customization

### Adding Real AI Integration

Replace the mock AI scoring in `src/utils/ai-scoring.ts` with your actual AI service:

```typescript
export const realAIScoring = async (post: SocialPost): Promise<number> => {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  });
  
  const result = await response.json();
  return result.score;
};
```

### Implementing Real NFT Minting

Update the minting logic in `src/app/page.tsx` to use actual Thirdweb contracts:

```typescript
const { contract } = useContract("your-nft-contract-address");
const { mutateAsync: mintNFT } = useContractWrite(contract, "mint");

const handleMintNFT = async () => {
  const metadata = createNFTMetadata(currentPost, score);
  await mintNFT({ args: [metadata] });
};
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
