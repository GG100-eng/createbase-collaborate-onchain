
import { Submission } from '@/lib/mock-data';

/**
 * Service to fetch submission data from the real API
 */
export const fetchSubmissions = async (): Promise<Submission[]> => {
  try {
    const response = await fetch('/api/submissions');
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching submissions:', error);
    throw error;
  }
};

export const fetchSubmissionById = async (id: string): Promise<Submission | undefined> => {
  try {
    const response = await fetch(`/api/submissions/${id}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching submission ${id}:`, error);
    throw error;
  }
};
