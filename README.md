# ALL IN — Competitive Programming Checker

Next.js 15, TypeScript, Firebase and Gemini/Genkit application. Existing routes: `/evaluate`, `/leaderboard`, `/cp-tracker`, `/chatbot`, `/profile`.

## Evaluation architecture

- `src/ai/flows/personalized-code-feedback.ts`: existing Gemini qualitative feedback, explanation and 1–5 legacy ratings.
- `src/lib/evaluator/index.ts`: version-one deterministic **static** checks with typed Zod report. Weighted target rubric: correctness 35%, efficiency 20%, robustness 10%, readability 15%, idiomatic usage 10%, security 5%, problem solving 5%.
- `src/lib/integrity/index.ts`: explicit unverified authorship schema; does **not** treat style as proof of model use.
- `src/components/evaluate/evaluation-analysis-report.tsx`: Metrics tab distinguishes estimated from unavailable evidence.

**Score formula:** if any metrics are available, sum (score × weight) for available metrics divided by the sum of their weights, rounded to an integer. `coverage` is the sum of rubric weights with available results. It is not an overall code quality grade unless all dimensions are properly measured. Static formatting heuristic starts at 100 and subtracts half a point per character above the 100-character maximum line length, 5 points per indentation level above 4, and 10 points for submissions over 200 nonblank lines. The heuristic's confidence is 0.45. The security scanner only raises possible API-review flags and is **not** a vulnerability checker.

## Not yet implemented / necessary to deploy advanced evaluation

1. A secure, isolated untrusted-code runner (Judge0/Piston) with server-side secrets, resource quotas, language allowlisting and fixed test case contracts. Never execute submissions in the Next.js process.
2. Per-problem hidden and visible cases, adversarial edge cases, scaled input benchmarks, and validated algorithm/complexity ground truth.
3. Language-specific AST/linters and a credible 7-metric evaluated score.
4. Consented editor telemetry, per-user baselines, plagiarism and fingerprint checks, data retention/deletion controls, and a human review workflow.
5. Labeled human/AI/edited/assisted examples for calibration; independently measured precision, recall, ROC-AUC and false-positive rate. No classifier or authorship confidence is claimed in current release.
6. Monaco editor, leaderboard and CP tracker upgrades, and full UI specification remain future work.

Code style alone cannot reveal who wrote code. Do not use this project's legacy model output to accuse or penalize students. The Gemini feedback has not actually executed user code, and the current application does not measure correctness or runtime.

## Development

```bash
npm ci
npm run typecheck
npm run build
```

The project is GitHub-linked to Vercel; inspect the production deployment and runtime logs after pushing. Do not add credentials to the repo.
