import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function DriversPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-on-surface tracking-tight">Drivers & Safety Profiles</h1>
        <Button variant="primary" className="shadow-[0_0_15px_rgba(99,102,241,0.3)]">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Driver
        </Button>
      </div>

      <Card className="flex-1 flex flex-col p-0 overflow-hidden">
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5">
                <th className="py-5 px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Driver</th>
                <th className="py-5 px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider">License No</th>
                <th className="py-5 px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Category</th>
                <th className="py-5 px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Expiry</th>
                <th className="py-5 px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Contact</th>
                <th className="py-5 px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Trip Compl.</th>
                <th className="py-5 px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="font-medium text-[15px]">
              
              <tr className="border-b border-white/5 hover:bg-[#171f33]/50 transition-colors group">
                <td className="py-5 px-6 text-on-surface font-bold group-hover:text-[#6366f1] transition-colors">Alex</td>
                <td className="py-5 px-6 text-on-surface-variant">DL-88213</td>
                <td className="py-5 px-6 text-on-surface-variant">LMV</td>
                <td className="py-5 px-6 text-[#4edea3]">12/2028</td>
                <td className="py-5 px-6 text-[#6366f1]">98765xxxxx</td>
                <td className="py-5 px-6 text-on-surface-variant">96%</td>
                <td className="py-5 px-6">
                  <Badge variant="outline" className="border-[#4edea3]/30 text-[#4edea3] bg-[#4edea3]/5">AVAILABLE</Badge>
                </td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-[#171f33]/50 transition-colors group">
                <td className="py-5 px-6 text-on-surface font-bold group-hover:text-[#6366f1] transition-colors">John</td>
                <td className="py-5 px-6 text-on-surface-variant">DL-44120</td>
                <td className="py-5 px-6 text-on-surface-variant">HMV</td>
                <td className="py-5 px-6 flex items-center gap-3 text-[#ffb4ab]">
                  03/2025
                  <span className="text-[10px] bg-[#ffb4ab]/10 border border-[#ffb4ab]/20 text-[#ffb4ab] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">EXPIRED</span>
                </td>
                <td className="py-5 px-6 text-[#6366f1]">98220xxxxx</td>
                <td className="py-5 px-6 text-on-surface-variant">81%</td>
                <td className="py-5 px-6">
                  <Badge variant="danger" className="bg-[#ffb4ab]/5 border-[#ffb4ab]/30 text-[#ffb4ab]">SUSPENDED</Badge>
                </td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-[#171f33]/50 transition-colors group">
                <td className="py-5 px-6 text-on-surface font-bold group-hover:text-[#6366f1] transition-colors">Priya</td>
                <td className="py-5 px-6 text-on-surface-variant">DL-77031</td>
                <td className="py-5 px-6 text-on-surface-variant">LMV</td>
                <td className="py-5 px-6 text-[#4edea3]">08/2026</td>
                <td className="py-5 px-6 text-[#6366f1]">99110xxxxx</td>
                <td className="py-5 px-6 text-on-surface-variant">99%</td>
                <td className="py-5 px-6">
                  <Badge variant="primary" className="bg-[#6366f1]/10 border border-[#6366f1]/30 text-[#c0c1ff]">ON TRIP</Badge>
                </td>
              </tr>

              <tr className="border-b border-white/5 hover:bg-[#171f33]/50 transition-colors group">
                <td className="py-5 px-6 text-on-surface font-bold group-hover:text-[#6366f1] transition-colors">Suresh</td>
                <td className="py-5 px-6 text-on-surface-variant">DL-90045</td>
                <td className="py-5 px-6 text-on-surface-variant">HMV</td>
                <td className="py-5 px-6 text-[#4edea3]">01/2027</td>
                <td className="py-5 px-6 text-[#6366f1]">97440xxxxx</td>
                <td className="py-5 px-6 text-on-surface-variant">88%</td>
                <td className="py-5 px-6">
                  <Badge variant="outline" className="border-white/20 text-on-surface-variant bg-white/5">OFF DUTY</Badge>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        <div className="p-6 bg-surface-container/30 border-t border-white/5 mt-auto">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">TOGGLE STAT</span>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-[#4edea3]/30 text-[#4edea3] bg-[#4edea3]/5 cursor-pointer hover:bg-[#4edea3]/10">AVAILABLE</Badge>
              <Badge variant="primary" className="bg-[#6366f1]/10 border border-[#6366f1]/30 text-[#c0c1ff] cursor-pointer hover:bg-[#6366f1]/20">ON TRIP</Badge>
              <Badge variant="outline" className="border-white/20 text-on-surface-variant bg-white/5 cursor-pointer hover:bg-white/10">OFF DUTY</Badge>
              <Badge variant="danger" className="bg-[#ffb4ab]/5 border-[#ffb4ab]/30 text-[#ffb4ab] cursor-pointer hover:bg-[#ffb4ab]/10">SUSPENDED</Badge>
            </div>
            <p className="text-sm font-medium text-on-surface-variant mt-2">
              Rule: Expired license or Suspended status → <span className="text-on-surface">blocked from trip assignment</span>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}