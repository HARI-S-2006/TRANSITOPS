import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-[28px] font-bold text-on-surface tracking-tight">My Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-full">
          <Card className="p-8 flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="h-24 w-24 rounded-full bg-surface-container-highest border-2 border-[#6366f1]/50 overflow-hidden shadow-lg mx-auto">
                <img alt="Raven K." className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMIhBULmfRD7lAOgR9veVP-aGv1DziQTIb7Ox--jnzN5lPgVbZEs4jx-3uUaxM6FF9wXJzDvC0RWp_AtKwh4sYvMc8jpdx-_Aez9bXAHJluBwR28pEPX4T_BS6M4QVzHdSY4hMJwuMxIMB-AqwMINi_AwIdNzhF7TCJNwaHg68xAd7y6aoxub8r91XY20HezubqOaEeJLYIEUKiP0ruLid1O-xPtVGb8cDPaH8wbA_M1RN3nhJpvd_24OLp9_GtoApL8UQzt-XU6o" />
              </div>
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-[#00a572] rounded-full border-2 border-surface"></span>
            </div>
            
            <h2 className="text-xl font-bold text-on-surface mb-1">Raven K.</h2>
            <p className="text-sm text-on-surface-variant mb-4">raven.k@transitops.in</p>
            <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-[#6366f1]/10 text-[#6366f1] uppercase border border-[#6366f1]/20">Dispatcher</span>
            
            <div className="w-full h-px bg-white/5 my-6"></div>
            
            <div className="w-full flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant font-medium">Employee ID</span>
                <span className="text-on-surface font-mono">TRN-8942</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant font-medium">Joined</span>
                <span className="text-on-surface">Oct 2024</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant font-medium">Location</span>
                <span className="text-on-surface">Gandhinagar HQ</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Edit Details */}
        <div className="lg:col-span-8 flex flex-col gap-6 h-full">
          <Card className="p-8 flex-1 flex flex-col">
            <h2 className="text-[13px] font-bold text-on-surface-variant mb-6 uppercase tracking-widest">PERSONAL INFORMATION</h2>
            <form className="flex flex-col gap-6 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">First Name</label>
                  <input className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-3 text-[15px] font-medium text-on-surface focus:outline-none focus:border-[#6366f1]/50" type="text" defaultValue="Raven" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Last Name</label>
                  <input className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-3 text-[15px] font-medium text-on-surface focus:outline-none focus:border-[#6366f1]/50" type="text" defaultValue="K." />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Email Address</label>
                <input className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-3 text-[15px] font-medium text-on-surface opacity-60 cursor-not-allowed" type="email" defaultValue="raven.k@transitops.in" disabled />
                <span className="text-[11px] text-on-surface-variant mt-1">Email address is managed by your organization.</span>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Phone Number</label>
                <input className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-3 text-[15px] font-medium text-on-surface focus:outline-none focus:border-[#6366f1]/50" type="tel" defaultValue="+91 98765 43210" />
              </div>

              <div className="mt-auto pt-8 flex gap-4 justify-end">
                <Button variant="secondary" className="px-6 py-2.5 text-sm tracking-wide bg-transparent border border-white/10 hover:bg-white/5">
                  Cancel
                </Button>
                <Button variant="primary" className="px-6 py-2.5 shadow-[0_0_15px_rgba(99,102,241,0.3)] text-sm tracking-wide">
                  Save changes
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
