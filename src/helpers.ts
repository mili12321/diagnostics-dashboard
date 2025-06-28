import type { Diagnostic, Severity } from './types';

export const severityRank: Record<Severity, number> = {
  critical: 3,
  alarm: 2,
  healthy: 1,
};

export const compareDiagnostics = (a: Diagnostic, b: Diagnostic): number => {
  const aDate = a.created_at.split('T')[0]; // Only date
  const bDate = b.created_at.split('T')[0];

  const dateCompare = new Date(bDate).getTime() - new Date(aDate).getTime();
  if (dateCompare !== 0) return dateCompare; // newest first

  // critical > alarm > healthy
  const severityCompare = severityRank[b.severity] - severityRank[a.severity];
  if (severityCompare !== 0) return severityCompare;

  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
};

export const sortDiagnostics = (diagnostics: Diagnostic[]): Diagnostic[] => {
  return [...diagnostics].sort(compareDiagnostics);
};

export const getMostSeverePerDay = (diagnostics: Diagnostic[]): Diagnostic[] => {
  const map = new Map<string, Diagnostic>();

  diagnostics.forEach((diag) => {
    const dateKey = diag.created_at.split('T')[0];
    const current = map.get(dateKey);

    const currentRank = current ? severityRank[current.severity] : 0;
    const newRank = severityRank[diag.severity];

    if (!current || newRank > currentRank) {
      map.set(dateKey, diag);
    } else if (newRank === currentRank) {
      // prefer the newer one if same severity
      const currentTime = new Date(current.created_at).getTime();
      const newTime = new Date(diag.created_at).getTime();
      if (newTime > currentTime) {
        map.set(dateKey, diag);
      }
    }
  });

  return Array.from(map.values()).sort((a, b) => a.created_at.localeCompare(b.created_at));
};

export const formatDate = (dateISOString: string): string => {
  const dt = new Date(dateISOString);
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(dt);
};
