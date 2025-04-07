
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Clock,
  DollarSign,
  Tag,
  BadgeCheck
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { mockCampaigns } from '@/lib/mock-data';

const CampaignFeed = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortOption, setSortOption] = useState('deadline');
  
  // Filter campaigns based on search and filters
  const filteredCampaigns = mockCampaigns.filter(campaign => {
    // Filter by search term
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         campaign.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const matchesStatus = filterStatus === 'all' ? true : campaign.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  // Sort campaigns
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (sortOption === 'deadline') {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    } else if (sortOption === 'reward') {
      return b.maxReward - a.maxReward;
    } else {
      return 0;
    }
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search campaigns by name or brand..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              <SelectItem value="live">Live</SelectItem>
              <SelectItem value="pending">Pending Review</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[150px]">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="deadline">Deadline</SelectItem>
              <SelectItem value="reward">Reward</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedCampaigns.map((campaign) => (
          <Card key={campaign.id} className="transition-all hover:shadow-md">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded overflow-hidden bg-muted flex items-center justify-center">
                    <img 
                      src={campaign.brandLogo} 
                      alt={campaign.brand} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/40';
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{campaign.brand}</p>
                  </div>
                </div>
                
                {campaign.status === 'live' && (
                  <Badge variant="default" className="bg-green-500">Live</Badge>
                )}
                {campaign.status === 'pending' && (
                  <Badge variant="outline" className="text-yellow-500 border-yellow-500">Pending</Badge>
                )}
                {campaign.status === 'closed' && (
                  <Badge variant="outline" className="text-red-500 border-red-500">Closed</Badge>
                )}
              </div>
              
              <CardTitle className="text-xl mt-2">{campaign.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {campaign.brief}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pb-4">
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>${campaign.minReward}-${campaign.maxReward}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(campaign.deadline).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center gap-1 col-span-2 mt-1">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-wrap gap-1">
                    {campaign.requiredTags.map((tag, i) => (
                      <span key={i} className="text-xs bg-muted rounded px-1.5 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <Separator className="my-3" />
              
              <div className="text-sm flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <BadgeCheck className="h-4 w-4 text-primary" />
                  <span>{campaign.submissions} submissions</span>
                </div>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-sm">${campaign.budgetRemaining} remaining</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Campaign budget remaining</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button className="w-full">View Campaign</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {sortedCampaigns.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No campaigns found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find campaigns.
          </p>
        </div>
      )}
    </div>
  );
};

export default CampaignFeed;
