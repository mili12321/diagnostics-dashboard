import { useMemo } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useModal } from '../hooks/useModal';
import type { Diagnostic, Severity } from '../types';
import { formatDate, sortDiagnostics } from '../helpers';

import { Table, Text } from './common';
import { AddDiagnosticForm } from './AddDiagnosticForm';

interface DiagnosticsTableProps {
  diagnostics: Diagnostic[];
  onAdd: (newItem: Diagnostic) => void;
}

export const DiagnosticsTable = ({ diagnostics, onAdd }: DiagnosticsTableProps) => {
  const sortedDiagnostics = useMemo(() => sortDiagnostics(diagnostics), [diagnostics]);
  const { isModalOpen, closeModal, openModal } = useModal();
  return (
    <>
      <Table.Header title="Diagnostics">
        <button
          onClick={openModal}
          className="flex-center bg-primary-500 rounded-lg px-2 py-1 text-white"
        >
          <FaPlus className="mr-2 rounded-lg" />
          <Text className="text-white">Add new</Text>
        </button>
      </Table.Header>
      <Table>
        <Table.Head>
          <Table.Column>
            <Text color="secondary">Diagnostic date</Text>
          </Table.Column>
          <Table.Column>
            <Text color="secondary">Fault type</Text>
          </Table.Column>
          <Table.Column>
            <Text color="secondary">Severity</Text>
          </Table.Column>
        </Table.Head>

        <Table.Body>
          {sortedDiagnostics.map((row, i) => (
            <Table.Row key={i}>
              <Table.Cell>
                <Text>{formatDate(row.created_at)}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text className="capitalize">{row.type}</Text>
              </Table.Cell>
              <Table.Cell>
                <Tag severity={row.severity} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <AddDiagnosticForm isModalOpen={isModalOpen} closeModal={closeModal} onAdd={onAdd} />
    </>
  );
};

const Tag = ({ severity }: { severity: Severity }) => {
  const styles: Record<Severity, string> = {
    critical: 'bg-critical/15',
    alarm: 'bg-alarm/15',
    healthy: 'bg-healthy/15',
  };

  return (
    <div className={`w-fit rounded-md px-2 capitalize ${styles[severity]}`}>
      <Text>{severity}</Text>
    </div>
  );
};
