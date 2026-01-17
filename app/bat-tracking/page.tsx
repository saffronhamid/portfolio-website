import Link from "next/link";
import FadeIn from "../components/FadeIn";
import SectionHeader from "../components/SectionHeader";

export default function BatTrackingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6">
      <div className="mb-10">
        <Link
          href="/#focus"
          className="btn-ghost inline-flex px-4 py-2 text-sm"
        >
          Back to focus
        </Link>
      </div>

      <FadeIn>
        <SectionHeader
          title="Bat Tracking"
          subtitle="Master project using all YOLO versions"
          description="Add the detailed scope, datasets, and metrics here."
        />
      </FadeIn>

      <section className="glass-card card-hover p-6">
        <h2 className="text-lg font-semibold text-white">Details</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Share the bat tracking project details, and I will format this page to
          match the low-code layout.
        </p>
      </section>
    </main>
  );
}
