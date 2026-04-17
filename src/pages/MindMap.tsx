import { motion } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { Plus, Trash2, Send, Brain, Info, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

interface MindNode {
  id: string;
  label: string;
  x: number;
  y: number;
  parentId: string | null;
  color: string;
}

const COLORS = [
  "hsl(174,72%,56%)", "hsl(200,100%,60%)", "hsl(265,60%,55%)",
  "hsl(45,100%,60%)", "hsl(340,80%,55%)", "hsl(120,60%,50%)",
];

const studentSkills = ["Python", "Machine Learning", "Data Analysis", "SQL", "React", "JavaScript", "Git", "Docker"];

const generateId = () => Math.random().toString(36).substr(2, 9);

const MindMap = () => {
  const [nodes, setNodes] = useState<MindNode[]>([
    { id: "root", label: "Career Skills", x: 450, y: 250, parentId: null, color: COLORS[0] },
  ]);
  const [selectedNode, setSelectedNode] = useState<string | null>("root");
  const [newLabel, setNewLabel] = useState("");
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [submitted, setSubmitted] = useState(false);
  const [scores, setScores] = useState({ coverage: 0, depth: 0, structure: 0, final: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const addChild = () => {
    if (!selectedNode || !newLabel.trim()) return;
    const parent = nodes.find(n => n.id === selectedNode);
    if (!parent) return;
    const children = nodes.filter(n => n.parentId === selectedNode);
    const angle = (children.length * 60) - 30;
    const rad = (angle * Math.PI) / 180;
    const dist = 120 + children.length * 20;
    const newNode: MindNode = {
      id: generateId(),
      label: newLabel.trim(),
      x: parent.x + Math.cos(rad) * dist,
      y: parent.y + Math.sin(rad) * dist,
      parentId: selectedNode,
      color: COLORS[(nodes.length) % COLORS.length],
    };
    setNodes(prev => [...prev, newNode]);
    setNewLabel("");
    setSelectedNode(newNode.id);
  };

  const deleteNode = (id: string) => {
    if (id === "root") return;
    const toDelete = new Set<string>();
    const collect = (nodeId: string) => {
      toDelete.add(nodeId);
      nodes.filter(n => n.parentId === nodeId).forEach(n => collect(n.id));
    };
    collect(id);
    setNodes(prev => prev.filter(n => !toDelete.has(n.id)));
    setSelectedNode("root");
  };

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const node = nodes.find(n => n.id === id);
    if (!node || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    setDraggingId(id);
    setDragOffset({ x: e.clientX - rect.left - node.x, y: e.clientY - rect.top - node.y });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!draggingId || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - dragOffset.x;
    const y = e.clientY - rect.top - dragOffset.y;
    setNodes(prev => prev.map(n => n.id === draggingId ? { ...n, x, y } : n));
  }, [draggingId, dragOffset]);

  const handleMouseUp = useCallback(() => setDraggingId(null), []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => { window.removeEventListener("mousemove", handleMouseMove); window.removeEventListener("mouseup", handleMouseUp); };
  }, [handleMouseMove, handleMouseUp]);

  const handleSubmit = () => {
    const totalNodes = nodes.length;
    const skillsCovered = studentSkills.filter(s => nodes.some(n => n.label.toLowerCase().includes(s.toLowerCase()))).length;
    const maxDepth = getMaxDepth("root", 0);
    const coverage = Math.min(100, Math.round((skillsCovered / studentSkills.length) * 100));
    const depth = Math.min(100, Math.round((maxDepth / 4) * 100));
    const structure = Math.min(100, Math.round((totalNodes / 15) * 100));
    const final = Math.round((coverage * 0.4 + depth * 0.3 + structure * 0.3));
    setScores({ coverage, depth, structure, final });
    setSubmitted(true);
  };

  const getMaxDepth = (nodeId: string, current: number): number => {
    const children = nodes.filter(n => n.parentId === nodeId);
    if (children.length === 0) return current;
    return Math.max(...children.map(c => getMaxDepth(c.id, current + 1)));
  };

  const knowledgeLevel = scores.final >= 80 ? "Advanced" : scores.final >= 50 ? "Intermediate" : "Beginner";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Skill Knowledge Mind Map</h1>
        <p className="text-sm text-muted-foreground">Create a mind map of the skills and concepts you know.</p>
      </div>

      {/* Instructions */}
      <div className="glass-card p-4">
        <div className="flex items-start gap-3">
          <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Click a node to select it, then add child nodes</p>
            <p>• Drag nodes to reposition them</p>
            <p>• Build your mind map around your career skills</p>
            <p className="text-primary">Structure: Career → Skill → Subtopic → Subtopic</p>
          </div>
        </div>
      </div>

      {/* Skill Reference Panel */}
      <div className="glass-card p-4">
        <p className="text-xs font-medium mb-2">Detected Skills from Resume:</p>
        <div className="flex flex-wrap gap-2">
          {studentSkills.map((s, i) => (
            <span key={i} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">{s}</span>
          ))}
        </div>
      </div>

      {/* Mind Map Editor */}
      <div className="glass-card p-2 overflow-hidden">
        <svg ref={svgRef} width="100%" height="500" className="cursor-crosshair" style={{ minWidth: 900 }}>
          {/* Connection Lines */}
          {nodes.filter(n => n.parentId).map(node => {
            const parent = nodes.find(p => p.id === node.parentId);
            if (!parent) return null;
            return (
              <line key={`line-${node.id}`} x1={parent.x} y1={parent.y} x2={node.x} y2={node.y}
                stroke={node.color} strokeWidth="1.5" strokeOpacity="0.3" />
            );
          })}

          {/* Nodes */}
          {nodes.map(node => {
            const isSelected = selectedNode === node.id;
            const isRoot = node.id === "root";
            const w = isRoot ? 150 : 120;
            const h = isRoot ? 44 : 36;
            return (
              <g key={node.id} onMouseDown={(e) => handleMouseDown(e, node.id)} onClick={() => setSelectedNode(node.id)} style={{ cursor: "grab" }}>
                {isSelected && <circle cx={node.x} cy={node.y} r={isRoot ? 50 : 40} fill={node.color} opacity={0.08} />}
                <rect x={node.x - w / 2} y={node.y - h / 2} width={w} height={h} rx={8}
                  fill={isSelected ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)"}
                  stroke={node.color} strokeWidth={isSelected ? 2 : 1} strokeOpacity={isSelected ? 0.8 : 0.4} />
                <text x={node.x} y={node.y + 1} textAnchor="middle" dominantBaseline="middle"
                  fill="white" fontSize={isRoot ? 12 : 11} fontFamily="Sora, sans-serif">
                  {node.label.length > 16 ? node.label.slice(0, 14) + "…" : node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <Input value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="Node label..."
          className="w-48 bg-black/30 border-white/10" onKeyDown={(e) => e.key === "Enter" && addChild()} />
        <Button size="sm" onClick={addChild} disabled={!selectedNode || !newLabel.trim()} className="gap-1">
          <Plus className="w-4 h-4" /> Add Child
        </Button>
        {selectedNode && selectedNode !== "root" && (
          <Button size="sm" variant="destructive" onClick={() => deleteNode(selectedNode)} className="gap-1">
            <Trash2 className="w-4 h-4" /> Delete
          </Button>
        )}
        <div className="flex-1" />
        <Button size="sm" onClick={handleSubmit} disabled={nodes.length < 3} className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90">
          <Send className="w-4 h-4" /> Submit Mind Map
        </Button>
      </div>

      {/* Results */}
      {submitted && (
        <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Scores */}
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { label: "Skill Coverage", score: scores.coverage, color: "text-primary" },
              { label: "Concept Depth", score: scores.depth, color: "text-neon-blue" },
              { label: "Knowledge Structure", score: scores.structure, color: "text-neon-purple" },
              { label: "Final Score", score: scores.final, color: "text-yellow-400" },
            ].map((s, i) => (
              <div key={i} className="glass-card p-4 text-center">
                <p className="text-xs text-muted-foreground mb-2">{s.label}</p>
                <p className={`text-2xl font-bold ${s.color}`}>{s.score}/100</p>
                <Progress value={s.score} className="mt-2 h-1.5" />
              </div>
            ))}
          </div>

          <div className="glass-card p-5 text-center">
            <p className="text-sm text-muted-foreground mb-1">Knowledge Level</p>
            <span className={`text-lg font-bold px-4 py-1 rounded-full ${knowledgeLevel === 'Advanced' ? 'bg-primary/20 text-primary' : knowledgeLevel === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
              {knowledgeLevel}
            </span>
          </div>

          {/* AI Feedback */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-semibold">AI Feedback</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="text-xs font-medium text-primary mb-2">Strong Concepts</h4>
                <ul className="space-y-1 text-muted-foreground">
                  {nodes.slice(1, 4).map((n, i) => <li key={i}>• {n.label}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-medium text-destructive mb-2">Missing Topics</h4>
                <ul className="space-y-1 text-muted-foreground">
                  {studentSkills.filter(s => !nodes.some(n => n.label.toLowerCase().includes(s.toLowerCase()))).slice(0, 4).map((s, i) => (
                    <li key={i}>• {s}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-xs text-muted-foreground">
                💡 Recommendation: Add more depth to your skill nodes. Include subtopics like specific libraries, frameworks, and real-world applications for each skill to improve your coverage score.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MindMap;
