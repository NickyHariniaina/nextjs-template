"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, Mail, Save } from "lucide-react";
import { toast } from "sonner";
import { useUserStore } from "@/store/useUserStore";

export default function PersonalInfoForm() {
  const { user } = useUserStore();
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    username: user?.username ?? "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated");
  };

  return (
    <form onSubmit={handleSubmit} className="p-5">
      <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4 flex items-center gap-2">
        <User className="w-4 h-4" />
        Personal Information
      </h3>
      
      <div className="border-t border-white/[0.08] mb-4" />
      
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-white/60 text-xs">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
            className="bg-white/[0.05] border-white/[0.1] focus:border-[#a089df]/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-white/60 text-xs">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
            className="bg-white/[0.05] border-white/[0.1] focus:border-[#a089df]/50"
          />
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <Label htmlFor="username" className="text-white/60 text-xs">Username</Label>
        <Input
          id="username"
          value={formData.username}
          onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
          className="bg-white/[0.05] border-white/[0.1] focus:border-[#a089df]/50"
        />
      </div>
      
      <div className="space-y-2 mb-5">
        <Label htmlFor="email" className="text-white/60 text-xs">Email</Label>
        <Input
          id="email"
          value={user?.email ?? ""}
          disabled
          className="bg-white/[0.05] border-white/[0.1] opacity-50"
        />
        <p className="text-white/30 text-xs">Email cannot be changed</p>
      </div>
      
      <Button
        type="submit"
        disabled={isPending}
        className="bg-gradient-to-r from-[#a089df] to-[#807be4] hover:opacity-90 text-white"
      >
        <Save className="w-4 h-4 mr-2" />
        Save Changes
      </Button>
    </form>
  );
}