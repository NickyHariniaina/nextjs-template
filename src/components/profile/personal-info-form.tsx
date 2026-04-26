"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
    setIsPending(false);
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-lg p-6">
      <h2 className="font-semibold text-lg text-[#c5b5f0] mb-4">Personal Information</h2>
      
      <div className="border-t border-white/10 mb-4" />
      
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-white/60">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
            className="input-dark"
            placeholder="First Name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-white/60">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
            className="input-dark"
            placeholder="Last Name"
          />
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <Label htmlFor="username" className="text-white/60">Username</Label>
        <Input
          id="username"
          value={formData.username}
          onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
          className="input-dark"
          placeholder="username"
        />
      </div>
      
      <div className="space-y-2 mb-4">
        <Label htmlFor="email" className="text-white/60">Email</Label>
        <Input
          id="email"
          value={user?.email ?? ""}
          disabled
          className="input-dark opacity-50 cursor-not-allowed"
          placeholder="email@example.com"
        />
        <p className="text-white/40 text-xs">Email cannot be changed</p>
      </div>
      
      <Button
        type="submit"
        disabled={isPending}
        className="bg-[#a089df] hover:bg-[#a089df]/90 text-white"
      >
        Save Changes
      </Button>
    </form>
  );
}