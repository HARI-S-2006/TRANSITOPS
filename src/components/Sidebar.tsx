"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const getLinkClasses = (path: string) => {
    if (pathname === path) {
      return "flex items-center gap-3 px-4 py-3 bg-[#6366f1]/20 text-[#6366f1] rounded-xl border-l-2 border-[#6366f1] font-semibold scale-[0.98] transition-transform duration-200 shadow-[0_0_12px_rgba(99,102,241,0.2)]";
    }
    return "flex items-center gap-3 px-4 py-3 text-on-surface-variant/80 dark:text-on-surface-variant/80 hover:text-[#6366f1] hover:bg-white/5 transition-all duration-200 ease-out rounded-xl";
  };

  const getIconStyle = (path: string) => {
    if (pathname === path) {
      return { fontVariationSettings: "'FILL' 1" };
    }
    return {};
  };

  return (
    <nav className="fixed left-0 top-0 h-full w-[240px] xl:w-64 bg-[#0e1628] border-r border-white/5 z-50">
      <div className="flex flex-col h-full p-6 gap-2">
        <div className="mb-8 px-4 flex flex-col gap-1">
          <span className="font-headline-md text-headline-md font-bold text-[#6366f1] tracking-tight">TransitOps</span>
          <span className="font-label-md text-label-md text-on-surface-variant/80">Logistics Management</span>
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/dashboard" className={getLinkClasses("/dashboard")}>
            <span className="material-symbols-outlined" style={getIconStyle("/dashboard")}>dashboard</span>
            <span>Dashboard</span>
          </Link>
          <Link href="/vehicles" className={getLinkClasses("/vehicles")}>
            <span className="material-symbols-outlined" style={getIconStyle("/vehicles")}>local_shipping</span>
            <span>Fleet</span>
          </Link>
          <Link href="/drivers" className={getLinkClasses("/drivers")}>
            <span className="material-symbols-outlined" style={getIconStyle("/drivers")}>person</span>
            <span>Drivers</span>
          </Link>
          <Link href="/dispatcher" className={getLinkClasses("/dispatcher")}>
            <span className="material-symbols-outlined" style={getIconStyle("/dispatcher")}>route</span>
            <span>Trips</span>
          </Link>
          <Link href="/maintenance" className={getLinkClasses("/maintenance")}>
            <span className="material-symbols-outlined" style={getIconStyle("/maintenance")}>build</span>
            <span>Maintenance</span>
          </Link>
          <Link href="/fuel" className={getLinkClasses("/fuel")}>
            <span className="material-symbols-outlined" style={getIconStyle("/fuel")}>local_gas_station</span>
            <span>Fuel &amp; Expenses</span>
          </Link>
          <Link href="/reports" className={getLinkClasses("/reports")}>
            <span className="material-symbols-outlined" style={getIconStyle("/reports")}>analytics</span>
            <span>Analytics</span>
          </Link>
        </div>
        <div className="mt-auto">
          <Link href="/settings" className={getLinkClasses("/settings")}>
            <span className="material-symbols-outlined" style={getIconStyle("/settings")}>settings</span>
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
