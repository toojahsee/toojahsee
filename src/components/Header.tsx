"use client";

import { Menu, Search, User, Moon, Sun, ShieldCheck, Terminal as TerminalIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState("SECURE");

  useEffect(() => {
    setMounted(true);
    const intervals = ["ENCRYPTED", "AUTHORIZED", "SECURE", "LIVE_NODE"];
    let i = 0;
    const timer = setInterval(() => {
      setStatus(intervals[i % intervals.length]);
      i++;
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-black/60 backdrop-blur-xl border-b border-cyan-500/30">
      <div className="flex items-center justify-between h-16 px-6 max-w-7xl mx-auto font-mono">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 group cursor-pointer">
            <TerminalIcon className="w-6 h-6 text-cyan-400 group-hover:animate-pulse" />
            <span className="text-xl font-bold tracking-tighter text-white">JST<span className="text-cyan-400">_WIKI</span></span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-4 text-[10px] text-cyan-500/50 uppercase tracking-[0.2em]">
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
              <span>STATUS: {status}</span>
            </div>
            <span className="text-cyan-900">|</span>
            <span>UPLINK: ACTIVE</span>
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500/50 group-focus-within:text-cyan-400 transition-colors" />
            <input 
              type="text" 
              placeholder="QUERY_DATABASE..." 
              className="w-full h-10 pl-11 pr-4 text-xs bg-cyan-950/20 border border-cyan-500/20 rounded-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all placeholder:text-cyan-900 text-cyan-100"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-cyan-900 font-bold group-focus-within:text-cyan-500 transition-colors">
              [CMD+K]
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {mounted && (
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 hover:bg-cyan-500/10 rounded-sm border border-transparent hover:border-cyan-500/20 transition-all text-cyan-400"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
          
          <div className="flex items-center space-x-4">
            <button className="hidden sm:flex items-center space-x-2 text-[10px] text-cyan-400 hover:text-white transition-colors uppercase font-bold tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>Access_Vault</span>
            </button>
            <div className="h-4 w-[1px] bg-cyan-900 hidden sm:block" />
            <button className="text-[10px] text-cyan-400 hover:text-white transition-colors uppercase font-bold tracking-widest">
              UPLINK_LOGIN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
