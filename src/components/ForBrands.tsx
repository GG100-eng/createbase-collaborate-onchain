
import React from 'react';
import { Button } from '@/components/ui/button';
import { UsersRound, Zap, LineChart } from 'lucide-react';

const ForBrands = () => {
  return (
    <section id="for-brands" className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <div className="inline-block">
              <div className="inline-flex items-center rounded-lg bg-brand-blue/10 px-3 py-1 text-sm font-medium text-brand-blue">
                For Brands
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-tight mt-4 sm:text-4xl md:text-5xl">
              Why Brands Choose CreatorBase
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Streamline your creator collaborations and maximize ROI with our powerful platform.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm">
                  <UsersRound className="h-6 w-6 text-brand-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Effortless Creator Collaboration</h3>
                  <p className="text-muted-foreground mt-1">
                    Easily upload your content requirements and rate per view. Connect with creators who are passionate and aligned with your brand values.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm">
                  <Zap className="h-6 w-6 text-brand-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">AI-Powered Verification</h3>
                  <p className="text-muted-foreground mt-1">
                    Our AI agent automatically checks submissions to ensure your brand messaging is met, saving you countless hours of manual review.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm">
                  <LineChart className="h-6 w-6 text-brand-teal" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Guaranteed ROI</h3>
                  <p className="text-muted-foreground mt-1">
                    Track engagement and results with full transparency and access to real-time metrics. Only pay for actual engagement.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <Button size="lg">Start Campaign</Button>
              <Button variant="outline" size="lg">Request a Demo</Button>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-[60px] opacity-20"></div>
              <div className="relative bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="space-y-6">
                  <div className="p-4 bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Campaign Dashboard</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Active Campaigns</span>
                        <span className="font-medium">3</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Creator Applications</span>
                        <span className="font-medium">24</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Content Pieces</span>
                        <span className="font-medium">18</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Engagement</span>
                        <span className="font-medium">12.4K</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg mb-2">Latest Creator Submissions</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-muted rounded-lg flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-brand-blue/20 rounded-full"></div>
                          <span className="font-medium">@creator1</span>
                        </div>
                        <span className="text-sm text-green-500">Approved</span>
                      </div>
                      <div className="p-3 bg-muted rounded-lg flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-brand-purple/20 rounded-full"></div>
                          <span className="font-medium">@creator2</span>
                        </div>
                        <span className="text-sm text-amber-500">Pending</span>
                      </div>
                      <div className="p-3 bg-muted rounded-lg flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-brand-teal/20 rounded-full"></div>
                          <span className="font-medium">@creator3</span>
                        </div>
                        <span className="text-sm text-green-500">Approved</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForBrands;
