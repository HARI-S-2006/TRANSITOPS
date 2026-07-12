import { prisma } from '@/lib/db';
import { DispatcherManager } from '@/components/DispatcherManager';

export default async function DispatcherPage() {
  const initialTrips = await prisma.trip.findMany({
    orderBy: { createdAt: 'desc' },
    include: { vehicle: true, driver: true }
  });

  const availableVehicles = await prisma.vehicle.findMany({
    where: { status: 'Available' }
  });

  const availableDrivers = await prisma.driver.findMany({
    where: { status: 'Available' }
  });

  return (
    <div className="flex flex-col gap-6 h-full">
      <DispatcherManager 
        initialTrips={initialTrips} 
        availableVehicles={availableVehicles}
        availableDrivers={availableDrivers}
      />
    </div>
  );
}