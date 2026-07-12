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
  const v1 = await prisma.vehicle.create({
    data: { regNo: 'GJ-01-AB-1234', name: 'VAN-05', type: 'Van', capacity: 500, odometer: 12000, acqCost: 45000, status: 'Available' }
  })
  const v2 = await prisma.vehicle.create({
    data: { regNo: 'GJ-01-XY-9876', name: 'TRUCK-12', type: 'Truck', capacity: 2500, odometer: 56000, acqCost: 120000, status: 'Available' }
  })
  const v3 = await prisma.vehicle.create({
    data: { regNo: 'GJ-01-ZZ-5555', name: 'MINI-03', type: 'Mini', capacity: 300, odometer: 8000, acqCost: 35000, status: 'Available' }
  })

  // Create Drivers
  const d1 = await prisma.driver.create({
    data: { name: 'Alex Driver', licenseNo: 'DL-88213', licenseExpiry: new Date('2028-12-01'), contact: '9876543210', safetyScore: 96, status: 'Available' }
  })
  const d2 = await prisma.driver.create({
    data: { name: 'Priya Sharma', licenseNo: 'DL-77031', licenseExpiry: new Date('2026-08-01'), contact: '9911043210', safetyScore: 99, status: 'Available' }
  })

  // Create some draft trips
  await prisma.trip.create({
    data: {
      tripNumber: 'TR001',
      source: 'Gandhinagar Depot',
      destination: 'Ahmedabad Hub',
      cargoWeight: 400,
      distance: 38,
      etaMinutes: 45,
      status: 'Draft',
      vehicleId: v1.id,
      driverId: d1.id
    }
  })

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
