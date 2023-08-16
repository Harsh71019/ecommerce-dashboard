'use client';
import ProductTable from '@/components/products/table';
import React from 'react';
import AddProductModal from '@/components/products/addmodal';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const page = () => {
  return (
    <div className='p-5 mt-5'>
      <div className='flex justify-end'>
        <AddProductModal />
      </div>
      <ProductTable />
      <ToastContainer />
    </div>
  );
};

export default page;
