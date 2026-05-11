"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Point {
  x: number;
  y: number;
  z?: number;
}

class Particle {
  x: number;
  y: number;
  z: number;
  targetX: number;
  targetY: number;
  targetZ: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
  baseColor: { r: number, g: number, b: number };
  friction: number;
  ease: number;
  state: "galaxy" | "target" | "jump" = "galaxy";
  angle: number;
  radius: number;
  orbitSpeed: number;

  constructor(width: number, height: number) {
    this.x = (Math.random() - 0.5) * width * 2;
    this.y = (Math.random() - 0.5) * height * 2;
    this.z = (Math.random() - 0.5) * 1000;
    this.targetX = this.x;
    this.targetY = this.y;
    this.targetZ = 0;
    this.vx = 0;
    this.vy = 0;
    this.vz = 0;
    this.size = Math.random() * 1.2 + 0.3;
    
    if (Math.random() > 0.3) {
      this.baseColor = { r: 0, g: 255, b: 255 };
    } else {
      this.baseColor = { r: 255, g: 0, b: 255 };
    }
    this.color = `rgba(${this.baseColor.r}, ${this.baseColor.g}, ${this.baseColor.b}, 1)`;
    
    this.friction = 0.88;
    this.ease = 0.02 + Math.random() * 0.03;
    this.angle = Math.random() * Math.PI * 2;
    this.radius = Math.random() * 300 + 50;
    this.orbitSpeed = (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1);
  }

  update(width: number, height: number, stage: number, stageColor: string) {
    if (this.state === "galaxy") {
      this.angle += this.orbitSpeed;
      const spiralRadius = this.radius + (stage === 0 ? Math.sin(this.angle * 2) * 20 : 0);
      this.targetX = Math.cos(this.angle) * spiralRadius;
      this.targetY = Math.sin(this.angle) * spiralRadius;
      this.targetZ = Math.sin(this.angle * 3) * 50;
    }

    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const dz = this.targetZ - this.z;
    
    this.vx += dx * this.ease;
    this.vy += dy * this.ease;
    this.vz += dz * this.ease;
    
    if (this.state === "jump") {
      this.vz += 3;
      if (this.z > 250) this.state = "target";
    }

    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vz *= this.friction;
    
    this.x += this.vx;
    this.y += this.vy;
    this.z += this.vz;

    if (stage === 3 || stage === 4) {
      this.x -= (stage === 4 ? 20 : 10);
      if (this.x < -width/2 - 200) this.x = width/2 + 200;
    }

    const opacity = Math.random() * 0.5 + 0.5;
    this.color = stageColor.replace("1)", `${opacity})`);
  }

  draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
    const focalLength = 400;
    const scale = focalLength / (focalLength + this.z);
    const px = width / 2 + this.x * scale;
    const py = height / 2 + this.y * scale;

    if (px < 0 || px > width || py < 0 || py > height) return;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(px, py, this.size * scale, 0, Math.PI * 2);
    ctx.fill();

    if (Math.random() > 0.99) {
      ctx.shadowBlur = 10 * scale;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }
}

