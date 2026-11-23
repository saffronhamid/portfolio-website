"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Illustrative, looping "agent run": a Gherkin scenario is typed, the agent
 * works through its steps, test code is generated and the test passes.
 * Everything is derived from one elapsed-time value, so it can be paused,
 * resumed and rendered in its final state for reduced motion.
 */

type Tok = { text: string; cls?: string };

const GHERKIN: Tok[][] = [
  [{ text: "Feature:", cls: "kw" }, { text: " Order entry validation" }],
  [],
  [{ text: "  Scenario:", cls: "kw" }, { text: " Reject order outside price band" }],
  [{ text: "    Given", cls: "step" }, { text: " an instrument with a price band of " }, { text: "5%", cls: "num" }],
  [{ text: "    When", cls: "step" }, { text: " a limit order is entered " }, { text: "7%", cls: "num" }, { text: " above reference" }],
  [{ text: "    Then", cls: "step" }, { text: " the order is rejected with " }, { text: '"PRICE_BAND"', cls: "str" }],
];

const CODE: Tok[][] = [
  [{ text: "def", cls: "kw" }, { text: " " }, { text: "test_reject_order_outside_price_band", cls: "fn" }, { text: "(exchange):" }],
  [{ text: "    inst = exchange.instrument(price_band=" }, { text: "0.05", cls: "num" }, { text: ")" }],
  [{ text: "    order = inst.limit_order(price=inst.ref * " }, { text: "1.07", cls: "num" }, { text: ")" }],
  [{ text: "    result = exchange.submit(order)" }],
  [{ text: "    assert", cls: "kw" }, { text: " result.rejected" }],
  [{ text: "    assert", cls: "kw" }, { text: " result.code == " }, { text: '"PRICE_BAND"', cls: "str" }],
];

const STEPS = [
  { label: "Parse scenario", detail: "3 steps · 1 assertion" },
  { label: "Hybrid retrieval", detail: "keyword + vector context" },
  { label: "Generate test", detail: "pytest" },
  { label: "Execute", detail: "1 passed" },
];

const len = (lines: Tok[][]) => lines.reduce((s, l) => s + l.reduce((a, t) => a + t.text.length, 0) + 1, 0);

// Timeline (ms)
const T_GHERKIN = 2600;
const T_STEP = 850;
const T_CODE = 2800;
const T_HOLD = 3200;
const G_LEN = len(GHERKIN);
const C_LEN = len(CODE);
const STEPS_START = T_GHERKIN + 200;
const CODE_START = STEPS_START + T_STEP * 2.5; // code streams while "Generate" runs
const CODE_DONE = CODE_START + T_CODE;
const EXEC_DONE = CODE_DONE + 1100;
const LOOP = EXEC_DONE + T_HOLD;

/** Slices tokenised lines down to the first `chars` characters (newlines count as one). */
function sliceLines(lines: Tok[][], chars: number) {
  const out: { tokens: Tok[]; empty: boolean; caretHere: boolean }[] = [];
  let budget = chars;
  for (let li = 0; li < lines.length; li++) {
    if (budget <= 0 && li > 0) break;
    const tokens: Tok[] = [];
    for (const tok of lines[li]) {
      if (budget <= 0) break;
      const shown = tok.text.slice(0, budget);
      budget -= shown.length;
      tokens.push({ text: shown, cls: tok.cls });
    }
    budget -= 1;
    out.push({ tokens, empty: lines[li].length === 0, caretHere: false });
  }
  if (out.length) out[out.length - 1].caretHere = true;
  return out;
}

function Typed({ lines, chars, caret }: { lines: Tok[][]; chars: number; caret: boolean }) {
  const shown = sliceLines(lines, chars);
  return (
    <>
      {shown.map((line, li) => (
        <div key={li} className="console-line">
          <span className="console-ln">{li + 1}</span>
          <span>
            {line.tokens.map((tok, ti) => (
              <span key={ti} className={tok.cls ? `tok-${tok.cls}` : undefined}>
                {tok.text}
              </span>
            ))}
            {caret && line.caretHere && <span className="console-caret" />}
            {line.empty && " "}
          </span>
        </div>
      ))}
    </>
  );
}

export default function AgentConsole() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reduced) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      setT((prev) => (prev + dt) % LOOP);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, reduced]);

  const time = reduced ? LOOP - 1 : t;
  const gChars = Math.floor(Math.min(1, time / T_GHERKIN) * G_LEN);
  const cChars = Math.floor(Math.max(0, Math.min(1, (time - CODE_START) / T_CODE)) * C_LEN);

  const stepState = (k: number) => {
    const start = STEPS_START + k * T_STEP;
    const end = k === 2 ? CODE_DONE : k === 3 ? EXEC_DONE : start + T_STEP;
    const begin = k === 3 ? CODE_DONE : start;
    if (time < begin) return "pending";
    if (time < end) return "running";
    return "done";
  };

  const passed = time >= EXEC_DONE;
  const status = passed ? "Passed" : time < T_GHERKIN ? "Reading scenario" : "Agent working";

  return (
    <div ref={ref} className="console" aria-label="Illustration of an agent turning a Gherkin scenario into a passing automated test">
      <div className="console-bar">
        <span className="console-dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="console-title">gherkin-to-test agent</span>
        <span className={`console-status ${passed ? "is-pass" : ""}`}>
          <span className="console-status-dot" />
          {status}
        </span>
      </div>

      <div className="console-panes">
        <div className="console-pane">
          <p className="console-file">price_band.feature</p>
          <div className="console-code">
            <Typed lines={GHERKIN} chars={gChars} caret={gChars < G_LEN && !reduced} />
          </div>
        </div>

        <div className="console-pane">
          <p className="console-file">test_price_band.py</p>
          <div className="console-code">
            {cChars === 0 ? (
              <div className="console-empty">Waiting for agent…</div>
            ) : (
              <Typed lines={CODE} chars={cChars} caret={cChars < C_LEN && !reduced} />
            )}
          </div>
        </div>
      </div>

      <ol className="console-steps">
        {STEPS.map((s, k) => {
          const st = stepState(k);
          return (
            <li key={s.label} data-state={st}>
              <span className="console-step-icon" aria-hidden>
                {st === "done" ? (
                  <svg viewBox="0 0 12 12" width="10" height="10">
                    <path d="M2.5 6.2 5 8.6l4.5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : null}
              </span>
              <span className="console-step-text">
                <b>{s.label}</b>
                <span>{s.detail}</span>
              </span>
            </li>
          );
        })}
      </ol>

      <p className="console-note">Illustrative run.</p>
    </div>
  );
}
