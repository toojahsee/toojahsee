"use client";

import { motion } from "framer-motion";
import { Cpu, Globe, Lock, Shield, User } from "lucide-react";

export function Infobox() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="float-none md:float-right clear-right w-full md:w-[320px] mb-6 md:ml-8 font-mono"
    >
      <div className="relative border border-cyan-500/30 bg-black/40 backdrop-blur-md overflow-hidden p-1">
        {/* Scanning Light Effect */}
        <div className="absolute inset-0 scanning-line" />
        
        {/* Header Bar */}
        <div className="bg-cyan-500/10 border-b border-cyan-500/30 p-3 text-center">
          <h2 className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-lg">Tactical_Profile</h2>
          <div className="text-[9px] text-cyan-500/40 uppercase mt-1">Identity_Verification: 100%</div>
        </div>

        {/* Profile Image Area */}
        <div className="relative aspect-square m-2 bg-cyan-950/20 border border-cyan-500/20 overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <User className="w-24 h-24 text-cyan-500/20" />
          </div>
          <div className="absolute bottom-2 left-2 z-20">
            <div className="text-[8px] text-cyan-400/80 bg-black/60 px-2 py-0.5 border border-cyan-500/30 uppercase">
              IMG_REF: 0xDEADBEEF
            </div>
          </div>
          {/* Glitch Overlay on Hover */}
          <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity z-15" />
        </div>

        {/* Info Table */}
        <div className="p-3 space-y-4">
          <InfoRow label="SUBJECT" value="Jah See Too" color="text-white" />
          <InfoRow label="ALIAS" value="Cyber_Sentinel" color="text-cyan-400" />
          <InfoRow label="ORIGIN" value="Malaysia [MY]" />
          <InfoRow label="ROLE" value="Red_Team_Ops" />
          <InfoRow label="CLASS" value="Elite_Hacker" />
          
          <div className="pt-4 border-t border-cyan-500/10">
            <div className="text-[9px] text-cyan-500/40 mb-2 uppercase font-bold tracking-widest">Core_Skillset</div>
            <div className="flex flex-wrap gap-2">
              {["RE", "OSINT", "APT", "VULN"].map(tag => (
                <span key={tag} className="text-[8px] px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-cyan-500/10 flex justify-between items-center">
            <span className="text-[9px] text-cyan-500/40 uppercase">Uplink_Node</span>
            <a href="#" className="text-[10px] text-cyan-400 hover:text-white transition-colors">jahseetoo.io</a>
          </div>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400" />
      </div>
    </motion.div>
  );
}

function InfoRow({ label, value, color = "text-cyan-100/80" }: { label: string, value: string, color?: string }) {
  return (
    <div className="flex justify-between items-start text-[11px]">
      <span className="text-cyan-500/50 uppercase font-bold tracking-tighter mr-4">[{label}]</span>
      <span className={`text-right ${color} font-medium`}>{value}</span>
    </div>
  );
}
