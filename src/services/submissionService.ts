
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
 * Service to fetch submission data from the API
 */
export const fetchSubmissions = async (context: { queryKey: string[] }): Promise<any[]> => {
  // Extract campaignId from queryKey if present (queryKey[1])
  const campaignId = context.queryKey.length > 1 ? context.queryKey[1] as string : undefined;
  
  try {
    // Build URL with campaign filter if provided
    const url = campaignId 
      ? `/api/submissions?campaignId=${campaignId}`
      : '/api/submissions';
    
    console.log(`Fetching submissions from: ${url}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching submissions:', error);
    throw error;
  }
};

export const fetchSubmissionById = async (context: { queryKey: string[] }): Promise<any> => {
  // Extract id from queryKey (queryKey[1])
  const id = context.queryKey[1] as string;
  
  try {
    const url = `/api/submissions/${id}`;
    console.log(`Fetching submission from: ${url}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching submission ${id}:`, error);
    throw error;
  }
};

/**
 * Helper function to submit content to a campaign
 */
export const submitContent = async (
  campaignId: string, 
  contentUrl: string, 
  contentPlatform: string,
  notes?: string
): Promise<SubmissionResponse> => {
  try {
    const url = '/api/submissions';
    console.log(`Submitting content to: ${url}`);
    
    const response = await fetch(url, {
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
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting content:', error);
    throw error;
  }
};
