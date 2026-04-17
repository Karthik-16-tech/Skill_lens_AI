import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import {
  TrendingUp, DollarSign, Heart, Shield, ArrowUpRight, Sparkles, Brain,
  Zap, Upload, FileText, User, GraduationCap, Code2, Wrench
} from "lucide-react";
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis,
  ResponsiveContainer, Tooltip, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis
} from "recharts";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const tooltipStyle = {
  background: "hsl(0,0%,7%)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8,
};

const COLORS = ["hsl(174,72%,56%)", "hsl(200,100%,60%)", "hsl(265,60%,55%)", "hsl(220,10%,30%)", "hsl(45,100%,60%)"];

const anim = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4 },
});

// Default / mock analyzed data
const defaultAnalysis = {
  name: "Upload Your Resume",
  country: "—",
  career_role: "—",
  skills: [] as string[],
  tools: [] as string[],
  career_prediction_score: 0,
  future_salary_estimate: "$0",
  stress_level: 0,
  job_stability_score: 0,
  career_match_score: 0,
  skills_to_learn: [] as string[],
  top_frameworks: [] as { name: string; value: number }[],
  ai_insight: "Upload your resume to get AI-powered career analysis.",
  income_growth: 0,
};

const sampleAnalysis = {
  name: "palla bhuvan karthik",
  country: "United States",
  career_role: "Full Stack Developer",
  skills: ["JavaScript", "Python", "React", "Node.js", "SQL", "Git", "Docker", "AWS"],
  tools: ["VS Code", "GitHub", "Figma", "Jira", "Postman"],
  career_prediction_score: 87,
  future_salary_estimate: "$115K",
  stress_level: 32,
  job_stability_score: 94,
  career_match_score: 78,
  skills_to_learn: ["Kubernetes", "GraphQL", "System Design", "TypeScript", "CI/CD"],
  top_frameworks: [
    { name: "React", value: 92 }, { name: "Node.js", value: 85 }, { name: "Python", value: 78 },
    { name: "AWS", value: 65 }, { name: "Docker", value: 60 }, { name: "SQL", value: 88 },
  ],
  ai_insight: "Based on your skills in React and Node.js, pursuing Full Stack Development has a 78% career match. Consider adding TypeScript and System Design to boost your profile to 90%+.",
  income_growth: 34,
};

const salaryLine = [
  { year: "2024", salary: 55 }, { year: "2025", salary: 62 }, { year: "2026", salary: 71 },
  { year: "2027", salary: 85 }, { year: "2028", salary: 98 }, { year: "2029", salary: 115 },
];

const incomeSparkline = [
  { v: 40 }, { v: 45 }, { v: 42 }, { v: 55 }, { v: 60 }, { v: 58 }, { v: 72 }, { v: 80 },
];

