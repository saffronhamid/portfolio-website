import Link from "next/link";
import FadeIn from "../components/FadeIn";
import SectionHeader from "../components/SectionHeader";

export default function BatTrackingPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6">
      <div className="mb-10">
        <Link
          href="/#focus"
          className="btn-ghost inline-flex px-4 py-2 text-sm"
        >
          Back to focus
        </Link>
      </div>

      <FadeIn>
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            title="Bat Tracking"
            subtitle="Master project using all YOLO versions"
            description="Applied vision research with a focus on multi-object tracking in low-light environments."
          />
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted">
            <span className="chip">Computer Vision</span>
            <span className="chip">YOLO Benchmarks</span>
            <span className="chip">Research</span>
          </div>
        </div>
      </FadeIn>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <section className="panel card-hover p-6">
          <h2 className="text-lg font-semibold text-ink">Overview</h2>
          <p className="mt-2 text-sm text-muted">
            Applied computer vision project focused on multi-object tracking in
            low-light environments. The study compares YOLO variants across
            detection accuracy, tracking stability, and inference efficiency.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>• End-to-end pipeline for dataset preparation and labeling.</li>
            <li>• Benchmarking across YOLO versions and tracking heads.</li>
            <li>• Deployment-ready inference with reproducible metrics.</li>
          </ul>
        </section>
        <section className="panel card-hover p-6">
          <p className="text-kicker">Project Facts</p>
          <div className="mt-4 space-y-2 text-sm text-muted">
            <p>Focus: Night-vision tracking</p>
            <p>Methods: YOLOv5–YOLOv8, DeepSORT</p>
            <p>Metrics: mAP, IDF1, FPS</p>
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6">
        <section className="panel card-hover p-6">
          <h3 className="text-base font-semibold text-ink">1. Research goals</h3>
          <p className="mt-2 text-sm text-muted">
            Establish a reliable baseline for detecting and tracking bats in
            challenging lighting while preserving high inference speed.
          </p>
        </section>

        <section className="panel card-hover p-6">
          <h3 className="text-base font-semibold text-ink">2. Data strategy</h3>
          <p className="mt-2 text-sm text-muted">
            Curated a multi-scene dataset with manual labels, augmentation, and
            temporal consistency checks to reduce false positives.
          </p>
        </section>

        <section className="panel card-hover p-6">
          <h3 className="text-base font-semibold text-ink">3. Evaluation</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>• mAP@50 and mAP@50-95 for detection quality.</li>
            <li>• IDF1 and HOTA for tracking identity stability.</li>
            <li>• FPS benchmarks on GPU for deployment targets.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
