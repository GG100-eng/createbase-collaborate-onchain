
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
      
      // Pre-process hashtags to ensure proper format
      const processedRequirements = {
        hashtags: requirements.hashtags.filter(tag => tag.startsWith('#')),
        mentions: requirements.mentions,
        topics: [...requirements.topics]
      };
      
      // Move non-hashtag items from hashtags array to topics
      requirements.hashtags.forEach(item => {
        if (!item.startsWith('#') && !processedRequirements.topics.includes(item)) {
          processedRequirements.topics.push(item);
        }
      });
      
      // Log the exact payload being sent to the API for debugging
      const payload = { url, requirements: processedRequirements };
      console.log('Sending payload to API:', JSON.stringify(payload));
      
      const response = await fetch(`${API_URL}/api/validate-tweet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const rawData = await response.json();
      console.log('Raw tweet validation response:', rawData);
      
      // Process the API response more carefully
      if (!rawData || typeof rawData !== 'object') {
        console.error('Invalid API response format:', rawData);
        return {
          success: false,
          passed: false,
          errors: ["Invalid API response format"]
        };
      }
      
      // Build a standardized response with proper structure
      const standardizedResponse: TweetValidationResult = {
        success: true, // We got a response, so API call succeeded
        passed: false, // Will be updated based on requirements check
        errors: [],
        requirements: {}
      };
      
      // Get overall pass/fail status if available
      if (typeof rawData.passed === 'boolean') {
        standardizedResponse.passed = rawData.passed;
      }
      
      // Get errors if available
      if (Array.isArray(rawData.errors)) {
        standardizedResponse.errors = rawData.errors;
      }
      
      // In case validation is successful but there's no explicit pass/fail
      if (rawData.success === true && standardizedResponse.passed === undefined) {
        standardizedResponse.passed = true;
      }
      
      // Process detailed requirements results
      if (rawData.requirements && typeof rawData.requirements === 'object') {
        // Process hashtags
        if (rawData.requirements.hashtags) {
          standardizedResponse.requirements.hashtags = {
            passed: rawData.requirements.hashtags.passed === true,
            missing: Array.isArray(rawData.requirements.hashtags.missing) 
              ? rawData.requirements.hashtags.missing 
              : [],
            required: processedRequirements.hashtags
          };
        } else {
          standardizedResponse.requirements.hashtags = {
            passed: processedRequirements.hashtags.length === 0,
            missing: processedRequirements.hashtags,
            required: processedRequirements.hashtags
          };
        }
        
        // Process mentions
        if (rawData.requirements.mentions) {
          standardizedResponse.requirements.mentions = {
            passed: rawData.requirements.mentions.passed === true,
            missing: Array.isArray(rawData.requirements.mentions.missing) 
              ? rawData.requirements.mentions.missing 
              : [],
            required: processedRequirements.mentions
          };
        } else {
          standardizedResponse.requirements.mentions = {
            passed: processedRequirements.mentions.length === 0,
            missing: processedRequirements.mentions,
            required: processedRequirements.mentions
          };
        }
        
        // Process topics
        if (rawData.requirements.topics) {
          standardizedResponse.requirements.topics = {
            passed: rawData.requirements.topics.passed === true,
            missing: Array.isArray(rawData.requirements.topics.missing) 
              ? rawData.requirements.topics.missing 
              : [],
            required: processedRequirements.topics
          };
        } else {
          standardizedResponse.requirements.topics = {
            passed: processedRequirements.topics.length === 0,
            missing: processedRequirements.topics,
            required: processedRequirements.topics
          };
        }
        
        // Check if rawData has a urls field
        if (rawData.requirements.urls) {
          standardizedResponse.requirements.urls = {
            passed: rawData.requirements.urls.passed === true,
            missing: Array.isArray(rawData.requirements.urls.missing) 
              ? rawData.requirements.urls.missing 
              : []
          };
        }
      } else {
        // If no detailed requirements in response, create default structure
        standardizedResponse.requirements = {
          hashtags: {
            passed: processedRequirements.hashtags.length === 0,
            missing: processedRequirements.hashtags,
            required: processedRequirements.hashtags
          },
          mentions: {
            passed: processedRequirements.mentions.length === 0,
            missing: processedRequirements.mentions,
            required: processedRequirements.mentions
          },
          topics: {
            passed: processedRequirements.topics.length === 0,
            missing: processedRequirements.topics,
            required: processedRequirements.topics
          }
        };
      }
      
      // If API indicates overall success, override our calculated values
      if (rawData.success === true && rawData.passed === true) {
        standardizedResponse.passed = true;
        
        // Mark all requirements as passed
        if (standardizedResponse.requirements) {
          Object.keys(standardizedResponse.requirements).forEach(key => {
            if (standardizedResponse.requirements[key]) {
              standardizedResponse.requirements[key].passed = true;
              standardizedResponse.requirements[key].missing = [];
            }
          });
        }
      }
      
      console.log('Standardized validation response:', standardizedResponse);
      return standardizedResponse;
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
