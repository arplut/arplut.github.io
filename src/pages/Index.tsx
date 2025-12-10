import Hero from "@/components/Hero";
import ScrollingBanner from "@/components/ScrollingBanner";
import Features from "@/components/Features";

import AppPreviewCarousel from "@/components/AppPreviewCarousel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <ScrollingBanner />
      <Features />
      <AppPreviewCarousel />
    </div>
  );
};

export default Index;
