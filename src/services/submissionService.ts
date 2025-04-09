
import { Submission, mockSubmissions } from '@/lib/mock-data';
import { toast } from "@/hooks/use-toast";

/**
 * Service to fetch submission data
 * Attempts to use real API, falls back to mock data if API endpoints aren't ready
 */
export const fetchSubmissions = async (): Promise<Submission[]> => {
  try {
    // Force non-cached response with a random query parameter
    const timestamp = new Date().getTime();
    const response = await fetch(`/api/submissions?t=${timestamp}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('API response is not in JSON format');
    }
    
    const submissions = await response.json();
    return sortSubmissionsByDate(submissions);
  } catch (error) {
    console.error('Error fetching submissions from API:', error);
    console.log('Falling back to mock data');
    
    // Fall back to mock data, sorted by date
    return sortSubmissionsByDate([...mockSubmissions]);
  }
};

export const fetchSubmissionById = async (id: string): Promise<Submission | undefined> => {
  try {
    // Force non-cached response with a random query parameter
    const timestamp = new Date().getTime();
    const response = await fetch(`/api/submissions/${id}?t=${timestamp}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('API response is not in JSON format');
    }
    
    return response.json();
  } catch (error) {
    console.error(`Error fetching submission ${id} from API:`, error);
    
    // Fall back to mock data
    return mockSubmissions.find(sub => sub.id === id);
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
