import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import * as dotenv from 'dotenv';
import * as path from 'path';
import bcrypt from 'bcryptjs';

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

async function clearCollection(collectionName: string) {
  const snapshot = await db.collection(collectionName).get();
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
}

async function seed() {
  console.log('Seeding database...');

  // Clear existing collections to prevent duplicates
  await clearCollection('vehicles');
  await clearCollection('drivers');
  await clearCollection('trips');
  await clearCollection('maintenanceLogs');
  await clearCollection('fuelLogs');


  // Seed Users
  const salt = await bcrypt.genSalt(10);
  const pw1 = await bcrypt.hash('123456', salt);
  const pw2 = await bcrypt.hash('admin123', salt);

  const users = [
    { name: 'Raven K.', email: 'sharinath2006@gmail.com', password: pw1, role: 'Dispatcher', createdAt: new Date().toISOString() },
    { name: 'Admin', email: 'admin@transitops.com', password: pw2, role: 'Fleet Manager', createdAt: new Date().toISOString() }
  ];

  for (const user of users) {
    const existing = await db.collection('users').where('email', '==', user.email).get();
    if (existing.empty) {
      await db.collection('users').add(user);
    }
  }

  const vehicles = [
    { regNo: 'TRK-101', name: 'Heavy Hauler 1', type: 'Truck', capacity: 15000, odometer: 125000, acqCost: 85000, status: 'Available', createdAt: FieldValue.serverTimestamp() },
    { regNo: 'TRK-102', name: 'Heavy Hauler 2', type: 'Truck', capacity: 15000, odometer: 85000, acqCost: 90000, status: 'OnTrip', createdAt: FieldValue.serverTimestamp() },
    { regNo: 'VAN-001', name: 'City Sprinter', type: 'Van', capacity: 2500, odometer: 45000, acqCost: 35000, status: 'InShop', createdAt: FieldValue.serverTimestamp() },
    { regNo: 'VAN-002', name: 'Express Deliveries', type: 'Van', capacity: 2500, odometer: 20000, acqCost: 36000, status: 'Available', createdAt: FieldValue.serverTimestamp() },
    { regNo: 'MIN-01', name: 'Quick Courier', type: 'Mini', capacity: 800, odometer: 15000, acqCost: 20000, status: 'Available', createdAt: FieldValue.serverTimestamp() },
    { regNo: 'MIN-02', name: 'Nimble Rider', type: 'Mini', capacity: 800, odometer: 5000, acqCost: 22000, status: 'OnTrip', createdAt: FieldValue.serverTimestamp() },
  ];

  const drivers = [
    { name: 'John Doe', licenseNo: 'DL-12345', licenseExpiry: new Date('2028-05-10'), contact: '+1234567890', safetyScore: 95, status: 'Available' },
    { name: 'Sarah Connor', licenseNo: 'DL-98765', licenseExpiry: new Date('2027-11-20'), contact: '+1987654321', safetyScore: 98, status: 'OnTrip' },
    { name: 'Mike Ross', licenseNo: 'DL-55555', licenseExpiry: new Date('2026-08-15'), contact: '+1555555555', safetyScore: 88, status: 'Available' },
    { name: 'Harvey Specter', licenseNo: 'DL-77777', licenseExpiry: new Date('2029-01-01'), contact: '+1777777777', safetyScore: 92, status: 'OnTrip' },
    { name: 'Jessica Pearson', licenseNo: 'DL-88888', licenseExpiry: new Date('2028-03-12'), contact: '+1888888888', safetyScore: 99, status: 'Available' },
    { name: 'Louis Litt', licenseNo: 'DL-99999', licenseExpiry: new Date('2025-10-31'), contact: '+1999999999', safetyScore: 85, status: 'OnTrip' },
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
    { tripNumber: 'TRP-005', source: 'North Site', destination: 'South Site', cargoWeight: 1500, distance: 80, vehicleId: vIds[5], driverId: dIds[5], status: 'Dispatched', etaMinutes: 80, createdAt: FieldValue.serverTimestamp() },
    { tripNumber: 'TRP-006', source: 'East Depot', destination: 'West Hub', cargoWeight: 3000, distance: 200, vehicleId: vIds[2], driverId: dIds[4], status: 'Draft', etaMinutes: 200, createdAt: FieldValue.serverTimestamp() },
  ];

  for (const t of trips) {
    await db.collection('trips').add(t);
  }

  const maintenanceLogs = [
    { serviceType: 'Oil Change', cost: 150, date: new Date(), vehicleId: vIds[2], status: 'Active' },
    { serviceType: 'Tire Replacement', cost: 800, date: new Date('2026-06-15'), vehicleId: vIds[0], status: 'Completed' },
    { serviceType: 'Brake Inspection', cost: 250, date: new Date('2026-05-10'), vehicleId: vIds[1], status: 'Completed' },
    { serviceType: 'Engine Tuning', cost: 500, date: new Date('2026-07-01'), vehicleId: vIds[3], status: 'Completed' },
    { serviceType: 'Battery Replacement', cost: 120, date: new Date('2026-06-25'), vehicleId: vIds[4], status: 'Completed' },
    { serviceType: 'Wiper Fluid Fill', cost: 15, date: new Date('2026-07-12'), vehicleId: vIds[5], status: 'Completed' },
  ];

  for (const m of maintenanceLogs) {
    await db.collection('maintenanceLogs').add(m);
  }

  const fuelLogs = [
    { liters: 120, cost: 180, date: new Date(), vehicleId: vIds[0] },
    { liters: 80, cost: 120, date: new Date('2026-07-10'), vehicleId: vIds[1] },
    { liters: 45, cost: 67.5, date: new Date('2026-07-12'), vehicleId: vIds[3] },
    { liters: 250, cost: 375, date: new Date('2026-07-05'), vehicleId: vIds[0] },
    { liters: 30, cost: 45, date: new Date('2026-07-11'), vehicleId: vIds[4] },
    { liters: 20, cost: 30, date: new Date('2026-07-09'), vehicleId: vIds[5] },
    { liters: 60, cost: 90, date: new Date('2026-07-08'), vehicleId: vIds[2] },
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
