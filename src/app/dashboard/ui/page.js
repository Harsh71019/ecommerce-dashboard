'use client';
import SettingsPage from '@/components/settings/settings';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
  return (
    <div>
      <SettingsPage />
      <ToastContainer />
    </div>
  );
};

export default page;
