'use client';
import React from 'react';
import NavbarDashboard from '@/components/navbar-dashboard/navbar';
import Sidebar from '@/components/sidebar/sidebar';
import { useLockedBody } from '@/components/hooks/useBodyLock';
import { SidebarContext } from './layout.context';

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <div className='flex'>
        <Sidebar />
        <NavbarDashboard>{children}</NavbarDashboard>
      </div>
    </SidebarContext.Provider>
  );
}
