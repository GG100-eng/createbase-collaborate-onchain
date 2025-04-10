import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Award, 
  CheckCircle, 
  Clock,
  XCircle
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { calculateAverageEngagementScore } from '@/utils/engagementCalculator';
import { fetchSubmissions } from '@/services/submissionService';
import { useQuery } from '@tanstack/react-query';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Bar
} from 'recharts';

const performanceData = [
  { date: '04/01', engagementScore: 45, payout: 80 },
  { date: '04/08', engagementScore: 52, payout: 120 },
  { date: '04/15', engagementScore: 48, payout: 100 },
  { date: '04/22', engagementScore: 70, payout: 240 },
  { date: '04/29', engagementScore: 65, payout: 200 },
  { date: '05/06', engagementScore: 78, payout: 320 },
];

const engagementBreakdown = [
  { name: 'Views', value: 15500 },
  { name: 'Likes', value: 827 },
  { name: 'Comments', value: 249 },
  { name: 'Reposts', value: 152 },
];

const CreatorStats = () => {
  // Fetch submissions from the API
  const { data: submissionsData, isLoading, error } = useQuery({
    queryKey: ['submissions'],
    queryFn: fetchSubmissions,
  });
  
  // If loading or error, handle appropriately
  if (isLoading) return <div className="py-10 text-center">Loading stats...</div>;
  if (error) return <div className="py-10 text-center text-red-500">Error loading stats: {error instanceof Error ? error.message : 'Unknown error'}</div>;
  if (!submissionsData || submissionsData.length === 0) {
    return <div className="py-10 text-center">No submission data available to display stats</div>;
  }
  
  // Calculate total submissions
  const totalSubmissions = submissionsData.length;
  
  // Calculate verified submissions
  const verifiedSubmissions = submissionsData.filter(sub => sub.status === 'verified').length;
  
  // Calculate pending submissions
  const pendingSubmissions = submissionsData.filter(sub => sub.status === 'pending').length;
  
  // Calculate rejected submissions
  const rejectedSubmissions = submissionsData.filter(sub => sub.status === 'rejected').length;
  
  // Calculate total payouts
  const totalPayouts = submissionsData.reduce((sum, sub) => sum + (sub.estimatedPayout || 0), 0);
  
  // Get average engagement score from all submissions
  const averageEngagementScore = calculateAverageEngagementScore(submissionsData);
  
  // Create engagement data for chart based on actual metrics
  const calculatedEngagementBreakdown = [
    { 
      name: 'Views', 
      value: submissionsData.reduce((sum, sub) => sum + (sub.metrics?.views || 0), 0) 
    },
    { 
      name: 'Likes', 
      value: submissionsData.reduce((sum, sub) => sum + (sub.metrics?.likes || 0), 0) 
    },
    { 
      name: 'Comments', 
      value: submissionsData.reduce((sum, sub) => sum + (sub.metrics?.comments || 0), 0) 
    },
    { 
      name: 'Reposts', 
      value: submissionsData.reduce((sum, sub) => sum + (sub.metrics?.reposts || 0), 0) 
    },
  ];
  
  // Calculate performance data based on submissions grouped by date
  const submissionsByDate = submissionsData.reduce((acc, submission) => {
    // Format date to MM/DD
    const date = new Date(submission.submittedAt).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit'
    });
    
    if (!acc[date]) {
      acc[date] = {
        submissions: [],
        totalScore: 0,
        payout: 0
      };
    }
    
    acc[date].submissions.push(submission);
    acc[date].totalScore += (submission.metrics?.engagementScore || 0);
    acc[date].payout += (submission.estimatedPayout || 0);
    
    return acc;
  }, {} as Record<string, { submissions: typeof submissionsData, totalScore: number, payout: number }>);
  
  // Transform grouped data into chart format
  const calculatedPerformanceData = Object.entries(submissionsByDate).map(([date, data]) => {
    const avgScore = data.submissions.length > 0 
      ? Math.round(data.totalScore / data.submissions.length)
      : 0;
      
    return {
      date,
      engagementScore: avgScore,
      payout: data.payout
    };
  }).sort((a, b) => {
    // Sort by date (MM/DD format)
    const [aMonth, aDay] = a.date.split('/').map(Number);
    const [bMonth, bDay] = b.date.split('/').map(Number);
    
    if (aMonth !== bMonth) return aMonth - bMonth;
    return aDay - bDay;
  });
  
  // Use calculated performance data if available, otherwise use mock data
  const chartPerformanceData = calculatedPerformanceData.length > 0 
    ? calculatedPerformanceData 
    : performanceData;
  
  // Use calculated engagement breakdown if available, otherwise use mock data
  const chartEngagementBreakdown = calculatedEngagementBreakdown.some(item => item.value > 0)
    ? calculatedEngagementBreakdown
    : engagementBreakdown;
  
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Performance & Payouts</h2>
      
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Submissions</CardDescription>
            <CardTitle className="text-3xl">{totalSubmissions}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                {verifiedSubmissions} Verified
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-yellow-500" />
                {pendingSubmissions} Pending
              </span>
              <span className="flex items-center gap-1">
                <XCircle className="h-3 w-3 text-red-500" />
                {rejectedSubmissions} Rejected
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg. Engagement Score</CardDescription>
            <CardTitle className="text-3xl">{averageEngagementScore}/100</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              Based on submission metrics
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Earned</CardDescription>
            <CardTitle className="text-3xl">${totalPayouts.toFixed(2)}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <DollarSign className="h-3 w-3 text-green-500" />
              ${totalPayouts > 0 ? (totalPayouts / totalSubmissions).toFixed(2) : 0} per submission
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Top Leaderboard Position</CardDescription>
            <CardTitle className="text-3xl">#3</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Award className="h-3 w-3 text-amber-500" />
              DeFi Success Story Campaign
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Over Time</CardTitle>
            <CardDescription>
              Tracking your engagement scores and earnings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartPerformanceData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPayout" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <Tooltip />
                  <Legend />
                  <Area 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="engagementScore" 
                    stroke="#3B82F6" 
                    fillOpacity={1}
                    fill="url(#colorScore)" 
                    name="Engagement Score"
                  />
                  <Area 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="payout" 
                    stroke="#8B5CF6" 
                    fillOpacity={1}
                    fill="url(#colorPayout)" 
                    name="Payout ($)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Engagement Breakdown</CardTitle>
            <CardDescription>
              Metrics across all your submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartEngagementBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8B5CF6" name="Count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Payouts</CardTitle>
            <CardDescription>
              Your most recent campaign payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>DeFi Success Story</TableCell>
                  <TableCell>Apr 28, 2025</TableCell>
                  <TableCell>$320</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-green-500 text-green-500">Paid</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Onchain Gaming</TableCell>
                  <TableCell>Apr 15, 2025</TableCell>
                  <TableCell>$145</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-yellow-500 text-yellow-500">Pending</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Wallet Security</TableCell>
                  <TableCell>Apr 3, 2025</TableCell>
                  <TableCell>$200</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-green-500 text-green-500">Paid</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm">View All Transactions</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatorStats;
