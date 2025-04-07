
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CampaignFeedUpdated from '@/components/creator/CampaignFeedUpdated';
import MySubmissions from '@/components/creator/MySubmissions';
import CreatorStats from '@/components/creator/CreatorStats';
import CreatorHeader from '@/components/creator/CreatorHeader';
import { Card } from '@/components/ui/card';

const CreatorDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <CreatorHeader />
      <main className="container px-4 py-6 md:py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Creator Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your campaigns and track your performance</p>
        </div>
        
        <Card className="bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm border-muted/50 p-1 rounded-xl shadow-sm">
          <Tabs defaultValue="discover" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/50 p-1 rounded-lg">
              <TabsTrigger value="discover" className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all">
                Discover Campaigns
              </TabsTrigger>
              <TabsTrigger value="submissions" className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all">
                My Submissions
              </TabsTrigger>
              <TabsTrigger value="stats" className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all">
                Performance & Payouts
              </TabsTrigger>
            </TabsList>
            
            <div className="p-4">
              <TabsContent value="discover" className="mt-0">
                <CampaignFeedUpdated />
              </TabsContent>
              
              <TabsContent value="submissions" className="mt-0">
                <MySubmissions />
              </TabsContent>
              
              <TabsContent value="stats" className="mt-0">
                <CreatorStats />
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </main>
    </div>
  );
};

export default CreatorDashboard;
