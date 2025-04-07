
import React from 'react';
import { Upload, CheckCircle, DollarSign, Search, Shield, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gradient-to-br from-white via-muted/30 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-3">
            <span className="relative pb-2 section-title">How CreatorBase Works</span>
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            A streamlined process for both brands and creators
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          {/* For Brands */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-brand-blue to-brand-purple rounded-full"></div>
              <h3 className="text-2xl font-bold">For Brands</h3>
            </div>
            <motion.div className="space-y-6" variants={container}>
              {brandsSteps.map((step, index) => (
                <motion.div key={`brand-${index}`} variants={item}>
                  <Card className="border-none card-gradient overflow-hidden animated-border-gradient">
                    <CardContent className="p-6">
                      <div className="flex gap-4 items-start">
                        <div className="icon-container">
                          {step.icon}
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* For Creators */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-brand-purple to-brand-teal rounded-full"></div>
              <h3 className="text-2xl font-bold">For Creators</h3>
            </div>
            <motion.div className="space-y-6" variants={container}>
              {creatorsSteps.map((step, index) => (
                <motion.div key={`creator-${index}`} variants={item}>
                  <Card className="border-none card-gradient overflow-hidden animated-border-gradient">
                    <CardContent className="p-6">
                      <div className="flex gap-4 items-start">
                        <div className="icon-container">
                          {step.icon}
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
