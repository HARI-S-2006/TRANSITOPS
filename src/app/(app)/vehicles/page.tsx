import { prisma } from '@/lib/db';
import { VehicleManager } from '@/components/VehicleManager';

export default async function VehiclesPage() {
  const initialVehicles = await prisma.vehicle.findMany({
    orderBy: { regNo: 'asc' }
  });

  return (
    <div className="flex flex-col h-full gap-6">
      <VehicleManager initialVehicles={initialVehicles} />
    </div>
  );
}