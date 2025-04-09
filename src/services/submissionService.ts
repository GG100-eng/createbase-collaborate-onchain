
import { Submission, mockSubmissions } from '@/lib/mock-data';
import { toast } from "@/hooks/use-toast";

/**
 * Service to fetch submission data
 * Attempts to use real API, falls back to mock data if API endpoints aren't ready
 */
export const fetchSubmissions = async (): Promise<Submission[]> => {
  try {
    const response = await fetch('/api/submissions');
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('API response is not in JSON format');
    }
    
    const submissions = await response.json();
    // Sort submissions by date, most recent first
    return sortSubmissionsByDate(submissions);
  } catch (error) {
    console.error('Error fetching submissions from API:', error);
    toast({
      title: "Using mock data",
      description: "Could not connect to API. Using sample data instead.",
      variant: "default",
    });
    
    // Fall back to mock data, sorted by date
    return sortSubmissionsByDate([...mockSubmissions]);
  }
};

export const fetchSubmissionById = async (id: string): Promise<Submission | undefined> => {
  try {
    const response = await fetch(`/api/submissions/${id}`);
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
    toast({
      title: "Using mock data",
      description: `Could not fetch submission ${id} from API. Using sample data instead.`,
      variant: "default",
    });
    
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
