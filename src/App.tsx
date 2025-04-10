
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CreatorDashboard from "./pages/CreatorDashboard";
import { mockSubmissions } from "./lib/mock-data";

const queryClient = new QueryClient();

// Mock API handler
if (typeof window !== 'undefined') {
  const originalFetch = window.fetch;
  window.fetch = async function(input, init) {
    const url = input.toString();
    
    // Handle submissions API endpoint
    if (url.includes('/api/submissions') && !url.includes('/api/submissions/')) {
      console.log('Intercepting API call to /api/submissions');
      return new Response(JSON.stringify(mockSubmissions), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Handle single submission API endpoint
    if (url.match(/\/api\/submissions\/[a-zA-Z0-9]+/)) {
      const id = url.split('/').pop()?.split('?')[0];
      console.log(`Intercepting API call to /api/submissions/${id}`);
      const submission = mockSubmissions.find(s => s.id === id);
      
      if (submission) {
        return new Response(JSON.stringify(submission), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      return new Response(JSON.stringify({ error: 'Submission not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Pass through other requests
    return originalFetch(input, init);
  };
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/creator-dashboard" replace state={{ defaultTab: 'submissions' }} />} />
          <Route path="/creator-dashboard" element={<CreatorDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
