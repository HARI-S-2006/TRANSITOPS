import { db } from '@/lib/firebase';
import { DispatcherManager } from '@/components/DispatcherManager';

import { serializeData } from '@/lib/serialize';

export default async function DispatcherPage() {
  if (!db) {
    return <div className="p-8 text-error">Database not initialized. Please configure Firebase.</div>
  }

  const tripsSnapshot = await db.collection('trips')
    .orderBy('createdAt', 'desc')
    .get();

  const initialTrips = await Promise.all(tripsSnapshot.docs.map(async (doc) => {
    const data = doc.data();
    let vehicle = null;
    let driver = null;
    
    if (data.vehicleId) {
      const vDoc = await db.collection('vehicles').doc(data.vehicleId).get();
      vehicle = vDoc.exists ? { id: vDoc.id, ...vDoc.data() } : null;
    }
    if (data.driverId) {
      const dDoc = await db.collection('drivers').doc(data.driverId).get();
      driver = dDoc.exists ? { id: dDoc.id, ...dDoc.data() } : null;
    }

    return {
      id: doc.id,
      ...data,
      vehicle,
      driver
    } as any;
  }));

  const vehiclesSnapshot = await db.collection('vehicles').where('status', '==', 'Available').get();
  const availableVehicles = vehiclesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));

  const driversSnapshot = await db.collection('drivers').where('status', '==', 'Available').get();
  const availableDrivers = driversSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));

  return (
    <div className="flex flex-col gap-6 h-full">
      <DispatcherManager 
        initialTrips={serializeData(initialTrips)} 
        availableVehicles={serializeData(availableVehicles)}
        availableDrivers={serializeData(availableDrivers)}
      />
    </div>
  );
}