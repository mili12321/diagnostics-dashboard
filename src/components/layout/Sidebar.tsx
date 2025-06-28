import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { FaIndustry, FaRegBell, FaRegFile } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import { BsGear } from 'react-icons/bs';

type SidebarItemProps = {
  children: ReactNode;
  className?: string;
  active?: boolean;
};

const icons = [
  { id: 'industry', icon: FaIndustry },
  { id: 'info', icon: AiOutlineInfoCircle },
  { id: 'bell', icon: FaRegBell },
  { id: 'file', icon: FaRegFile },
  { id: 'settings', icon: BsGear },
];

export const Sidebar = () => {
  return (
    <div className="bg-sidebar-bg flex flex-col justify-between px-3 py-4">
      <div className="flex flex-col gap-2">
        {icons.map(({ id, icon: Icon }) => (
          <SidebarItem key={id} active={id === 'industry'}>
            <Icon className="w-4" />
          </SidebarItem>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <SidebarItem>
          <MdLogout className="w-4" />
        </SidebarItem>
        <SidebarItem className="bg-primary-500 hover:bg-primary-500 text-white hover:text-white">
          EG
        </SidebarItem>
      </div>
    </div>
  );
};

const SidebarItem = ({ children, className, active = false }: SidebarItemProps) => {
  return (
    <div
      className={twMerge(
        'flex-center group hover:bg-variant-500 h-12 w-12 rounded-full text-white transition-colors duration-200 hover:text-[#01152b]',
        active && 'bg-variant-500 text-[#01152b]',
        clsx(className)
      )}
    >
      {children}
    </div>
  );
};
