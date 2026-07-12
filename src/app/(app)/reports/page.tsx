import { Card } from '@/components/ui/Card';
import { MetricCard } from '@/components/ui/MetricCard';

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-[28px] font-bold text-on-surface tracking-tight">Reports & Analytics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="FUEL EFFICIENCY" value="8.4" unit="km/l" />
        <MetricCard title="FLEET UTILIZATION" value="81" unit="%" />
        <MetricCard title="OPERATIONAL COST" value="34,070" unit="" prefix="$" />
        <Card className="p-6 border border-[#4edea3]/30 bg-surface-container/50">
          <h3 className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-3">VEHICLE ROI</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-[42px] font-bold text-[#4edea3] leading-none tracking-tight">14.2%</span>
          </div>
        </Card>
      </div>

      <div className="text-xs font-semibold text-on-surface-variant">
        ROI = (Revenue - (Maintenance + Fuel)) / Acquisition Cost
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 mt-4">
        
        {/* Monthly Revenue Chart */}
        <Card className="p-6 flex flex-col h-full">
          <h3 className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-8">MONTHLY REVENUE</h3>
          <div className="flex-1 flex items-end justify-between gap-4 px-4 pb-4 border-b border-white/5 relative">
            
            {/* Chart Bars */}
            <div className="w-12 bg-white/5 rounded-t hover:bg-white/10 transition-colors" style={{ height: '30%' }}></div>
            <div className="w-12 bg-white/5 rounded-t hover:bg-white/10 transition-colors" style={{ height: '40%' }}></div>
            <div className="w-12 bg-white/5 rounded-t hover:bg-white/10 transition-colors" style={{ height: '35%' }}></div>
            <div className="w-12 bg-[#6366f1] rounded-t shadow-[0_0_20px_rgba(99,102,241,0.4)]" style={{ height: '65%' }}></div>
            <div className="w-12 bg-white/5 rounded-t hover:bg-white/10 transition-colors" style={{ height: '55%' }}></div>
            <div className="w-12 bg-white/5 rounded-t hover:bg-white/10 transition-colors" style={{ height: '60%' }}></div>
            <div className="w-12 bg-white/5 rounded-t hover:bg-white/10 transition-colors" style={{ height: '50%' }}></div>
            
          </div>
          <div className="flex justify-between items-center px-6 mt-4">
            <span className="text-sm font-medium text-on-surface-variant">Jan</span>
            <span className="text-sm font-medium text-on-surface-variant">Feb</span>
            <span className="text-sm font-medium text-on-surface-variant">Mar</span>
            <span className="text-sm font-bold text-[#6366f1]">Apr</span>
            <span className="text-sm font-medium text-on-surface-variant">May</span>
            <span className="text-sm font-medium text-on-surface-variant">Jun</span>
            <span className="text-sm font-medium text-on-surface-variant">Jul</span>
          </div>
        </Card>

        {/* Top Costliest Vehicles */}
        <Card className="p-6 flex flex-col h-full">
          <h3 className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-8">TOP COSTLIEST VEHICLES</h3>
          
          <div className="flex flex-col gap-8">
            
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-on-surface tracking-wide">TRUCK-11</span>
                <span className="text-[15px] font-bold text-[#ffb4ab]">$12,450</span>
              </div>
              <div className="h-2 w-full bg-[#131b2e] rounded-full overflow-hidden">
                <div className="h-full bg-[#ffb4ab]" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-on-surface-variant tracking-wide">MINI-03</span>
                <span className="text-[15px] font-bold text-[#6366f1]">$8,120</span>
              </div>
              <div className="h-2 w-full bg-[#131b2e] rounded-full overflow-hidden">
                <div className="h-full bg-[#6366f1]" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-on-surface-variant tracking-wide">VAN-05</span>
                <span className="text-[15px] font-bold text-[#6366f1]">$4,300</span>
              </div>
              <div className="h-2 w-full bg-[#131b2e] rounded-full overflow-hidden">
                <div className="h-full bg-[#6366f1]" style={{ width: '25%' }}></div>
              </div>
            </div>

          </div>
        </Card>

      </div>
    </div>
  );
}