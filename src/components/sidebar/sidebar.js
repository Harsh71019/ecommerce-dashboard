import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSidebarContext } from '@/app/dashboard/layout.context';
import styles from './sidebar.module.css';

const Sidebar = () => {
  const router = useRouter();
  const { collapsed, setCollapsed } = useSidebarContext();
  const sidebarRef = useRef(null);

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

      {/* Sidebar content */}
      <h1>jello</h1>
      {/* For example, you can put navigation links here */}
    </div>
  );
};

export default Sidebar;
