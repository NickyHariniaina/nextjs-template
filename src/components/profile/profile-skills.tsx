"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function ProfileSkills() {
  const [skills] = useState(["React", "TypeScript", "Next.js"]);

  return (
    <div className="glass rounded-lg p-6">
      <h2 className="font-semibold text-lg text-[#c5b5f0] mb-4">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-[#a089df]/20 text-[#c5b5f0] rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full text-white/60 hover:text-white"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}