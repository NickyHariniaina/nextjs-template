import UpdateProfilePanel from "@/components/profile/update-profile-panel";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const ProfileSettingPage = async () => {
  const session = auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth");
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="aurora" />
      <div className="noise" />
      <div className="relative z-10">
        <UpdateProfilePanel />
      </div>
    </div>
  );
};

export default ProfileSettingPage;