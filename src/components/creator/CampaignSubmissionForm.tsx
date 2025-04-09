
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, LinkIcon, AlertCircle, Check, X } from 'lucide-react';

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
import { twitterCheckerService, TweetValidationResult } from '@/services/twitterCheckerService';

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
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<TweetValidationResult | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contentUrl: '',
      contentPlatform: 'twitter',
      notes: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    // Reset previous validation results
    setValidationResult(null);
    
    // If it's a Twitter URL, validate it
    if (data.contentPlatform === 'twitter') {
      setIsValidating(true);
      
      try {
        console.log('Submission started for URL:', data.contentUrl);
        
        // First check if the URL format is valid
        const urlCheck = await twitterCheckerService.checkTweetUrl(data.contentUrl);
        console.log('URL check complete:', urlCheck);
        
        if (!urlCheck.valid) {
          toast({
            title: "Invalid Tweet URL",
            description: "Please provide a valid Twitter/X URL.",
            variant: "destructive",
          });
          setIsValidating(false);
          return;
        }
        
        // Prepare requirements based on campaign data
        const requirements = {
          hashtags: campaign.requiredTags || [],
          mentions: campaign.requiredMentions || [],
          topics: campaign.requiredTopics || []
        };
        
        console.log('Validating with these requirements:', requirements);
        
        // Validate tweet against requirements
        const validation = await twitterCheckerService.validateTweet(
          data.contentUrl, 
          requirements
        );
        
        console.log('Validation complete. Result:', validation);
        setValidationResult(validation);
        
        // Force the validation result to be displayed even if there's an issue with the response format
        if (!validation || typeof validation !== 'object') {
          console.error('Invalid validation response format:', validation);
          toast({
            title: "Validation Error",
            description: "Received invalid response format from validation service.",
            variant: "destructive",
          });
          setIsValidating(false);
          return;
        }
        
        // If validation failed, stop and show errors
        if (!validation.success || validation.passed === false) {
          const errorMessage = validation.errors?.join(", ") || 
            "Your tweet doesn't meet all campaign requirements.";
            
          toast({
            title: "Tweet Validation Failed",
            description: errorMessage,
            variant: "destructive",
          });
          
          setIsValidating(false);
          return;
        }
        
        // If validation passed, show success message
        toast({
          title: "Tweet Validation Successful",
          description: "Your content has been validated and meets all requirements!",
        });
        
        // Continue with submission process
        console.log('Validation passed, continuing with submission');
      } catch (error) {
        console.error("Error during tweet validation:", error);
        toast({
          title: "Validation Error",
          description: "An error occurred while validating your content. Please try again.",
          variant: "destructive",
        });
        setIsValidating(false);
        return;
      }
    }
    
    // In a real app, you would send this data to your backend
    console.log('Submission data:', data);
    
    // Simulate success response
    setTimeout(() => {
      toast({
        title: 'Submission successful!',
        description: 'Your content has been submitted for review.',
      });
      setIsValidating(false);
      onSuccess();
    }, 1000);
  };
  
  // Platform-specific label for content URL
  const getUrlFieldLabel = () => {
    switch (form.watch('contentPlatform')) {
      case 'twitter': return 'Tweet URL';
      case 'farcaster': return 'Cast URL';
      case 'lens': return 'Lens Post URL';
      default: return 'Content URL';
    }
  };

  // Platform-specific placeholder for content URL
  const getUrlFieldPlaceholder = () => {
    switch (form.watch('contentPlatform')) {
      case 'twitter': return 'https://twitter.com/username/status/123456789';
      case 'farcaster': return 'https://warpcast.com/username/0x123456789';
      case 'lens': return 'https://hey.xyz/posts/0x123456789';
      default: return 'https://example.com/your-content';
    }
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
                Required hashtags:{' '}
                {campaign.requiredTags.map((tag, i) => (
                  <span key={tag} className="font-medium">
                    {tag}
                    {i < campaign.requiredTags.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            )}
            {campaign.requiredMentions && campaign.requiredMentions.length > 0 && (
              <p>
                Required mentions:{' '}
                {campaign.requiredMentions.map((mention, i) => (
                  <span key={mention} className="font-medium">
                    {mention}
                    {i < campaign.requiredMentions.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            )}
            {campaign.requiredTopics && campaign.requiredTopics.length > 0 && (
              <p>
                Required topics:{' '}
                {campaign.requiredTopics.map((topic, i) => (
                  <span key={topic} className="font-medium">
                    {topic}
                    {i < campaign.requiredTopics.length - 1 ? ', ' : ''}
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
              <FormLabel>{getUrlFieldLabel()}</FormLabel>
              <FormControl>
                <div className="flex">
                  <div className="relative flex-grow">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <LinkIcon className="h-4 w-4" />
                    </div>
                    <Input 
                      placeholder={getUrlFieldPlaceholder()} 
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

        {/* Validation Result Display */}
        {validationResult && (
          <div className={`p-4 my-4 rounded-md ${
            validationResult.passed ? 'bg-green-50 border border-green-200' : 
            'bg-red-50 border border-red-200'
          }`}>
            <h3 className="font-medium flex items-center gap-2 mb-2">
              {validationResult.passed ? (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-green-800">Validation Passed</span>
                </>
              ) : (
                <>
                  <X className="h-4 w-4 text-red-600" />
                  <span className="text-red-800">Validation Failed</span>
                </>
              )}
            </h3>
            
            {validationResult.requirements && (
              <div className="space-y-2 text-sm">
                {Object.entries(validationResult.requirements).map(([key, value]) => {
                  // Skip if value is not an object or doesn't have passed property
                  if (!value || typeof value !== 'object' || typeof value.passed === 'undefined') {
                    console.log('Skipping invalid requirement:', key, value);
                    return null;
                  }
                  
                  return (
                    <div key={key} className="flex items-start gap-2">
                      {value.passed ? (
                        <Check className="h-4 w-4 text-green-600 mt-0.5" />
                      ) : (
                        <X className="h-4 w-4 text-red-600 mt-0.5" />
                      )}
                      <div>
                        <span className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        {!value.passed && value.missing?.length > 0 && (
                          <span className="block text-xs text-red-600">
                            Missing: {value.missing.join(', ')}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
            {validationResult.errors?.length > 0 && (
              <div className="mt-2 text-sm text-red-600">
                <span className="font-medium">Errors:</span>
                <ul className="list-disc pl-4 mt-1">
                  {validationResult.errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

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
          <Button type="submit" disabled={isValidating}>
            {isValidating ? 'Validating...' : 'Submit Content'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CampaignSubmissionForm;
