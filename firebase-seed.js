const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const bcrypt = require('bcryptjs');

require('dotenv').config({ path: '.env.local' });
require('dotenv').config();

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

if (!serviceAccount.projectId || !serviceAccount.privateKey) {
  console.error("Missing Firebase credentials in .env or .env.local!");
  process.exit(1);
}

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function seed() {
  console.log('Seeding Firebase Firestore...');
  
  try {
    // Users
    const adminPassword = await bcrypt.hash('admin123', 10);
    await db.collection('users').doc('admin').set({
      email: 'admin@transitops.com',
      password: adminPassword,
      role: 'FleetManager'
    });
    console.log('Created Admin user.');

    // Vehicles
    const vehicleRef = await db.collection('vehicles').add({
      regNo: 'GJ-01-AB-1234',
      name: 'VAN-05',
      type: 'Van',
      capacity: 500,
      odometer: 12000,
      acqCost: 45000,
      status: 'Available'
    });
    console.log('Created Vehicle.');

    // Drivers
    const driverRef = await db.collection('drivers').add({
      name: 'John Doe',
      licenseNo: 'DL-12345-GJ',
      experience: 5,
      status: 'Available'
    });
    console.log('Created Driver.');

    // Maintenance Log
    await db.collection('maintenanceLogs').add({
      date: new Date('2026-07-01'),
      serviceType: 'Oil Change',
      cost: 120,
      status: 'Completed',
      vehicleId: vehicleRef.id
    });
    console.log('Created Maintenance Log.');

    console.log('Seeding complete!');
  } catch (err) {
    console.error('Seeding failed:', err);
  }
}

seed();
