import Hero from "@/components/Hero";
import ScrollingBanner from "@/components/ScrollingBanner";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import VideoSection from "@/components/VideoSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <ScrollingBanner />
      <Features />
      <HowItWorks />
      <VideoSection />
    </div>
  );
};

export default Index;
