import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}

const db = getFirestore();

async function seed() {
  console.log('Seeding database...');

  const vehicles = [
    { regNo: 'TRK-101', name: 'Heavy Hauler 1', type: 'Truck', capacity: 15000, odometer: 125000, acqCost: 85000, status: 'Available', createdAt: FieldValue.serverTimestamp() },
    { regNo: 'TRK-102', name: 'Heavy Hauler 2', type: 'Truck', capacity: 15000, odometer: 85000, acqCost: 90000, status: 'OnTrip', createdAt: FieldValue.serverTimestamp() },
    { regNo: 'VAN-001', name: 'City Sprinter', type: 'Van', capacity: 2500, odometer: 45000, acqCost: 35000, status: 'InShop', createdAt: FieldValue.serverTimestamp() },
    { regNo: 'VAN-002', name: 'Express Deliveries', type: 'Van', capacity: 2500, odometer: 20000, acqCost: 36000, status: 'Available', createdAt: FieldValue.serverTimestamp() },
    { regNo: 'MIN-01', name: 'Quick Courier', type: 'Mini', capacity: 800, odometer: 15000, acqCost: 20000, status: 'Available', createdAt: FieldValue.serverTimestamp() },
  ];

  const drivers = [
    { name: 'John Doe', licenseNo: 'DL-12345', licenseExpiry: new Date('2028-05-10'), contact: '+1234567890', safetyScore: 95, status: 'Available' },
    { name: 'Sarah Connor', licenseNo: 'DL-98765', licenseExpiry: new Date('2027-11-20'), contact: '+1987654321', safetyScore: 98, status: 'OnTrip' },
    { name: 'Mike Ross', licenseNo: 'DL-55555', licenseExpiry: new Date('2026-08-15'), contact: '+1555555555', safetyScore: 88, status: 'Available' },
    { name: 'Harvey Specter', licenseNo: 'DL-77777', licenseExpiry: new Date('2029-01-01'), contact: '+1777777777', safetyScore: 92, status: 'OnTrip' },
  ];

  const vIds: string[] = [];
  for (const v of vehicles) {
    const doc = await db.collection('vehicles').add(v);
    vIds.push(doc.id);
  }

  const dIds: string[] = [];
  for (const d of drivers) {
    const doc = await db.collection('drivers').add(d);
    dIds.push(doc.id);
  }

  const trips = [
    { tripNumber: 'TRP-001', source: 'Warehouse A', destination: 'City Center', cargoWeight: 1000, distance: 45, vehicleId: vIds[1], driverId: dIds[1], status: 'Dispatched', etaMinutes: 45, createdAt: FieldValue.serverTimestamp() },
    { tripNumber: 'TRP-002', source: 'Port Authority', destination: 'Distribution Hub', cargoWeight: 12000, distance: 120, vehicleId: vIds[3], driverId: dIds[3], status: 'Dispatched', etaMinutes: 120, createdAt: FieldValue.serverTimestamp() },
    { tripNumber: 'TRP-003', source: 'Supplier Depot', destination: 'Warehouse A', cargoWeight: 2000, distance: 30, vehicleId: vIds[0], driverId: dIds[0], status: 'Completed', etaMinutes: 30, createdAt: FieldValue.serverTimestamp() },
    { tripNumber: 'TRP-004', source: 'City Center', destination: 'Suburbs', cargoWeight: 500, distance: 15, vehicleId: vIds[4], driverId: dIds[2], status: 'Draft', etaMinutes: 15, createdAt: FieldValue.serverTimestamp() },
  ];

  for (const t of trips) {
    await db.collection('trips').add(t);
  }

  const maintenanceLogs = [
    { serviceType: 'Oil Change', cost: 150, date: new Date(), vehicleId: vIds[2], status: 'Active' },
    { serviceType: 'Tire Replacement', cost: 800, date: new Date('2026-06-15'), vehicleId: vIds[0], status: 'Completed' },
    { serviceType: 'Brake Inspection', cost: 250, date: new Date('2026-05-10'), vehicleId: vIds[1], status: 'Completed' },
  ];

  for (const m of maintenanceLogs) {
    await db.collection('maintenanceLogs').add(m);
  }

  const fuelLogs = [
    { liters: 120, cost: 180, date: new Date(), vehicleId: vIds[0] },
    { liters: 80, cost: 120, date: new Date('2026-07-10'), vehicleId: vIds[1] },
    { liters: 45, cost: 67.5, date: new Date('2026-07-12'), vehicleId: vIds[3] },
    { liters: 250, cost: 375, date: new Date('2026-07-05'), vehicleId: vIds[0] },
  ];

  for (const f of fuelLogs) {
    await db.collection('fuelLogs').add(f);
  }

  console.log('Seeding complete! Data injected into Firebase.');
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
