import { lazy, Suspense } from "react";
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

// Dynamic imports with @vite-ignore so the build succeeds even when the folder
// is not present. Falls back to an invisible null component if the file is missing.
type Mod = { default: React.ComponentType };
const stub = (): Promise<Mod> => Promise.resolve({ default: () => null });
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
const AdminLogin        = lazy(() => import(/* @vite-ignore */ "./admin/pages/AdminLogin").catch(stub));
// @ts-ignore
const AdminLayout       = lazy(() => import(/* @vite-ignore */ "./admin/pages/AdminLayout").catch(stub));
// @ts-ignore
const ActionsAdmin      = lazy(() => import(/* @vite-ignore */ "./admin/pages/ActionsAdmin").catch(stub));
// @ts-ignore
const TestimonialsAdmin = lazy(() => import(/* @vite-ignore */ "./admin/pages/TestimonialsAdmin").catch(stub));
/* eslint-enable @typescript-eslint/ban-ts-comment */

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={null}>
            <Routes>

              {/* ── Admin routes (standalone, no site chrome) ──── */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="actions"      element={<ActionsAdmin />} />
                <Route path="testimonials" element={<TestimonialsAdmin />} />
              </Route>

              {/* ── Public routes (with Navigation + Footer) ──── */}
              <Route path="*" element={
                <div className="min-h-screen bg-background">
                  <TopBanner />
                  <Navigation />
                  <Routes>
                    <Route path="/"          element={<Index />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/data"      element={<DataPage />} />
                    <Route path="/report"    element={<ReportPage />} />
                    <Route path="/blog"      element={<Blog />} />
                    <Route path="/map"       element={<MapReports />} />
                    <Route path="/about"     element={<About />} />
                    <Route path="/privacy"   element={<PrivacyPolicy />} />
                    <Route path="/get-started" element={<GetStarted />} />
                    <Route path="*"          element={<NotFound />} />
                  </Routes>
                  <Footer />
                </div>
              } />

            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
