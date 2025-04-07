
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home,
  Bell, 
  Settings, 
  MessageSquare,
  User
} from 'lucide-react';

const CreatorHeader = () => {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl">CreatorBase</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/creator-dashboard" className="text-foreground/80 hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link to="/campaigns" className="text-foreground/60 hover:text-foreground transition-colors">
              Campaigns
            </Link>
            <Link to="/analytics" className="text-foreground/60 hover:text-foreground transition-colors">
              Analytics
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
          <Button variant="outline" asChild className="hidden md:flex gap-2">
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default CreatorHeader;
