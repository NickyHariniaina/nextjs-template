import {
  ProfileHeader,
  AboutCard,
  StatsCard,
  ProfileSkills,
  ProfileActivity,
  ProfileActions,
} from "@/components/profile";

export default function ProfilePage() {
  return (
    <div className="min-h-screen w-full max-w-4xl mx-auto p-6 flex flex-col gap-6">
      <ProfileHeader />
      
      <div className="grid md:grid-cols-2 gap-6">
        <AboutCard />
        <StatsCard />
      </div>
      
      <ProfileSkills />
      <ProfileActivity />
      <ProfileActions />
    </div>
  );
}