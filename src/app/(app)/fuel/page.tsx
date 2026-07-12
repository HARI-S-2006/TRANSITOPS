import { prisma } from '@/lib/db';
import { FuelManager } from '@/components/FuelManager';

export default async function FuelPage() {
  const initialFuelLogs = await prisma.fuelLog.findMany({
    orderBy: { date: 'desc' },
    include: { vehicle: true }
  });

  const vehicles = await prisma.vehicle.findMany({
    orderBy: { name: 'asc' }
  });

  // Calculate totals
  const fuelAgg = await prisma.fuelLog.aggregate({
    _sum: { cost: true }
  })
  const totalFuelCost = fuelAgg._sum.cost || 0

  const maintAgg = await prisma.maintenanceLog.aggregate({
    _sum: { cost: true }
  })
  const totalMaintenanceCost = maintAgg._sum.cost || 0

  return (
    <div className="flex flex-col gap-8 h-full">
      <FuelManager 
        initialFuelLogs={initialFuelLogs} 
        vehicles={vehicles}
        totalFuelCost={totalFuelCost}
        totalMaintenanceCost={totalMaintenanceCost}
      />
    </div>
  );
}