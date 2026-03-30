import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SupportWidget from '../components/SupportWidget';

const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <SupportWidget />
    </div>
  );
};

export default RootLayout;
