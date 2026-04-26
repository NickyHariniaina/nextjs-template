import {
  ProfileHeader,
  AboutCard,
  ProfileSkills,
  ProfileActivity,
  ProfileActions,
} from "@/components/profile";

export default function ProfilePage() {
  return (
    <div className="min-h-screen w-full max-w-5xl mx-auto px-4 py-8">
      <div className="relative flex flex-col gap-6">
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
  );
}