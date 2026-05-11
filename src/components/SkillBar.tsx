"use client";

import { motion } from "framer-motion";

interface SkillBarProps {
  skill: string;
  percentage: number;
}

export function SkillBar({ skill, percentage }: SkillBarProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{skill}</span>
        <span className="text-sm text-gray-500">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="bg-wiki-link dark:bg-wiki-linkDark h-2.5 rounded-full"
        />
      </div>
    </div>
  );
}
