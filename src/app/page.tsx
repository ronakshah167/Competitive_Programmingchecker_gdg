import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Braces,
  Bot,
  Activity,
  Trophy,
  Check,
  Terminal,
  ShieldCheck,
} from "lucide-react";
import { FaqSection } from "@/components/shared/faq-section";

const features = [
  {
    icon: Braces,
    number: "01",
    title: "Find your next improvement.",
    label: "CODE EVALUATION",
    text: "Go beyond a single score. Understand your logic, readability, and potential security issues with actionable feedback.",
    href: "/evaluate",
    cta: "Open evaluator",
  },
  {
    icon: Bot,
    number: "02",
    title: "Get unstuck. Keep learning.",
    label: "AI MENTOR",
    text: "Work through an algorithm, explore a different approach, or ask for a hint when the solution feels just out of reach.",
    href: "/chatbot",
    cta: "Meet your mentor",
  },
  {
    icon: Activity,
    number: "03",
    title: "Make consistency visible.",
    label: "CP TRACKER",
    text: "Bring your competitive programming practice into focus with platform activity, timelines, and contest tracking.",
    href: "/cp-tracker",
    cta: "Track your practice",
  },
  {
    icon: Trophy,
    number: "04",
    title: "A little friendly competition.",
    label: "LEADERBOARD",
    text: "Explore the rankings and find a little extra motivation for your next problem-solving session.",
    href: "/leaderboard",
    cta: "See the leaderboard",
  },
];

export default function Home() {
  return (
    <div className="home-shell">
      <section className="hero-grid page-width">
        <div className="hero-copy enter">
          <div className="eyebrow">
            <span className="status-dot" /> YOUR NEXT LEVEL STARTS HERE
          </div>
          <h1>
            Good code.
            <br />
            Great thinking.
            <br />
            <span>Go all in.</span>
          </h1>
          <p>
            A sharper feedback loop for competitive programmers. Understand your
            code, refine your approach, and make every practice session count.
          </p>
          <div className="hero-actions">
            <Link className="primary-action" href="/evaluate">
              Evaluate your code <ArrowUpRight size={19} />
            </Link>
            <Link className="secondary-action" href="/chatbot">
              Ask AI mentor <ArrowRight size={17} />
            </Link>
          </div>
          <div className="hero-proof">
            <span>
              <Check size={14} /> 7 evaluation metrics
            </span>
            <span>
              <Check size={14} /> Powered by Gemini
            </span>
          </div>
        </div>
        <div
          className="code-showcase enter"
          style={{ animationDelay: "120ms" }}
        >
          <div className="showcase-top">
            <span>
              <Terminal size={15} /> solution.py
            </span>
            <span className="mono-label">PYTHON</span>
          </div>
          <div
            className="code-window"
            aria-label="Example Python two sum solution"
          >
            {[
              <>
                <b>def</b> <em>two_sum</em>(nums, target):
              </>,
              <> seen = {"{}"}</>,
              <>
                {" "}
                <b>for</b> i, num <b>in</b> enumerate(nums):
              </>,
              <> complement = target - num</>,
              <>
                {" "}
                <b>if</b> complement <b>in</b> seen:
              </>,
              <>
                {" "}
                <b>return</b> [seen[complement], i]
              </>,
              <> seen[num] = i</>,
              <>
                {" "}
                <b>return</b> []
              </>,
            ].map((line, i) => (
              <div key={i} className={i === 3 ? "highlight-line" : ""}>
                <span className="line-no">{i + 1}</span>
                <code style={{ paddingLeft: `${[0, 1, 1, 2, 2, 3, 2, 1][i] * 2}ch` }}>{line}</code>
              </div>
            ))}
          </div>
          <div className="preview-feedback">
            <div className="preview-heading">
              <span>
                <span className="status-dot" /> FEEDBACK PREVIEW
              </span>
              <span>Illustrative example</span>
            </div>
            <div className="preview-summary">
              <div className="score-orbit">
                <span>
                  4.6<small>/ 5</small>
                </span>
              </div>
              <div>
                <h3>A thoughtful approach.</h3>
                <p>
                  A hash map avoids a nested loop.
                  <br />
                  Consider documenting the return value.
                </p>
              </div>
            </div>
            <div className="mini-metrics">
              {[
                ["Readability", "92%"],
                ["Logic", "96%"],
                ["Optimization", "88%"],
              ].map(([label, width], i) => (
                <div key={label}>
                  <span>{label}</span>
                  <div>
                    <i
                      style={{ width, animationDelay: `${400 + i * 150}ms` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="showcase-bottom">
            <ShieldCheck size={14} /> AI-assisted review · No code execution
          </div>
        </div>
      </section>
      <div className="language-strip">
        <div className="page-width">
          <span>YOUR LANGUAGE. YOUR APPROACH.</span>
          <div>
            Python <i> / </i> C++ <i> / </i> JavaScript <i> / </i> Java{" "}
            <i> / </i> Rust <i> / </i> + more
          </div>
        </div>
      </div>
      <section className="page-width toolkit" id="features">
        <div className="section-heading">
          <div>
            <div className="eyebrow">A BETTER PRACTICE LOOP</div>
            <h2>
              Built for the work
              <br />
              between breakthroughs.
            </h2>
          </div>
          <p>
            From the first attempt to the better solution.
            <br />
            Keep your tools in one place.
          </p>
        </div>
        <div className="tool-grid">
          {features.map((f) => (
            <Link href={f.href} className="tool-card" key={f.number}>
              <div className="tool-top">
                <f.icon size={25} />
                <span>{f.number}</span>
              </div>
              <div className="mono-label">{f.label}</div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
              <div className="tool-link">
                {f.cta}
                <ArrowUpRight size={18} />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="page-width process">
        <div>
          <div className="eyebrow">LESS GUESSWORK. MORE PROGRESS.</div>
          <h2>Paste. Understand. Improve.</h2>
          <p>Feedback that helps you think through the next version.</p>
          <Link href="/evaluate" className="secondary-action">
            Try your first evaluation <ArrowRight size={17} />
          </Link>
        </div>
        <ol>
          {[
            [
              "Bring your solution",
              "Choose a language and the explanation level that works for you.",
            ],
            [
              "See the full picture",
              "Explore weighted metrics, confidence levels, and AI feedback.",
            ],
            [
              "Make the next version better",
              "Turn specific suggestions into deliberate practice.",
            ],
          ].map(([title, desc], i) => (
            <li key={title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <FaqSection />
      <footer className="site-footer page-width">
        <Link href="/" className="footer-brand">
          <Braces size={21} /> ALL IN<span>Keep thinking. Keep building.</span>
        </Link>
        <div>
          <Link href="/evaluate">Evaluator</Link>
          <Link href="/chatbot">AI mentor</Link>
          <a href="#faq">FAQ</a>
        </div>
        <span>© {new Date().getFullYear()} ALL IN</span>
      </footer>
    </div>
  );
}
