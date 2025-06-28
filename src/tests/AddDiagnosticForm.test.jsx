import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddDiagnosticForm } from '../components/AddDiagnosticForm';
import { DiagnosticTypes, Severities } from '../types';

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => ({}),
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('AddDiagnosticForm', () => {
  test('shows validation errors when submitting empty form', async () => {
    render(<AddDiagnosticForm isModalOpen={true} closeModal={() => {}} />);
    fireEvent.click(screen.getByText(/Save/i));

    expect(await screen.findByText(/Type is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Severity is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Date is required/i)).toBeInTheDocument();
  });

  test('shows error when date is missing', async () => {
    render(<AddDiagnosticForm isModalOpen={true} closeModal={() => {}} />);
    fireEvent.click(screen.getByText('Select type ...'));
    fireEvent.click(screen.getByText(DiagnosticTypes.Bearing));
    fireEvent.click(screen.getByText('Select severity ...'));
    fireEvent.click(screen.getByText(Severities.Critical));
    fireEvent.click(screen.getByText('Save'));

    expect(await screen.findByText(/Date is required/i)).toBeInTheDocument();
  });

  test('adds new diagnostic on valid submit', async () => {
    const mockClose = jest.fn();

    render(<AddDiagnosticForm isModalOpen={true} closeModal={mockClose} />);
    fireEvent.change(screen.getByLabelText(/Diagnostic date/i), {
      target: { value: '2025-06-26T10:00' },
    });
    fireEvent.click(screen.getByText('Select type ...'));
    fireEvent.click(screen.getByText(DiagnosticTypes.Motor));
    fireEvent.click(screen.getByText('Select severity ...'));
    fireEvent.click(screen.getByText(Severities.Alarm));
    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(mockClose).toHaveBeenCalled();
    });
  });
});
