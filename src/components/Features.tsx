
import React from 'react';
import { 
  Coins, 
  Bot, 
  BarChart3, 
  Link as LinkIcon, 
  LayoutDashboard, 
  Shield
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Coins className="h-8 w-8" />,
      title: "Transparent Payment System",
      description: "Creators receive payments based on verified engagement metrics with automatic onchain transactions.",
      color: "from-brand-blue/20 to-brand-blue/10"
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "AI Content Verification",
      description: "Automated AI system ensures all content meets brand guidelines without manual review.",
      color: "from-brand-purple/20 to-brand-purple/10"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Engagement-Based Rewards",
      description: "Prorated rewards system based on actual social engagement and performance metrics.",
      color: "from-brand-teal/20 to-brand-teal/10"
    },
    {
      icon: <LinkIcon className="h-8 w-8" />,
      title: "Seamless Onchain Transactions",
      description: "Secure payment processing via Base blockchain for a trustless collaboration experience.",
      color: "from-brand-rose/20 to-brand-rose/10"
    },
    {
      icon: <LayoutDashboard className="h-8 w-8" />,
      title: "Intuitive Dashboard",
      description: "User-friendly interfaces for tracking campaign performance, payments, and analytics.",
      color: "from-brand-amber/20 to-brand-amber/10"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Creator Score Protection",
      description: "Safeguard your reputation with tamper-proof onchain verification of performance.",
      color: "from-green-500/20 to-green-500/10"
    }
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-5"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Platform Capabilities
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
            Next-Gen Collaboration Features
          </h2>
          <p className="text-xl text-muted-foreground">
            Our platform bridges the gap between creators and brands with innovative technology
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card card-hover group"
            >
              <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} w-fit mb-4 transition-all duration-300 group-hover:scale-110`}>
                <div className="text-foreground">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
              
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-radial from-primary/5 to-transparent rounded-full transform translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
