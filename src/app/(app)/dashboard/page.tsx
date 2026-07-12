import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MetricCard } from '@/components/ui/MetricCard';

export default function DashboardPage() {
  return (
    <>
      <div className="mb-stack-lg mt-8">
        <h1 className="font-headline-lg text-headline-lg text-on-surface">1. Dashboard</h1>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 mb-margin-desktop">
        <MetricCard title="Active Vehicles" value="53" barColor="bg-[#6366f1]" valueColor="text-[#6366f1] drop-shadow-[0_0_12px_rgba(99,102,241,0.4)]" />
        <MetricCard title="Available Vehicles" value="42" barColor="bg-[#6366f1]/80" valueColor="text-[#818cf8] drop-shadow-[0_0_12px_rgba(129,140,248,0.3)]" />
        <MetricCard title="Maintenance" value="05" barColor="bg-[#6366f1]/60" valueColor="text-[#a5b4fc]" />
        <MetricCard title="Active Trips" value="18" barColor="bg-[#6366f1]/40" valueColor="text-[#c7d2fe]" />
        <MetricCard title="Pending Trips" value="09" barColor="bg-outline/50" valueColor="text-on-surface-variant" />
        <MetricCard title="Drivers On Duty" value="45" barColor="bg-[#6366f1]/70" valueColor="text-[#a5b4fc]" />
        
        {/* Special Fleet Utilization Card */}
        <div className="bg-surface-container-high/30 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between min-h-[116px] border border-white/5">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#6366f1]"></div>
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Fleet Utilization</span>
          <div className="flex flex-col gap-2 mt-3">
            <span className="font-headline-md text-headline-md text-on-surface">81%</span>
            <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#4f46e5] to-[#818cf8] w-[81%] shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Trips Table */}
        <div className="lg:col-span-2">
          <Card className="h-full bg-surface-container-high/20 border border-white/5 p-8">
            <CardHeader className="mb-6">
              <CardTitle className="font-headline-md text-headline-md">Recent Trips</CardTitle>
              <Button variant="primary" className="bg-gradient-to-r from-[#4f46e5] to-[#6366f1] text-white shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.23)] hover:-translate-y-0.5">
                View All
              </Button>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-4 px-3 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Trip ID</th>
                    <th className="py-4 px-3 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Vehicle</th>
                    <th className="py-4 px-3 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Driver</th>
                    <th className="py-4 px-3 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Status</th>
                    <th className="py-4 px-3 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest text-right">ETA</th>
                  </tr>
                </thead>
                <tbody className="font-body-md text-body-md">
                  <tr className="border-b border-white/5 hover:bg-surface-container-high/30 transition-colors">
                    <td className="py-4 px-3 font-label-md text-on-surface">TR001</td>
                    <td className="py-4 px-3">VAN-05</td>
                    <td className="py-4 px-3">Alex</td>
                    <td className="py-4 px-3">
                      <Badge className="border border-[#6366f1]/30 bg-[#6366f1]/10 text-[#818cf8] shadow-[0_0_12px_rgba(99,102,241,0.15)]">On Trip</Badge>
                    </td>
                    <td className="py-4 px-3 text-right">45 min</td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-surface-container-high/30 transition-colors">
                    <td className="py-4 px-3 font-label-md text-on-surface">TR002</td>
                    <td className="py-4 px-3">TRUCK-12</td>
                    <td className="py-4 px-3">John</td>
                    <td className="py-4 px-3">
                      <Badge className="border border-[#a5b4fc]/30 bg-[#a5b4fc]/10 text-[#a5b4fc]">Completed</Badge>
                    </td>
                    <td className="py-4 px-3 text-right text-on-surface-variant">--</td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-surface-container-high/30 transition-colors">
                    <td className="py-4 px-3 font-label-md text-on-surface">TR003</td>
                    <td className="py-4 px-3">MINI-03</td>
                    <td className="py-4 px-3">Priya</td>
                    <td className="py-4 px-3">
                      <Badge className="border border-[#c7d2fe]/30 bg-[#c7d2fe]/10 text-[#c7d2fe]">Dispatched</Badge>
                    </td>
                    <td className="py-4 px-3 text-right">1h 10m</td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-surface-container-high/30 transition-colors">
                    <td className="py-4 px-3 font-label-md text-on-surface">TR004</td>
                    <td className="py-4 px-3 text-on-surface-variant">--</td>
                    <td className="py-4 px-3 text-on-surface-variant">--</td>
                    <td className="py-4 px-3">
                      <Badge className="border border-outline/30 bg-outline/10 text-on-surface-variant">Draft</Badge>
                    </td>
                    <td className="py-4 px-3 text-right text-on-surface-variant">Awaiting vehicle</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Vehicle Status */}
        <div>
          <Card className="h-full bg-surface-container-high/20 border border-white/5 p-8 flex flex-col gap-8">
            <CardTitle className="font-headline-md text-headline-md">Vehicle Status</CardTitle>
            <div className="flex flex-col gap-6">
              
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-label-md text-on-surface-variant">Available</span>
                  <span className="font-label-sm text-[#818cf8]">42 (42%)</span>
                </div>
                <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-[#818cf8] w-[42%] shadow-[0_0_8px_rgba(129,140,248,0.5)]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-label-md text-on-surface-variant">On Trip</span>
                  <span className="font-label-sm text-[#6366f1]">53 (53%)</span>
                </div>
                <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-[#6366f1] w-[53%] shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-label-md text-on-surface-variant">In Shop</span>
                  <span className="font-label-sm text-[#a5b4fc]">05 (5%)</span>
                </div>
                <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-[#a5b4fc] w-[5%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-label-md text-on-surface-variant">Retired</span>
                  <span className="font-label-sm text-on-surface-variant/50">00 (0%)</span>
                </div>
                <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-outline/30 w-[0%]"></div>
                </div>
              </div>

            </div>
          </Card>
        </div>

      </div>
    </>
  );
}