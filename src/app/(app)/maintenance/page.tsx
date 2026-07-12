import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function MaintenancePage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        
        {/* Left Column: Form & Diagram */}
        <div className="lg:col-span-5 flex flex-col gap-6 h-full">
          
          {/* Form Card */}
          <Card className="p-6 flex-1 flex flex-col">
            <h2 className="text-[15px] font-bold text-on-surface mb-6 uppercase tracking-wider">LOG SERVICE RECORD</h2>
            <form className="flex flex-col gap-5 flex-1">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Vehicle</label>
                <input className="w-full bg-white text-[#111827] font-semibold border-none rounded-lg px-4 py-3 text-sm focus:outline-none" readOnly type="text" value="VAN-05" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Service Type</label>
                <input className="w-full bg-white text-[#111827] font-semibold border-none rounded-lg px-4 py-3 text-sm focus:outline-none" placeholder="e.g. Oil Change" type="text" defaultValue="Oil Change" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Cost</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#111827]/50 font-bold">$</span>
                  <input className="w-full bg-white text-[#111827] font-semibold border-none rounded-lg pl-8 pr-4 py-3 text-sm focus:outline-none" placeholder="2500" type="number" defaultValue="2500" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Date</label>
                <div className="relative">
                  <input className="w-full bg-white text-[#111827] font-semibold border-none rounded-lg px-4 py-3 text-sm appearance-none focus:outline-none [&::-webkit-calendar-picker-indicator]:opacity-0" type="date" defaultValue="2026-07-07" />
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#111827]/50 pointer-events-none text-[20px]">calendar_today</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Status</label>
                <div className="relative">
                  <select className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-3 text-sm text-on-surface font-semibold appearance-none focus:outline-none focus:border-[#6366f1]/50">
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]">expand_more</span>
                </div>
              </div>
              <div className="mt-auto pt-6">
                <Button variant="primary" className="w-full justify-center py-3.5 shadow-[0_0_15px_rgba(99,102,241,0.3)] text-sm tracking-wide">
                  Save Record
                </Button>
              </div>
            </form>
          </Card>

          {/* Diagram Card */}
          <Card className="p-6 border-l-2 border-l-[#4e8dff] bg-surface-container/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <span className="material-symbols-outlined text-6xl">build</span>
            </div>
            <div className="flex flex-col gap-5 relative z-10">
              <div>
                <div className="flex items-center justify-between text-[13px] font-bold tracking-wide">
                  <span className="text-[#4edea3]">Available</span>
                  <div className="flex-1 flex items-center px-4">
                    <div className="h-[1px] bg-white/10 flex-1"></div>
                    <span className="material-symbols-outlined text-white/20 mx-2 text-[14px]">arrow_forward</span>
                  </div>
                  <span className="text-[#4e8dff]">In Shop</span>
                </div>
                <div className="text-center mt-2">
                  <span className="text-[11px] text-on-surface-variant">creating active record</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between text-[13px] font-bold tracking-wide">
                  <span className="text-[#4e8dff]">In Shop</span>
                  <div className="flex-1 flex items-center px-4">
                    <div className="h-[1px] bg-white/10 flex-1"></div>
                    <span className="material-symbols-outlined text-white/20 mx-2 text-[14px]">arrow_forward</span>
                  </div>
                  <span className="text-[#4edea3]">Available</span>
                </div>
                <div className="text-center mt-2">
                  <span className="text-[11px] text-on-surface-variant">closing record (not retired)</span>
                </div>
              </div>

              <p className="text-[13px] text-[#4e8dff] italic font-medium mt-2">
                Note: In Shop vehicles are automatically removed from the dispatch pool.
              </p>
            </div>
          </Card>
        </div>

        {/* Right Column: Service Log */}
        <div className="lg:col-span-7 h-full">
          <Card className="h-full p-0 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-white/5">
              <h2 className="text-[15px] font-bold text-on-surface uppercase tracking-wider">SERVICE LOG</h2>
            </div>
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="py-5 px-6 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Vehicle</th>
                    <th className="py-5 px-6 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Service</th>
                    <th className="py-5 px-6 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Cost</th>
                    <th className="py-5 px-6 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="font-medium text-[14px]">
                  
                  <tr className="border-b border-white/5 hover:bg-[#171f33]/50 transition-colors group">
                    <td className="py-5 px-6 text-on-surface font-bold group-hover:text-[#6366f1] transition-colors tracking-wide">VAN-05</td>
                    <td className="py-5 px-6 text-on-surface-variant">Oil Change</td>
                    <td className="py-5 px-6 text-on-surface font-semibold">$ 2,500</td>
                    <td className="py-5 px-6 text-right">
                      <Badge variant="outline" className="border-[#4e8dff]/30 text-[#4e8dff] bg-[#4e8dff]/10">In Shop</Badge>
                    </td>
                  </tr>

                  <tr className="border-b border-white/5 hover:bg-[#171f33]/50 transition-colors group">
                    <td className="py-5 px-6 text-on-surface font-bold group-hover:text-[#6366f1] transition-colors tracking-wide">TRUCK-11</td>
                    <td className="py-5 px-6 text-on-surface-variant">Engine Repair</td>
                    <td className="py-5 px-6 text-on-surface font-semibold">$ 18,000</td>
                    <td className="py-5 px-6 text-right">
                      <Badge variant="outline" className="border-[#00a572]/30 text-[#00a572] bg-[#00a572]/10">Completed</Badge>
                    </td>
                  </tr>

                  <tr className="border-b border-white/5 hover:bg-[#171f33]/50 transition-colors group">
                    <td className="py-5 px-6 text-on-surface font-bold group-hover:text-[#6366f1] transition-colors tracking-wide">MINI-03</td>
                    <td className="py-5 px-6 text-on-surface-variant">Tyre Replace</td>
                    <td className="py-5 px-6 text-on-surface font-semibold">$ 6,200</td>
                    <td className="py-5 px-6 text-right">
                      <Badge variant="outline" className="border-[#4e8dff]/30 text-[#4e8dff] bg-[#4e8dff]/10">In Shop</Badge>
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