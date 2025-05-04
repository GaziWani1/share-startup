import Navbar from '@/components/Navbar';
import React from 'react';
import { Toaster } from 'sonner';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="font-work-sans">
      <Navbar />
      {children}
      <Toaster />
    </main>
  );
};

export default Layout;
