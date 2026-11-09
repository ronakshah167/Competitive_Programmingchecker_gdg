import { EvaluationForm } from "@/components/evaluate/evaluation-form";
import {
  Braces,
  ArrowUpRight,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";

export default function EvaluatePage() {
  return (
    <div className="page-width evaluator-page enter">
      <header className="workspace-heading">
        <div>
          <div className="eyebrow">
            <span className="status-dot" /> CODE WORKSPACE
          </div>
          <h1>Make your next version better.</h1>
          <p>
            Your solution, a fresh perspective, and a clear path to improve.
          </p>
        </div>
        <span className="workspace-badge">
          <Braces size={16} /> Gemini + static analysis
        </span>
      </header>
      <div className="workspace-grid">
        <section className="editor-panel">
          <div className="editor-panel-heading">
            <span>
              <Braces size={18} /> New evaluation
            </span>
            <span className="mono-label">01 / SOURCE</span>
          </div>
          <EvaluationForm />
        </section>
        <aside className="workspace-aside">
          <div className="aside-card">
            <SlidersHorizontal size={22} />
            <h2>A fuller picture of your code.</h2>
            <p>
              Seven weighted metrics. Clear confidence levels. Practical next
              steps.
            </p>
            <ol>
              {[
                "Correctness",
                "Efficiency",
                "Robustness",
                "Readability",
                "Idiomatic code",
                "Security",
                "Problem solving",
              ].map((name, i) => (
                <li key={name}>
                  <span>0{i + 1}</span>
                  {name}
                </li>
              ))}
            </ol>
          </div>
          <div className="aside-note">
            <ShieldCheck size={20} />
            <h3>Know what is measured.</h3>
            <p>
              Static analysis does not execute code. Some metrics are
              unavailable without tests. Code style alone cannot establish AI
              authorship.
            </p>
          </div>
          <Link className="mentor-link" href="/chatbot">
            Need to talk it through?
            <span>
              Ask your AI mentor <ArrowUpRight size={17} />
            </span>
          </Link>
        </aside>
      </div>
    </div>
  );
}
