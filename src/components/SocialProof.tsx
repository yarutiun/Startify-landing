"use client";

export default function SocialProof() {
  const avatars = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=sam",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=jordan",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=taylor",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=morgan",
  ];

  return (
    <section
      className="py-8"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg-secondary)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
        <div className="flex -space-x-2">
          {avatars.map((src, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full overflow-hidden ring-2"
              style={{
                border: "2px solid var(--bg-secondary)",
                background: `hsl(${i * 60 + 240}, 60%, 35%)`,
              }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" aria-hidden="true" />
            </div>
          ))}
        </div>
        <div className="text-center sm:text-left">
          <span className="font-semibold text-white">2,400+ people</span>
          <span style={{ color: "var(--text-secondary)" }}>
            {" "}are fighting task paralysis — join them
          </span>
        </div>
        <div
          className="hidden sm:block w-px h-8"
          style={{ background: "var(--border)" }}
        />
        <div className="flex items-center gap-4 text-sm" style={{ color: "var(--text-secondary)" }}>
          <span className="flex items-center gap-1.5">
            <span className="text-yellow-400">★★★★★</span>
            <span>Loved by devs & students</span>
          </span>
        </div>
      </div>
    </section>
  );
}
