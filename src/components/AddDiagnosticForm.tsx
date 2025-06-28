import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DiagnosticTypes, Severities, type Diagnostic } from '../types';

import { Modal, Text, DateTimeInput, Select } from './common';

const URL = 'http://localhost:3500/diagnostics';

export const DiagnosticTypeEnum = z.enum(
  [DiagnosticTypes.Bearing, DiagnosticTypes.Gear, DiagnosticTypes.Motor],
  {
    required_error: 'Type is required',
  }
);

export const SeverityEnum = z.enum([Severities.Healthy, Severities.Alarm, Severities.Critical], {
  required_error: 'Severity is required',
});

const schema = z.object({
  created_at: z.string().min(1, { message: 'Date is required' }),
  type: DiagnosticTypeEnum,
  severity: SeverityEnum,
});

type FormData = z.infer<typeof schema>;

export const AddDiagnosticForm = ({
  isModalOpen,
  closeModal,
  onAdd,
}: {
  isModalOpen: boolean;
  closeModal: () => void;
  onAdd: (newItem: Diagnostic) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      type: undefined,
      severity: undefined,
      created_at: '',
    },
  });

  const diagnosticTypeOptions = Object.values(DiagnosticTypes).map((value) => ({
    value,
    label: value,
  }));

  const severityOptions = Object.values(Severities).map((value) => ({
    value,
    label: value,
  }));

  const onSubmit = async (data: FormData) => {
    try {
      const baseDate = new Date(data.created_at);
      const now = new Date();
      baseDate.setSeconds(now.getSeconds());
      baseDate.setMilliseconds(now.getMilliseconds());

      const res = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          created_at: baseDate.toISOString(),
        }),
      });

      const saved = await res.json();
      onAdd(saved);
      closeModal();
    } catch {
      throw new Error('Failed to submit data');
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      reset();
    }
  }, [isModalOpen, reset]);

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="mb-4 pb-4">
        <Text>Add new diagnostic</Text>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)(e);
        }}
      >
        <div className="space-y-6">
          <DateTimeInput
            title="Diagnostic date"
            registerProps={register('created_at')}
            error={errors.created_at?.message}
            value={watch('created_at')}
          />
          <Select
            name="type"
            title="Fault type"
            control={control}
            options={diagnosticTypeOptions}
            error={errors.type?.message}
          />

          <Select
            name="severity"
            title="Severity"
            control={control}
            options={severityOptions}
            error={errors.severity?.message}
          />
          <div className="space-x-4 place-self-end">
            <button
              type="button"
              onClick={closeModal}
              className="border-border rounded-xl border p-4"
            >
              <Text>Cancel</Text>
            </button>
            <button type="submit" className="bg-primary-500 rounded-xl p-4">
              <Text className="text-white">Save</Text>
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
