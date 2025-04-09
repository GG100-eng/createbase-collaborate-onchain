
/**
 * Calculates an engagement score based on post metrics
 * 
 * Formula: 
 * - Base score from weighted metrics (views, likes, comments, reposts)
 * - Normalized to a 0-100 scale
 */

interface PostMetrics {
  views: number;
  likes: number;
  comments: number;
  reposts: number;
}

export function calculateEngagementScore(metrics: PostMetrics): number {
  // Weight factors for different engagement types
  const WEIGHTS = {
    views: 0.1,    // Views are important but least valuable individually
    likes: 1,      // Likes show basic approval
    comments: 3,   // Comments show deeper engagement
    reposts: 5     // Reposts are highest-value engagement
  };

  // Calculate weighted score
  const weightedScore = 
    (metrics.views * WEIGHTS.views) +
    (metrics.likes * WEIGHTS.likes) +
    (metrics.comments * WEIGHTS.comments) +
    (metrics.reposts * WEIGHTS.reposts);
  
  // Normalize to 0-100 scale
  // These thresholds can be adjusted based on expected engagement levels
  const MIN_SCORE = 0;
  const MAX_SCORE = 5000; // Adjust based on expected maximum weighted score
  
  // Ensure the score is between 0-100
  const normalizedScore = Math.min(100, Math.max(0, 
    Math.round((weightedScore - MIN_SCORE) / (MAX_SCORE - MIN_SCORE) * 100)
  ));
  
  return normalizedScore;
}

/**
 * Calculates average engagement score from multiple submissions
 */
export function calculateAverageEngagementScore(submissions: Array<{metrics: PostMetrics}>): number {
  if (submissions.length === 0) return 0;
  
  const totalScore = submissions.reduce((sum, submission) => {
    return sum + calculateEngagementScore(submission.metrics);
  }, 0);
  
  return Math.round(totalScore / submissions.length);
}

/**
 * Provides textual feedback based on engagement score
 */
export function getEngagementFeedback(score: number): string {
  if (score >= 90) return "Exceptional engagement";
  if (score >= 75) return "High engagement";
  if (score >= 50) return "Good engagement";
  if (score >= 30) return "Moderate engagement";
  return "Low engagement";
}
