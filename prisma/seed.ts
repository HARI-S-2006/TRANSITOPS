import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Clear DB
  await prisma.fuelLog.deleteMany()
  await prisma.maintenanceLog.deleteMany()
  await prisma.trip.deleteMany()
  await prisma.driver.deleteMany()
  await prisma.vehicle.deleteMany()
  await prisma.user.deleteMany()

  // Create Users
  const adminPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.create({
    data: {
      email: 'admin@transitops.com',
      password: adminPassword,
      role: 'FleetManager'
    }
  })
  
  await prisma.user.create({
    data: {
      email: 'dispatcher@transitops.com',
      password: adminPassword,
      role: 'Dispatcher'
    }
  })

  // Create Vehicles
  const vehiclesData = [
    { regNo: 'GJ-01-AB-1234', name: 'VAN-05', type: 'Van', capacity: 500, odometer: 12000, acqCost: 45000, status: 'Available' },
    { regNo: 'GJ-01-XY-9876', name: 'TRUCK-12', type: 'Truck', capacity: 2500, odometer: 56000, acqCost: 120000, status: 'Available' },
    { regNo: 'GJ-01-ZZ-5555', name: 'MINI-03', type: 'Mini', capacity: 300, odometer: 8000, acqCost: 35000, status: 'OnTrip' },
    { regNo: 'GJ-01-PK-1111', name: 'TRUCK-08', type: 'Truck', capacity: 3000, odometer: 145000, acqCost: 110000, status: 'InShop' },
    { regNo: 'MH-02-CD-4422', name: 'VAN-09', type: 'Van', capacity: 600, odometer: 24000, acqCost: 48000, status: 'Available' },
    { regNo: 'MH-14-EF-9900', name: 'MINI-07', type: 'Mini', capacity: 350, odometer: 41000, acqCost: 32000, status: 'Available' },
  ];
  const vehicles = await Promise.all(vehiclesData.map(v => prisma.vehicle.create({ data: v })));

  // Create Drivers
  const driversData = [
    { name: 'Alex Driver', licenseNo: 'DL-88213', licenseExpiry: new Date('2028-12-01'), contact: '9876543210', safetyScore: 96, status: 'Available' },
    { name: 'Priya Sharma', licenseNo: 'DL-77031', licenseExpiry: new Date('2026-08-01'), contact: '9911043210', safetyScore: 99, status: 'OnTrip' },
    { name: 'Rahul Desai', licenseNo: 'DL-55299', licenseExpiry: new Date('2025-05-15'), contact: '9822334455', safetyScore: 85, status: 'Available' },
    { name: 'Anita Patil', licenseNo: 'DL-11933', licenseExpiry: new Date('2029-01-10'), contact: '9000111222', safetyScore: 92, status: 'Available' },
    { name: 'John Smith', licenseNo: 'DL-44022', licenseExpiry: new Date('2027-11-22'), contact: '9123456789', safetyScore: 78, status: 'OffDuty' },
    { name: 'Vikram Singh', licenseNo: 'DL-66881', licenseExpiry: new Date('2026-03-30'), contact: '9870001234', safetyScore: 88, status: 'Available' },
  ];
  const drivers = await Promise.all(driversData.map(d => prisma.driver.create({ data: d })));

  // Create Trips
  const tripsData = [
    { tripNumber: 'TR001', source: 'Gandhinagar Depot', destination: 'Ahmedabad Hub', cargoWeight: 400, distance: 38, etaMinutes: 45, status: 'Draft', vehicleId: vehicles[0].id, driverId: drivers[0].id },
    { tripNumber: 'TR002', source: 'Surat Central', destination: 'Vadodara Terminal', cargoWeight: 2100, distance: 150, etaMinutes: 180, status: 'Dispatched', vehicleId: vehicles[2].id, driverId: drivers[1].id },
    { tripNumber: 'TR003', source: 'Rajkot', destination: 'Ahmedabad Hub', cargoWeight: 800, distance: 215, etaMinutes: 240, status: 'Completed', vehicleId: vehicles[1].id, driverId: drivers[2].id },
    { tripNumber: 'TR004', source: 'Pune', destination: 'Mumbai', cargoWeight: 2500, distance: 150, etaMinutes: 190, status: 'Cancelled', vehicleId: vehicles[4].id, driverId: drivers[3].id },
    { tripNumber: 'TR005', source: 'Navsari', destination: 'Surat', cargoWeight: 300, distance: 40, etaMinutes: 50, status: 'Draft', vehicleId: vehicles[5].id, driverId: drivers[5].id },
  ];
  await Promise.all(tripsData.map(t => prisma.trip.create({ data: t })));

  // Create Maintenance Logs
  const maintenanceData = [
    { date: new Date('2026-07-01'), serviceType: 'Oil Change', cost: 120, status: 'Completed', vehicleId: vehicles[0].id },
    { date: new Date('2026-07-05'), serviceType: 'Brake Pad Check', cost: 45, status: 'Completed', vehicleId: vehicles[1].id },
    { date: new Date('2026-07-10'), serviceType: 'Engine Overhaul', cost: 2500, status: 'Active', vehicleId: vehicles[3].id },
    { date: new Date('2026-07-12'), serviceType: 'Tire Alignment', cost: 80, status: 'Active', vehicleId: vehicles[4].id },
    { date: new Date('2026-06-20'), serviceType: 'AC Repair', cost: 150, status: 'Completed', vehicleId: vehicles[2].id },
  ];
  await Promise.all(maintenanceData.map(m => prisma.maintenanceLog.create({ data: m })));

  // Create Fuel Logs
  const fuelData = [
    { date: new Date('2026-07-02'), liters: 15, cost: 45.50, vehicleId: vehicles[0].id },
    { date: new Date('2026-07-04'), liters: 40, cost: 120.00, vehicleId: vehicles[1].id },
    { date: new Date('2026-07-08'), liters: 10, cost: 31.00, vehicleId: vehicles[2].id },
    { date: new Date('2026-07-10'), liters: 50, cost: 155.20, vehicleId: vehicles[4].id },
    { date: new Date('2026-07-11'), liters: 12, cost: 36.50, vehicleId: vehicles[5].id },
  ];
  await Promise.all(fuelData.map(f => prisma.fuelLog.create({ data: f })));

  console.log('Database seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
