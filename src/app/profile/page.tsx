import {
  ProfileHeader,
  AboutCard,
  ProfileSkills,
  ProfileActivity,
  ProfileActions,
} from "@/components/profile";

export default function ProfilePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="aurora" />
      <div className="noise" />
      
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#a089df]/20 via-transparent to-[#faa178]/20 opacity-30 blur-3xl -z-10" />
          
          <div className="flex flex-col gap-6">
            <ProfileHeader />
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <AboutCard />
              </div>
              <div className="md:col-span-1">
                <ProfileActivity />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <ProfileSkills />
              <ProfileActions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}