'use client';

import Nav from '@/components/navbar';
import Login from '@/components/login/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <>
      <Nav />
      <Login />
      <ToastContainer />
    </>
  );
}
