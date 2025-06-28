export function formatTooltipLabel(point: { severity: string; type: string }) {
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  return [`Severity: ${capitalize(point.severity)}`, `Fault type: ${capitalize(point.type)}`];
}
