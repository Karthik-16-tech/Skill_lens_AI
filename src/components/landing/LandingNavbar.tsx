import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Moon, Sun, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Features", href: "#features" },
  { label: "Simulations", href: "/dashboard/simulator", isRoute: true },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
];

export const LandingNavbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light-theme", !isDark);
  }, [isDark]);

  const handleNav = (link: (typeof navLinks)[0]) => {
    setMobileOpen(false);
    if (link.isRoute) {
      navigate(link.href);
    } else {
      const id = link.href.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-4 right-48 z-50 flex items-center justify-between gap-2 px-4 sm:px-6 py-2.5 rounded-2xl border transition-all duration-500 ${
          scrolled
            ? "border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.7),0_0_1px_rgba(45,212,191,0.2)]"
            : "border-white/[0.05] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
        }`}
        style={{
          background: scrolled ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.5)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          width: "min(92vw, 860px)",
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 22, stiffness: 130 }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer shrink-0 group"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Sparkles className="w-4 h-4 text-primary transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(45,212,191,0.6)]" />
          <span className="text-sm font-bold tracking-wide text-foreground transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(45,212,191,0.4)]">
            Skill lens
            <span className="text-primary ml-0.5">AI</span>
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link, i) => (
            <button
              key={link.label}
              onClick={() => handleNav(link)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {link.label}
              {/* Animated underline */}
              <motion.span
                className="absolute bottom-0 left-1/2 h-[1.5px] bg-primary rounded-full"
                initial={false}
                animate={{
                  width: hoveredIndex === i ? "60%" : "0%",
                  x: "-50%",
                  opacity: hoveredIndex === i ? 1 : 0,
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{ boxShadow: "0 0 8px rgba(45,212,191,0.5)" }}
              />
              {/* Hover glow */}
              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.span
                    className="absolute inset-0 rounded-lg bg-primary/[0.06]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>

        {/* Right side: theme toggle + mobile menu */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Theme toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="relative w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/[0.06] transition-colors duration-300"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.25 }}
                >
                  <Moon className="w-3.5 h-3.5 text-muted-foreground" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.25 }}
                >
                  <Sun className="w-3.5 h-3.5 text-yellow-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/[0.06] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-4 h-4 text-foreground" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-4 h-4 text-muted-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Bottom glow border */}
        <div
          className="absolute -bottom-px left-[10%] right-[10%] h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent)",
          }}
        />
      </motion.nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
            style={{
              background: "rgba(0,0,0,0.92)",
              backdropFilter: "blur(20px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={() => handleNav(link)}
                className="text-2xl font-semibold text-foreground/80 hover:text-primary py-4 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.07, duration: 0.35 }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
