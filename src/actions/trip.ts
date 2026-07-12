'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createTrip(data: {
  tripNumber: string
  source: string
  destination: string
  cargoWeight: number
  distance: number
  vehicleId: string
  driverId: string
}) {
  try {
    // Business Rule Validation
    const vehicle = await prisma.vehicle.findUnique({ where: { id: data.vehicleId } })
    const driver = await prisma.driver.findUnique({ where: { id: data.driverId } })

    if (!vehicle || !driver) {
      return { success: false, error: 'Vehicle or Driver not found' }
    }

    if (vehicle.status !== 'Available') {
      return { success: false, error: 'Selected vehicle is not available' }
    }

    if (driver.status !== 'Available') {
      return { success: false, error: 'Selected driver is not available' }
    }

    if (data.cargoWeight > vehicle.capacity) {
      return { success: false, error: `Cargo weight exceeds vehicle capacity (${vehicle.capacity}kg)` }
    }

    const trip = await prisma.trip.create({
      data: {
        ...data,
        status: 'Draft',
        etaMinutes: Math.round((data.distance / 60) * 60) // Rough ETA estimate assuming 60km/h
      },
    })
    
    revalidatePath('/dispatcher')
    return { success: true, trip }
  } catch (error) {
    console.error('Error creating trip:', error)
    return { success: false, error: 'Failed to create trip' }
  }
}

export async function dispatchTrip(tripId: string) {
  try {
    const trip = await prisma.trip.findUnique({ where: { id: tripId } })
    if (!trip) return { success: false, error: 'Trip not found' }

    // Transaction to update Trip, Vehicle, and Driver simultaneously
    await prisma.$transaction([
      prisma.trip.update({ where: { id: tripId }, data: { status: 'Dispatched' } }),
      prisma.vehicle.update({ where: { id: trip.vehicleId }, data: { status: 'OnTrip' } }),
      prisma.driver.update({ where: { id: trip.driverId }, data: { status: 'OnTrip' } }),
    ])

    revalidatePath('/dispatcher')
    revalidatePath('/vehicles')
    revalidatePath('/drivers')
    revalidatePath('/dashboard')
    
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to dispatch trip' }
  }
}

export async function completeTrip(tripId: string) {
  try {
    const trip = await prisma.trip.findUnique({ where: { id: tripId } })
    if (!trip) return { success: false, error: 'Trip not found' }

    await prisma.$transaction([
      prisma.trip.update({ where: { id: tripId }, data: { status: 'Completed' } }),
      prisma.vehicle.update({ 
        where: { id: trip.vehicleId }, 
        data: { 
          status: 'Available',
          odometer: { increment: trip.distance } // Update odometer!
        } 
      }),
      prisma.driver.update({ where: { id: trip.driverId }, data: { status: 'Available' } }),
    ])

    revalidatePath('/dispatcher')
    revalidatePath('/vehicles')
    revalidatePath('/drivers')
    revalidatePath('/dashboard')
    
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to complete trip' }
  }
}
