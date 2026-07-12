import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MetricCard } from '@/components/ui/MetricCard';
import { prisma } from '@/lib/db';
import Link from 'next/link';

function getTripBadgeStatus(status: string) {
  switch (status) {
    case 'Dispatched':
      return <Badge className="border border-[#c7d2fe]/30 bg-[#c7d2fe]/10 text-[#c7d2fe]">Dispatched</Badge>;
    case 'Completed':
      return <Badge className="border border-[#a5b4fc]/30 bg-[#a5b4fc]/10 text-[#a5b4fc]">Completed</Badge>;
    case 'Draft':
      return <Badge className="border border-outline/30 bg-outline/10 text-on-surface-variant">Draft</Badge>;
    case 'Cancelled':
      return <Badge className="border border-error/30 bg-error/10 text-error">Cancelled</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

export default async function DashboardPage() {
  const activeVehicles = await prisma.vehicle.count({ where: { status: 'OnTrip' } });
  const availableVehicles = await prisma.vehicle.count({ where: { status: 'Available' } });
  const inShopVehicles = await prisma.vehicle.count({ where: { status: 'InShop' } });
  const retiredVehicles = await prisma.vehicle.count({ where: { status: 'Retired' } });
  const totalVehicles = await prisma.vehicle.count();

  const activeTrips = await prisma.trip.count({ where: { status: 'Dispatched' } });
  const pendingTrips = await prisma.trip.count({ where: { status: 'Draft' } });
  
  const driversOnDuty = await prisma.driver.count({ where: { status: 'OnTrip' } });

  const activePercentage = totalVehicles > 0 ? Math.round((activeVehicles / totalVehicles) * 100) : 0;
  const availablePercentage = totalVehicles > 0 ? Math.round((availableVehicles / totalVehicles) * 100) : 0;
  const inShopPercentage = totalVehicles > 0 ? Math.round((inShopVehicles / totalVehicles) * 100) : 0;
  const retiredPercentage = totalVehicles > 0 ? Math.round((retiredVehicles / totalVehicles) * 100) : 0;

  const fleetUtilization = activePercentage;

  const recentTrips = await prisma.trip.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { vehicle: true, driver: true }
  });

  return (
    <>
      <div className="mb-stack-lg mt-8">
        <h1 className="font-headline-lg text-headline-lg text-on-surface">1. Dashboard</h1>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 mb-margin-desktop">
        <MetricCard title="Active Vehicles" value={activeVehicles.toString().padStart(2, '0')} barColor="bg-[#6366f1]" valueColor="text-[#6366f1] drop-shadow-[0_0_12px_rgba(99,102,241,0.4)]" />
        <MetricCard title="Available Vehicles" value={availableVehicles.toString().padStart(2, '0')} barColor="bg-[#6366f1]/80" valueColor="text-[#818cf8] drop-shadow-[0_0_12px_rgba(129,140,248,0.3)]" />
        <MetricCard title="Maintenance" value={inShopVehicles.toString().padStart(2, '0')} barColor="bg-[#6366f1]/60" valueColor="text-[#a5b4fc]" />
        <MetricCard title="Active Trips" value={activeTrips.toString().padStart(2, '0')} barColor="bg-[#6366f1]/40" valueColor="text-[#c7d2fe]" />
        <MetricCard title="Pending Trips" value={pendingTrips.toString().padStart(2, '0')} barColor="bg-outline/50" valueColor="text-on-surface-variant" />
        <MetricCard title="Drivers On Duty" value={driversOnDuty.toString().padStart(2, '0')} barColor="bg-[#6366f1]/70" valueColor="text-[#a5b4fc]" />
        
        {/* Special Fleet Utilization Card */}
        <div className="bg-surface-container-high/30 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between min-h-[116px] border border-white/5">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#6366f1]"></div>
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Fleet Utilization</span>
          <div className="flex flex-col gap-2 mt-3">
            <span className="font-headline-md text-headline-md text-on-surface">{fleetUtilization}%</span>
            <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#4f46e5] to-[#818cf8] shadow-[0_0_8px_rgba(99,102,241,0.5)]" style={{ width: `${fleetUtilization}%`}}></div>
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
              <Link href="/dispatcher">
                <Button variant="primary" className="bg-gradient-to-r from-[#4f46e5] to-[#6366f1] text-white shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.23)] hover:-translate-y-0.5">
                  View All
                </Button>
              </Link>
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
                  {recentTrips.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-on-surface-variant">No trips yet.</td>
                    </tr>
                  ) : (
                    recentTrips.map((trip) => (
                      <tr key={trip.id} className="border-b border-white/5 hover:bg-surface-container-high/30 transition-colors">
                        <td className="py-4 px-3 font-label-md text-on-surface">{trip.tripNumber}</td>
                        <td className="py-4 px-3">{trip.vehicle?.name || '--'}</td>
                        <td className="py-4 px-3">{trip.driver?.name || '--'}</td>
                        <td className="py-4 px-3">
                          {getTripBadgeStatus(trip.status)}
                        </td>
                        <td className="py-4 px-3 text-right text-on-surface-variant">
                          {trip.etaMinutes ? `${Math.floor(trip.etaMinutes/60)}h ${trip.etaMinutes%60}m` : '--'}
                        </td>
                      </tr>
                    ))
                  )}
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
                  <span className="font-label-sm text-[#818cf8]">{availableVehicles} ({availablePercentage}%)</span>
                </div>
                <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-[#818cf8] shadow-[0_0_8px_rgba(129,140,248,0.5)]" style={{ width: `${availablePercentage}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-label-md text-on-surface-variant">On Trip</span>
                  <span className="font-label-sm text-[#6366f1]">{activeVehicles} ({activePercentage}%)</span>
                </div>
                <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-[#6366f1] shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{ width: `${activePercentage}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-label-md text-on-surface-variant">In Shop</span>
                  <span className="font-label-sm text-[#a5b4fc]">{inShopVehicles} ({inShopPercentage}%)</span>
                </div>
                <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-[#a5b4fc]" style={{ width: `${inShopPercentage}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-label-md text-on-surface-variant">Retired</span>
                  <span className="font-label-sm text-on-surface-variant/50">{retiredVehicles} ({retiredPercentage}%)</span>
                </div>
                <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-outline/30" style={{ width: `${retiredPercentage}%` }}></div>
                </div>
              </div>

            </div>
          </Card>
        </div>

      </div>
    </>
  );
}