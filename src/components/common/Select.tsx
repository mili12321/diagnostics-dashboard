import type { Path } from 'react-hook-form';
import { InputWrapper } from './InputWrapper';
import { IoIosArrowDown } from 'react-icons/io';
import clsx from 'clsx';
import { text } from '../../variants/text';
import { useEffect, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import type { Control, FieldValues } from 'react-hook-form';
import { Text } from './Text';

interface StyledSelectProps<T extends FieldValues> {
  title: string;
  options: { label: string; value: string }[];
  error?: string;
  name: Path<T>;
  control: Control<T>;
}
export const Select = <T extends FieldValues>({
  name,
  title,
  control,
  options,
  error,
}: StyledSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selectedLabel = options.find((opt) => opt.value === field.value)?.label;

        return (
          <div className="relative" ref={dropdownRef}>
            <InputWrapper title={title} error={error}>
              <div className="flex h-6 cursor-pointer items-center">
                <button
                  type="button"
                  onClick={() => setIsOpen((prev) => !prev)}
                  className={clsx(
                    text({ size: 'sm' }),
                    'w-full appearance-none bg-transparent pr-6 text-left capitalize outline-none'
                  )}
                >
                  {selectedLabel || `Select ${name} ...`}
                </button>

                <IoIosArrowDown className="text-primary pointer-events-none absolute right-4" />

                {isOpen && (
                  <ul className="border-border text-primary shadow-shadow absolute top-full left-0 z-10 mt-1 flex w-full flex-col gap-2 rounded-xl border bg-white p-2">
                    {options.map(({ value, label }) => (
                      <li
                        key={value}
                        onClick={() => {
                          field.onChange(value);
                          setIsOpen(false);
                        }}
                        className="cursor-pointer rounded-l px-3 py-2 capitalize hover:bg-neutral-50"
                      >
                        <Text>{label}</Text>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </InputWrapper>
          </div>
        );
      }}
    />
  );
};
