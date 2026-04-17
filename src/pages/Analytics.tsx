import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts";
import { Upload, FileText, Briefcase, Target, Brain, TrendingUp, ChevronRight, Zap, Star, BookOpen } from "lucide-react";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const COLORS = ["hsl(174,72%,56%)", "hsl(200,100%,60%)", "hsl(265,60%,55%)", "hsl(45,100%,60%)", "hsl(340,80%,55%)"];

const tooltipStyle = {
  background: "hsl(0,0%,7%)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8,
  fontSize: 11,
};

const careerRoles = [
  "Data Scientist", "Machine Learning Engineer", "Frontend Developer",
  "Backend Developer", "Full Stack Developer", "DevOps Engineer",
];

const jobListings = [
  { company: "TechCorp", title: "Senior ML Engineer", skills: ["Python", "TensorFlow", "AWS", "Docker"], exp: "3-5 years", location: "San Francisco, CA" },
  { company: "DataFlow Inc", title: "Data Scientist", skills: ["Python", "SQL", "Pandas", "Spark"], exp: "2-4 years", location: "New York, NY" },
  { company: "CloudScale", title: "Full Stack Developer", skills: ["React", "Node.js", "PostgreSQL", "AWS"], exp: "2-3 years", location: "Remote" },
  { company: "AI Labs", title: "ML Research Engineer", skills: ["Python", "PyTorch", "NLP", "Statistics"], exp: "3+ years", location: "Seattle, WA" },
  { company: "WebDev Pro", title: "Frontend Engineer", skills: ["React", "TypeScript", "CSS", "Testing"], exp: "2-4 years", location: "Austin, TX" },
];

const extractedSkills = ["JavaScript", "Python", "React", "Node.js", "SQL", "Git", "Docker", "AWS"];

