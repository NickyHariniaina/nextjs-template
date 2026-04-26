export default function ProfileActivity() {
  const activities = [
    "Completed onboarding",
    "Updated profile",
  ];

  return (
    <div className="glass rounded-lg p-6">
      <h2 className="font-semibold text-lg text-[#c5b5f0] mb-4">Recent Activity</h2>
      <ul className="flex flex-col gap-2">
        {activities.map((activity, index) => (
          <li key={index} className="text-white/60 text-sm flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a089df]" />
            {activity}
          </li>
        ))}
      </ul>
    </div>
  );
}