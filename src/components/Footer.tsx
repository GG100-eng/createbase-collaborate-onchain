
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative py-16 overflow-hidden border-t border-border">
      <div className="absolute inset-0 bg-noise opacity-5"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1 text-left">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-cool flex items-center justify-center">
                <div className="w-5 h-5 rounded-md bg-white"></div>
              </div>
              <span className="font-bold text-xl">CreatorBase</span>
            </div>
            <p className="text-muted-foreground">
              The onchain platform revolutionizing brand-creator collaborations through transparent, data-driven partnerships.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="#" className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">Github</span>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
            <div>
              <h3 className="font-semibold text-lg mb-4">For Brands</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Create Campaign</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Case Studies</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Brand Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">For Creators</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Find Campaigns</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Creator Guidelines</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Success Stories</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Creator Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 CreatorBase. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
