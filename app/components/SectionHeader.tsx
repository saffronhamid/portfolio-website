type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  description?: string;
};

export default function SectionHeader({
  title,
  subtitle,
  description,
}: SectionHeaderProps) {
  return (
    <div className="mb-10">
      {subtitle && (
        <p className="text-xs uppercase tracking-[0.32em] text-amber-200/80">
          {subtitle}
        </p>
      )}
      <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
        <span className="typewriter section-title">{title}</span>
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-sm text-zinc-400 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
