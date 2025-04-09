
const API_URL = 'https://tweet-validator-gagangehani1.replit.app';

export interface TweetValidationRequirements {
  hashtags?: string[];
  mentions?: string[];
  topics?: string[];
}

export interface TweetValidationResult {
  success: boolean;
  passed?: boolean;
  requirements?: {
    [key: string]: {
      passed: boolean;
      missing?: string[];
    };
  };
  errors?: string[];
  message?: string;
}

export const twitterCheckerService = {
  // Check if API is available
  async checkHealth() {
    const response = await fetch(`${API_URL}/`);
    return response.json();
  },
  
  // Validate tweet URLs (useful for form validation)
  async checkTweetUrl(url: string) {
    try {
      const response = await fetch(`${API_URL}/api/check-tweet-id`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      return response.json();
    } catch (error) {
      console.error("Error checking tweet URL:", error);
      return { valid: false, error: "Failed to validate URL format" };
    }
  },
  
  // Full tweet validation
  async validateTweet(url: string, requirements: TweetValidationRequirements): Promise<TweetValidationResult> {
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
        errors: ["Failed to validate tweet. Please check your internet connection and try again."]
      };
    }
  }
};
