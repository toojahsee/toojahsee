"use client";

import { motion } from "framer-motion";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const events: TimelineEvent[] = [
  { year: "Early Years", title: "Learning Linux & Fundamentals", description: "Began journey with deep dives into Linux kernel architectures, compiling custom kernels, and understanding fundamental networking protocols." },
  { year: "Phase 2", title: "Introduction to Cybersecurity", description: "Transitioned into offensive security. Set up isolated home labs to understand attack vectors and basic exploitation techniques." },
  { year: "Phase 3", title: "Vulnerability Research", description: "Started discovering zero-days in various open-source applications and contributed to bug bounty programs anonymously." },
  { year: "Phase 4", title: "Android Security & Reverse Engineering", description: "Focused heavily on mobile security, deobfuscating malicious Android APKs, and understanding Dalvik/ART runtime internals." },
  { year: "Recent", title: "Red Teaming & Advanced OSINT", description: "Leading advanced persistent threat (APT) simulations and utilizing open-source intelligence for complex geopolitical threat analysis." },
];

export function Timeline() {
  return (
    <div className="relative border-l border-wiki-border dark:border-wiki-borderDark ml-3 md:ml-4 space-y-8 mt-6">
      {events.map((event, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="relative pl-6"
        >
          <div className="absolute w-3 h-3 bg-wiki-link dark:bg-wiki-linkDark rounded-full -left-[6.5px] top-1.5 ring-4 ring-white dark:ring-[#101010]" />
          <div className="mb-1">
            <span className="font-bold text-lg font-serif">{event.year}</span>
          </div>
          <h4 className="text-md font-semibold mb-2">{event.title}</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">{event.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
