
/**
 * Types for post metrics including engagement scores
 */

export interface PostMetrics {
  views: number;
  likes: number;
  comments: number;
  reposts: number;
  engagementScore?: number;
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

/**
 * Calculates average engagement score from multiple submissions
 */
export function calculateAverageEngagementScore(submissions: Array<{metrics: PostMetrics}>): number {
  if (submissions.length === 0) return 0;
  
  const totalScore = submissions.reduce((sum, submission) => {
    return sum + (submission.metrics.engagementScore || 0);
  }, 0);
  
  return Math.round(totalScore / submissions.length);
}
