import type { ReactNode } from 'react';
import { Text } from './Text';

export const Table = ({ children }: { children: ReactNode }) => (
  <div className="rounded-lg bg-neutral-50 px-2">
    <table className="w-full table-fixed border-separate border-spacing-y-2 text-left">
      {children}
    </table>
  </div>
);

Table.Header = ({ title, children }: { title?: string; children?: ReactNode }) => (
  <div className="flex-center mb-4 justify-between">
    <Text size="xxl">{title}</Text>
    {children}
  </div>
);

Table.Head = ({ children }: { children: ReactNode }) => (
  <thead>
    <tr className="!border-spacing-0">{children}</tr>
  </thead>
);

Table.Column = ({ children }: { children: ReactNode }) => (
  <th className="px-4 first:rounded-l-lg last:rounded-r-lg">{children}</th>
);

Table.Body = ({ children }: { children: ReactNode }) => <tbody>{children}</tbody>;

Table.Row = ({ children }: { children: ReactNode }) => (
  <tr className="h-14 bg-white">{children}</tr>
);

Table.Cell = ({ children }: { children: ReactNode }) => (
  <td className="truncate px-4 first:rounded-l-lg last:rounded-r-lg">{children}</td>
);
