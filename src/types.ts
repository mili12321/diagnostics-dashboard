export const DiagnosticTypes = {
  Bearing: 'bearing',
  Gear: 'gear',
  Motor: 'motor',
} as const;

export const Severities = {
  Healthy: 'healthy',
  Alarm: 'alarm',
  Critical: 'critical',
} as const;

export type Severity = (typeof Severities)[keyof typeof Severities];

export type Diagnostic = {
  created_at: string;
  type: string;
  severity: Severity;
};
