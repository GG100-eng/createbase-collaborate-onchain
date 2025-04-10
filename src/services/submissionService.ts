
import { Submission, mockSubmissions } from '@/lib/mock-data';

/**
 * Service to fetch submission data from the real API
 * Falls back to mock data if API is unavailable
 */
export const fetchSubmissions = async (): Promise<Submission[]> => {
  try {
    // Force non-cached response with a random query parameter
    const timestamp = new Date().getTime();
    const response = await fetch(`/api/submissions?t=${timestamp}`);
    
    // Log the response content type for debugging
    const contentType = response.headers.get('content-type');
    console.log('API Response Content-Type:', contentType);
    
    // If the response is HTML (which appears to be the case), we can't parse it as JSON
    // Since we can't extract meaningful submission data from the HTML,
    // we'll use the mock data instead
    if (!response.ok || !contentType || !contentType.includes('application/json')) {
      console.log('API returning HTML instead of JSON, using mock data');
      
      // Try to log the HTML content for debugging
      const htmlContent = await response.text();
      console.log('HTML content from API (first 100 chars):', htmlContent.substring(0, 100));
      
      return sortSubmissionsByDate(mockSubmissions);
    }
    
    const submissions = await response.json();
    console.log('Real API submissions data:', submissions);
    return sortSubmissionsByDate(submissions);
  } catch (error) {
    console.error('Error fetching from API, using mock data as fallback:', error);
    return sortSubmissionsByDate(mockSubmissions);
  }
};

export const fetchSubmissionById = async (id: string): Promise<Submission | undefined> => {
  try {
    const timestamp = new Date().getTime();
    const response = await fetch(`/api/submissions/${id}?t=${timestamp}`);
    
    const contentType = response.headers.get('content-type');
    if (!response.ok || !contentType || !contentType.includes('application/json')) {
      console.log(`API returning HTML instead of JSON for submission ${id}, using mock data`);
      return mockSubmissions.find(sub => sub.id === id);
    }
    
    const submission = await response.json();
    console.log(`Real API submission ${id} data:`, submission);
    return submission;
  } catch (error) {
    console.error(`Error fetching submission ${id}, checking mock data:`, error);
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
