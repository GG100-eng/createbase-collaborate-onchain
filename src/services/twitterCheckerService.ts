
// Define interfaces for response types
export interface TweetValidationResult {
  success: boolean;
  passed?: boolean;
  errors?: string[];
  requirements?: {
    hashtags?: {
      passed: boolean;
      missing?: string[];
      required?: string[];
    };
    mentions?: {
      passed: boolean;
      missing?: string[];
      required?: string[];
    };
    topics?: {
      passed: boolean;
      missing?: string[];
      required?: string[];
    };
    urls?: {
      passed: boolean;
      missing?: string[];
      required?: string[];
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
      
      // Basic Twitter/X URL format validation
      const isTwitterUrl = url.match(/(twitter\.com|x\.com)\/\w+\/status\/\d+/i);
      if (!isTwitterUrl) {
        return { 
          valid: false, 
          error: "URL must be a valid Twitter/X tweet URL (e.g., https://twitter.com/username/status/123456789)"
        };
      }
      
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
  
  // Full tweet validation without preprocessing
  async validateTweet(url: string, requirements: {
    hashtags: string[];
    mentions: string[];
    topics: string[];
    urls?: string[];
  }): Promise<TweetValidationResult> {
    try {
      console.log('Validating tweet with requirements:', { url, requirements });
      
      // Send requirements to API without preprocessing
      const payload = { url, requirements };
      console.log('Sending payload to API:', JSON.stringify(payload));
      
      const response = await fetch(`${API_URL}/api/validate-tweet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const rawData = await response.json();
      console.log('Raw tweet validation response:', rawData);
      
      // Process the API response
      if (!rawData || typeof rawData !== 'object') {
        console.error('Invalid API response format:', rawData);
        return {
          success: false,
          passed: false,
          errors: ["Invalid API response format"]
        };
      }
      
      // Return the response directly with minimal processing
      const result: TweetValidationResult = {
        success: true,
        passed: rawData.passed === true,
        errors: Array.isArray(rawData.errors) ? rawData.errors : [],
        requirements: rawData.requirements || {}
      };
      
      console.log('Standardized validation response:', result);
      return result;
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
