import Hero from "@/components/Hero";
import ScrollingBanner from "@/components/ScrollingBanner";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
// import VideoSection from "@/components/VideoSection";
import AppPreviewCarousel from "@/components/AppPreviewCarousel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <ScrollingBanner />
      <Features />
      <HowItWorks />
      <AppPreviewCarousel />
      {/* <VideoSection /> */}
    </div>
  );
};

export default Index;
