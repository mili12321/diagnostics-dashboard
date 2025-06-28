import type { ReactNode } from 'react';

export const Card = ({ children }: { children: ReactNode }) => {
  return <div className="rounded-lg bg-neutral-50 p-2">{children}</div>;
};

Card.Header = ({ children }: { children: ReactNode }) => (
  <div className="text-md mb-2 flex h-8 items-center justify-between bg-neutral-50 px-4">
    {children}
  </div>
);

Card.Body = ({ children }: { children: ReactNode }) => (
  <div className="rounded-lg bg-white">{children}</div>
);
