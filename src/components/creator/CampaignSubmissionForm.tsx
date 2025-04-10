
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
import { 
  submitContent, 
  ValidationResult, 
  ValidationRequirement,
  SubmissionResponse 
} from '@/services/submissionService';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

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
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  
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
    setIsSubmitting(true);
    
    try {
      console.log('Submission started for URL:', data.contentUrl);
      
      // Submit to the API endpoint
      const result = await submitContent(
        campaign.id,
        data.contentUrl,
        data.contentPlatform,
        data.notes
      );
      
      console.log('Submission result:', result);
      
      // If we received a response with validation info
      if (result.validation) {
        setValidationResult(result.validation);
        
        // Check if the submission was successful
        if (result.validation.passed) {
          toast({
            title: "Submission Successful",
            description: "Your content has been submitted and validated successfully!",
          });
          
          // Invalidate the submissions query to refresh the list
          queryClient.invalidateQueries({ queryKey: ['submissions'] });
          
          // Navigate to My Submissions tab after successful submission
          setIsSubmitting(false);
          onSuccess();
          navigate('/creator-dashboard', { state: { defaultTab: 'submissions' } });
        } else {
          // Validation failed
          const errorMessage = result.validation.errors?.join(", ") || 
            "Your content doesn't meet all campaign requirements. Please check the details below.";
            
          toast({
            title: "Validation Failed",
            description: errorMessage,
            variant: "destructive",
          });
          
          setIsSubmitting(false);
        }
      } else {
        // No validation in response, but submission succeeded
        toast({
          title: 'Submission successful!',
          description: 'Your content has been submitted for review.',
        });
        
        // Invalidate the submissions query to refresh the list
        queryClient.invalidateQueries({ queryKey: ['submissions'] });
        
        setIsSubmitting(false);
        onSuccess();
        navigate('/creator-dashboard', { state: { defaultTab: 'submissions' } });
      }
    } catch (error) {
      console.error("Error during submission:", error);
      toast({
        title: "Submission Error",
        description: error instanceof Error ? error.message : "An error occurred while submitting your content. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
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
            {campaign.requiredUrls && campaign.requiredUrls.length > 0 && (
              <p>
                Required URLs:{' '}
                {campaign.requiredUrls.map((url, i) => (
                  <span key={url} className="font-medium">
                    {url}
                    {i < campaign.requiredUrls.length - 1 ? ', ' : ''}
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
                {Object.entries(validationResult.requirements).map(([key, requirement]) => {
                  return (
                    <div key={key} className="flex items-start gap-2">
                      {requirement?.passed ? (
                        <Check className="h-4 w-4 text-green-600 mt-0.5" />
                      ) : (
                        <X className="h-4 w-4 text-red-600 mt-0.5" />
                      )}
                      <div>
                        <span className="font-medium capitalize">{key}</span>
                        {!requirement?.passed && requirement?.missing && requirement.missing.length > 0 && (
                          <span className="block text-xs text-red-600">
                            Missing: {requirement.missing.join(', ')}
                          </span>
                        )}
                        {requirement?.required && requirement.required.length > 0 && (
                          <span className="block text-xs text-slate-600">
                            Required: {requirement.required.join(', ')}
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
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Content'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CampaignSubmissionForm;