export function TechIntro({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);
  const [stage, setStage] = useState(0); 
  const [logs, setLogs] = useState<string[]>([]);
  const particles = useRef<Particle[]>([]);
  const speedStreaks = useRef<{x: number, y: number, length: number, speed: number}[]>([]);
  const shockwaves = useRef<{r: number, opacity: number}[]>([]);
  const animationFrame = useRef<number>();
  const [hudData, setHudData] = useState({ progress: 0, encrypt: "STANDBY" });

  const stageColors = [
    "rgba(0, 255, 255, 1)",   // Galaxy
    "rgba(0, 255, 120, 1)",   // Computers
    "rgba(255, 255, 255, 1)", // Text
    "rgba(255, 40, 40, 1)",    // Car
    "rgba(0, 150, 255, 1)"    // Jet
  ];

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 8));
  };

  const initParticles = (width: number, height: number) => {
    const count = 5500;
    particles.current = [];
    for (let i = 0; i < count; i++) {
      particles.current.push(new Particle(width, height));
    }
  };

  const initSpeedStreaks = (width: number, height: number) => {
    speedStreaks.current = Array.from({ length: 40 }, () => ({
      x: Math.random() * width - width/2,
      y: Math.random() * height - height/2,
      length: Math.random() * 200 + 100,
      speed: Math.random() * 40 + 20
    }));
  };

  const addShockwave = () => {
    shockwaves.current.push({ r: 0, opacity: 1 });
  };

  const drawShape = (stage: number, width: number, height: number) => {
    const hCanvas = hiddenCanvasRef.current;
    if (!hCanvas) return;
    const hCtx = hCanvas.getContext("2d", { willReadFrequently: true });
    if (!hCtx) return;

    hCtx.clearRect(0, 0, width, height);
    hCtx.fillStyle = "white";
    const cx = width / 2;
    const cy = height / 2;

    if (stage === 1) {
      const size = Math.min(width, height) * 0.18;
      hCtx.save();
      for (let i = -1; i <= 1; i++) {
        hCtx.setTransform(1, i * 0.25, 0, 1, cx + i * size * 1.6, cy);
        hCtx.fillRect(-size/2, -size/2, size, size * 0.75);
        hCtx.fillRect(-size/6, size * 0.25, size/3, size * 0.3);
        hCtx.fillRect(-size/2.5, size * 0.5, size/1.2, size * 0.05);
      }
      hCtx.restore();
    } else if (stage === 2) {
      hCtx.font = `bold ${Math.min(width, height) * 0.1}px monospace`;
      hCtx.textAlign = "center";
      hCtx.fillText("JAH SEE TOO", cx, cy);
    } else if (stage === 3) {
      const w = Math.min(width, height) * 0.7;
      hCtx.beginPath();
      hCtx.moveTo(cx - w/2, cy + 20);
      hCtx.lineTo(cx - w/2.1, cy - 20);
      hCtx.lineTo(cx - w/4, cy - 50);
      hCtx.lineTo(cx + w/6, cy - 60);
      hCtx.lineTo(cx + w/2, cy - 10);
      hCtx.lineTo(cx + w/2, cy + 30);
      hCtx.lineTo(cx - w/2, cy + 30);
      hCtx.fill();
      hCtx.beginPath();
      hCtx.arc(cx - w/3.5, cy + 30, 25, 0, Math.PI * 2);
      hCtx.arc(cx + w/3.5, cy + 30, 25, 0, Math.PI * 2);
      hCtx.fill();
    } else if (stage === 4) {
      const w = Math.min(width, height) * 0.6;
      hCtx.beginPath();
      hCtx.moveTo(cx - w/2, cy);
      hCtx.lineTo(cx, cy - 20);
      hCtx.lineTo(cx + w/4, cy - 80);
      hCtx.lineTo(cx + w/3, cy - 10);
      hCtx.lineTo(cx + w/2, cy - 50);
      hCtx.lineTo(cx + w/2, cy + 50);
      hCtx.lineTo(cx + w/3, cy + 10);
      hCtx.lineTo(cx + w/4, cy + 80);
      hCtx.lineTo(cx, cy + 20);
      hCtx.closePath();
      hCtx.fill();
    }

    const imageData = hCtx.getImageData(0, 0, width, height).data;
    const points: Point[] = [];
    const step = 3;
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        if (imageData[(y * width + x) * 4 + 3] > 128) {
          points.push({ x: x - width/2, y: y - height/2 });
        }
      }
    }

    if (points.length === 0) return;
    particles.current.forEach((p, i) => {
      const pt = points[i % points.length];
      p.targetX = pt.x;
      p.targetY = pt.y;
      p.targetZ = 0;
      p.state = stage === 2 ? "jump" : "target";
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);
    hiddenCanvasRef.current!.width = width;
    hiddenCanvasRef.current!.height = height;

    initParticles(width, height);
    initSpeedStreaks(width, height);

    const animate = () => {
      ctx.fillStyle = "rgba(0, 1, 3, 0.3)";
      ctx.fillRect(0, 0, width, height);

      const color = stageColors[stage];

      if (stage === 3 || stage === 4) {
        ctx.strokeStyle = "rgba(0, 255, 255, 0.15)";
        ctx.lineWidth = 1;
        speedStreaks.current.forEach(s => {
          const px = width/2 + s.x;
          const py = height/2 + s.y;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px + s.length, py);
          ctx.stroke();
          s.x -= s.speed;
          if (s.x < -width/2 - s.length) s.x = width/2;
        });
      }

      particles.current.forEach((p) => {
        p.update(width, height, stage, color);
        p.draw(ctx, width, height);
      });

      shockwaves.current.forEach((s, i) => {
        ctx.strokeStyle = `rgba(0, 255, 255, ${s.opacity})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(width/2, height/2, s.r, 0, Math.PI * 2);
        ctx.stroke();
        s.r += 20;
        s.opacity -= 0.02;
        if (s.opacity <= 0) shockwaves.current.splice(i, 1);
      });

      ctx.strokeStyle = "rgba(0, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      for (let i = 0; i < height; i += 6) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(width, i); ctx.stroke();
      }

      animationFrame.current = requestAnimationFrame(animate);
    };

    animate();

    const sequence = [
      () => { addLog("INITIATING COSMIC_GENESIS..."); setHudData({ progress: 10, encrypt: "SCANNING" }); },
      () => { setStage(1); drawShape(1, width, height); addLog("SYNCING THE_GRID_TERMINALS..."); setHudData({ progress: 35, encrypt: "DECRYPTING" }); },
      () => { setStage(2); drawShape(2, width, height); addLog("SYNTHESIZING DIGITAL_SUBTITLES..."); setHudData({ progress: 55, encrypt: "VERIFYING" }); },
      () => { setStage(3); drawShape(3, width, height); addLog("TRANSFORMING KINETIC_CHASSIS..."); setHudData({ progress: 75, encrypt: "ACCELERATING" }); },
      () => { 
        setStage(4); 
        drawShape(4, width, height); 
        addLog("ASCENDING AERODYNAMIC_STATE..."); 
        setHudData({ progress: 95, encrypt: "BLAST_OFF" });
        setTimeout(addShockwave, 500);
        setTimeout(addShockwave, 800);
      },
    ];

    const timeouts = [0, 2500, 5500, 8500, 11500].map((ms, i) => setTimeout(sequence[i], ms));
    const finalTimer = setTimeout(onComplete, 14500);

    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      timeouts.forEach(clearTimeout);
      clearTimeout(finalTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#000205] overflow-hidden font-mono">
      <div className="absolute inset-0 pointer-events-none border-[30px] border-cyan-500/5 mix-blend-screen">
        <div className="absolute top-10 left-10 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-cyan-500 animate-ping" />
            <span className="text-cyan-400 text-lg tracking-widest">JST_CORE_v4.0</span>
          </div>
          <div className="w-64 h-2 bg-cyan-950 border border-cyan-500/30 overflow-hidden">
            <motion.div 
              className="h-full bg-cyan-500" 
              initial={{ width: 0 }}
              animate={{ width: `${hudData.progress}%` }}
              transition={{ duration: 2 }}
            />
          </div>
          <div className="text-xs text-cyan-500/60 uppercase">
            Seq_Status: {hudData.encrypt} | Load: {(hudData.progress * 0.8).toFixed(1)}%
          </div>
        </div>

        <div className="absolute bottom-10 left-10 space-y-1">
          {logs.map((log, i) => (
            <motion.div 
              key={i} 
              initial={{ x: -20, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 - i * 0.1 }}
              className="text-[10px] text-cyan-400"
            >
              <span className="text-cyan-600">[{new Date().toLocaleTimeString()}]</span> {log}
            </motion.div>
          ))}
        </div>

        <div className="absolute bottom-10 right-10 text-right">
          <div className="text-4xl text-cyan-500/20 font-bold mb-2">0x{hudData.progress}FF</div>
          <div className="text-[10px] text-cyan-400/50 uppercase tracking-[0.4em]">
            Authorized_Access_Only<br />
            Malaysia_Sec_Protocol
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cyan-500/5 rounded-full animate-[spin_20s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-t-2 border-b-2 border-cyan-500/10 rounded-full animate-[spin_10s_linear_infinite_reverse]" />
      </div>

      <canvas ref={canvasRef} className="w-full h-full" />
      <canvas ref={hiddenCanvasRef} className="hidden" />

      <motion.button
        whileHover={{ scale: 1.05, letterSpacing: "0.4em" }}
        onClick={onComplete}
        className="absolute top-10 right-10 text-cyan-400 border border-cyan-500/40 px-8 py-2 text-xs tracking-[0.2em] uppercase z-[110] bg-black/40 backdrop-blur-sm"
      >
        Abort_Sequence
      </motion.button>

      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
