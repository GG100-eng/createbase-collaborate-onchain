
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CampaignFeedUpdated from '@/components/creator/CampaignFeedUpdated';
import MySubmissions from '@/components/creator/MySubmissions';
import CreatorStats from '@/components/creator/CreatorStats';
import CreatorHeader from '@/components/creator/CreatorHeader';
import { useLocation, useNavigate } from 'react-router-dom';

const CreatorDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const defaultTab = location.state?.defaultTab || 'submissions';
  
  const handleTabChange = (value: string) => {
    navigate('/creator-dashboard', { state: { defaultTab: value } });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <CreatorHeader />
      <main className="container px-4 py-6 md:py-10">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Creator Dashboard</h1>
        
        <Tabs defaultValue={defaultTab} className="w-full" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="discover">Discover Campaigns</TabsTrigger>
            <TabsTrigger value="submissions">My Submissions</TabsTrigger>
            <TabsTrigger value="stats">Performance & Payouts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="discover" className="mt-0">
            <CampaignFeedUpdated />
          </TabsContent>
          
          <TabsContent value="submissions" className="mt-0">
            <MySubmissions />
          </TabsContent>
          
          <TabsContent value="stats" className="mt-0">
            <CreatorStats />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CreatorDashboard;
