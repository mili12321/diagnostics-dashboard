import { formatTooltipLabel } from '../components/FusionTrend/tooltipFormatter';

describe('formatTooltipLabel', () => {
  test('formats tooltip with capitalized severity and type', () => {
    const result = formatTooltipLabel({ severity: 'critical', type: 'motor' });

    expect(result).toEqual(['Severity: Critical', 'Fault type: Motor']);
  });
});
