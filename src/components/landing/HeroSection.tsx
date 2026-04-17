import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BlackHoleCanvas } from "./BlackHoleCanvas";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated black hole background */}
      <BlackHoleCanvas />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/45 z-[1]" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-[900px] mx-auto px-6">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs tracking-[0.2em] uppercase text-white/60 font-medium">
              Skill lens AI
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
          >
            Skill lens
            <span className="gradient-text"> AI</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-xl md:text-2xl font-light text-white/50 mb-4 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Simulate Your Future Decisions
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-sm md:text-base text-white/30 max-w-lg mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            AI-powered simulations and predictive analytics to explore career choices,
            education paths, and life decisions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 px-8 py-6 text-base font-semibold rounded-full shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] transition-all duration-500"
              onClick={() => navigate("/dashboard")}
            >
              <Play className="mr-2 w-4 h-4 fill-current" />
              Start Simulation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/15 bg-white/[0.03] hover:bg-white/[0.08] text-white/80 hover:text-white px-8 py-6 text-base rounded-full hover:shadow-[0_0_25px_rgba(100,140,255,0.15)] transition-all duration-500"
              onClick={() => {
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Learn More
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-[2]" />
    </section>
  );
};
