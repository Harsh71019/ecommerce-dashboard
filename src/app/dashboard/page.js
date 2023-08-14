'use client';

import React, { useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { redirect } from 'next/navigation';

const Dashboard = () => {
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
  );

  // useEffect(() => {
  //   isAuthenticated === false && redirect('/');
  // }, [isAuthenticated]);

  return <h1 className='text-white'>Helllooooo</h1>;
};

export default Dashboard;
