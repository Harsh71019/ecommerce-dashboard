'use client';
import React from 'react';
import { useSidebarContext } from '@/app/dashboard/layout.context';
import styles from './burger.module.css';

export const BurgerButton = () => {
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <button
      className={styles.StyledBurgerButton}
      open={collapsed}
      onClick={setCollapsed}
    >
      <div />
      <div />
    </button>
  );
};
