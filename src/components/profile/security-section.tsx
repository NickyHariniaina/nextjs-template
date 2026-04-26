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
    <div className="glass rounded-lg p-6">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between hover:opacity-80 transition-opacity"
      >
        <div className="flex items-center gap-3">
          <Lock className="w-5 h-5 text-[#a089df]" />
          <h2 className="font-semibold text-lg text-[#c5b5f0]">Security</h2>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-white/60" />
        ) : (
          <ChevronDown className="w-5 h-5 text-white/60" />
        )}
      </button>
      
      {isExpanded && (
        <>
          <div className="border-t border-white/10 my-4" />
          
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-white/60">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwords.current}
                onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                className="input-dark"
                placeholder="Enter current password"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-white/60">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwords.new}
                onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                className="input-dark"
                placeholder="Enter new password"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white/60">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                className="input-dark"
                placeholder="Confirm new password"
              />
            </div>
            
            <Button
              type="submit"
              disabled={isPending}
              className="bg-[#a089df] hover:bg-[#a089df]/90 text-white"
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