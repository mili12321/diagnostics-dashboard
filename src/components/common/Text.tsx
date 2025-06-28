import clsx from 'clsx';
import { text } from '../../variants/text';

type TextProps = {
  children: React.ReactNode;
  className?: string;
  size?: 'xs' | 'sm' | 'xxl';
  color?: 'primary' | 'secondary' | 'error';
  weight?: 'medium' | 'semibold';
};

export const Text = ({ children, className, size, color, weight }: TextProps) => {
  return <span className={clsx(text({ size, color, weight }), className)}>{children}</span>;
};
