import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SupportWidget from '../components/SupportWidget';
import QuickActionWidget from '../components/QuickActionWidget';

const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <SupportWidget />
      <QuickActionWidget />
    </div>
  );
};

export default RootLayout;
