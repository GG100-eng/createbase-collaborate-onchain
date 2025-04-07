
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Campaign } from '@/lib/mock-data';
import CampaignSubmissionForm from './CampaignSubmissionForm';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface SubmissionDialogProps {
  campaign: Campaign | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SubmissionDialog = ({ campaign, open, onOpenChange }: SubmissionDialogProps) => {
  const handleSuccess = () => {
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  if (!campaign) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-gradient-to-tr from-background to-muted/50 backdrop-blur-sm border-muted">
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-xl overflow-hidden shadow-lg border-4 border-background">
          <AspectRatio ratio={1/1}>
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              {campaign.logo ? (
                <img 
                  src={campaign.logo} 
                  alt={`${campaign.brand} logo`} 
                  className="w-16 h-16 object-contain"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold text-primary">
                  {campaign.brand.charAt(0)}
                </div>
              )}
            </div>
          </AspectRatio>
        </div>
        
        <DialogHeader className="pt-10">
          <DialogTitle className="text-center text-2xl font-bold">Submit Content</DialogTitle>
          <DialogDescription className="text-center max-w-md mx-auto">
            Please provide the URL to your published content for "{campaign.title}" campaign by {campaign.brand}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-2 p-4 bg-card/50 rounded-lg border border-border/50">
          <div className="mb-4">
            <h3 className="font-medium text-sm text-muted-foreground mb-1">Campaign Brief:</h3>
            <p className="text-sm">{campaign.brief}</p>
          </div>
          
          {campaign.requirements && (
            <div className="mb-4">
              <h3 className="font-medium text-sm text-muted-foreground mb-1">Requirements:</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                {campaign.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <CampaignSubmissionForm 
          campaign={campaign} 
          onSuccess={handleSuccess} 
          onCancel={handleCancel} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionDialog;
