import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MapReports from "./pages/MapReports";
import DashboardPage from "./pages/DashboardPage";
import DataPage from "./pages/DataPage";
import ReportPage from "./pages/ReportPage";
import Blog from "./pages/Blog";
import About from "./pages/About";
import GetStarted from "./pages/GetStarted";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Navigation from "./components/Navigation";
import TopBanner from "./components/TopBanner";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <TopBanner />
            <Navigation />
            <Routes>
              {/* Main v2 pages */}
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/data" element={<DataPage />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/blog" element={<Blog />} />

              {/* Legacy routes — preserved for backwards compatibility */}
              <Route path="/map" element={<MapReports />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/get-started" element={<GetStarted />} />

              {/* 404 fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
