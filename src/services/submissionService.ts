
import { Submission, mockSubmissions } from '@/lib/mock-data';

/**
 * Service to fetch submission data from the real API
 * Falls back to mock data if API is unavailable
 */
export const fetchSubmissions = async (campaignId?: string): Promise<Submission[]> => {
  try {
    // Force non-cached response with a random query parameter
    const timestamp = new Date().getTime();
    const endpoint = campaignId 
      ? `/api/submissions?campaignId=${campaignId}&t=${timestamp}`
      : `/api/submissions?t=${timestamp}`;
    
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      console.log(`API returned status ${response.status}, using mock data as fallback`);
      return sortSubmissionsByDate(campaignId 
        ? mockSubmissions.filter(sub => sub.campaignId === campaignId)
        : mockSubmissions);
    }
    
    // Parse the JSON response
    try {
      const submissions = await response.json();
      console.log('Real API submissions data:', submissions);
      
      // If the API returns an empty array or invalid structure, use mock data
      if (!Array.isArray(submissions) || submissions.length === 0) {
        console.log('API returned empty or invalid data, using mock data as fallback');
        return sortSubmissionsByDate(campaignId 
          ? mockSubmissions.filter(sub => sub.campaignId === campaignId)
          : mockSubmissions);
      }
      
      return sortSubmissionsByDate(submissions);
    } catch (parseError) {
      console.error('Error parsing API response:', parseError);
      return sortSubmissionsByDate(campaignId 
        ? mockSubmissions.filter(sub => sub.campaignId === campaignId)
        : mockSubmissions);
    }
  } catch (error) {
    console.error('Error fetching from API, using mock data as fallback:', error);
    return sortSubmissionsByDate(campaignId 
      ? mockSubmissions.filter(sub => sub.campaignId === campaignId)
      : mockSubmissions);
  }
};

export const fetchSubmissionById = async (id: string): Promise<Submission | undefined> => {
  try {
    const timestamp = new Date().getTime();
    const response = await fetch(`/api/submissions/${id}?t=${timestamp}`);
    
    if (!response.ok) {
      console.log(`API returned status ${response.status} for submission ${id}, using mock data`);
      return mockSubmissions.find(sub => sub.id === id);
    }
    
    try {
      const submission = await response.json();
      console.log(`Real API submission ${id} data:`, submission);
      return submission;
    } catch (parseError) {
      console.error(`Error parsing API response for submission ${id}:`, parseError);
      return mockSubmissions.find(sub => sub.id === id);
    }
  } catch (error) {
    console.error(`Error fetching submission ${id}, checking mock data:`, error);
    return mockSubmissions.find(sub => sub.id === id);
  }
};

/**
 * Helper function to submit content to a campaign
 * Uses the new /api/submission-format endpoint
 */
export const submitContent = async (
  campaignId: string, 
  contentUrl: string, 
  contentPlatform: string,
  notes?: string
): Promise<any> => {
  try {
    const response = await fetch('/api/submission-format', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        campaignId,
        contentUrl,
        contentPlatform,
        notes
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error (${response.status}): ${errorText}`);
    }

    return await response.json();
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
