import { z } from 'zod';

export const metricNames = ['correctness', 'efficiency', 'robustness', 'readability', 'idiomatic', 'security', 'problemSolving'] as const;
export type MetricName = typeof metricNames[number];
export const weights: Record<MetricName, number> = {
  correctness: 35, efficiency: 20, robustness: 10, readability: 15,
  idiomatic: 10, security: 5, problemSolving: 5,
};
export const EvidenceSchema = z.object({ line_start: z.number().int().positive(), line_end: z.number().int().positive(), note: z.string() });
export const MetricSchema = z.object({
  score: z.number().min(0).max(100).nullable(),
  confidence: z.number().min(0).max(1),
  evidence: z.array(EvidenceSchema),
  status: z.enum(['measured', 'estimated', 'unavailable']),
});
export const EvaluationReportSchema = z.object({
  metrics: z.record(z.enum(metricNames), MetricSchema),
  overall_score: z.number().min(0).max(100).nullable(),
  coverage: z.number().min(0).max(100),
  strengths: z.array(z.string()),
  improvements: z.array(z.string()),
});
export type EvaluationReport = z.infer<typeof EvaluationReportSchema>;
const unavailable = () => ({ score: null, confidence: 0, evidence: [], status: 'unavailable' as const });

/** Static source-only checks. Never confuse these estimates with executed test results. */
export function evaluateStaticCode(code: string, language: string): EvaluationReport {
  const lines = code.split(/\r?\n/);
  const nonempty = lines.map((text, i) => ({text, i: i + 1})).filter(x => x.text.trim());
  const commentLine = (s: string) => /^\s*(\/\/|#|\*|\/\*)/.test(s);
  const comments = nonempty.filter(x => commentLine(x.text));
  const longestLine = Math.max(0, ...lines.map(x => x.length));
  const indentDepth = Math.max(0, ...lines.map(x => (x.match(/^\s*/)?.[0].replace(/\t/g, '    ').length ?? 0) / 4));
  const score = Math.max(0, Math.min(100, Math.round(100 - Math.max(0, longestLine - 100) / 2 - Math.max(0, indentDepth - 4) * 5 - (nonempty.length > 200 ? 10 : 0))));
  const flags = nonempty.filter(x => /\b(eval\s*\(|exec\s*\(|system\s*\(|subprocess\.|innerHTML\s*=)/.test(x.text));
  const metrics: EvaluationReport['metrics'] = {
    correctness: unavailable(), efficiency: unavailable(), robustness: unavailable(),
    readability: { score, confidence: 0.45, status: 'estimated', evidence: [
      {line_start: 1, line_end: lines.length, note: `Static formatting heuristic: ${nonempty.length} nonempty lines, maximum line length ${longestLine}, approximate indentation depth ${indentDepth.toFixed(1)}. Not a full maintainability audit.`},
      ...comments.length ? [{line_start: comments[0].i, line_end: comments[0].i, note: `${comments.length} comment lines detected; comment quantity alone is not a quality measure.`}] : [],
    ] },
    idiomatic: unavailable(),
    security: {score: flags.length ? Math.max(0, 100 - flags.length * 25) : null, confidence: flags.length ? 0.3 : 0, status: flags.length ? 'estimated' : 'unavailable', evidence: flags.map(x => ({line_start: x.i, line_end: x.i, note: 'Potentially dangerous API detected; review its context. This is not a vulnerability verdict.'})) },
    problemSolving: unavailable(),
  };
  const available = metricNames.filter(k => metrics[k].score !== null);
  const coverage = available.reduce((n, k) => n + weights[k], 0);
  const overall_score = coverage ? Math.round(available.reduce((n, k) => n + (metrics[k].score ?? 0) * weights[k], 0) / coverage) : null;
  return EvaluationReportSchema.parse({
    metrics, overall_score, coverage,
    strengths: score >= 80 ? ['Source formatting passes basic readability heuristics'] : [],
    improvements: [
      'Provide a problem statement and test cases to measure correctness and robustness.',
      'Connect an isolated runner to benchmark time and memory against scaled inputs.',
      ...(flags.length ? ['Review flagged potentially unsafe API calls.'] : []),
    ],
  });
}
