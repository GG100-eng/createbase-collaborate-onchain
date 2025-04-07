
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Clock, DollarSign, Users, Calendar } from 'lucide-react';
import { Campaign } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CampaignCardProps {
  campaign: Campaign;
  featured?: boolean;
  onSubmitClick: (campaign: Campaign) => void;
}

const CampaignCard = ({ campaign, featured = false, onSubmitClick }: CampaignCardProps) => {
  const deadlineDate = new Date(campaign.deadline);
  const isExpired = deadlineDate < new Date();
  const timeRemaining = formatDistanceToNow(deadlineDate, { addSuffix: true });
  
  return (
    <Card className={`overflow-hidden ${featured ? 'border-2 border-primary' : ''}`}>
      {featured && (
        <div className="bg-primary text-primary-foreground text-center py-1 text-xs font-medium">
          FEATURED CAMPAIGN
        </div>
      )}
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="rounded-full overflow-hidden w-10 h-10 bg-muted flex-shrink-0">
            <img 
              src={campaign.brandLogo} 
              alt={campaign.brand} 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <CardDescription className="text-sm">{campaign.brand}</CardDescription>
            <CardTitle className="text-xl leading-tight">{campaign.title}</CardTitle>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {campaign.status === 'live' && (
            <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
              Live
            </Badge>
          )}
          {campaign.status === 'pending' && (
            <Badge variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-50">
              Coming Soon
            </Badge>
          )}
          {campaign.status === 'closed' && (
            <Badge variant="outline" className="border-slate-500 text-slate-500 hover:bg-slate-50">
              Ended
            </Badge>
          )}
          
          <Badge variant="outline" className="gap-1">
            <DollarSign className="h-3 w-3" />
            ${campaign.minReward}-${campaign.maxReward}
          </Badge>
          
          <Badge variant="outline" className="gap-1">
            <Users className="h-3 w-3" />
            {campaign.submissions} submissions
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{campaign.brief}</p>
        
        {campaign.requiredTags && campaign.requiredTags.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-2">Required tags/mentions:</p>
            <div className="flex flex-wrap gap-2">
              {campaign.requiredTags.map(tag => (
                <Badge key={tag} variant="outline" className="bg-muted/50">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between text-sm mt-4">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className={isExpired ? 'text-red-500' : ''}>
              {isExpired ? 'Ended' : timeRemaining}
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {new Date(campaign.deadline).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Payout model:</p>
          <p className="text-sm font-medium">
            {campaign.payoutModel === 'fixed' ? 'Fixed Reward' : 
             campaign.payoutModel === 'engagement' ? 'Based on Engagement' : 
             'Hybrid (Fixed + Engagement)'}
          </p>
        </div>
        
        <Button 
          onClick={() => onSubmitClick(campaign)}
          disabled={campaign.status !== 'live'}
        >
          {campaign.status === 'live' ? 'Submit Content' : 
           campaign.status === 'pending' ? 'Coming Soon' : 'Campaign Ended'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CampaignCard;
