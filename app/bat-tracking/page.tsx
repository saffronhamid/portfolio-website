import Link from "next/link";
import FadeIn from "../components/FadeIn";
import SectionHeader from "../components/SectionHeader";

export default function BatTrackingPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 pb-24 pt-14 sm:px-10">
      <div className="mb-12">
        <Link
          href="/#work"
          className="text-mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back
        </Link>
      </div>

      <FadeIn>
        <SectionHeader
          number="case study"
          title="Bat Tracking."
          description="Master's research on multi-object tracking in low-light environments — benchmarking every YOLO release across detection accuracy, tracking stability, and inference efficiency."
        />
        <div className="mb-12 flex flex-wrap gap-2">
          <span className="chip">Computer Vision</span>
          <span className="chip">YOLO Benchmarks</span>
          <span className="chip">Research</span>
        </div>
      </FadeIn>

      <div className="grid gap-12 md:grid-cols-[1.4fr_0.6fr]">
        <section className="flex flex-col gap-4 border-t border-white/[0.06] py-8">
          <h2 className="text-display text-xl font-medium text-foreground">Overview</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Applied computer vision project focused on multi-object tracking in
            low-light environments. The study compares YOLO variants across
            detection accuracy, tracking stability, and inference efficiency.
          </p>
          <ul className="mt-2 flex flex-col gap-2 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="mt-2 inline-block h-px w-3 shrink-0 bg-muted-foreground/40" />
              End-to-end pipeline for dataset preparation and labeling.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 inline-block h-px w-3 shrink-0 bg-muted-foreground/40" />
              Benchmarking across YOLO versions and tracking heads.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 inline-block h-px w-3 shrink-0 bg-muted-foreground/40" />
              Deployment-ready inference with reproducible metrics.
            </li>
          </ul>
        </section>
        <aside className="flex flex-col gap-5 border-t border-white/[0.06] py-8">
          <span className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Project facts
          </span>
          <dl className="flex flex-col gap-3 text-sm">
            <div className="flex flex-col gap-0.5">
              <dt className="text-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
                Focus
              </dt>
              <dd className="text-foreground/85">Night-vision tracking</dd>
            </div>
            <div className="flex flex-col gap-0.5">
              <dt className="text-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
                Methods
              </dt>
              <dd className="text-foreground/85">YOLOv5 – YOLOv8 · DeepSORT</dd>
            </div>
            <div className="flex flex-col gap-0.5">
              <dt className="text-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
                Metrics
              </dt>
              <dd className="text-foreground/85">mAP · IDF1 · FPS</dd>
            </div>
          </dl>
        </aside>
      </div>

      <div className="mt-12 grid gap-px bg-white/[0.06]">
        <section className="flex flex-col gap-3 bg-[#0a0a0a] p-8">
          <span className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
            01 — Research goals
          </span>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Establish a reliable baseline for detecting and tracking bats in
            challenging lighting while preserving high inference speed.
          </p>
        </section>

        <section className="flex flex-col gap-3 bg-[#0a0a0a] p-8">
          <span className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
            02 — Data strategy
          </span>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Curated a multi-scene dataset with manual labels, augmentation, and
            temporal consistency checks to reduce false positives.
          </p>
        </section>

        <section className="flex flex-col gap-3 bg-[#0a0a0a] p-8">
          <span className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
            03 — Evaluation
          </span>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="mt-2 inline-block h-px w-3 shrink-0 bg-muted-foreground/40" />
              mAP@50 and mAP@50-95 for detection quality.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 inline-block h-px w-3 shrink-0 bg-muted-foreground/40" />
              IDF1 and HOTA for tracking identity stability.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 inline-block h-px w-3 shrink-0 bg-muted-foreground/40" />
              FPS benchmarks on GPU for deployment targets.
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
