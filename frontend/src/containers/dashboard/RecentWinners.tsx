import React from 'react';

interface Winner {
  username: string;
  prize: string;
  mode: string;
  combination: string;
  time: string;
}

export default function RecentWinners() {
  const recentWinners: Winner[] = [
    { username: 'crypto_king', prize: 'PKR 5,00,000', mode: 'Straight', combination: '3 - 7 - 2', time: '10 mins ago' },
    { username: 'zain_luck', prize: 'PKR 80,000', mode: 'Rumble', combination: '7 - 2 - 3', time: '1 hour ago' },
    { username: 'fatima_99', prize: 'PKR 1,60,000', mode: 'Box', combination: '2 - 2 - 5', time: '2 hours ago' },
  ];

  return (
    <div className="bg-surface border border-borderCustom rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-space text-xl font-bold text-textCustom">
          Recent Winners
        </h3>
        <span className="flex items-center gap-1.5 text-xs text-accentCustom bg-accentCustom/10 border border-accentCustom/20 px-2.5 py-1 rounded-md font-medium animate-pulse">
          ● Live Draw Data
        </span>
      </div>
      
      <div className="overflow-x-auto scrollbar-none">
        <table className="w-full border-collapse text-xs min-w-[420px]">
          <thead>
            <tr className="border-b border-borderCustom">
              <th className="text-left pb-3 text-[11px] font-semibold uppercase tracking-wider text-textCustom/60">
                User
              </th>
              <th className="text-left pb-3 text-[11px] font-semibold uppercase tracking-wider text-textCustom/60">
                Numbers
              </th>
              <th className="text-left pb-3 text-[11px] font-semibold uppercase tracking-wider text-textCustom/60">
                Type
              </th>
              <th className="text-left pb-3 text-[11px] font-semibold uppercase tracking-wider text-textCustom/60">
                Prize
              </th>
              <th className="text-left pb-3 text-[11px] font-semibold uppercase tracking-wider text-textCustom/60">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borderCustom/40">
            {recentWinners.map((winner, index) => (
              <tr key={index} className="hover:bg-surface2/50 transition-colors">
                <td className="py-3 text-textCustom font-medium">
                  @{winner.username}
                </td>
                <td className="py-3 text-primaryCustom font-bold tracking-wider">
                  {winner.combination}
                </td>
                <td className="py-3 text-textCustom/80">
                  {winner.mode}
                </td>
                <td className="py-3 text-greenCustom font-semibold">
                  {winner.prize}
                </td>
                <td className="py-3 text-textCustom/60 whitespace-nowrap">
                  {winner.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
