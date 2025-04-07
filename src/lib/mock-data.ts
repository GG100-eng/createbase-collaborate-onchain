
export interface Campaign {
  id: string;
  title: string;
  brief: string;
  brand: string;
  brandLogo: string;
  minReward: number;
  maxReward: number;
  deadline: string;
  status: 'live' | 'pending' | 'closed';
  requiredTags: string[];
  submissions: number;
  budgetRemaining: number;
  payoutModel: 'fixed' | 'engagement' | 'hybrid';
}

export interface Submission {
  id: string;
  campaignId: string;
  campaignTitle: string;
  brand: string;
  contentUrl: string;
  contentPlatform: 'twitter' | 'farcaster' | 'lens' | 'other';
  submittedAt: string;
  status: 'verified' | 'pending' | 'rejected';
  feedback: string;
  metrics: {
    views: number;
    likes: number;
    comments: number;
    reposts: number;
    engagementScore: number;
  };
  leaderboardPosition: number | null;
  estimatedPayout: number;
  payoutTxHash: string | null;
}

export const mockCampaigns: Campaign[] = [
  {
    id: "c007",
    title: "Build On Base: India Pilot (Week 1)",
    brief: "We're rewarding Indian builders, KOLs, and creators who help promote the Base Batches program — a weekly wave of new ideas and projects launching on Base. Share your favorite ideas from this week's batch, explain how people can join or build, and encourage more builders to join the momentum.",
    brand: "Base Ecosystem",
    brandLogo: "https://via.placeholder.com/40",
    minReward: 0,
    maxReward: 2000,
    deadline: "2025-04-14",
    status: 'live',
    requiredTags: ["#BuildOnBase", "base.org/batches", "@base", "Base Batches"],
    submissions: 12,
    budgetRemaining: 2000,
    payoutModel: 'engagement'
  },
  {
    id: "c001",
    title: "Share Your DeFi Success Story",
    brief: "Create a tweet or cast about how using DeFi has positively impacted your financial journey. Include specific platforms or protocols you've used.",
    brand: "DeFi Alliance",
    brandLogo: "https://via.placeholder.com/40",
    minReward: 50,
    maxReward: 500,
    deadline: "2025-05-15",
    status: 'live',
    requiredTags: ["#DeFiSuccess", "#BuildOnBase", "@defialliance"],
    submissions: 42,
    budgetRemaining: 24500,
    payoutModel: 'engagement'
  },
  {
    id: "c002",
    title: "Onchain Gaming Highlights",
    brief: "Share your best moments playing our new blockchain-based game. Upload a short clip or screenshot with your thoughts.",
    brand: "ChainQuest Games",
    brandLogo: "https://via.placeholder.com/40",
    minReward: 25,
    maxReward: 200,
    deadline: "2025-04-30",
    status: 'live',
    requiredTags: ["#ChainQuest", "#GameOnchain", "@chainquest"],
    submissions: 67,
    budgetRemaining: 15600,
    payoutModel: 'fixed'
  },
  {
    id: "c003",
    title: "NFT Collection Review",
    brief: "Create content reviewing our latest NFT collection. Highlight your favorite pieces and what makes them special.",
    brand: "PixelVerse",
    brandLogo: "https://via.placeholder.com/40",
    minReward: 100,
    maxReward: 750,
    deadline: "2025-05-10",
    status: 'live',
    requiredTags: ["#PixelVerseNFT", "#NFTReview", "@pixelverse"],
    submissions: 29,
    budgetRemaining: 42000,
    payoutModel: 'hybrid'
  },
  {
    id: "c004",
    title: "Wallet Security Tips",
    brief: "Share your best practices for securing your crypto wallet and staying safe online.",
    brand: "SecureChain",
    brandLogo: "https://via.placeholder.com/40",
    minReward: 75,
    maxReward: 300,
    deadline: "2025-04-25",
    status: 'pending',
    requiredTags: ["#WalletSecurity", "#CryptoSafety", "@securechain"],
    submissions: 53,
    budgetRemaining: 18700,
    payoutModel: 'fixed'
  },
  {
    id: "c005",
    title: "Layer 2 Experience",
    brief: "Tell us about your experience using Layer 2 solutions. What benefits have you seen in terms of cost and speed?",
    brand: "ScaleNet",
    brandLogo: "https://via.placeholder.com/40",
    minReward: 60,
    maxReward: 450,
    deadline: "2025-05-20",
    status: 'live',
    requiredTags: ["#Layer2", "#Scaling", "@scalenet"],
    submissions: 38,
    budgetRemaining: 32250,
    payoutModel: 'engagement'
  },
  {
    id: "c006",
    title: "Crypto Trading Strategies",
    brief: "Share your successful crypto trading strategies and tips for beginners in this space.",
    brand: "TradeCrypto",
    brandLogo: "https://via.placeholder.com/40",
    minReward: 80,
    maxReward: 600,
    deadline: "2025-04-18",
    status: 'closed',
    requiredTags: ["#CryptoTrading", "#TradeTips", "@tradecrypto"],
    submissions: 75,
    budgetRemaining: 0,
    payoutModel: 'hybrid'
  }
];

export const mockSubmissions: Submission[] = [
  {
    id: "s001",
    campaignId: "c001",
    campaignTitle: "Share Your DeFi Success Story",
    brand: "DeFi Alliance",
    contentUrl: "https://twitter.com/user/status/123456789",
    contentPlatform: "twitter",
    submittedAt: "2025-04-10T14:30:00Z",
    status: "verified",
    feedback: "Great story with compelling personal experience. Consider adding more specific numbers next time.",
    metrics: {
      views: 2460,
      likes: 128,
      comments: 42,
      reposts: 35,
      engagementScore: 78
    },
    leaderboardPosition: 3,
    estimatedPayout: 320,
    payoutTxHash: null
  },
  {
    id: "s002",
    campaignId: "c002",
    campaignTitle: "Onchain Gaming Highlights",
    brand: "ChainQuest Games",
    contentUrl: "https://warpcast.com/~/cast/0x123456",
    contentPlatform: "farcaster",
    submittedAt: "2025-04-08T10:15:00Z",
    status: "pending",
    feedback: "",
    metrics: {
      views: 1250,
      likes: 95,
      comments: 28,
      reposts: 15,
      engagementScore: 64
    },
    leaderboardPosition: null,
    estimatedPayout: 145,
    payoutTxHash: null
  },
  {
    id: "s003",
    campaignId: "c003",
    campaignTitle: "NFT Collection Review",
    brand: "PixelVerse",
    contentUrl: "https://twitter.com/user/status/987654321",
    contentPlatform: "twitter",
    submittedAt: "2025-04-05T16:45:00Z",
    status: "rejected",
    feedback: "Missing required hashtags and didn't focus enough on the collection specifics.",
    metrics: {
      views: 875,
      likes: 42,
      comments: 13,
      reposts: 8,
      engagementScore: 35
    },
    leaderboardPosition: null,
    estimatedPayout: 0,
    payoutTxHash: null
  }
];
