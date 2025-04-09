
// Define interfaces for response types
export interface TweetValidationResult {
  success: boolean;
  passed?: boolean;
  errors?: string[];
  requirements?: {
    hashtags?: {
      passed: boolean;
      missing?: string[];
    };
    mentions?: {
      passed: boolean;
      missing?: string[];
    };
    topics?: {
      passed: boolean;
      missing?: string[];
    };
  };
}

export interface TweetUrlCheckResult {
  valid: boolean;
  tweetId?: string;
  error?: string;
}

// Twitter checker service implementation
const API_URL = 'https://tweet-validator-gagangehani1.replit.app';

export const twitterCheckerService = {
  // Check if API is available
  async checkHealth() {
    try {
      console.log('Checking API health...');
      const response = await fetch(`${API_URL}/`);
      const data = await response.json();
      console.log('API health response:', data);
      return data;
    } catch (error) {
      console.error("Error checking API health:", error);
      return { status: 'error', message: 'API unavailable' };
    }
  },
  
  // Validate tweet URLs (useful for form validation)
  async checkTweetUrl(url: string): Promise<TweetUrlCheckResult> {
    try {
      console.log('Checking tweet URL validity:', url);
      const response = await fetch(`${API_URL}/api/check-tweet-id`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      
      const data = await response.json();
      console.log('Tweet URL check response:', data);
      return data;
    } catch (error) {
      console.error("Error checking tweet URL:", error);
      return { valid: false, error: "Network error while validating URL" };
    }
  },
  
  // Full tweet validation
  async validateTweet(url: string, requirements: {
    hashtags: string[];
    mentions: string[];
    topics: string[];
  }): Promise<TweetValidationResult> {
    try {
      console.log('Validating tweet with requirements:', { url, requirements });
      const response = await fetch(`${API_URL}/api/validate-tweet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, requirements })
      });
      
      const data = await response.json();
      console.log('Tweet validation response:', data);
      
      // Ensure we're properly handling the response format
      if (data && typeof data === 'object') {
        // Make sure we have a properly structured response even if the API format varies
        const standardizedResponse: TweetValidationResult = {
          success: !!data.success,
          passed: !!data.passed,
          errors: Array.isArray(data.errors) ? data.errors : [],
          requirements: data.requirements || {}
        };
        
        // Log the standardized response for debugging
        console.log('Standardized validation response:', standardizedResponse);
        return standardizedResponse;
      }
      
      return data;
    } catch (error) {
      console.error("Error validating tweet:", error);
      return { 
        success: false, 
        passed: false,
        errors: ["Network error while validating tweet"] 
      };
    }
  },
  
  // URL content extraction
  async scrapeUrl(url: string, keywords: string[] = []) {
    try {
      console.log('Scraping URL with keywords:', { url, keywords });
      const response = await fetch(`${API_URL}/api/scrape-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, keywords })
      });
      
      const data = await response.json();
      console.log('URL scraping response:', data);
      return data;
    } catch (error) {
      console.error("Error scraping URL:", error);
      return { 
        success: false, 
        error: "Network error while scraping URL"
      };
    }
  }
};
