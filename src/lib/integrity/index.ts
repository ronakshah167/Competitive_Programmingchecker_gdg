import { z } from 'zod';

export const IntegrityReportSchema = z.object({
  risk_score: z.number().min(0).max(100).nullable(),
  band: z.enum(['Low', 'Medium', 'High']).nullable(),
  confidence: z.number().min(0).max(1),
  signals: z.array(z.object({name: z.string(), weight: z.number(), value: z.number(), evidence: z.string(), line_refs: z.array(z.number())})),
  limitations: z.array(z.string()),
  recommended_action: z.string(),
});
export type IntegrityReport = z.infer<typeof IntegrityReportSchema>;
/** Without consented provenance telemetry and calibrated ground truth, no authorship score is justified. */
export function unverifiedAuthorship(): IntegrityReport {
  return IntegrityReportSchema.parse({
    risk_score: null, band: null, confidence: 0, signals: [],
    limitations: ['Code text alone cannot establish AI authorship.', 'No calibrated classifier, labeled benchmark, or consenting editor provenance is available.'],
    recommended_action: 'Ask the author to explain their approach; do not penalize based on stylistic clues.',
  });
}
