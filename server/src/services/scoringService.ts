export type LeadScoreInput = {
  company?: string | null;
  email?: string;
  source?: string;
  siteVisits?: number;
  visitedDirectly?: boolean;
};

export function calculateScore(lead: LeadScoreInput): number {
  let score = 0;

  if (lead.company) score += 20;

  if (!lead.email) return score;

  if (lead.email.includes('@gmail')) score += 5;
  else score += 15;

  if (lead.source === 'ads') score += 10;
  if (lead.source === 'referral') score += 25;
  if ((lead.siteVisits ?? 0) > 1) score += 30;
  if (lead.visitedDirectly || lead.source === 'direct') score += 30;

  return score;
}
