'use client';

import React, { useState } from 'react';
import Sidebar from '@/containers/dashboard/SideBar';
import NavBar from '@/containers/dashboard/NavBar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // The central state that controls BOTH navbar and sidebar components
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
      window.location.href = '/login';
    }
  };

  return (
    <div className="min-h-screen bg-[#1A202C] text-[#f1f0ff] font-sans antialiased">

      {/* 🟢 FIXED: Shared state controllers are passed to the top bar layout */}
      <NavBar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Shared state controllers passed to the side menu layout */}
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        handleLogout={handleLogout}
      />

      {/* Main Panel Viewport View Injection slot */}
      <main className="lg:ml-[240px] mt-[60px] p-6 min-h-[calc(100vh-60px)]">
        {children}
      </main>
    </div>
  );
}
