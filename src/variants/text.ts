import { tv } from 'tailwind-variants';

export const text = tv({
  base: '',
  variants: {
    color: {
      primary: 'text-text-primary',
      secondary: 'text-text-secondary',
      error: 'text-rose-500',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      xxl: 'text-2xl',
    },
    weight: {
      medium: 'font-medium',
      semibold: 'font-semibold',
    },
  },
  defaultVariants: {
    size: 'sm',
    color: 'primary',
    weight: 'medium',
  },
});
