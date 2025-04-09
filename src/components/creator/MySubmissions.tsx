
import React, { useState } from 'react';
import { 
  Eye, 
  ThumbsUp, 
  MessageSquare, 
  Repeat, 
  Award, 
  CheckCircle, 
  Clock, 
  XCircle,
  ExternalLink,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Submission } from '@/lib/mock-data';
import { getEngagementFeedback } from '@/utils/engagementCalculator';
import { fetchSubmissions } from '@/services/submissionService';
import { useQuery } from '@tanstack/react-query';

const MySubmissions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Fetch submissions from the API with refetch enabled
  const { data: submissionsData, isLoading, error, refetch } = useQuery({
    queryKey: ['submissions'],
    queryFn: fetchSubmissions,
    refetchOnWindowFocus: true,
    staleTime: 10000, // Consider data stale after 10 seconds
  });
  
  // If loading or error, handle appropriately
  if (isLoading) return <div className="py-10 text-center">Loading submissions...</div>;
  if (error) return <div className="py-10 text-center text-red-500">Error loading submissions: {error.message}</div>;
  if (!submissionsData) return <div className="py-10 text-center">No submissions found</div>;
  
  // Filter submissions based on search query
  const filteredSubmissions = submissionsData.filter(submission => 
    submission.campaignTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    submission.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Find the Base campaign submission
  const baseCampaignSubmission = filteredSubmissions.find(
    submission => submission.campaignId === "c007"
  );
  
  // Filter out the base campaign from regular submissions if it exists
  const regularSubmissions = baseCampaignSubmission 
    ? filteredSubmissions.filter(submission => submission.campaignId !== "c007")
    : filteredSubmissions;

  const renderSubmissionCard = (submission: Submission) => (
    <Card key={submission.id} className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start flex-wrap gap-2">
          <div>
            <CardTitle className="text-xl">{submission.campaignTitle}</CardTitle>
            <CardDescription>{submission.brand}</CardDescription>
          </div>
          
          <div>
            {submission.status === 'verified' && (
              <Badge className="bg-green-500">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
            {submission.status === 'pending' && (
              <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                <Clock className="h-3 w-3 mr-1" />
                Pending Review
              </Badge>
            )}
            {submission.status === 'rejected' && (
              <Badge variant="outline" className="border-red-500 text-red-500">
                <XCircle className="h-3 w-3 mr-1" />
                Rejected
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium mb-2">Content Link</h4>
            <a 
              href={submission.contentUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary hover:underline"
            >
              {submission.contentPlatform === 'twitter' ? 'Twitter Post' : 
               submission.contentPlatform === 'farcaster' ? 'Farcaster Cast' : 
               'Content Link'}
              <ExternalLink className="h-3 w-3" />
            </a>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Submission Date</h4>
              <p>{new Date(submission.submittedAt).toLocaleDateString()} 
                <span className="text-muted-foreground">
                  ({new Date(submission.submittedAt).toLocaleTimeString()})
                </span>
              </p>
            </div>
            
            {submission.feedback && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Feedback</h4>
                <p className="text-sm border-l-2 border-muted pl-3 py-1">
                  {submission.feedback}
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-muted/30 p-4 rounded-md">
            <h4 className="text-sm font-medium mb-3">Engagement Metrics</h4>
            
            <div className="grid grid-cols-2 gap-y-4">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{submission.metrics.views.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Views</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{submission.metrics.likes.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Likes</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{submission.metrics.comments.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Comments</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Repeat className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{submission.metrics.reposts.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Reposts</p>
                </div>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-amber-500" />
                  <p className="text-sm font-medium">Engagement Score</p>
                </div>
                <p className="font-bold">{submission.metrics.engagementScore}/100</p>
              </div>
              <Progress value={submission.metrics.engagementScore} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {getEngagementFeedback(submission.metrics.engagementScore)}
              </p>
            </div>
            
            {submission.leaderboardPosition && (
              <div className="mt-4 text-center bg-primary/10 p-2 rounded">
                <p className="text-sm">
                  <span className="font-bold">#{submission.leaderboardPosition}</span> on leaderboard
                </p>
              </div>
            )}
          </div>
        </div>
        
        {submission.status === 'verified' && (
          <div className="mt-6 bg-green-500/10 border border-green-200 rounded-md p-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Estimated Payout</h4>
                <p className="text-2xl font-bold">${submission.estimatedPayout.toFixed(2)}</p>
              </div>
              
              {submission.payoutTxHash ? (
                <a 
                  href={`https://etherscan.io/tx/${submission.payoutTxHash}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm flex items-center gap-1"
                >
                  View transaction
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <p className="text-sm text-muted-foreground">Payout pending</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex gap-2 pt-0">
        {submission.status === 'rejected' && (
          <Button variant="outline">Resubmit</Button>
        )}
        <Button variant="ghost">View Campaign Details</Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Content Submissions</h2>
        
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            className="pl-10"
            placeholder="Search submissions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid gap-6">
        {/* Base Campaign Submission (Featured) */}
        {baseCampaignSubmission && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Base Ecosystem Submission</h3>
            {renderSubmissionCard(baseCampaignSubmission)}
          </div>
        )}
        
        {/* Other Submissions */}
        {regularSubmissions.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{baseCampaignSubmission ? 'Other Submissions' : 'All Submissions'}</h3>
            {regularSubmissions.map(renderSubmissionCard)}
          </div>
        )}
        
        {filteredSubmissions.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No submissions found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? 'Try a different search term or' : 'Browse active campaigns and'} submit your content to get started.
            </p>
            <Button>Browse Campaigns</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MySubmissions;
