
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
    const response = await fetch(`${API_URL}/`);
    return response.json();
  },
  
  // Validate tweet URLs (useful for form validation)
  async checkTweetUrl(url: string): Promise<TweetUrlCheckResult> {
    try {
      const response = await fetch(`${API_URL}/api/check-tweet-id`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      
      return response.json();
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
      const response = await fetch(`${API_URL}/api/validate-tweet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, requirements })
      });
      
      return response.json();
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
      const response = await fetch(`${API_URL}/api/scrape-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, keywords })
      });
      
      return response.json();
    } catch (error) {
      console.error("Error scraping URL:", error);
      return { 
        success: false, 
        error: "Network error while scraping URL"
      };
    }
  }
};
