import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { InsightsPreview } from "@/components/landing/InsightsPreview";

const Index = () => (
  <div className="min-h-screen bg-background">
    <LandingNavbar />
    <div id="hero"><HeroSection /></div>
    <div id="features"><FeaturesSection /></div>
    <div id="how-it-works"><HowItWorksSection /></div>
    <div id="insights"><InsightsPreview /></div>
  </div>
);

export default Index;
