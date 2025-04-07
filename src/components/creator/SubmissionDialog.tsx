
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
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submit Content for {campaign.title}</DialogTitle>
          <DialogDescription>
            Please provide the URL to your published content related to this campaign.
          </DialogDescription>
        </DialogHeader>
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
