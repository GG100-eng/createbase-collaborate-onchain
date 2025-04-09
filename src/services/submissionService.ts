
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
    
    return response.json();
  } catch (error) {
    console.error('Error fetching submissions from API:', error);
    toast({
      title: "Using mock data",
      description: "Could not connect to API. Using sample data instead.",
      variant: "default",
    });
    
    // Fall back to mock data
    return mockSubmissions;
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
