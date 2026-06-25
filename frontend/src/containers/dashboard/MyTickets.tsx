import React from 'react';

// Unified type declarations matching original HTML mapping parameters
interface Ticket {
  id: string;
  number: string;
  mode: string;
  wager: string;
  status: string;
  date: string;
}

export default function MyTickets() {
  // Array items populated with matching parameter keys
  const myTickets: Ticket[] = [
    { id: '1', number: '3 - 7 - 2', mode: 'Straight', wager: 'PKR 100', status: 'Active', date: '2026-06-24' },
    { id: '2', number: '1 - 4 - 5', mode: 'Rumble', wager: 'PKR 100', status: 'Active', date: '2026-06-23' },
  ];

  return (
    <div className="bg-surface border border-borderCustom rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-space text-xl font-bold text-textCustom">
          My Tickets
        </h3>
        <span className="text-xs bg-surface2 px-2.5 py-1 rounded-md text-textCustom/80 border border-borderCustom">
          Active Entries
        </span>
      </div>
      
      <div className="overflow-x-auto scrollbar-none">
        <table className="w-full border-collapse text-xs min-w-[420px]">
          <thead>
            <tr className="border-b border-borderCustom">
              <th className="text-left pb-3 text-[11px] font-semibold uppercase tracking-wider text-textCustom/60">
                #
              </th>
              <th className="text-left pb-3 text-[11px] font-semibold uppercase tracking-wider text-textCustom/60">
                Numbers
              </th>
              <th className="text-left pb-3 text-[11px] font-semibold uppercase tracking-wider text-textCustom/60">
                Type
              </th>
              <th className="text-left pb-3 text-[11px] font-semibold uppercase tracking-wider text-textCustom/60">
                Wager
              </th>
              <th className="text-left pb-3 text-[11px] font-semibold uppercase tracking-wider text-textCustom/60">
                Status
              </th>
              <th className="text-left pb-3 text-[11px] font-semibold uppercase tracking-wider text-textCustom/60">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borderCustom/40">
            {myTickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-surface2/50 transition-colors">
                <td className="py-3 text-textCustom">
                  {ticket.id}
                </td>
                <td className="py-3 text-textCustom font-bold tracking-wider">
                  {ticket.number}
                </td>
                <td className="py-3 text-textCustom/80">
                  {ticket.mode}
                </td>
                <td className="py-3 text-textCustom">
                  {ticket.wager}
                </td>
                <td className="py-3">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-greenCustom/15 text-greenCustom">
                    {ticket.status}
                  </span>
                </td>
                <td className="py-3 text-textCustom/60 whitespace-nowrap">
                  {ticket.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
