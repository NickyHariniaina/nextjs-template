export default function StatsCard() {
  const stats = [
    { label: "Total", value: "12" },
    { label: "Streak", value: "5" },
    { label: "Points", value: "100" },
  ];

  return (
    <div className="glass rounded-lg p-6">
      <h2 className="font-semibold text-lg text-[#c5b5f0] mb-4">Stats</h2>
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <span className="text-2xl font-bold text-[#c5b5f0]">{stat.value}</span>
            <span className="text-white/60 text-sm">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}