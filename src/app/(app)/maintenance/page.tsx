import { db } from '@/lib/firebase';
import { MaintenanceManager } from '@/components/MaintenanceManager';

import { serializeData } from '@/lib/serialize';

export default async function MaintenancePage() {
  if (!db) {
    return <div className="p-8 text-error">Database not initialized. Please configure Firebase.</div>
  }

  const logsSnapshot = await db.collection('maintenanceLogs')
    .orderBy('date', 'desc')
    .get();

  const initialLogs = await Promise.all(logsSnapshot.docs.map(async (doc) => {
    const data = doc.data();
    let vehicle = null;
    
    if (data.vehicleId) {
      const vDoc = await db.collection('vehicles').doc(data.vehicleId).get();
      vehicle = vDoc.exists ? { id: vDoc.id, ...vDoc.data() } : null;
    }

    return {
      id: doc.id,
      ...data,
      date: data.date.toDate ? data.date.toDate() : new Date(data.date),
      vehicle
    } as any;
  }));

  const vehiclesSnapshot = await db.collection('vehicles')
    .where('status', '==', 'Available')
    .get();

  const availableVehicles = vehiclesSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as any;

  return (
    <div className="flex flex-col gap-6 h-full">
      <MaintenanceManager 
        initialLogs={serializeData(initialLogs)} 
        availableVehicles={serializeData(availableVehicles)}
      />
    </div>
  );
}