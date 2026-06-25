import React from 'react';

export default function UsersView() {
  return (
    <div className="bg-surface border border-borderCustom rounded-2xl p-6 shadow-sm">
      <div className="md:flex md:flex-wrap md:items-center md:justify-between gap-4 mb-4">
        <h3 className="font-space text-xl font-bold text-textCustom mb-3">Registered Users</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input className="w-full bg-surface2 border border-borderCustom text-textCustom px-3.5 py-1.5 rounded-xl text-sm outline-none focus:border-primaryCustom placeholder:text-textCustom/20" placeholder="Search ID, username, phone…" />
          <button className="w-full px-4 py-1.5 rounded-xl text-xs font-semibold bg-surface2 border border-borderCustom text-textCustom hover:bg-surface3 cursor-pointer">Search</button>
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-none text-textCustom/40 text-center py-8 text-sm">
        Users record list grid will render here.
      </div>
    </div>
  );
}
