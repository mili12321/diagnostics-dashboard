import { render, screen } from '@testing-library/react';
import { DiagnosticsTable } from '../components/DiagnosticsTable';
import { DiagnosticTypes, Severities } from '../types';

const mockDiagnostics = [
  { created_at: '2025-06-26T10:00:00Z', type: DiagnosticTypes.Motor, severity: Severities.Alarm },
  { created_at: '2025-06-27T10:00:00Z', type: DiagnosticTypes.Gear, severity: Severities.Critical },
  {
    created_at: '2025-06-27T09:00:00Z',
    type: DiagnosticTypes.Bearing,
    severity: Severities.Healthy,
  },
];

describe('DiagnosticsTable', () => {
  test('renders diagnostics sorted by date and severity', () => {
    render(<DiagnosticsTable diagnostics={mockDiagnostics} />);

    const rows = screen.getAllByRole('row');

    // First row is usually the header, so start from rows[1]
    expect(rows[1]).toHaveTextContent('gear');
    expect(rows[1]).toHaveTextContent('critical');

    expect(rows[2]).toHaveTextContent('bearing');
    expect(rows[2]).toHaveTextContent('healthy');

    expect(rows[3]).toHaveTextContent('motor');
    expect(rows[3]).toHaveTextContent('alarm');
  });
});
