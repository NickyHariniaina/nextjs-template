"use client";

import { useState } from "react";
import { Plus, Sparkles } from "lucide-react";

export default function ProfileSkills() {
  const [skills] = useState(["React", "TypeScript", "Next.js", "Node.js", "PostgreSQL"]);

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 p-5">
      <div className="absolute inset-0 bg-gradient-to-br from-[#807be4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Skills
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={skill}
              className="px-3 py-1.5 text-sm bg-gradient-to-r from-[#a089df]/20 to-[#807be4]/20 text-white/90 rounded-full border border-white/[0.08] hover:border-white/[0.2] hover:bg-gradient-to-r hover:from-[#a089df]/30 hover:to-[#807be4]/30 transition-all duration-200 cursor-pointer"
            >
              {skill}
            </span>
          ))}
          <button className="px-3 py-1.5 text-sm text-white/40 hover:text-white/60 rounded-full border border-dashed border-white/[0.15] hover:border-white/[0.3] transition-all duration-200 flex items-center gap-1">
            <Plus className="w-3 h-3" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}