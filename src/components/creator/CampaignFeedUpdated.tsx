
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { mockCampaigns, Campaign } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import CampaignCard from './CampaignCard';
import SubmissionDialog from './SubmissionDialog';

const CampaignFeedUpdated = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [submissionDialogOpen, setSubmissionDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  // Filter campaigns based on search query
  const filteredCampaigns = mockCampaigns.filter(campaign => 
    campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.brief.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Find the featured campaign (Base campaign)
  const baseCampaign = mockCampaigns.find(campaign => campaign.id === "c007");
  
  // Filter out the base campaign from regular campaigns if it exists
  const regularCampaigns = baseCampaign 
    ? filteredCampaigns.filter(campaign => campaign.id !== "c007")
    : filteredCampaigns;

  const handleSubmitClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setSubmissionDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          className="pl-10"
          placeholder="Search campaigns by name, brand, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-8">
        {/* Featured Campaign */}
        {baseCampaign && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Featured Campaign</h2>
            <CampaignCard 
              campaign={baseCampaign} 
              featured={true} 
              onSubmitClick={handleSubmitClick}
            />
          </div>
        )}

        {/* Regular Campaigns */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Active Campaigns</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {regularCampaigns
              .filter(campaign => campaign.status === 'live')
              .map(campaign => (
                <CampaignCard 
                  key={campaign.id} 
                  campaign={campaign} 
                  onSubmitClick={handleSubmitClick} 
                />
              ))}
          </div>
        </div>

        {/* Upcoming Campaigns */}
        {regularCampaigns.some(campaign => campaign.status === 'pending') && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Upcoming Campaigns</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {regularCampaigns
                .filter(campaign => campaign.status === 'pending')
                .map(campaign => (
                  <CampaignCard 
                    key={campaign.id} 
                    campaign={campaign} 
                    onSubmitClick={handleSubmitClick} 
                  />
                ))}
            </div>
          </div>
        )}

        {/* Past Campaigns */}
        {regularCampaigns.some(campaign => campaign.status === 'closed') && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Past Campaigns</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {regularCampaigns
                .filter(campaign => campaign.status === 'closed')
                .map(campaign => (
                  <CampaignCard 
                    key={campaign.id} 
                    campaign={campaign} 
                    onSubmitClick={handleSubmitClick} 
                  />
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Submission Dialog */}
      <SubmissionDialog 
        campaign={selectedCampaign} 
        open={submissionDialogOpen} 
        onOpenChange={setSubmissionDialogOpen} 
      />
    </div>
  );
};

export default CampaignFeedUpdated;
