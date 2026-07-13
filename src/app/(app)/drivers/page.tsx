import { db } from '@/lib/firebase';
import { DriverManager } from '@/components/DriverManager';

import { serializeData } from '@/lib/serialize';

export default async function DriversPage() {
  if (!db) {
    return <div className="p-8 text-error">Database not initialized. Please configure Firebase.</div>
  }

  const driversSnapshot = await db.collection('drivers')
    .orderBy('name', 'asc')
    .get();

  const initialDrivers = driversSnapshot.docs.map((doc) => serializeData({
    id: doc.id,
    ...doc.data()
  })) as any;

  return (
    <div className="flex flex-col h-full gap-6">
      <DriverManager initialDrivers={initialDrivers} />
    </div>
  );
}