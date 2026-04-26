"use client";

import { Clock, TrendingUp } from "lucide-react";

export default function ProfileActivity() {
  const activities = [
    { text: "Completed onboarding", time: "2 days ago", icon: "✨" },
    { text: "Updated profile", time: "1 day ago", icon: "📝" },
    { text: "First login", time: "3 days ago", icon: "🔗" },
  ];

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 p-5">
      <div className="absolute inset-0 bg-gradient-to-br from-[#faa178]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Recent Activity
        </h3>
        
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer"
            >
              <span className="text-lg">{activity.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-white/90 text-sm truncate">{activity.text}</div>
                <div className="text-white/40 text-xs">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}