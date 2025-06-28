import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Toolbar } from './Toolbar';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Toolbar />
        <main className="flex-1 space-y-8 overflow-auto p-8">{children}</main>
      </div>
    </div>
  );
};
