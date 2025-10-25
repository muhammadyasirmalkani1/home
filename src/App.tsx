import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

// Components
import Navigation from "@/components/Navigation";
import ThemeSwitcher from "@/components/ThemeSwitcher";

// Pages
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Property Detail Pages
import PropertyDetail from "./pages/properties/PropertyDetail";
import Villas from "./pages/properties/Villas";
import SmartHomes from "./pages/properties/SmartHomes";
import Waterfront from "./pages/properties/Waterfront";

// Service Pages
import Buying from "./pages/services/Buying";
import Selling from "./pages/services/Selling";
import Consultation from "./pages/services/Consultation";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Global styles and animations
const GlobalStyles = () => {
  useEffect(() => {
    // Inject global styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
      @keyframes float-delayed {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-30px) rotate(-180deg); }
      }
      @keyframes float-slow {
        0%, 100% { transform: translateY(0px) scale(1); }
        50% { transform: translateY(-10px) scale(1.1); }
      }
      @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      .animate-float { animation: float 6s ease-in-out infinite; }
      .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
      .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
      .animate-gradient { 
        background-size: 200% 200%;
        animation: gradient 3s ease infinite; 
      }
      .animate-shimmer {
        animation: shimmer 2s infinite;
      }
      .glass-card {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      .text-shadow {
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      }
      
      /* Smooth scrolling */
      html {
        scroll-behavior: smooth;
      }
      
      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
      }
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #22d3ee, #3b82f6);
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(to bottom, #06b6d4, #2563eb);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <GlobalStyles />
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
          <Navigation />
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Property Detail Routes */}
            <Route path="/properties/villas" element={<Villas />} />
            <Route path="/properties/smart" element={<SmartHomes />} />
            <Route path="/properties/waterfront" element={<Waterfront />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />

            {/* Service Detail Routes */}
            <Route path="/services/buying" element={<Buying />} />
            <Route path="/services/selling" element={<Selling />} />
            <Route path="/services/consultation" element={<Consultation />} />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;