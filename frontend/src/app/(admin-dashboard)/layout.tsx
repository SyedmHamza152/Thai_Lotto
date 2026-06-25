'use client';

import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#8e8d89] text-[#f1f0ff] font-sans antialiased">
      {/* Simple children injection slot. No fixed navigation tags allowed here */}
      {children}
    </div>
  );
}
