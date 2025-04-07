
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-primary mr-2"></div>
            <span className="font-bold text-xl">CreatorBase</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
            How It Works
          </a>
          <a href="#features" className="text-sm font-medium transition-colors hover:text-primary">
            Features
          </a>
          <a href="#for-brands" className="text-sm font-medium transition-colors hover:text-primary">
            For Brands
          </a>
          <a href="#for-creators" className="text-sm font-medium transition-colors hover:text-primary">
            For Creators
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline">Login</Button>
          <Button>Get Started</Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "md:hidden bg-background border-b",
          isMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="container py-4 space-y-4">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#how-it-works" 
              className="text-sm font-medium py-2 transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#features" 
              className="text-sm font-medium py-2 transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#for-brands" 
              className="text-sm font-medium py-2 transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              For Brands
            </a>
            <a 
              href="#for-creators" 
              className="text-sm font-medium py-2 transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              For Creators
            </a>
          </nav>
          <div className="flex flex-col space-y-2">
            <Button variant="outline" className="w-full">Login</Button>
            <Button className="w-full">Get Started</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
