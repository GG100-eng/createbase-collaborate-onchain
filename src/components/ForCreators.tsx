
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, DollarSign, Shield } from 'lucide-react';

const ForCreators = () => {
  return (
    <section id="for-creators" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-purple to-brand-teal rounded-3xl blur-[60px] opacity-20"></div>
              <div className="relative bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="space-y-6">
                  <div className="p-4 bg-gradient-to-br from-brand-purple/10 to-brand-teal/10 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Creator Dashboard</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Campaigns Joined</span>
                        <span className="font-medium">5</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Active Content</span>
                        <span className="font-medium">3</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Engagement</span>
                        <span className="font-medium">8.2K</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Earnings</span>
                        <span className="font-medium">$427.50</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg mb-2">Available Campaigns</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Summer Fashion</span>
                          <span className="text-sm text-brand-blue">$0.05/view</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Share your favorite summer outfits with #SummerStyle
                        </p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Tech Review</span>
                          <span className="text-sm text-brand-blue">$0.08/view</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Share your honest opinion about our new gadget
                        </p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Foodie Challenge</span>
                          <span className="text-sm text-brand-blue">$0.06/view</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Create content featuring our new snack product
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="inline-block">
              <div className="inline-flex items-center rounded-lg bg-brand-purple/10 px-3 py-1 text-sm font-medium text-brand-purple">
                For Creators
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-tight mt-4 sm:text-4xl md:text-5xl">
              Why Creators Love CreatorBase
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Focus on creating authentic content while we handle the business side of brand collaborations.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm">
                  <Search className="h-6 w-6 text-brand-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Find Meaningful Campaigns</h3>
                  <p className="text-muted-foreground mt-1">
                    Browse opportunities that align with your content style and values. No more reaching out to brands—they come to you.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm">
                  <DollarSign className="h-6 w-6 text-brand-teal" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Guaranteed Payments</h3>
                  <p className="text-muted-foreground mt-1">
                    Get paid securely and automatically for your efforts with our smart contract system. No more chasing payments.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm">
                  <Shield className="h-6 w-6 text-brand-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Transparency & Trust</h3>
                  <p className="text-muted-foreground mt-1">
                    Know exactly what's expected in each campaign, and be confident you'll be paid on time, every time.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button size="lg" className="bg-brand-purple hover:bg-brand-purple/90">Join as a Creator</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForCreators;
