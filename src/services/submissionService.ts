
// Define interfaces for validation results in submissions
export interface ValidationRequirement {
  passed: boolean;
  required?: string[];
  missing?: string[];
}

export interface ValidationResult {
  passed: boolean;
  errors?: string[];
  requirements?: {
    [key: string]: ValidationRequirement;
  };
}

export interface SubmissionResponse {
  validation?: ValidationResult;
}

// Mock data for submissions
const MOCK_SUBMISSIONS = [
  {
    id: "s001",
    campaignId: "c001",
    campaignTitle: "DeFi Success Story",
    brand: "MetaFinance",
    contentUrl: "https://twitter.com/user1/status/123456789",
    contentPlatform: "twitter",
    submittedAt: "2025-04-05T10:30:00Z",
    status: "verified",
    metrics: {
      views: 4500,
      likes: 320,
      comments: 45,
      reposts: 32,
      engagementScore: 76
    },
    estimatedPayout: 320,
    payoutTxHash: "0x123abc456def789ghi"
  },
  {
    id: "s002",
    campaignId: "c003",
    campaignTitle: "Onchain Gaming",
    brand: "PlayBlock",
    contentUrl: "https://twitter.com/user1/status/987654321",
    contentPlatform: "twitter",
    submittedAt: "2025-04-09T14:20:00Z",
    status: "pending",
    metrics: {
      views: 1200,
      likes: 97,
      comments: 23,
      reposts: 12,
      engagementScore: 45
    }
  },
  {
    id: "s003",
    campaignId: "c007",
    campaignTitle: "Base Ecosystem Overview",
    brand: "Base",
    contentUrl: "https://warpcast.com/user1/0x987654321",
    contentPlatform: "farcaster",
    submittedAt: "2025-04-01T09:15:00Z",
    status: "verified",
    metrics: {
      views: 8700,
      likes: 520,
      comments: 89,
      reposts: 67,
      engagementScore: 82
    },
    estimatedPayout: 400,
    leaderboardPosition: 3
  },
  {
    id: "s004",
    campaignId: "c005",
    campaignTitle: "Wallet Security",
    brand: "SecureWallet",
    contentUrl: "https://twitter.com/user1/status/456789123",
    contentPlatform: "twitter",
    submittedAt: "2025-03-25T11:45:00Z",
    status: "verified",
    metrics: {
      views: 3200,
      likes: 210,
      comments: 31,
      reposts: 28,
      engagementScore: 68
    },
    estimatedPayout: 200,
    payoutTxHash: "0xabc123def456ghi789"
  },
  {
    id: "s005",
    campaignId: "c002",
    campaignTitle: "NFT Revolution",
    brand: "ArtBlocks",
    contentUrl: "https://twitter.com/user1/status/246813579",
    contentPlatform: "twitter",
    submittedAt: "2025-03-18T16:30:00Z",
    status: "rejected",
    feedback: "Content doesn't meet our community guidelines. Please ensure your content follows our requirements and resubmit.",
    metrics: {
      views: 980,
      likes: 45,
      comments: 8,
      reposts: 3,
      engagementScore: 22
    }
  }
];

/**
 * Service to fetch submission data from the API
 * Currently returns mock data for development
 */
export const fetchSubmissions = async (context: { queryKey: string[] }): Promise<any[]> => {
  // Extract campaignId from queryKey if present (queryKey[1])
  const campaignId = context.queryKey.length > 1 ? context.queryKey[1] as string : undefined;
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log(`Fetching mock submissions${campaignId ? ` for campaign ${campaignId}` : ''}`);
    
    // Filter submissions by campaignId if provided
    if (campaignId) {
      return MOCK_SUBMISSIONS.filter(sub => sub.campaignId === campaignId);
    }
    
    // Return all mock submissions
    return MOCK_SUBMISSIONS;
  } catch (error) {
    console.error('Error fetching submissions:', error);
    throw error;
  }
};

export const fetchSubmissionById = async (context: { queryKey: string[] }): Promise<any> => {
  // Extract id from queryKey (queryKey[1])
  const id = context.queryKey[1] as string;
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    console.log(`Fetching mock submission with ID: ${id}`);
    
    // Find the submission by ID
    const submission = MOCK_SUBMISSIONS.find(sub => sub.id === id);
    
    if (!submission) {
      throw new Error(`Submission with ID ${id} not found`);
    }
    
    return submission;
  } catch (error) {
    console.error(`Error fetching submission ${id}:`, error);
    throw error;
  }
};

/**
 * Helper function to submit content to a campaign
 * Currently returns mock validation result for development
 */
export const submitContent = async (
  campaignId: string, 
  contentUrl: string, 
  contentPlatform: string,
  notes?: string
): Promise<SubmissionResponse> => {
  try {
    console.log(`Submitting content to mock API for campaign ${campaignId}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Always return successful validation for development
    return {
      validation: {
        passed: true,
        requirements: {
          hashtags: {
            passed: true,
            required: ["#web3", "#defi"],
          },
          mentions: {
            passed: true,
            required: ["@brandname"],
          },
          url: {
            passed: true
          }
        }
      }
    };
  } catch (error) {
    console.error('Error submitting content:', error);
    throw error;
  }
};
