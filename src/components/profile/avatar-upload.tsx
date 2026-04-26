"use client";

import { useRef, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { useUserStore } from "@/store/useUserStore";
import { getImageUrlAction } from "@/app/actions/get-image-url.action";
import { removeImageUrlAction } from "@/app/actions/remove-image-url.action";
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
        toast.success("Avatar removed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="p-5">
      <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4 flex items-center gap-2">
        <Upload className="w-4 h-4" />
        Profile Photo
      </h3>
      
      <div className="flex items-center gap-6">
        <div 
          onClick={() => inputRef.current?.click()}
          className="relative group cursor-pointer shrink-0"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-br from-[#a089df] via-[#807be4] to-[#faa178] rounded-full opacity-50 blur-md group-hover:opacity-80 transition-opacity duration-500" />
          <div className="relative w-24 h-24 rounded-full p-0.5 bg-gradient-to-br from-[#a089df] via-[#807be4] to-[#faa178]">
            <Avatar className="w-full h-full bg-[#0d0a1e] rounded-full">
              <AvatarImage src={user?.image ?? undefined} className="object-cover" />
            </Avatar>
          </div>
          <div className={cn(
            "absolute inset-0 rounded-full flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity",
            isPending && "opacity-100"
          )}>
            <Camera className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <p className="text-white/60 text-sm">Click to upload or drag and drop</p>
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={isPending}
              className="bg-[#a089df] hover:bg-[#a089df]/90 text-white px-4"
            >
              <Camera className="w-4 h-4 mr-2" />
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