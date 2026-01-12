export default function SkillGroup({
  title,
  skills,
}: {
  title: string;
  skills: string[];
}) {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2 text-sm text-zinc-300">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-white/10 bg-black/30 px-3 py-1"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
