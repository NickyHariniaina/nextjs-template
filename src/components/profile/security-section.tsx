"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp, Lock, KeyRound } from "lucide-react";
import { toast } from "sonner";

export default function SecuritySection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwords.new !== passwords.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (passwords.new.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    
    try {
      setIsPending(true);
      toast.success("Password updated");
      setPasswords({ current: "", new: "", confirm: "" });
      setIsExpanded(false);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="p-5">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between hover:opacity-80 transition-opacity"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#faa178]/10 flex items-center justify-center">
            <Lock className="w-4 h-4 text-[#faa178]" />
          </div>
          <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider">Security</h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-white/60" />
        ) : (
          <ChevronDown className="w-5 h-5 text-white/60" />
        )}
      </button>
      
      {isExpanded && (
        <>
          <div className="border-t border-white/[0.08] my-4" />
          
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-white/60 text-xs">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwords.current}
                onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                className="bg-white/[0.05] border-white/[0.1] focus:border-[#faa178]/50"
                placeholder="Enter current password"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-white/60 text-xs">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwords.new}
                onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                className="bg-white/[0.05] border-white/[0.1] focus:border-[#faa178]/50"
                placeholder="Enter new password"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white/60 text-xs">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                className="bg-white/[0.05] border-white/[0.1] focus:border-[#faa178]/50"
                placeholder="Confirm new password"
              />
            </div>
            
            <Button
              type="submit"
              disabled={isPending}
              className="bg-gradient-to-r from-[#faa178] to-[#a089df] hover:opacity-90 text-white"
            >
              <KeyRound className="w-4 h-4 mr-2" />
              Change Password
            </Button>
          </form>
        </>
      )}
    </div>
  );
}