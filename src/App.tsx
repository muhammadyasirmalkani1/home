// App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Experience from "./pages/Experience";
import Education from "./pages/Education";
import Gallery from "./pages/Gallery";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Skills Detail Pages
import FiveYearsExperience from "./pages/skills/FiveYearsExperience";
import QuickLearner from "./pages/skills/QuickLearner";
import FullStackExpertise from "./pages/skills/FullStackExpertise";

// Technology Pages
import GraphQLPage from "./pages/skills/GraphQLPage";
import SocketIOPage from "./pages/skills/SocketIOPage";
import StripePage from "./pages/skills/StripePage";
import FirebasePage from "./pages/skills/FirebasePage";
import SupabasePage from "./pages/skills/SupabasePage";
import JestPage from "./pages/skills/JestPage";
import CypressPage from "./pages/skills/CypressPage";
import WebpackPage from "./pages/skills/WebpackPage";
import VitePage from "./pages/skills/VitePage";
import PrismaPage from "./pages/skills/PrismaPage";
import TerraformPage from "./pages/skills/TerraformPage";
import KubernetesPage from "./pages/skills/KubernetesPage";
import JenkinsPage from "./pages/skills/JenkinsPage";
import NginxPage from "./pages/skills/NginxPage";
import ElasticSearchPage from "./pages/skills/ElasticSearchPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/education" element={<Education />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />

          {/* Skills Detail Routes */}
          <Route path="/skills/5-years-experience" element={<FiveYearsExperience />} />
          <Route path="/skills/quick-learner" element={<QuickLearner />} />
          <Route path="/skills/full-stack-expertise" element={<FullStackExpertise />} />

          {/* Technology Detail Routes */}
          <Route path="/skills/graphql" element={<GraphQLPage />} />
          <Route path="/skills/socket-io" element={<SocketIOPage />} />
          <Route path="/skills/stripe-api" element={<StripePage />} />
          <Route path="/skills/firebase" element={<FirebasePage />} />
          <Route path="/skills/supabase" element={<SupabasePage />} />
          <Route path="/skills/jest" element={<JestPage />} />
          <Route path="/skills/cypress" element={<CypressPage />} />
          <Route path="/skills/webpack" element={<WebpackPage />} />
          <Route path="/skills/vite" element={<VitePage />} />
          <Route path="/skills/prisma" element={<PrismaPage />} />
          <Route path="/skills/terraform" element={<TerraformPage />} />
          <Route path="/skills/kubernetes" element={<KubernetesPage />} />
          <Route path="/skills/jenkins" element={<JenkinsPage />} />
          <Route path="/skills/nginx" element={<NginxPage />} />
          <Route path="/skills/elasticsearch" element={<ElasticSearchPage />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;