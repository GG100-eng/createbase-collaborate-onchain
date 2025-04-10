
import { Submission, mockSubmissions } from '@/lib/mock-data';

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

/**
 * Service to fetch submission data from the real API
 * Falls back to mock data if API is unavailable
 */
export const fetchSubmissions = async (context: { queryKey: string[] }): Promise<Submission[]> => {
  // Extract campaignId from queryKey if present (queryKey[1])
  const campaignId = context.queryKey.length > 1 ? context.queryKey[1] as string : undefined;
  
  try {
    // In development, let's use mock data until the API is properly set up
    // In production, this would attempt to call the real API
    console.log('Using mock data for submissions');
    
    // Filter by campaign ID if one was provided
    const filteredSubmissions = campaignId 
      ? mockSubmissions.filter(sub => sub.campaignId === campaignId)
      : mockSubmissions;
    
    return sortSubmissionsByDate(filteredSubmissions);
  } catch (error) {
    console.error('Error fetching submissions, using mock data as fallback:', error);
    return sortSubmissionsByDate(campaignId 
      ? mockSubmissions.filter(sub => sub.campaignId === campaignId)
      : mockSubmissions);
  }
};

export const fetchSubmissionById = async (context: { queryKey: string[] }): Promise<Submission | undefined> => {
  // Extract id from queryKey (queryKey[1])
  const id = context.queryKey[1] as string;
  
  try {
    // In development, use mock data until API is properly set up
    console.log(`Using mock data for submission ${id}`);
    return mockSubmissions.find(sub => sub.id === id);
  } catch (error) {
    console.error(`Error fetching submission ${id}, checking mock data:`, error);
    return mockSubmissions.find(sub => sub.id === id);
  }
};

/**
 * Helper function to submit content to a campaign
 * In development, this simulates a successful submission
 */
export const submitContent = async (
  campaignId: string, 
  contentUrl: string, 
  contentPlatform: string,
  notes?: string
): Promise<SubmissionResponse> => {
  try {
    console.log('Development mode: Simulating submission with mock validation response');
    
    // Simulate successful validation in development
    const mockValidation: ValidationResult = {
      passed: true,
      requirements: {
        'hashtags': {
          passed: true,
          required: ['#web3', '#blockchain'],
        },
        'mentions': {
          passed: true,
          required: ['@CreatorBase'],
        },
        'content': {
          passed: true,
        }
      }
    };
    
    return { validation: mockValidation };
  } catch (error) {
    console.error('Error submitting content:', error);
    throw error;
  }
};

/**
 * Helper function to sort submissions by date (most recent first)
 */
const sortSubmissionsByDate = (submissions: Submission[]): Submission[] => {
  return submissions.sort((a, b) => {
    const dateA = new Date(a.submittedAt).getTime();
    const dateB = new Date(b.submittedAt).getTime();
    return dateB - dateA; // Sort in descending order (newest first)
  });
};
