import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function FuelPage() {
  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-[28px] font-bold text-on-surface tracking-tight">Fuel & Expense Management</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="border-white/10 hover:bg-white/5">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add Expense
          </Button>
          <Button variant="primary" className="shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            <span className="material-symbols-outlined text-[18px] font-bold">local_gas_station</span>
            Log Fuel
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6 flex-1">
        
        {/* Fuel Logs */}
        <Card className="p-0 overflow-hidden flex flex-col border-l-[3px] border-l-[#6366f1]">
          <div className="p-6 pb-2">
            <h2 className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">FUEL LOGS</h2>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="py-4 px-8 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Vehicle</th>
                  <th className="py-4 px-8 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Date</th>
                  <th className="py-4 px-8 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Liters</th>
                  <th className="py-4 px-8 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Cost (USD)</th>
                </tr>
              </thead>
              <tbody className="font-medium text-[15px]">
                
                <tr className="border-b border-white/5 hover:bg-[#171f33]/50 transition-colors group">
                  <td className="py-5 px-8 text-on-surface font-bold group-hover:text-[#6366f1] transition-colors tracking-wide">VAN-05</td>
                  <td className="py-5 px-8 text-on-surface-variant">05 Jul 2024</td>
                  <td className="py-5 px-8 text-on-surface-variant">42 L</td>
                  <td className="py-5 px-8 text-on-surface font-semibold">$150.00</td>
                </tr>

                <tr className="border-b border-white/5 hover:bg-[#171f33]/50 transition-colors group">
                  <td className="py-5 px-8 text-on-surface font-bold group-hover:text-[#6366f1] transition-colors tracking-wide">TRUCK-11</td>
                  <td className="py-5 px-8 text-on-surface-variant">06 Jul 2024</td>
                  <td className="py-5 px-8 text-on-surface-variant">110 L</td>
                  <td className="py-5 px-8 text-on-surface font-semibold">$400.00</td>
                </tr>

                <tr className="hover:bg-[#171f33]/50 transition-colors group">
                  <td className="py-5 px-8 text-on-surface font-bold group-hover:text-[#6366f1] transition-colors tracking-wide">MINI-08</td>
                  <td className="py-5 px-8 text-on-surface-variant">06 Jul 2024</td>
                  <td className="py-5 px-8 text-on-surface-variant">28 L</td>
                  <td className="py-5 px-8 text-on-surface font-semibold">$95.00</td>
                </tr>

              </tbody>
            </table>
          </div>
        </Card>

        {/* Other Expenses */}
        <Card className="p-0 overflow-hidden flex flex-col border-l-[3px] border-l-[#00a572]">
          <div className="p-6 pb-2">
            <h2 className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">OTHER EXPENSES (TOLL / MISC)</h2>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="py-4 px-8 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Trip Ref</th>
                  <th className="py-4 px-8 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Vehicle</th>
                  <th className="py-4 px-8 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Tolls</th>
                  <th className="py-4 px-8 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Misc</th>
                  <th className="py-4 px-8 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Maint. (Linked)</th>
                  <th className="py-4 px-8 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="font-medium text-[15px]">
                
                <tr className="border-b border-white/5 hover:bg-[#171f33]/50 transition-colors group">
                  <td className="py-5 px-8 text-on-surface font-bold group-hover:text-[#6366f1] transition-colors tracking-wide">TR001</td>
                  <td className="py-5 px-8 text-on-surface-variant">VAN-05</td>
                  <td className="py-5 px-8 text-on-surface font-semibold">$20.00</td>
                  <td className="py-5 px-8 text-on-surface font-semibold">$0.00</td>
                  <td className="py-5 px-8 text-on-surface-variant opacity-50">—</td>
                  <td className="py-5 px-8 text-right">
                    <Badge variant="outline" className="border-white/10 text-on-surface-variant bg-white/5">Pending</Badge>
                  </td>
                </tr>

                <tr className="hover:bg-[#171f33]/50 transition-colors group">
                  <td className="py-5 px-8 text-on-surface font-bold group-hover:text-[#6366f1] transition-colors tracking-wide">TR002</td>
                  <td className="py-5 px-8 text-on-surface-variant">TRK-12</td>
                  <td className="py-5 px-8 text-on-surface font-semibold">$140.00</td>
                  <td className="py-5 px-8 text-on-surface font-semibold">$50.00</td>
                  <td className="py-5 px-8 text-[#ffb4ab] font-bold">$8,000.00</td>
                  <td className="py-5 px-8 text-right">
                    <Badge variant="outline" className="border-white/20 text-on-surface bg-white/5">Cleared</Badge>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </Card>

        {/* Total Cost Banner */}
        <Card className="p-8 mt-auto flex items-center justify-between bg-surface-container/30 border-white/5">
          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">TOTAL OPERATIONAL COST (AUTO)</h2>
            <span className="text-[13px] text-on-surface-variant opacity-50 font-medium">Fuel + Maint + Misc</span>
          </div>
          <div className="text-[48px] font-bold text-[#c0c1ff] tracking-tight drop-shadow-[0_0_20px_rgba(192,193,255,0.4)]">
            $34,070.00
          </div>
        </Card>

      </div>
    </div>
  );
}