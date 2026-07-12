import { prisma } from '@/lib/db';
import { MaintenanceManager } from '@/components/MaintenanceManager';

export default async function MaintenancePage() {
  const initialLogs = await prisma.maintenanceLog.findMany({
    orderBy: { date: 'desc' },
    include: { vehicle: true }
  });

  const availableVehicles = await prisma.vehicle.findMany({
    where: { status: 'Available' }
  });

  return (
    <div className="flex flex-col gap-6 h-full">
      <MaintenanceManager 
        initialLogs={initialLogs} 
        availableVehicles={availableVehicles}
      />
    </div>
  );
}