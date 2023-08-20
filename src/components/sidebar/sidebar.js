import React, { useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useSidebarContext } from '@/app/dashboard/layout.context';
import styles from './sidebar.module.css';
import { sidebarArray } from './sidebarMenuItems';
import SidebarLinks from './sidebarlinks';

const Sidebar = () => {
  const { collapsed, setCollapsed } = useSidebarContext();
  const sidebarRef = useRef(null);
  const pathname = usePathname();

  return (
    <div
      className={`${styles.sidebar} border-r border-divider ${
        collapsed ? styles.hiddenOnMobile : ''
      }`}
      ref={sidebarRef}
    >
      {!collapsed && (
        <button onClick={() => setCollapsed()} className={styles.closeButton}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <line x1='18' y1='6' x2='6' y2='18'></line>
            <line x1='6' y1='6' x2='18' y2='18'></line>
          </svg>
        </button>
      )}

      <h1 className={`border-b border-divider ${styles.logoSidebar}`}>
        Logo Comes Here
      </h1>

      <div className='mt-3'>
        {sidebarArray.map((item) => {
          return (
            <SidebarLinks
              key={item.title}
              title={item.title}
              route={item.route}
              isActive={pathname === item.route}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
