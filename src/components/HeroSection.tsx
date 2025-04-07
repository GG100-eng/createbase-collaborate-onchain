
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, Shield, Zap } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col gap-4">
            <div className="inline-block">
              <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
                🚀 Onchain Creator Collaborations
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Drive Genuine Conversations. <span className="gradient-text">Reward Creators.</span> Boost Brand Impact.
            </h1>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              An onchain platform where brands meet creators for transparent, rewarding, and impactful collaborations.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="gap-1">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="gap-1">
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] aspect-square">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-[100px] opacity-20"></div>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 animate-fade-in [animation-delay:0.2s] opacity-0">
                      <MessageSquare className="w-8 h-8 text-brand-blue mb-2" />
                      <h3 className="font-medium text-lg">Authentic Content</h3>
                      <p className="text-muted-foreground text-sm">Genuine creator conversations that resonate with audiences</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 animate-fade-in [animation-delay:0.6s] opacity-0">
                      <Zap className="w-8 h-8 text-brand-purple mb-2" />
                      <h3 className="font-medium text-lg">Automatic Payments</h3>
                      <p className="text-muted-foreground text-sm">Onchain rewards based on verified engagement</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 mt-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 animate-fade-in [animation-delay:0.4s] opacity-0">
                      <Shield className="w-8 h-8 text-brand-teal mb-2" />
                      <h3 className="font-medium text-lg">AI Verification</h3>
                      <p className="text-muted-foreground text-sm">Smart content verification for brand alignment</p>
                    </div>
                    <div className="bg-gradient-primary text-white rounded-xl shadow-lg p-4 animate-fade-in [animation-delay:0.8s] opacity-0">
                      <h3 className="font-medium text-lg">CreatorBase</h3>
                      <p className="text-sm opacity-90">Next-gen collaboration platform for brands and creators</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-24 text-center">
          <h2 className="text-xl md:text-2xl font-medium mb-6">A next-gen onchain platform reimagining brand-creator partnerships</h2>
          <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
            CreatorBase is where brands drive conversations through social media, while creators get rewarded for producing authentic, brand-aligned content. Brands can easily upload their content requirements, rate per view, and let creators discover and fulfill those requirements. AI ensures submissions are on-brand, engagement is tracked, and payments are automatically processed onchain.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
