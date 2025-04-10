
import { Submission } from '@/lib/mock-data';

/**
 * Service to fetch submission data from the real API
 */
export const fetchSubmissions = async (): Promise<Submission[]> => {
  // Force non-cached response with a random query parameter
  const timestamp = new Date().getTime();
  const response = await fetch(`/api/submissions?t=${timestamp}`);
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  // Log the response content type for debugging
  const contentType = response.headers.get('content-type');
  console.log('API Response Content-Type:', contentType);
  
  if (!contentType || !contentType.includes('application/json')) {
    const textContent = await response.text();
    console.error('API returned non-JSON content:', textContent.substring(0, 200) + '...');
    throw new Error('API response is not in JSON format');
  }
  
  const submissions = await response.json();
  console.log('Real API submissions data:', submissions);
  return sortSubmissionsByDate(submissions);
};

export const fetchSubmissionById = async (id: string): Promise<Submission | undefined> => {
  const timestamp = new Date().getTime();
  const response = await fetch(`/api/submissions/${id}?t=${timestamp}`);
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('API response is not in JSON format');
  }
  
  const submission = await response.json();
  console.log(`Real API submission ${id} data:`, submission);
  return submission;
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
