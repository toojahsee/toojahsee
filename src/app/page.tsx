"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Infobox } from "@/components/Infobox";
import { Timeline } from "@/components/Timeline";
import { SkillBar } from "@/components/SkillBar";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { TechIntro } from "@/components/TechIntro";
import { Header } from "@/components/Header";
import { ExternalLink, Terminal, Shield, Cpu, Lock, BookOpen, Globe } from "lucide-react";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div key="intro" exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <TechIntro onComplete={() => setShowIntro(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative"
          >
            <Header />
            <ParticlesBackground />
            
            <div className="max-w-7xl mx-auto px-6 py-12">
              <article className="wiki-article relative z-10">
                
                {/* Tactical Header */}
                <header className="mb-12 border-l-4 border-cyan-500 pl-6 py-2 bg-cyan-950/5 backdrop-blur-sm">
                  <h1 className="text-4xl md:text-6xl font-black !border-0 !mb-0 !p-0 tracking-tighter">
                    JAH SEE TOO
                  </h1>
                  <div className="flex items-center space-x-4 mt-2 text-xs font-mono text-cyan-500/60 uppercase tracking-[0.3em]">
                    <span>[ Archive_ID: 0x8892 ]</span>
                    <span className="w-1 h-1 bg-cyan-900 rounded-full" />
                    <span>Cleared_Access: Level_5</span>
                  </div>
                </header>

                {/* Main Content Area */}
                <div className="clearfix">
                  <Infobox />
                  
                  <motion.div initial="hidden" animate="visible" variants={fadeIn} className="font-mono text-sm leading-relaxed text-cyan-100/70">
                    <p className="text-lg text-cyan-50 border-b border-cyan-950 pb-4 mb-6">
                      <b className="text-cyan-400">Jah See Too</b> (born widely known in cyberspace) is a Malaysian cybersecurity researcher, reverse engineer, and red teamer. Widely recognized in the Infosec community as <b className="text-white bg-cyan-900/30 px-1">"Malaysia's First Chinese Hacker"</b>, Too has made significant contributions to the fields of open-source intelligence (OSINT), advanced malware analysis, and offensive security research.
                    </p>
                    <p>
                      His work primarily focuses on reverse engineering complex Android applications, deobfuscating malicious traffic, and simulating advanced persistent threat (APT) attacks for enterprise security hardening. Known for maintaining a low profile while delivering high-impact vulnerabilities to bug bounty programs, Too bridges the gap between traditional software engineering and modern exploit development.
                    </p>
                  </motion.div>

                  {/* Tactical TOC */}
                  <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mt-8 wiki-panel p-6 max-w-sm border-l-2 border-cyan-500">
                    <div className="text-xs font-bold mb-4 text-cyan-400 uppercase tracking-widest flex items-center">
                      <Terminal className="w-4 h-4 mr-2" />
                      Root_Directory
                    </div>
                    <ul className="text-xs font-mono space-y-3 list-none pl-2">
                      <li><a href="#biography" className="wiki-link opacity-60 hover:opacity-100 flex items-center">01_BIOGRAPHY</a></li>
                      <li><a href="#skills" className="wiki-link opacity-60 hover:opacity-100 flex items-center">02_SKILL_MATRIX</a></li>
                      <li><a href="#timeline" className="wiki-link opacity-60 hover:opacity-100 flex items-center">03_EVENT_LOG</a></li>
                      <li><a href="#projects" className="wiki-link opacity-60 hover:opacity-100 flex items-center">04_PROJECT_VAULT</a></li>
                      <li><a href="#gallery" className="wiki-link opacity-60 hover:opacity-100 flex items-center">05_MEDIA_ASSETS</a></li>
                    </ul>
                  </motion.div>
                </div>

                {/* Biography Section */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} id="biography" className="mt-16">
                  <h2 className="text-2xl font-bold flex items-center">
                    <span className="text-cyan-500 mr-3">01.</span> BIOGRAPHY
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8 mt-6 font-mono text-xs text-cyan-100/60 leading-relaxed">
                    <p>
                      Too's early interest in technology began with deep dives into Linux kernel architectures and fundamental networking protocols. Self-taught in various programming paradigms, he quickly transitioned from software development to offensive security. His initial incursions into the field involved setting up isolated homelabs to understand attack vectors, exploit development, and basic network pivoting.
                    </p>
                    <p>
                      As he progressed, his focus shifted towards mobile security, specifically the Android operating system. He spent years dissecting the Dalvik and ART runtimes, uncovering zero-day vulnerabilities in heavily obfuscated malware strains that were targeting Southeast Asian banking infrastructure.
                    </p>
                  </div>
                </motion.section>

                {/* Skills Section */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} id="skills" className="mt-20">
                  <h2 className="text-2xl font-bold flex items-center">
                    <span className="text-cyan-500 mr-3">02.</span> SKILL_MATRIX
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
                    <div className="space-y-6">
                      <SkillBar skill="Reverse Engineering (IDA/Ghidra)" percentage={95} />
                      <SkillBar skill="Android Security & Exploitation" percentage={90} />
                      <SkillBar skill="Malware Traffic Analysis" percentage={88} />
                      <SkillBar skill="Red Teaming (Cobalt Strike/Sliver)" percentage={85} />
                    </div>
                    <div className="space-y-6">
                      <SkillBar skill="OSINT & Threat Intelligence" percentage={92} />
                      <SkillBar skill="Network Protocol Analysis" percentage={85} />
                      <SkillBar skill="Linux Kernel Internals" percentage={80} />
                      <SkillBar skill="Python / C / Assembly" percentage={88} />
                    </div>
                  </div>
                </motion.section>

                {/* Projects Section */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} id="projects" className="mt-20">
                  <h2 className="text-2xl font-bold flex items-center">
                    <span className="text-cyan-500 mr-3">04.</span> PROJECT_VAULT
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {[
                      { icon: Terminal, title: "Android RE Framework", desc: "Automated deobfuscation and static analysis pipeline for highly packed APKs." },
                      { icon: Shield, title: "APT Simulation Lab", desc: "Enterprise-grade red team infrastructure mirroring state-sponsored threat actors." },
                      { icon: Globe, title: "OSINT Investigator toolkit", desc: "Custom scripts aggregating data from darknet markets and public breach databases." },
                      { icon: Cpu, title: "Malware Traffic Analyzer", desc: "Heuristic-based PCAP analysis tool for identifying C2 beacons in encrypted traffic." },
                      { icon: Lock, title: "Kernel Exploit Dev", desc: "Research into LPE (Local Privilege Escalation) vulnerabilities in outdated Linux kernels." },
                      { icon: BookOpen, title: "SecWiki Malaysia", desc: "Founding contributor to a localized knowledge base for budding security enthusiasts." }
                    ].map((project, i) => {
                      const Icon = project.icon;
                      return (
                        <div key={i} className="group relative border border-cyan-500/20 p-6 bg-cyan-950/10 hover:bg-cyan-500/5 transition-all cursor-pointer">
                          <div className="absolute top-0 left-0 w-1 h-0 bg-cyan-500 group-hover:h-full transition-all" />
                          <Icon className="w-8 h-8 text-cyan-500 mb-4 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                          <h3 className="font-bold text-sm text-cyan-100 mb-2 uppercase tracking-widest">{project.title}</h3>
                          <p className="text-[10px] text-cyan-500/60 leading-normal">{project.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </motion.section>

              </article>

              {/* Tactical Footer */}
              <footer className="mt-32 pt-12 pb-8 border-t border-cyan-500/20 font-mono">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-cyan-500/40 uppercase tracking-[0.2em]">
                  <div className="text-center md:text-left space-y-2">
                    <p>Last_Update: {new Date().toLocaleDateString()} @ 13:37:00_UTC</p>
                    <p>Encryption_Protocol: AES-256-GCM_Active</p>
                  </div>
                  <div className="flex space-x-6">
                    <a href="#" className="hover:text-cyan-400 transition-colors">Privacy_Protocol</a>
                    <a href="#" className="hover:text-cyan-400 transition-colors">Nodes_Network</a>
                    <a href="#" className="hover:text-cyan-400 transition-colors">Disclaimers</a>
                  </div>
                </div>
                <div className="mt-8 text-center text-[8px] opacity-20 text-cyan-500 uppercase tracking-[1em]">
                  Malaysia_Cyber_Security_Defense_Network
                </div>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
