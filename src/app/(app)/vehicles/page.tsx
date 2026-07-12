import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function VehiclesPage() {
  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center gap-4">
        {/* Filters */}
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-48">
            <select className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-2.5 text-sm font-medium text-on-surface appearance-none focus:outline-none focus:border-[#6366f1]/50 cursor-pointer">
              <option>Type: All</option>
              <option>Van</option>
              <option>Truck</option>
              <option>Mini</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none">expand_more</span>
          </div>

          <div className="relative w-48">
            <select className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-2.5 text-sm font-medium text-on-surface appearance-none focus:outline-none focus:border-[#6366f1]/50 cursor-pointer">
              <option>Status: All</option>
              <option>Available</option>
              <option>On Trip</option>
              <option>In Shop</option>
              <option>Retired</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none">expand_more</span>
          </div>

          <div className="relative flex-1 max-w-md">
            <input className="w-full bg-[#131b2e] border border-white/5 rounded-lg py-2.5 pl-10 pr-4 text-sm font-medium text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-[#6366f1]/50" placeholder="Search reg. no..." type="text" />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
          </div>
        </div>

        <Button variant="primary" className="shadow-[0_0_15px_rgba(99,102,241,0.3)]">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Vehicle
        </Button>
      </div>

      <Card className="flex-1 flex flex-col p-0 overflow-hidden">
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-white/5">
                <th className="py-5 px-6 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Reg. No. (Unique)</th>
                <th className="py-5 px-6 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Name/Model</th>
                <th className="py-5 px-6 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Type</th>
                <th className="py-5 px-6 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Capacity</th>
                <th className="py-5 px-6 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Odometer</th>
                <th className="py-5 px-6 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Acq. Cost</th>
                <th className="py-5 px-6 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-center">Status</th>
              </tr>
            </thead>
            <tbody className="font-medium text-[15px]">
              
              <tr className="border-b border-white/5 hover:bg-[#171f33]/50 transition-colors group">
                <td className="py-5 px-6 text-on-surface font-bold group-hover:text-[#6366f1] transition-colors tracking-wide">GJ01AB452</td>
                <td className="py-5 px-6 text-on-surface-variant">VAN-05</td>
                <td className="py-5 px-6 text-on-surface-variant">Van</td>
                <td className="py-5 px-6 text-on-surface-variant">500 kg</td>
                <td className="py-5 px-6 text-on-surface">74,000</td>
                <td className="py-5 px-6 text-on-surface">6,20,000</td>
                <td className="py-5 px-6 text-center">
                  <Badge variant="outline" className="border-white/20 text-on-surface-variant bg-white/5 inline-flex">Available</Badge>
                </td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-[#171f33]/50 transition-colors group">
                <td className="py-5 px-6 text-on-surface font-bold group-hover:text-[#6366f1] transition-colors tracking-wide">GJ01AB998</td>
                <td className="py-5 px-6 text-on-surface-variant">TRUCK-11</td>
                <td className="py-5 px-6 text-on-surface-variant">Truck</td>
                <td className="py-5 px-6 text-on-surface-variant">5 Ton</td>
                <td className="py-5 px-6 text-on-surface">182,000</td>
                <td className="py-5 px-6 text-on-surface">24,50,000</td>
                <td className="py-5 px-6 text-center">
                  <Badge variant="primary" className="bg-[#6366f1]/10 border border-[#6366f1]/30 text-[#c0c1ff] inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1]"></span>
                    On Trip
                  </Badge>
                </td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-[#171f33]/50 transition-colors group">
                <td className="py-5 px-6 text-on-surface font-bold group-hover:text-[#6366f1] transition-colors tracking-wide">GJ01AB1120</td>
                <td className="py-5 px-6 text-on-surface-variant">MINI-03</td>
                <td className="py-5 px-6 text-on-surface-variant">Mini</td>
                <td className="py-5 px-6 text-on-surface-variant">1 Ton</td>
                <td className="py-5 px-6 text-on-surface">66,000</td>
                <td className="py-5 px-6 text-on-surface">4,10,000</td>
                <td className="py-5 px-6 text-center">
                  <Badge variant="outline" className="border-[#6366f1]/30 text-[#6366f1] bg-[#6366f1]/5 inline-flex">In Shop</Badge>
                </td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-[#171f33]/50 transition-colors group">
                <td className="py-5 px-6 text-on-surface-variant font-bold line-through opacity-50 tracking-wide">GJ01AB008</td>
                <td className="py-5 px-6 text-on-surface-variant opacity-50">VAN-09</td>
                <td className="py-5 px-6 text-on-surface-variant opacity-50">Van</td>
                <td className="py-5 px-6 text-on-surface-variant opacity-50">750 kg</td>
                <td className="py-5 px-6 text-on-surface opacity-50">241,900</td>
                <td className="py-5 px-6 text-on-surface opacity-50">5,90,000</td>
                <td className="py-5 px-6 text-center">
                  <Badge variant="outline" className="border-white/10 text-on-surface-variant opacity-50 inline-flex">Retired</Badge>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        <div className="p-6 bg-surface-container/30 border-t border-white/5 mt-auto">
          <p className="text-sm font-medium text-on-surface-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">info</span>
            Rule: Registration No. must be unique - <strong className="text-on-surface">Retired/In Shop vehicles are hidden from Trip Dispatcher</strong>
          </p>
        </div>
      </Card>
    </div>
  );
}