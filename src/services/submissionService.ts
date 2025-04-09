
import { Submission } from '@/lib/mock-data';
import { mockSubmissions } from '@/lib/mock-data';

/**
 * Service to fetch submission data
 * Currently using mock data, but will be replaced with real API calls
 */
export const fetchSubmissions = async (): Promise<Submission[]> => {
  // TODO: Replace with real API call
  // Example of how the real API call would look:
  // const response = await fetch('/api/submissions');
  // return response.json();
  
  // For now, return mock data with a simulated delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSubmissions);
    }, 300);
  });
};

export const fetchSubmissionById = async (id: string): Promise<Submission | undefined> => {
  // TODO: Replace with real API call
  // Example: const response = await fetch(`/api/submissions/${id}`);
  
  // For now, return mock data with a simulated delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const submission = mockSubmissions.find(sub => sub.id === id);
      resolve(submission);
    }, 300);
  });
};
