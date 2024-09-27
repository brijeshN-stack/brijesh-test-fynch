import React from 'react';
import Sidebar from '@/components/sidebar/Sidebar';

interface LayoutProps {
  children?: any;
}

const SidebarLayout = ({ children }: LayoutProps) => {
  return <Sidebar>{children}</Sidebar>;
};

export default SidebarLayout;
