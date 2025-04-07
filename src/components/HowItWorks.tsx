
import React from 'react';
import { Upload, CheckCircle, DollarSign, Search, Shield, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const HowItWorks = () => {
  const brandsSteps = [
    {
      icon: <Upload className="h-10 w-10 text-brand-blue" />,
      title: "Upload Requirements",
      description: "Brands define specific content requirements—hashtags, phrases, handles, URLs, and rate per view."
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-brand-purple" />,
      title: "AI Evaluation",
      description: "Our AI agent ensures all submissions align with brand guidelines and content quality."
    },
    {
      icon: <DollarSign className="h-10 w-10 text-brand-teal" />,
      title: "Reward Creators",
      description: "Based on engagement, CreatorBase calculates the prorated value earned by each creator and autonomously distributes the payment via Base."
    }
  ];

  const creatorsSteps = [
    {
      icon: <Search className="h-10 w-10 text-brand-blue" />,
      title: "Discover Opportunities",
      description: "Creators browse and select campaigns that match their style and interests."
    },
    {
      icon: <Shield className="h-10 w-10 text-brand-purple" />,
      title: "Proof of Work",
      description: "Creators earn an Onchain Creator Score based on their engagement metrics, published to a smart contract for transparency and credibility."
    },
    {
      icon: <Award className="h-10 w-10 text-brand-teal" />,
      title: "Earn Rewards",
      description: "Get paid based on post engagement, with rewards automatically transferred onchain."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            How CreatorBase Works
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            A streamlined process for both brands and creators
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          {/* For Brands */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-8 bg-brand-blue rounded-full"></div>
              <h3 className="text-2xl font-bold">For Brands</h3>
            </div>
            <div className="space-y-6">
              {brandsSteps.map((step, index) => (
                <Card key={`brand-${index}`} className="border-none shadow-md card-hover">
                  <CardContent className="p-6">
                    <div className="flex gap-4 items-start">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm">
                        {step.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* For Creators */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-8 bg-brand-purple rounded-full"></div>
              <h3 className="text-2xl font-bold">For Creators</h3>
            </div>
            <div className="space-y-6">
              {creatorsSteps.map((step, index) => (
                <Card key={`creator-${index}`} className="border-none shadow-md card-hover">
                  <CardContent className="p-6">
                    <div className="flex gap-4 items-start">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm">
                        {step.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
