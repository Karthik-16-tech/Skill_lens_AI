import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  CheckCircle2, Circle, Lock, ChevronRight, ChevronLeft, Code2,
  Bug, Brain, Trophy, ArrowRight, RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

// Student skills (simulated from resume)
const studentSkills = ["JavaScript", "Python", "React", "SQL", "Node.js", "Machine Learning", "Data Analysis", "Git"];

// Phase definitions
const phases = [
  { id: 1, title: "MCQ Skill Test", icon: CheckCircle2, description: "Multiple choice questions based on your skills" },
  { id: 2, title: "Coding Challenges", icon: Code2, description: "Solve coding problems like LeetCode" },
  { id: 3, title: "Debugging Lab", icon: Bug, description: "Find and fix bugs in code" },
  { id: 4, title: "Real World Problem", icon: Brain, description: "Scenario-based problem solving" },
];

// MCQ Questions
const mcqQuestions = [
  { q: "What is the output of typeof null in JavaScript?", options: ["'null'", "'object'", "'undefined'", "'boolean'"], correct: 1 },
  { q: "Which Python library is primarily used for data manipulation?", options: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"], correct: 1 },
  { q: "In React, what hook is used for side effects?", options: ["useState", "useRef", "useEffect", "useMemo"], correct: 2 },
  { q: "Which SQL clause is used to filter groups?", options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"], correct: 1 },
  { q: "What does REST stand for?", options: ["Remote Execution State Transfer", "Representational State Transfer", "Resource State Transformation", "Reliable Server Transaction"], correct: 1 },
  { q: "Which data structure uses FIFO?", options: ["Stack", "Queue", "Tree", "Graph"], correct: 1 },
  { q: "What is the time complexity of binary search?", options: ["O(n)", "O(n²)", "O(log n)", "O(1)"], correct: 2 },
  { q: "In Git, what command creates a new branch?", options: ["git branch", "git checkout", "git merge", "git clone"], correct: 0 },
  { q: "Which ML algorithm is used for classification?", options: ["Linear Regression", "K-Means", "Decision Tree", "PCA"], correct: 2 },
  { q: "What is the purpose of Node.js?", options: ["Frontend rendering", "Server-side JavaScript", "Database management", "CSS preprocessing"], correct: 1 },
];

// Coding Challenges
const codingChallenges = [
  {
    title: "Two Sum",
    description: "Given an array of integers and a target sum, return indices of two numbers that add up to the target.",
    constraints: "• 2 ≤ nums.length ≤ 10⁴\n• -10⁹ ≤ nums[i] ≤ 10⁹\n• Only one valid answer exists",
    example: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: nums[0] + nums[1] = 2 + 7 = 9",
    starterCode: "function twoSum(nums, target) {\n  // Write your solution here\n  \n}",
  },
  {
    title: "Reverse String",
    description: "Write a function that reverses a string. The input string is given as an array of characters.",
    constraints: "• 1 ≤ s.length ≤ 10⁵\n• Do it in-place with O(1) extra memory",
    example: "Input: s = ['h','e','l','l','o']\nOutput: ['o','l','l','e','h']",
    starterCode: "function reverseString(s) {\n  // Write your solution here\n  \n}",
  },
  {
    title: "Valid Parentheses",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    constraints: "• 1 ≤ s.length ≤ 10⁴\n• s consists of parentheses only",
    example: "Input: s = '([])'\nOutput: true\n\nInput: s = '([)]'\nOutput: false",
    starterCode: "function isValid(s) {\n  // Write your solution here\n  \n}",
  },
];

// Debugging exercises
const debugExercises = [
  {
    title: "Array Sum Bug",
    buggyCode: `function sumArray(arr) {\n  let sum = 1; // Bug: should be 0\n  for (let i = 0; i <= arr.length; i++) { // Bug: should be <\n    sum += arr[i];\n  }\n  return sum;\n}`,
    hint: "Check the initial value and loop boundary",
  },
  {
    title: "String Reversal Bug",
    buggyCode: `function reverse(str) {\n  let result = "";\n  for (let i = str.length; i >= 0; i--) { // Bug: should start at length-1\n    result += str[i];\n  }\n  return result;\n}`,
    hint: "Check the starting index",
  },
  {
    title: "Object Property Bug",
    buggyCode: `function getFullName(user) {\n  return user.firstName + user.lastName; // Bug: missing space\n}`,
    hint: "Check the output format",
  },
  {
    title: "Async Fetch Bug",
    buggyCode: `async function fetchData(url) {\n  const response = fetch(url); // Bug: missing await\n  const data = response.json(); // Bug: missing await\n  return data;\n}`,
    hint: "This function is async but something is missing",
  },
  {
    title: "Array Filter Bug",
    buggyCode: `function getEvens(arr) {\n  return arr.filter(num => num % 2 === 1); // Bug: should be === 0\n}`,
    hint: "Check the filter condition",
  },
];

// Real world problems
const realWorldProblems = [
  {
    title: "Design a URL Shortener",
    description: "Design a system like bit.ly that shortens long URLs. Describe the architecture, data storage, API endpoints, and how you would handle high traffic. Consider scalability, caching, and analytics tracking.",
  },
  {
    title: "Build a Real-time Chat Architecture",
    description: "Design the architecture for a real-time messaging application like Slack. Explain your choice of protocols (WebSocket vs HTTP), database schema, message delivery guarantees, and how you would handle offline users and message history.",
  },
];

const COLORS = ["hsl(174,72%,56%)", "hsl(200,100%,60%)", "hsl(265,60%,55%)", "hsl(45,100%,60%)"];

const Recommendations = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [completedPhases, setCompletedPhases] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Phase 1 state
  const [mcqIndex, setMcqIndex] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<(number | null)[]>(new Array(10).fill(null));

  // Phase 2 state
  const [codingIndex, setCodingIndex] = useState(0);
  const [codingSolutions, setCodingSolutions] = useState<string[]>(codingChallenges.map(c => c.starterCode));

  // Phase 3 state
  const [debugIndex, setDebugIndex] = useState(0);
  const [debugSolutions, setDebugSolutions] = useState<string[]>(debugExercises.map(e => e.buggyCode));

  // Phase 4 state
  const [problemIndex, setProblemIndex] = useState(0);
  const [problemAnswers, setProblemAnswers] = useState<string[]>(new Array(2).fill(""));

  // Scores
  const [scores, setScores] = useState({ mcq: 0, coding: 0, debugging: 0, problem: 0 });

  const completePhase = (phase: number) => {
    if (phase === 0) {
      const correct = mcqAnswers.filter((a, i) => a === mcqQuestions[i].correct).length;
      setScores(s => ({ ...s, mcq: correct * 10 }));
    } else if (phase === 1) {
      const filled = codingSolutions.filter(s => s.trim().length > 30).length;
      setScores(s => ({ ...s, coding: Math.round((filled / codingChallenges.length) * 100) }));
    } else if (phase === 2) {
      const fixed = debugSolutions.filter((s, i) => s !== debugExercises[i].buggyCode).length;
      setScores(s => ({ ...s, debugging: Math.round((fixed / debugExercises.length) * 100) }));
    } else if (phase === 3) {
      const answered = problemAnswers.filter(a => a.trim().length > 50).length;
      setScores(s => ({ ...s, problem: Math.round((answered / realWorldProblems.length) * 100) }));
    }
    setCompletedPhases(prev => [...prev, phase]);
    if (phase < 3) {
      setCurrentPhase(phase + 1);
    } else {
      setShowResults(true);
    }
  };

  const finalScore = Math.round((scores.mcq + scores.coding + scores.debugging + scores.problem) / 4);
  const skillLevel = finalScore >= 80 ? "Advanced" : finalScore >= 50 ? "Intermediate" : "Beginner";

  const radarData = [
    { subject: "MCQ", score: scores.mcq },
    { subject: "Coding", score: scores.coding },
    { subject: "Debugging", score: scores.debugging },
    { subject: "Problem Solving", score: scores.problem },
  ];

  const pieData = [
    { name: "MCQ", value: scores.mcq },
    { name: "Coding", value: scores.coding },
    { name: "Debug", value: scores.debugging },
    { name: "Problem", value: scores.problem },
  ];

  if (showResults) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Assessment Results</h1>
          <p className="text-sm text-muted-foreground">Your comprehensive skill evaluation report</p>
        </div>

        {/* Final Score */}
        <motion.div className="glass-card p-8 text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 128 128">
              <circle cx="64" cy="64" r="56" fill="none" stroke="hsl(220,10%,14%)" strokeWidth="8" />
              <circle cx="64" cy="64" r="56" fill="none" stroke="hsl(174,72%,56%)" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${finalScore * 3.52} 352`}
                className="drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">{finalScore}</span>
              <span className="text-xs text-muted-foreground">/100</span>
            </div>
          </div>
          <h2 className="text-xl font-bold mb-1">Final Score</h2>
          <span className={`text-sm px-3 py-1 rounded-full ${skillLevel === 'Advanced' ? 'bg-primary/20 text-primary' : skillLevel === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
            {skillLevel}
          </span>
        </motion.div>

        {/* Score breakdown */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "MCQ Score", score: scores.mcq, color: "text-primary" },
            { label: "Coding Score", score: scores.coding, color: "text-neon-blue" },
            { label: "Debugging Score", score: scores.debugging, color: "text-neon-purple" },
            { label: "Problem Solving", score: scores.problem, color: "text-yellow-400" },
          ].map((s, i) => (
            <motion.div key={i} className="glass-card p-5 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <p className="text-xs text-muted-foreground mb-2">{s.label}</p>
              <p className={`text-3xl font-bold ${s.color}`}>{s.score}%</p>
              <Progress value={s.score} className="mt-3 h-1.5" />
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div className="glass-card p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <h3 className="text-sm font-medium mb-4">Skill Radar</h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#999", fontSize: 11 }} />
                <Radar dataKey="score" stroke="hsl(174,72%,56%)" fill="hsl(174,72%,56%)" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
          <motion.div className="glass-card p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <h3 className="text-sm font-medium mb-4">Score Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} innerRadius={50} outerRadius={80} dataKey="value" stroke="none" label={({ name, value }) => `${name}: ${value}%`}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* AI Feedback */}
        <motion.div className="glass-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-semibold">AI Feedback & Recommendations</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-medium text-primary mb-2">Strengths</h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {scores.mcq >= 70 && <li>• Strong theoretical knowledge</li>}
                {scores.coding >= 70 && <li>• Good problem-solving approach</li>}
                {scores.debugging >= 70 && <li>• Excellent debugging skills</li>}
                {scores.problem >= 70 && <li>• Strong system design thinking</li>}
                {finalScore < 50 && <li>• Willingness to take assessment shows growth mindset</li>}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-medium text-destructive mb-2">Areas to Improve</h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {scores.mcq < 70 && <li>• Review core programming concepts</li>}
                {scores.coding < 70 && <li>• Practice more coding challenges on LeetCode</li>}
                {scores.debugging < 70 && <li>• Improve code reading and debugging skills</li>}
                {scores.problem < 70 && <li>• Study system design patterns</li>}
              </ul>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5">
            <h4 className="text-xs font-medium text-muted-foreground mb-2">Recommended Next Steps</h4>
            <div className="flex flex-wrap gap-2">
              {["Practice DSA daily", "Build real projects", "Read system design books", "Contribute to open source", "Take mock interviews"].map((r, i) => (
                <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground">{r}</span>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="flex justify-center">
          <Button onClick={() => { setShowResults(false); setCurrentPhase(0); setCompletedPhases([]); setMcqAnswers(new Array(10).fill(null)); setMcqIndex(0); setCodingIndex(0); setDebugIndex(0); setProblemIndex(0); setCodingSolutions(codingChallenges.map(c => c.starterCode)); setDebugSolutions(debugExercises.map(e => e.buggyCode)); setProblemAnswers(new Array(2).fill("")); }} variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4" /> Retake Assessment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">AI Skills Assessment</h1>
        <p className="text-sm text-muted-foreground">Complete all 4 phases to get your comprehensive skill report.</p>
      </div>

      {/* Phase Progress Tracker */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between gap-2">
          {phases.map((phase, i) => {
            const completed = completedPhases.includes(i);
            const active = currentPhase === i;
            const locked = i > 0 && !completedPhases.includes(i - 1) && !active;
            return (
              <div key={i} className="flex items-center flex-1">
                <button
                  onClick={() => !locked && setCurrentPhase(i)}
                  disabled={locked}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all w-full ${
                    completed ? "bg-primary/15 text-primary" : active ? "bg-white/10 text-foreground border border-white/20" : locked ? "opacity-30 cursor-not-allowed" : "hover:bg-white/5 text-muted-foreground"
                  }`}
                >
                  {completed ? <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" /> : locked ? <Lock className="w-4 h-4 flex-shrink-0" /> : <phase.icon className="w-4 h-4 flex-shrink-0" />}
                  <span className="hidden sm:inline truncate">{phase.title}</span>
                  <span className="sm:hidden">{i + 1}</span>
                </button>
                {i < 3 && <ChevronRight className="w-4 h-4 text-muted-foreground/30 mx-1 flex-shrink-0" />}
              </div>
            );
          })}
        </div>
        <Progress value={(completedPhases.length / 4) * 100} className="mt-4 h-1.5" />
      </div>

      {/* Skills Reference */}
      <div className="glass-card p-4">
        <p className="text-xs text-muted-foreground mb-2">Your Resume Skills:</p>
        <div className="flex flex-wrap gap-2">
          {studentSkills.map((skill, i) => (
            <span key={i} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">{skill}</span>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* PHASE 1 - MCQ */}
        {currentPhase === 0 && (
          <motion.div key="mcq" className="glass-card p-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold">Question {mcqIndex + 1} of {mcqQuestions.length}</h2>
              <span className="text-xs text-muted-foreground">{mcqAnswers.filter(a => a !== null).length} answered</span>
            </div>
            <Progress value={((mcqIndex + 1) / mcqQuestions.length) * 100} className="mb-6 h-1" />

            <p className="text-base font-medium mb-6">{mcqQuestions[mcqIndex].q}</p>

            <div className="grid gap-3 mb-6">
              {mcqQuestions[mcqIndex].options.map((opt, oi) => (
                <button
                  key={oi}
                  onClick={() => { const newAns = [...mcqAnswers]; newAns[mcqIndex] = oi; setMcqAnswers(newAns); }}
                  className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                    mcqAnswers[mcqIndex] === oi
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-white/10 bg-white/[0.03] text-muted-foreground hover:bg-white/5 hover:border-white/20"
                  }`}
                >
                  <span className="font-medium mr-2">{String.fromCharCode(65 + oi)}.</span> {opt}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" disabled={mcqIndex === 0} onClick={() => setMcqIndex(i => i - 1)}>
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>
              {mcqIndex < mcqQuestions.length - 1 ? (
                <Button size="sm" onClick={() => setMcqIndex(i => i + 1)} className="gap-1">
                  Next <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button size="sm" onClick={() => completePhase(0)} className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90">
                  Submit MCQ <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </motion.div>
        )}

        {/* PHASE 2 - Coding */}
        {currentPhase === 1 && (
          <motion.div key="coding" className="glass-card p-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold">Challenge {codingIndex + 1}: {codingChallenges[codingIndex].title}</h2>
              <span className="text-xs text-muted-foreground">{codingIndex + 1} / {codingChallenges.length}</span>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{codingChallenges[codingIndex].description}</p>

            <div className="glass-card p-3 mb-4">
              <p className="text-xs font-medium text-muted-foreground mb-1">Constraints:</p>
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap">{codingChallenges[codingIndex].constraints}</pre>
            </div>

            <div className="glass-card p-3 mb-4">
              <p className="text-xs font-medium text-primary mb-1">Example:</p>
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap">{codingChallenges[codingIndex].example}</pre>
            </div>

            <Textarea
              value={codingSolutions[codingIndex]}
              onChange={(e) => { const n = [...codingSolutions]; n[codingIndex] = e.target.value; setCodingSolutions(n); }}
              className="font-mono text-sm min-h-[200px] bg-black/50 border-white/10"
              placeholder="Write your solution..."
            />

            <div className="flex items-center justify-between mt-4">
              <Button variant="ghost" size="sm" disabled={codingIndex === 0} onClick={() => setCodingIndex(i => i - 1)}>
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>
              {codingIndex < codingChallenges.length - 1 ? (
                <Button size="sm" onClick={() => setCodingIndex(i => i + 1)} className="gap-1">
                  Next Challenge <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button size="sm" onClick={() => completePhase(1)} className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90">
                  Submit Solutions <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </motion.div>
        )}

        {/* PHASE 3 - Debugging */}
        {currentPhase === 2 && (
          <motion.div key="debug" className="glass-card p-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold">Debug {debugIndex + 1}: {debugExercises[debugIndex].title}</h2>
              <span className="text-xs text-muted-foreground">{debugIndex + 1} / {debugExercises.length}</span>
            </div>

            <div className="glass-card p-3 mb-4 border-yellow-500/20">
              <p className="text-xs text-yellow-400 mb-1">💡 Hint: {debugExercises[debugIndex].hint}</p>
            </div>

            <p className="text-xs text-muted-foreground mb-2">Fix the buggy code below:</p>
            <Textarea
              value={debugSolutions[debugIndex]}
              onChange={(e) => { const n = [...debugSolutions]; n[debugIndex] = e.target.value; setDebugSolutions(n); }}
              className="font-mono text-sm min-h-[180px] bg-black/50 border-white/10"
            />

            <div className="flex items-center justify-between mt-4">
              <Button variant="ghost" size="sm" disabled={debugIndex === 0} onClick={() => setDebugIndex(i => i - 1)}>
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>
              {debugIndex < debugExercises.length - 1 ? (
                <Button size="sm" onClick={() => setDebugIndex(i => i + 1)} className="gap-1">
                  Next Bug <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button size="sm" onClick={() => completePhase(2)} className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90">
                  Submit Fixes <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </motion.div>
        )}

        {/* PHASE 4 - Real World */}
        {currentPhase === 3 && (
          <motion.div key="problem" className="glass-card p-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold">Problem {problemIndex + 1}: {realWorldProblems[problemIndex].title}</h2>
              <span className="text-xs text-muted-foreground">{problemIndex + 1} / {realWorldProblems.length}</span>
            </div>

            <p className="text-sm text-muted-foreground mb-6">{realWorldProblems[problemIndex].description}</p>

            <Textarea
              value={problemAnswers[problemIndex]}
              onChange={(e) => { const n = [...problemAnswers]; n[problemIndex] = e.target.value; setProblemAnswers(n); }}
              className="min-h-[250px] bg-black/50 border-white/10"
              placeholder="Write your detailed solution, architecture decisions, and reasoning..."
            />

            <div className="flex items-center justify-between mt-4">
              <Button variant="ghost" size="sm" disabled={problemIndex === 0} onClick={() => setProblemIndex(i => i - 1)}>
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>
              {problemIndex < realWorldProblems.length - 1 ? (
                <Button size="sm" onClick={() => setProblemIndex(i => i + 1)} className="gap-1">
                  Next Problem <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button size="sm" onClick={() => completePhase(3)} className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90">
                  Submit & View Results <Trophy className="w-4 h-4" />
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Recommendations;
