
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, LinkIcon, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Campaign } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  contentUrl: z.string().url({
    message: 'Please enter a valid URL to your content',
  }),
  contentPlatform: z.enum(['twitter', 'farcaster', 'lens', 'other']),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CampaignSubmissionFormProps {
  campaign: Campaign;
  onSuccess: () => void;
  onCancel: () => void;
}

const CampaignSubmissionForm = ({
  campaign,
  onSuccess,
  onCancel,
}: CampaignSubmissionFormProps) => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contentUrl: '',
      contentPlatform: 'twitter',
      notes: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    // In a real app, you would send this data to your backend
    console.log('Submission data:', data);
    
    // Simulate success response
    setTimeout(() => {
      toast({
        title: 'Submission successful!',
        description: 'Your content has been submitted for review.',
      });
      onSuccess();
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
          <h3 className="font-medium flex items-center gap-2 text-amber-800">
            <AlertCircle className="h-4 w-4" />
            Submission Requirements
          </h3>
          <div className="mt-2 text-sm text-amber-700 space-y-1">
            {campaign.requiredTags && campaign.requiredTags.length > 0 && (
              <p>
                Your post must include:{' '}
                {campaign.requiredTags.map((tag, i) => (
                  <span key={tag} className="font-medium">
                    {tag}
                    {i < campaign.requiredTags.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            )}
            <p>Make sure your content follows the campaign guidelines before submitting.</p>
          </div>
        </div>

        <FormField
          control={form.control}
          name="contentPlatform"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content Platform</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="twitter">Twitter / X</SelectItem>
                  <SelectItem value="farcaster">Farcaster</SelectItem>
                  <SelectItem value="lens">Lens Protocol</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the platform where you published your content
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contentUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content URL</FormLabel>
              <FormControl>
                <div className="flex">
                  <div className="relative flex-grow">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <LinkIcon className="h-4 w-4" />
                    </div>
                    <Input 
                      placeholder="https://twitter.com/yourusername/status/123456789" 
                      className="pl-10"
                      {...field} 
                    />
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Direct URL to your content (tweet, cast, etc.)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Any additional context you'd like to share" 
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Anything else you'd like to mention about your submission
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Submit Content
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CampaignSubmissionForm;
