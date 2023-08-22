import React from 'react';
import NextLink from 'next/link';
import styles from './sidebar.module.css';

const SidebarLinks = ({ title, isActive, route, icon }) => {
  return (
    <>
      <div className='flex px-3 justify-center'>
        <div
          className={`gap-6
        w-full
      min-h-44
      h-full
      cursor-pointer
      transition-all
      duration-150
      px-5 py-2  mt-3 ${
        isActive ? styles.isActiveLinkCSS : 'hover:bg-accents-2'
      }`}
        >
          <NextLink className='flex align-center' href={route}>
            {icon}
            <h1>{title}</h1>
          </NextLink>
        </div>
      </div>
    </>
  );
};

export default SidebarLinks;
