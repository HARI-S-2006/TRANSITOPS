"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type UserProps = {
  name: string;
  email: string;
  role: string;
};

export default function Header({ user }: { user?: UserProps }) {
  const [roleOpen, setRoleOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const router = useRouter();

  const nameParts = (user?.name || 'User').split(' ');
  const initials = `${nameParts[0].charAt(0)}${nameParts.length > 1 ? nameParts[1].charAt(0) : ''}`;

  const roleIconMap: Record<string, string> = {
    'Fleet Manager': 'local_shipping',
    'Dispatcher': 'headphones',
    'Safety Officer': 'health_and_safety',
    'Financial Analyst': 'monitoring'
  };
  const roleIcon = roleIconMap[user?.role || 'Dispatcher'] || 'person';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.dropdown-container')) {
        setRoleOpen(false);
        setNotifOpen(false);
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };

  const toggleProfile = () => {
    if (!profileOpen) {
      setProfileOpen(true);
      setRoleOpen(false);
      setNotifOpen(false);
      setIsProfileLoading(true);
      setTimeout(() => setIsProfileLoading(false), 800);
    } else {
      setProfileOpen(false);
    }
  };

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-256px)] z-40 flex justify-between items-center h-20 px-8 bg-[#0e1628]/70 dark:bg-[#0e1628]/70 backdrop-blur-xl border-b border-white/10 dark:border-white/10">
      <div className="flex-1 flex items-center">
        <div className="relative w-72 focus-within:ring-1 focus-within:ring-[#6366f1]/50 transition-all rounded-lg">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
          <input className="w-full bg-surface-container-high/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-[#6366f1]/50 backdrop-blur-md" placeholder="Search operations..." type="text" />
        </div>
      </div>
      <div className="flex items-center gap-5 dropdown-container">
        
        {/* Role Selector */}
        <div className="relative">
          <button 
            onClick={() => { setRoleOpen(!roleOpen); setNotifOpen(false); setProfileOpen(false); }}
            className="font-label-md text-label-md text-on-surface-variant hover:text-[#6366f1] transition-colors duration-200 border border-white/10 rounded-lg px-4 py-2 flex items-center gap-2 bg-surface-container/30">
            <span className="material-symbols-outlined text-[18px]">{roleIcon}</span>
            {user?.role || 'Dispatcher'}
          </button>
          {roleOpen && (
            <div className="absolute top-full mt-2 right-0 w-48 bg-[#0e1628] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
              <div className="flex flex-col py-2">
                <button className="px-4 py-2 text-left font-body-md text-on-surface hover:bg-white/5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                  Fleet Manager
                </button>
                <button className="px-4 py-2 text-left font-body-md text-[#6366f1] bg-[#6366f1]/10 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">headphones</span>
                  Dispatcher
                </button>
                <button className="px-4 py-2 text-left font-body-md text-on-surface hover:bg-white/5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">health_and_safety</span>
                  Safety Officer
                </button>
                <button className="px-4 py-2 text-left font-body-md text-on-surface hover:bg-white/5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">monitoring</span>
                  Financial Analyst
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => { setNotifOpen(!notifOpen); setRoleOpen(false); setProfileOpen(false); }}
            className="relative text-on-surface-variant dark:text-on-surface-variant hover:text-[#6366f1] transition-colors duration-200">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#6366f1] rounded-full border-2 border-surface"></span>
          </button>
          {notifOpen && (
            <div className="absolute top-full mt-4 right-[-40px] w-80 bg-[#0e1628] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
              <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <h3 className="font-headline-sm text-on-surface">Notifications</h3>
                <span className="text-[#6366f1] text-xs cursor-pointer">Mark all read</span>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                <div className="p-4 border-b border-white/10 hover:bg-white/5 cursor-pointer flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-error/20 flex items-center justify-center text-error">
                    <span className="material-symbols-outlined text-[16px]">warning</span>
                  </div>
                  <div>
                    <p className="text-sm text-on-surface">Vehicle TRK-102 reported high engine temp.</p>
                    <span className="text-xs text-on-surface-variant">2 mins ago</span>
                  </div>
                </div>
                <div className="p-4 border-b border-white/10 hover:bg-white/5 cursor-pointer flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  </div>
                  <div>
                    <p className="text-sm text-on-surface">Maintenance completed for VAN-05.</p>
                    <span className="text-xs text-on-surface-variant">1 hour ago</span>
                  </div>
                </div>
              </div>
              <div className="p-3 text-center border-t border-white/10">
                <span className="text-sm text-[#6366f1] cursor-pointer hover:underline">View all</span>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button 
            onClick={toggleProfile}
            className="h-10 w-10 rounded-full bg-surface-container-highest border border-white/10 flex items-center justify-center overflow-hidden shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]">
            <span className="text-[15px] text-[#6366f1] font-bold">{initials}</span>
          </button>
          {profileOpen && (
            <div className="absolute top-full mt-2 right-0 w-64 bg-[#0e1628] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
              {isProfileLoading ? (
                // Skeleton Loader
                <div className="animate-pulse">
                  <div className="p-4 border-b border-white/10">
                    <div className="flex justify-between items-start mb-1">
                      <div className="h-6 w-20 bg-white/10 rounded"></div>
                      <div className="h-5 w-12 bg-white/10 rounded"></div>
                    </div>
                    <div className="h-4 w-32 bg-white/10 rounded mb-3"></div>
                    
                    <div className="bg-surface-container-high/50 rounded-lg p-2.5 border border-white/5">
                      <div className="flex justify-between items-center mb-2">
                        <div className="h-3 w-16 bg-white/10 rounded"></div>
                        <div className="h-3 w-20 bg-white/10 rounded"></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="h-3 w-20 bg-white/10 rounded"></div>
                        <div className="h-3 w-12 bg-white/10 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col py-2">
                    <div className="px-4 py-2 flex items-center gap-2">
                      <div className="w-[18px] h-[18px] bg-white/10 rounded"></div>
                      <div className="h-4 w-16 bg-white/10 rounded"></div>
                    </div>
                    <div className="px-4 py-2 flex items-center gap-2">
                      <div className="w-[18px] h-[18px] bg-white/10 rounded"></div>
                      <div className="h-4 w-16 bg-white/10 rounded"></div>
                    </div>
                    <div className="h-px bg-white/10 my-2"></div>
                    <div className="px-4 py-2 flex items-center gap-2">
                      <div className="w-[18px] h-[18px] bg-error/20 rounded"></div>
                      <div className="h-4 w-16 bg-error/20 rounded"></div>
                    </div>
                  </div>
                </div>
              ) : (
                // Loaded Content
                <>
                  <div className="p-4 border-b border-white/10">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-headline-sm text-on-surface">{user?.name || 'User'}</p>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-primary/20 text-primary uppercase">Online</span>
                    </div>
                    <p className="text-sm text-on-surface-variant mb-3">{user?.email || 'email@example.com'}</p>
                    
                    <div className="bg-surface-container-high/50 rounded-lg p-2.5 border border-white/5">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-on-surface-variant">Active Shift</span>
                        <span className="text-xs font-mono text-[#6366f1]">08:00 - 16:00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-on-surface-variant">Trips Managed</span>
                        <span className="text-xs font-bold text-on-surface">12 Today</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col py-2">
                    <Link href="/profile" className="px-4 py-2 text-sm text-on-surface hover:bg-white/5 flex items-center gap-2 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">person</span>
                      My Profile
                    </Link>
                    <Link href="/settings" className="px-4 py-2 text-sm text-on-surface hover:bg-white/5 flex items-center gap-2 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">settings</span>
                      Settings
                    </Link>
                    <div className="h-px bg-white/10 my-2"></div>
                    <button 
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm text-error hover:bg-error/10 flex items-center gap-2 transition-colors text-left">
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