const Analytics = () => {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [analyzedJob, setAnalyzedJob] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchScore, setMatchScore] = useState(0);
  const [readinessScore, setReadinessScore] = useState(0);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setTimeout(() => {
      setSkills(extractedSkills);
      setResumeUploaded(true);
    }, 1500);
  }, []);

  const runSimulation = (jobIndex: number) => {
    setIsAnalyzing(true);
    setAnalyzedJob(jobIndex);
    setTimeout(() => {
      const job = jobListings[jobIndex];
      const matched = job.skills.filter(s => skills.some(rs => rs.toLowerCase() === s.toLowerCase())).length;
      const score = Math.round((matched / job.skills.length) * 100);
      setMatchScore(score);
      setReadinessScore(Math.round(score * 0.85 + Math.random() * 15));
      setIsAnalyzing(false);
    }, 2000);
  };

  const missingSkills = analyzedJob !== null ? jobListings[analyzedJob].skills.filter(s => !skills.some(rs => rs.toLowerCase() === s.toLowerCase())) : [];

  const skillMatchData = analyzedJob !== null ? jobListings[analyzedJob].skills.map(s => ({
    name: s,
    match: skills.some(rs => rs.toLowerCase() === s.toLowerCase()) ? 100 : 0,
    required: 100,
  })) : [];

  const readinessLevel = readinessScore >= 80 ? "Advanced" : readinessScore >= 50 ? "Intermediate" : "Beginner";

  const historyData = [
    { role: "ML Eng", score: 65 }, { role: "Data Sci", score: 72 },
    { role: "Frontend", score: 88 }, { role: "Backend", score: 75 }, { role: "Full Stack", score: 82 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Career Analytics</h1>
        <p className="text-sm text-muted-foreground">Analyze your resume and simulate job matches with AI.</p>
      </div>

      {/* Section 1: Resume Upload */}
      {!resumeUploaded ? (
        <motion.div className="glass-card p-8 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-lg font-bold mb-2">Upload Your Resume</h2>
          <p className="text-sm text-muted-foreground mb-4">Accept PDF, DOCX, or TXT files</p>
          <label>
            <input type="file" accept=".pdf,.docx,.txt" onChange={handleUpload} className="hidden" />
            <Button asChild className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
              <span><FileText className="w-4 h-4" /> Upload Resume</span>
            </Button>
          </label>
        </motion.div>
      ) : (
        <motion.div className="glass-card p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-xs font-medium mb-3">Extracted Skills:</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">{s}</span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Section 2: Target Career Selection */}
      {resumeUploaded && (
        <motion.div className="glass-card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-medium">Select Target Career Role</h3>
          </div>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-full max-w-sm bg-black/30 border-white/10">
              <SelectValue placeholder="Choose a career role..." />
            </SelectTrigger>
            <SelectContent>
              {careerRoles.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
            </SelectContent>
          </Select>
        </motion.div>
      )}

      {/* Section 3: Job Opportunity Cards */}
      {resumeUploaded && selectedRole && (
        <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h3 className="text-sm font-medium">Job Opportunities</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobListings.map((job, i) => (
              <motion.div key={i} className="glass-card-hover p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-semibold">{job.title}</h4>
                    <p className="text-xs text-muted-foreground">{job.company}</p>
                  </div>
                  <Briefcase className="w-4 h-4 text-primary flex-shrink-0" />
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {job.skills.map((s, si) => (
                    <span key={si} className={`text-[10px] px-2 py-0.5 rounded-full ${skills.some(rs => rs.toLowerCase() === s.toLowerCase()) ? "bg-primary/15 text-primary" : "bg-white/5 text-muted-foreground"}`}>{s}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span>{job.exp}</span>
                  <span>{job.location}</span>
                </div>
                <Button size="sm" variant="outline" className="w-full gap-1 text-xs" onClick={() => runSimulation(i)}
                  disabled={isAnalyzing && analyzedJob === i}>
                  {isAnalyzing && analyzedJob === i ? "Analyzing..." : <><Target className="w-3 h-3" /> Run AI Simulation</>}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Section 4 & 5: AI Analysis Results */}
      {analyzedJob !== null && !isAnalyzing && (
        <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Match Score */}
          <div className="glass-card p-6 text-center">
            <div className="relative w-28 h-28 mx-auto mb-4">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112">
                <circle cx="56" cy="56" r="48" fill="none" stroke="hsl(220,10%,14%)" strokeWidth="7" />
                <circle cx="56" cy="56" r="48" fill="none" stroke="hsl(174,72%,56%)" strokeWidth="7" strokeLinecap="round"
                  strokeDasharray={`${matchScore * 3.01} 301`}
                  className="drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">{matchScore}%</span>
                <span className="text-[10px] text-muted-foreground">Match</span>
              </div>
            </div>
            <h3 className="text-sm font-semibold">Resume Match Score</h3>
            <p className="text-xs text-muted-foreground mt-1">for {jobListings[analyzedJob].title} at {jobListings[analyzedJob].company}</p>
          </div>

          {/* Skill Comparison */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-5">
              <h3 className="text-xs font-medium mb-4 text-muted-foreground">Skill Match Comparison</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={skillMatchData}>
                  <XAxis dataKey="name" tick={{ fill: "#666", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="match" fill="hsl(174,72%,56%)" radius={[4, 4, 0, 0]} name="Your Skills" />
                  <Bar dataKey="required" fill="hsl(220,10%,20%)" radius={[4, 4, 0, 0]} name="Required" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="glass-card p-5">
              <h3 className="text-xs font-medium mb-3 text-muted-foreground">Missing Skills</h3>
              {missingSkills.length > 0 ? (
                <div className="space-y-2">
                  {missingSkills.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground bg-red-500/5 rounded-lg px-3 py-2 border border-red-500/10">
                      <ChevronRight className="w-3 h-3 text-red-400" /> {s}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-primary">✓ All required skills matched!</p>
              )}

              <h3 className="text-xs font-medium mt-5 mb-3 text-muted-foreground">Resume Strengths</h3>
              <div className="space-y-2">
                {skills.filter(s => jobListings[analyzedJob!].skills.some(js => js.toLowerCase() === s.toLowerCase())).map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/5 rounded-lg px-3 py-2 border border-primary/10">
                    <Star className="w-3 h-3 text-primary" /> {s}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Career Recommendations */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-semibold">AI Career Recommendations</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="text-xs font-medium text-primary mb-2">Skills to Learn</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["System Design", "Kubernetes", "GraphQL", ...missingSkills].slice(0, 5).map((s, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-medium text-neon-blue mb-2">Courses to Study</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• AWS Solutions Architect</li>
                  <li>• System Design Interview</li>
                  <li>• Advanced Algorithms</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-medium text-neon-purple mb-2">Project Ideas</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Build a real-time chat app</li>
                  <li>• Create a ML pipeline</li>
                  <li>• Deploy a microservices app</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Career Readiness Score */}
          <div className="glass-card p-6 text-center">
            <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
            <h3 className="text-sm font-semibold mb-2">Career Readiness Score</h3>
            <p className="text-4xl font-bold mb-2">{readinessScore}<span className="text-lg text-muted-foreground"> / 100</span></p>
            <span className={`text-sm px-4 py-1 rounded-full ${readinessLevel === 'Advanced' ? 'bg-primary/20 text-primary' : readinessLevel === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
              {readinessLevel}
            </span>
          </div>

          {/* Dashboard Analytics */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-5">
              <h3 className="text-xs font-medium mb-4 text-muted-foreground">Skill Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={skills.slice(0, 5).map((s, i) => ({ name: s, value: 20 + i * 5 }))} innerRadius={45} outerRadius={70} dataKey="value" stroke="none">
                    {skills.slice(0, 5).map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {skills.slice(0, 5).map((s, i) => (
                  <div key={i} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} /> {s}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-5">
              <h3 className="text-xs font-medium mb-4 text-muted-foreground">Job Match History</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={historyData}>
                  <XAxis dataKey="role" tick={{ fill: "#666", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                    {historyData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Analytics;
