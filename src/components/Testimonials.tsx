
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "CreatorBase transformed the way we run influencer campaigns. The process is seamless, and the results speak for themselves.",
      author: "Sarah Johnson",
      role: "Marketing Director",
      company: "StyleTech",
      type: "brand"
    },
    {
      quote: "As a creator, I've never experienced such transparency in payment and content requirements. It's a game-changer.",
      author: "Michael Chen",
      role: "Content Creator",
      handle: "@mikevisuals",
      type: "creator"
    },
    {
      quote: "We've been able to connect with creators who truly understand our brand voice. The AI verification saves us so much time.",
      author: "Emma Williams",
      role: "Brand Manager",
      company: "EcoLifestyle",
      type: "brand"
    },
    {
      quote: "Getting paid based on my actual engagement is fantastic. I focus on creating quality content, and the platform handles the rest.",
      author: "David Rodriguez",
      role: "Lifestyle Influencer",
      handle: "@david_creates",
      type: "creator"
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            What Our Users Are Saying
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Don't just take our word for it—hear from the brands and creators using CreatorBase
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mt-12">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="border-none shadow-md h-full"
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-lg mb-4 flex-grow">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center mt-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white font-medium text-lg">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.type === 'brand' 
                        ? `${testimonial.role}, ${testimonial.company}`
                        : `${testimonial.role}, ${testimonial.handle}`
                      }
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
