
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import ForBrands from '@/components/ForBrands';
import ForCreators from '@/components/ForCreators';
import CollaborationBenefits from '@/components/CollaborationBenefits';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <HowItWorks />
        <Features />
        <ForBrands />
        <ForCreators />
        <CollaborationBenefits />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
