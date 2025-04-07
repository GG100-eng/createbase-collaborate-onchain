
import React from 'react';
import { 
  DollarSign, 
  Bot, 
  BarChart3, 
  Link, 
  LayoutDashboard 
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <DollarSign className="h-10 w-10" />,
      title: "Transparent Payment System",
      description: "Creators are paid based on verified engagement, and payments are automatically made onchain."
    },
    {
      icon: <Bot className="h-10 w-10" />,
      title: "AI Content Verification",
      description: "AI ensures all posts meet content guidelines, saving brands from manual vetting."
    },
    {
      icon: <BarChart3 className="h-10 w-10" />,
      title: "Engagement-Based Rewards",
      description: "Creators earn prorated rewards based on their posts' social engagement."
    },
    {
      icon: <Link className="h-10 w-10" />,
      title: "Seamless Onchain Transactions",
      description: "All payments are processed securely via the Base blockchain, ensuring a trustless experience."
    },
    {
      icon: <LayoutDashboard className="h-10 w-10" />,
      title: "Easy-to-Use Dashboard",
      description: "Both brands and creators have access to user-friendly dashboards to track performance, payments, and campaign progress."
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Powerful Features
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Everything you need to create successful brand-creator partnerships
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-3 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple w-fit mb-4">
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
