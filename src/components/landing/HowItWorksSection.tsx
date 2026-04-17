import { motion } from "framer-motion";
import { Upload, Cpu, BarChart3 } from "lucide-react";

const steps = [
  { icon: Upload, title: "Enter Your Situation", desc: "Input your career choice, education decision, or relocation plans.", num: "01" },
  { icon: Cpu, title: "AI Analyzes Data", desc: "Our AI processes market data, trends, and your personal preferences.", num: "02" },
  { icon: BarChart3, title: "Compare Outcomes", desc: "View predicted outcomes across multiple scenarios and choose wisely.", num: "03" },
];

export const HowItWorksSection = () => (
  <section className="py-32 relative bg-black overflow-hidden">
    {/* Subtle center glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.05),transparent_70%)] pointer-events-none" />

    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          How It <span className="gradient-text">Works</span>
        </h2>
        <p className="text-white/40 text-lg">Three simple steps to simulate your future.</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row items-stretch gap-8 max-w-5xl mx-auto">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            className="flex-1 relative group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
          >
            <div
              className="h-full rounded-2xl p-8 text-center relative transition-all duration-500 hover:-translate-y-1"
              style={{
                background: "linear-gradient(145deg, rgba(15,15,15,0.9), rgba(8,8,8,0.95))",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
              }}
            >
              <span className="absolute top-4 right-4 text-5xl font-bold text-white/[0.03]">{s.num}</span>
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300"
                style={{ background: "rgba(100,140,255,0.08)" }}
              >
                <s.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-white">{s.title}</h3>
              <p className="text-sm text-white/35">{s.desc}</p>
            </div>
            {/* Connector line for desktop */}
            {i < 2 && (
              <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20">
                <div className="w-8 h-px bg-gradient-to-r from-primary/20 to-accent/20" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
