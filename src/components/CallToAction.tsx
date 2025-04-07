
import React from 'react';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-5"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-brand-purple opacity-90"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxwYXRoIGQ9Ik0gMCAxMCBMIDIwIDEwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')] opacity-20"></div>
          <div className="relative p-8 md:p-12 lg:py-20 lg:px-16 text-left">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="w-full md:w-3/5">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white">
                  Ready to transform your creator collaborations?
                </h2>
                <p className="mt-6 text-xl opacity-90 text-white max-w-2xl">
                  Join CreatorBase today and experience the future of onchain brand-creator partnerships with transparent, efficient collaborations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button size="lg" className="bg-white text-brand-blue hover:bg-white/90 rounded-full px-8">
                    Get Started
                  </Button>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 rounded-full px-8">
                    Schedule Demo
                  </Button>
                </div>
              </div>
              <div className="w-full md:w-2/5">
                <div className="glass rounded-2xl p-6 transform rotate-3 floating">
                  <div className="bg-brand-blue/20 p-4 rounded-xl mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Creator Score</span>
                      <span className="text-white font-bold">92/100</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div className="bg-white h-full rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-white/80 text-sm">Verified Onchain</span>
                  </div>
                  <div className="text-xs font-mono text-white/50 truncate">
                    0x73f7...6e29
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

export default CallToAction;