const Dashboard = () => {
  const [analysis, setAnalysis] = useState(defaultAnalysis);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysis(sampleAnalysis);
      setResumeUploaded(true);
      setIsAnalyzing(false);
    }, 2000);
  }, []);

  const data = resumeUploaded ? analysis : defaultAnalysis;

  const stats = [
    { label: "Career Prediction Score", value: data.career_prediction_score ? `${data.career_prediction_score}%` : "—", change: "+12%", icon: TrendingUp, color: "text-primary" },
    { label: "Future Income Estimate", value: data.future_salary_estimate || "—", change: "+24%", icon: DollarSign, color: "text-neon-blue" },
    { label: "Stress Level Index", value: data.stress_level ? `${data.stress_level}%` : "—", change: "-18%", icon: Heart, color: "text-neon-purple" },
    { label: "Job Stability Score", value: data.job_stability_score ? `${data.job_stability_score}%` : "—", change: "+8%", icon: Shield, color: "text-primary" },
  ];

  const skillPie = data.skills.slice(0, 5).map((s, i) => ({ name: s, value: 20 + Math.random() * 30 }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
      {/* Left main content */}
      <div className="space-y-6">
        {/* Resume Upload */}
        {!resumeUploaded && (
          <motion.div className="glass-card p-6 text-center" {...anim(0)}>
            <Upload className="w-10 h-10 text-primary mx-auto mb-3" />
            <h2 className="text-lg font-bold mb-1">Upload Your Resume</h2>
            <p className="text-sm text-muted-foreground mb-4">Get AI-powered career analysis and predictions</p>
            <label className="inline-block">
              <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileUpload} className="hidden" />
              <Button asChild className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
                <span><FileText className="w-4 h-4" /> Choose Resume File</span>
              </Button>
            </label>
            {isAnalyzing && (
              <div className="mt-4">
                <p className="text-xs text-primary mb-2">Analyzing with AI...</p>
                <Progress value={65} className="h-1.5" />
              </div>
            )}
          </motion.div>
        )}

        <div>
          <h1 className="text-2xl font-bold mb-1">Welcome{resumeUploaded ? `, ${data.name}` : ""}</h1>
          <p className="text-sm text-muted-foreground">
            {resumeUploaded ? `Career Role: ${data.career_role} • ${data.country}` : "Upload your resume to unlock AI-powered career insights."}
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div key={i} className="glass-card-hover p-4" {...anim(i * 0.08)}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-muted-foreground">{s.label}</span>
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <div className="text-2xl font-bold mb-1">{s.value}</div>
              {resumeUploaded && (
                <div className="flex items-center gap-1 text-[11px] text-primary">
                  <ArrowUpRight className="w-3 h-3" />
                  {s.change} predicted
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Skills & Tools */}
        {resumeUploaded && (
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div className="glass-card p-5" {...anim(0.3)}>
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="w-4 h-4 text-primary" />
                <h3 className="text-xs font-medium">Detected Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((s, i) => (
                  <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">{s}</span>
                ))}
              </div>
            </motion.div>
            <motion.div className="glass-card p-5" {...anim(0.35)}>
              <div className="flex items-center gap-2 mb-3">
                <Wrench className="w-4 h-4 text-neon-purple" />
                <h3 className="text-xs font-medium">Tools & Platforms</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.tools.map((t, i) => (
                  <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20">{t}</span>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Charts row */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div className="glass-card p-5" {...anim(0.4)}>
            <h3 className="text-xs font-medium mb-4 text-muted-foreground">Salary Growth Prediction (K$)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={salaryLine}>
                <defs>
                  <linearGradient id="salaryGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(174,72%,56%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(174,72%,56%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="salary" stroke="hsl(174,72%,56%)" strokeWidth={2} fill="url(#salaryGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {resumeUploaded && data.top_frameworks.length > 0 ? (
            <motion.div className="glass-card p-5" {...anim(0.45)}>
              <h3 className="text-xs font-medium mb-4 text-muted-foreground">Framework Proficiency</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data.top_frameworks} layout="vertical">
                  <XAxis type="number" tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" tick={{ fill: "#999", fontSize: 10 }} axisLine={false} tickLine={false} width={60} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} fill="hsl(200,100%,60%)" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          ) : (
            <motion.div className="glass-card p-5" {...anim(0.45)}>
              <h3 className="text-xs font-medium mb-4 text-muted-foreground">Skill Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={[{ name: "Upload resume", value: 100 }]} innerRadius={45} outerRadius={68} dataKey="value" stroke="none">
                    <Cell fill="hsl(220,10%,20%)" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <p className="text-center text-xs text-muted-foreground mt-2">Upload resume to see skills</p>
            </motion.div>
          )}
        </div>

        {/* Skills to Learn */}
        {resumeUploaded && (
          <motion.div className="glass-card p-5" {...anim(0.5)}>
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-4 h-4 text-primary" />
              <h3 className="text-xs font-medium">Skills to Learn</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills_to_learn.map((s, i) => (
                <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">{s}</span>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Right profile analytics panel */}
      <motion.aside className="space-y-4" {...anim(0.2)}>
        {/* Profile card */}
        <div className="glass-card p-5">
          <div className="flex flex-col items-center text-center mb-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl font-bold text-primary-foreground mb-3 shadow-[0_0_20px_rgba(45,212,191,0.3)]">
              {resumeUploaded ? data.name.charAt(0) : <User className="w-6 h-6" />}
            </div>
            <h3 className="text-sm font-bold">{resumeUploaded ? data.name : "Student"}</h3>
            <p className="text-[11px] text-muted-foreground">{resumeUploaded ? data.career_role : "Upload resume to analyze"}</p>
          </div>

          {/* Career Match Score */}
          <div className="flex justify-center mb-4">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                <circle cx="48" cy="48" r="40" fill="none" stroke="hsl(220,10%,14%)" strokeWidth="6" />
                <circle cx="48" cy="48" r="40" fill="none" stroke="hsl(174,72%,56%)" strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={`${(data.career_match_score || 0) * 2.51} 251`}
                  className="drop-shadow-[0_0_6px_rgba(45,212,191,0.5)]" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold">{data.career_match_score || 0}%</span>
                <span className="text-[9px] text-muted-foreground">Match</span>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-center text-muted-foreground mb-4">Career Match Score</p>

          {/* Income Growth */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-muted-foreground">Income Growth</span>
              <span className="text-[11px] font-semibold text-primary">+{resumeUploaded ? sampleAnalysis.income_growth : 0}%</span>
            </div>
            <ResponsiveContainer width="100%" height={50}>
              <AreaChart data={incomeSparkline}>
                <defs>
                  <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(200,100%,60%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(200,100%,60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="hsl(200,100%,60%)" strokeWidth={1.5} fill="url(#sparkGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Stress Level */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-muted-foreground">Stress Level</span>
              <span className="text-[11px] font-semibold text-neon-purple">{data.stress_level || 0}%</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg, hsl(265,60%,55%), hsl(200,100%,60%))" }}
                initial={{ width: 0 }} animate={{ width: `${data.stress_level || 0}%` }} transition={{ delay: 0.6, duration: 0.8 }} />
            </div>
          </div>

          {/* Job Stability */}
          <div className="mb-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-muted-foreground">Job Stability</span>
              <span className="text-[11px] font-semibold text-primary">{data.job_stability_score || 0}%</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <motion.div className="h-full rounded-full bg-primary"
                initial={{ width: 0 }} animate={{ width: `${data.job_stability_score || 0}%` }} transition={{ delay: 0.7, duration: 0.8 }} />
            </div>
          </div>
        </div>

        {/* AI Insight */}
        <div className="glass-card p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl" />
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Brain className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-xs font-semibold">AI Insight</span>
          </div>
          <p className="text-[12px] text-muted-foreground leading-relaxed mb-3">{data.ai_insight}</p>
          {resumeUploaded && (
            <div className="flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-primary" />
              <span className="text-[10px] text-muted-foreground">Confidence: <span className="text-primary font-medium">92%</span></span>
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="glass-card p-4">
          <h4 className="text-xs font-semibold mb-3">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: Sparkles, label: "AI Assessment" },
              { icon: TrendingUp, label: "View Analytics" },
            ].map((a, i) => (
              <button key={i} className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/5 border border-white/5 text-[11px] text-muted-foreground hover:text-foreground hover:bg-white/10 hover:border-white/10 transition-all">
                <a.icon className="w-3.5 h-3.5" />
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </motion.aside>
    </div>
  );
};

export default Dashboard;
