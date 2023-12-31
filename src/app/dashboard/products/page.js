'use client';
import ProductTable from '@/components/products/table';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Page = () => {
  return (
    <div className='p-5 mt-5'>
      <ProductTable />
      <ToastContainer />
    </div>
  );
};

export default Page;
