"use client";

import { useRef, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useUserStore } from "@/store/useUserStore";
import { getImageUrlAction } from "@/app/actions/get-image-url.action";
import { removeImageUrlAction } from "@/app/actions/remove-image-url.action";
import { getFallbackAvatarUrlAction } from "@/app/actions/get-fallback-avatar-url.action";
import { cn } from "@/lib/utils";

export default function AvatarUpload() {
  const { user } = useUserStore();
  const [isPending, setIsPending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setIsPending(true);
      const result = await getImageUrlAction(file);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Avatar updated");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  const handleRemove = async () => {
    if (!user) return;
    try {
      setIsPending(true);
      const result = await removeImageUrlAction();
      if (result.success) {
        const fallbackUrl = getFallbackAvatarUrlAction(user.firstName, user.lastName);
        toast.success("Avatar removed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="glass rounded-lg p-6">
      <h2 className="font-semibold text-lg text-[#c5b5f0] mb-4">Profile Photo</h2>
      <div className="flex items-center gap-6">
        <div 
          onClick={() => inputRef.current?.click()}
          className="relative group cursor-pointer shrink-0"
        >
          <div className="w-24 h-24 rounded-full p-0.5 bg-gradient-to-br from-[#a089df] via-[#807be4] to-[#faa178]">
            <Avatar className="w-full h-full bg-[#0d0a1e]">
              <AvatarImage src={user?.image ?? undefined} />
            </Avatar>
          </div>
          <div className={cn(
            "absolute inset-0 rounded-full flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity",
            isPending && "opacity-100"
          )}>
            <Camera className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-white/60 text-sm">Click to upload or drag and drop</p>
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={isPending}
              className="bg-[#a089df] hover:bg-[#a089df]/90 text-white"
            >
              Change
            </Button>
            <Button
              type="button"
              onClick={handleRemove}
              disabled={isPending}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <Input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
      </div>
    </div>
  );
}