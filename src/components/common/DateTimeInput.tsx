import type { UseFormRegisterReturn } from 'react-hook-form';
import { InputWrapper } from './InputWrapper';
import clsx from 'clsx';
import { text } from '../../variants/text';
import { useRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { Text } from './Text';

export const DateTimeInput = ({
  title,
  error,
  registerProps,
  value,
}: {
  title: string;
  error?: string;
  registerProps: UseFormRegisterReturn;
  value?: string;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const displayValue = value
    ? new Date(value).toLocaleDateString('en-GB').replaceAll('/', '.')
    : 'Choose a diagnostic date';

  return (
    <div className="relative">
      <InputWrapper title={title} error={error}>
        <div className="flex h-6 items-center justify-between">
          <label
            onClick={() => inputRef.current?.showPicker?.()}
            htmlFor="new-diagnostic-date"
            className="flex-center relative inline-flex w-full cursor-pointer justify-between gap-2"
          >
            <Text>{displayValue}</Text>
            <IoIosArrowDown />
            <input
              id="new-diagnostic-date"
              type="datetime-local"
              className={clsx(text({ size: 'sm' }), 'absolute top-4 left-0 opacity-0')}
              {...registerProps}
              ref={(el) => {
                registerProps.ref(el);
                inputRef.current = el;
              }}
            />
          </label>
        </div>
      </InputWrapper>
    </div>
  );
};
