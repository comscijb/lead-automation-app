export function classifyLead(score: number) {
  if (score >= 80) return 'High priority';
  if (score >= 45) return 'Good opportunity';
  return 'Nurture';
}
