import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function DispatcherPage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        {/* Left Column: Progress Bar + Create TR */}
        <div className="lg:col-span-5 flex flex-col gap-6 h-full">
          {/* Progress Bar Card */}
          <Card className="p-8">
            <div className="relative flex items-center justify-between">
              {/* Line behind */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-white/5 z-0"></div>
              {/* Active Line */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[33%] h-[2px] bg-[#6366f1] z-0"></div>
              
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-4 h-4 rounded-full bg-surface-container-high border-2 border-[#6366f1]"></div>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">Draft</span>
              </div>
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-6 h-6 rounded-full bg-[#6366f1] shadow-[0_0_15px_rgba(99,102,241,0.5)] border-4 border-surface"></div>
                <span className="text-[10px] font-bold text-[#6366f1] uppercase tracking-widest mt-1">Dispatched</span>
              </div>
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-4 h-4 rounded-full bg-surface-container border-2 border-white/10"></div>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">Completed</span>
              </div>
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-4 h-4 rounded-full bg-surface-container border-2 border-white/10"></div>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">Cancelled</span>
              </div>
            </div>
          </Card>

          {/* Create TR Card */}
          <Card className="p-6 flex-1 flex flex-col">
            <h2 className="text-[15px] font-bold text-on-surface mb-6 uppercase tracking-wider">CREATE TR:</h2>
            <form className="flex flex-col gap-5 flex-1">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-on-surface-variant">Source</label>
                <input className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-[#6366f1]/50" readOnly type="text" value="Gandhinagar Depot" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-on-surface-variant">Destination</label>
                <input className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-[#6366f1]/50" readOnly type="text" value="Ahmedabad Hub" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-on-surface-variant">Vehicle (Available only)</label>
                <div className="relative">
                  <select className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-3 text-sm text-on-surface appearance-none focus:outline-none focus:border-[#6366f1]/50">
                    <option>VAN-05 - 500 kg capacity</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none">expand_more</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-on-surface-variant">Driver (Available only)</label>
                <div className="relative">
                  <select className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-3 text-sm text-on-surface appearance-none focus:outline-none focus:border-[#6366f1]/50">
                    <option>Alex</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none">expand_more</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-on-surface-variant">Cargo Weight (KG)</label>
                <input className="w-full bg-[#131b2e] border border-error/20 rounded-lg px-4 py-3 text-sm text-error focus:outline-none focus:border-error/50" readOnly type="text" value="700" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-on-surface-variant">Planned Distance (KM)</label>
                <input className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-[#6366f1]/50" readOnly type="text" value="38" />
              </div>

              <div className="mt-auto pt-6">
                <div className="w-full bg-error/10 border-l-4 border-error p-4 rounded-r-lg">
                  <span className="text-sm font-medium text-on-surface-variant">Vehicle Capacity: <strong className="text-on-surface">500 kg</strong></span>
                </div>
              </div>
            </form>
          </Card>
        </div>

        {/* Right Column: Live Board */}
        <div className="lg:col-span-7 h-full">
          <Card className="h-full p-0 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-white/5">
              <h2 className="text-[15px] font-bold text-on-surface uppercase tracking-wider">LIVE BOARD</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              
              {/* Trip Item 1 */}
              <div className="relative rounded-xl border border-white/5 bg-[#171f33]/50 p-5 overflow-hidden flex flex-col gap-4">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#6366f1]"></div>
                <div className="flex justify-between items-center pl-2">
                  <span className="font-bold text-on-surface tracking-wide">TR001</span>
                  <span className="text-[10px] font-bold text-on-surface-variant bg-white/5 px-3 py-1.5 rounded-md uppercase tracking-wider">VAN-05 / ALEX</span>
                </div>
                <div className="pl-2 flex items-center gap-3 text-[15px] text-on-surface-variant font-medium">
                  <span>Gandhinagar Depot</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  <span>Ahmedabad Hub</span>
                </div>
                <div className="pl-2 flex justify-between items-center mt-2">
                  <Badge variant="primary" className="bg-[#6366f1]/20 border border-[#6366f1]/30">Dispatched</Badge>
                  <span className="text-xs font-semibold text-on-surface-variant">45 min</span>
                </div>
              </div>

              {/* Trip Item 2 */}
              <div className="relative rounded-xl border border-white/5 bg-[#171f33]/30 p-5 overflow-hidden flex flex-col gap-4 hover:border-white/10 transition-colors">
                <div className="flex justify-between items-center pl-2">
                  <span className="font-bold text-on-surface-variant tracking-wide">TR004</span>
                  <span className="text-[10px] font-bold text-on-surface-variant bg-white/5 px-3 py-1.5 rounded-md uppercase tracking-wider">TRUCK-04 / SURESH</span>
                </div>
                <div className="pl-2 flex items-center gap-3 text-[15px] text-on-surface-variant font-medium">
                  <span>Vatva Industrial Area</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  <span>Sanand Warehouse</span>
                </div>
                <div className="pl-2 flex justify-between items-center mt-2">
                  <Badge variant="outline" className="bg-white/5 border-white/10 text-on-surface-variant">Draft</Badge>
                  <span className="text-xs font-semibold text-on-surface-variant">Awaiting driver</span>
                </div>
              </div>

              {/* Trip Item 3 */}
              <div className="relative rounded-xl border border-white/5 bg-[#171f33]/30 p-5 overflow-hidden flex flex-col gap-4 hover:border-white/10 transition-colors">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ffb4ab]/40"></div>
                <div className="flex justify-between items-center pl-2">
                  <span className="font-bold text-on-surface-variant tracking-wide">TR006</span>
                  <span className="text-[10px] font-bold text-on-surface-variant bg-white/5 px-3 py-1.5 rounded-md uppercase tracking-wider">UNASSIGNED</span>
                </div>
                <div className="pl-2 flex items-center gap-3 text-[15px] text-on-surface-variant font-medium opacity-50">
                  <span>Mansa</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  <span>Kalol Depot</span>
                </div>
                <div className="pl-2 flex justify-between items-center mt-2">
                  <Badge variant="danger" className="bg-[#ffb4ab]/10 border-[#ffb4ab]/20 text-[#ffb4ab]">Cancelled</Badge>
                  <span className="text-xs font-semibold text-on-surface-variant">Vehicle went to shop</span>
                </div>
              </div>

            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}