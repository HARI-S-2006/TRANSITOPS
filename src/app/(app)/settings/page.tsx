import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-[28px] font-bold text-on-surface tracking-tight">Settings & RBAC</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
        
        {/* Left Column: General Settings */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-full">
          <Card className="p-6 flex-1 flex flex-col">
            <h2 className="text-[13px] font-bold text-on-surface-variant mb-6 uppercase tracking-widest">GENERAL</h2>
            <form className="flex flex-col gap-6 flex-1">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Depot Name</label>
                <input className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-3 text-[15px] font-medium text-on-surface focus:outline-none focus:border-[#6366f1]/50" type="text" defaultValue="Gandhinagar Depot GJ4" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Currency</label>
                <div className="relative">
                  <select className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-3 text-[15px] font-medium text-on-surface appearance-none focus:outline-none focus:border-[#6366f1]/50 cursor-pointer">
                    <option>INR (Rs)</option>
                    <option>USD ($)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]">expand_more</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Distance Unit</label>
                <div className="relative">
                  <select className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-3 text-[15px] font-medium text-on-surface appearance-none focus:outline-none focus:border-[#6366f1]/50 cursor-pointer">
                    <option>Kilometers</option>
                    <option>Miles</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]">expand_more</span>
                </div>
              </div>

              <div className="mt-auto pt-6">
                <Button variant="primary" className="w-full justify-center py-3.5 shadow-[0_0_15px_rgba(99,102,241,0.3)] text-sm tracking-wide">
                  Save changes
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Right Column: RBAC */}
        <div className="lg:col-span-8 h-full">
          <Card className="h-full p-0 overflow-hidden flex flex-col border-l-2 border-l-[#00a572]">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-surface-container/30">
              <h2 className="text-[13px] font-bold text-on-surface-variant uppercase tracking-widest">ROLE-BASED ACCESS (RBAC)</h2>
              <button className="text-[13px] font-bold text-on-surface-variant hover:text-[#6366f1] flex items-center gap-1 transition-colors">
                <span className="material-symbols-outlined text-[16px]">add</span> Add Role
              </button>
            </div>
            
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="py-4 px-6 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Role</th>
                    <th className="py-4 px-6 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-center">Fleet</th>
                    <th className="py-4 px-6 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-center">Driver</th>
                    <th className="py-4 px-6 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-center">Trips</th>
                    <th className="py-4 px-6 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-center">Fuel/Exp.</th>
                    <th className="py-4 px-6 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-center">Analytics</th>
                  </tr>
                </thead>
                <tbody className="font-medium text-[15px]">
                  
                  {/* Fleet Manager */}
                  <tr className="border-b border-white/5 hover:bg-[#171f33]/50 transition-colors group">
                    <td className="py-5 px-6 text-on-surface font-bold">
                      <div className="flex flex-col">
                        <span>Fleet</span>
                        <span>Manager</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-center">
                      <span className="material-symbols-outlined text-[#00a572] font-bold text-[20px]">check</span>
                    </td>
                    <td className="py-5 px-6 text-center">
                      <span className="material-symbols-outlined text-[#00a572] font-bold text-[20px]">check</span>
                    </td>
                    <td className="py-5 px-6 text-center text-on-surface-variant opacity-50">—</td>
                    <td className="py-5 px-6 text-center text-on-surface-variant opacity-50">—</td>
                    <td className="py-5 px-6 text-center">
                      <span className="material-symbols-outlined text-[#00a572] font-bold text-[20px]">check</span>
                    </td>
                  </tr>

                  {/* Dispatcher */}
                  <tr className="border-b border-white/5 hover:bg-[#171f33]/50 transition-colors group">
                    <td className="py-5 px-6 text-on-surface font-bold">Dispatcher</td>
                    <td className="py-5 px-6 text-center text-on-surface-variant text-[13px] italic">view</td>
                    <td className="py-5 px-6 text-center text-on-surface-variant opacity-50">—</td>
                    <td className="py-5 px-6 text-center">
                      <span className="material-symbols-outlined text-[#00a572] font-bold text-[20px]">check</span>
                    </td>
                    <td className="py-5 px-6 text-center text-on-surface-variant opacity-50">—</td>
                    <td className="py-5 px-6 text-center text-on-surface-variant opacity-50">—</td>
                  </tr>

                  {/* Safety Officer */}
                  <tr className="border-b border-white/5 hover:bg-[#171f33]/50 transition-colors group">
                    <td className="py-5 px-6 text-on-surface font-bold">
                      <div className="flex flex-col">
                        <span>Safety</span>
                        <span>Officer</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-center text-on-surface-variant opacity-50">—</td>
                    <td className="py-5 px-6 text-center">
                      <span className="material-symbols-outlined text-[#00a572] font-bold text-[20px]">check</span>
                    </td>
                    <td className="py-5 px-6 text-center text-on-surface-variant text-[13px] italic">view</td>
                    <td className="py-5 px-6 text-center text-on-surface-variant opacity-50">—</td>
                    <td className="py-5 px-6 text-center text-on-surface-variant opacity-50">—</td>
                  </tr>

                  {/* Financial Analyst */}
                  <tr className="border-b border-white/5 hover:bg-[#171f33]/50 transition-colors group">
                    <td className="py-5 px-6 text-on-surface font-bold">
                      <div className="flex flex-col">
                        <span>Financial</span>
                        <span>Analyst</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-center text-on-surface-variant text-[13px] italic">view</td>
                    <td className="py-5 px-6 text-center text-on-surface-variant opacity-50">—</td>
                    <td className="py-5 px-6 text-center text-on-surface-variant opacity-50">—</td>
                    <td className="py-5 px-6 text-center">
                      <span className="material-symbols-outlined text-[#00a572] font-bold text-[20px]">check</span>
                    </td>
                    <td className="py-5 px-6 text-center">
                      <span className="material-symbols-outlined text-[#00a572] font-bold text-[20px]">check</span>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}