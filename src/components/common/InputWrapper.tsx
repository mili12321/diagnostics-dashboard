import { Text } from './Text';

export const InputWrapper = ({
  title,
  error,
  children,
}: {
  title: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className="border-border flex flex-col gap-1.5 border-b px-4 pb-1.5">
    <Text size="xs" color="secondary">
      {title}
    </Text>
    {children}
    {error && (
      <Text size="xs" color="error">
        {error}
      </Text>
    )}
  </div>
);
