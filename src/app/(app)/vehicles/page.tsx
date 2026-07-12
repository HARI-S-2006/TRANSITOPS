import { db } from '@/lib/firebase';
import { VehicleManager } from '@/components/VehicleManager';

export default async function VehiclesPage() {
  if (!db) {
    return <div className="p-8 text-error">Database not initialized. Please configure Firebase.</div>
  }

  const vehiclesSnapshot = await db.collection('vehicles')
    .orderBy('createdAt', 'desc')
    .get();

  const initialVehicles = vehiclesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as any;

  return (
    <div className="flex flex-col gap-6 h-full">
      <VehicleManager initialVehicles={initialVehicles} />
    </div>
  );
}