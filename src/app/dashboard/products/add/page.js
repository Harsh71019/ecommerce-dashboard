'use client';
import React from 'react';
import AddProductModal from '@/components/products/addmodal';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const page = () => {
  return (
    <div className='p-5 mt-5'>
      <div className='container mx-auto'>
        <AddProductModal />
      </div>
      <ToastContainer />
    </div>
  );
};

export default page;
