import { db } from '@/lib/firebase';
import { FuelManager } from '@/components/FuelManager';

export default async function FuelPage() {
  if (!db) {
    return <div className="p-8 text-error">Database not initialized. Please configure Firebase.</div>
  }

  const fuelLogsSnapshot = await db.collection('fuelLogs')
    .orderBy('date', 'desc')
    .get();

  const initialFuelLogs = await Promise.all(fuelLogsSnapshot.docs.map(async (doc) => {
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

  const vehiclesSnapshot = await db.collection('vehicles').orderBy('name', 'asc').get();
  const vehicles = vehiclesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));

  let totalFuelCost = 0;
  const fuelCostSnapshot = await db.collection('fuelLogs').get();
  fuelCostSnapshot.docs.forEach(doc => {
    totalFuelCost += doc.data().cost || 0;
  });

  let totalMaintenanceCost = 0;
  const maintCostSnapshot = await db.collection('maintenanceLogs').get();
  maintCostSnapshot.docs.forEach(doc => {
    totalMaintenanceCost += doc.data().cost || 0;
  });

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