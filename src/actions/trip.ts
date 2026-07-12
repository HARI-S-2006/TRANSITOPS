'use server'

import { db, FieldValue } from '@/lib/firebase'
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
    if (!db) throw new Error('Database not initialized');
    
    // Business Rule Validation
    const vehicleDoc = await db.collection('vehicles').doc(data.vehicleId).get()
    const driverDoc = await db.collection('drivers').doc(data.driverId).get()

    if (!vehicleDoc.exists || !driverDoc.exists) {
      return { success: false, error: 'Vehicle or Driver not found' }
    }
    
    const vehicle = vehicleDoc.data() as any
    const driver = driverDoc.data() as any

    if (vehicle.status !== 'Available') {
      return { success: false, error: 'Selected vehicle is not available' }
    }

    if (driver.status !== 'Available') {
      return { success: false, error: 'Selected driver is not available' }
    }

    if (data.cargoWeight > vehicle.capacity) {
      return { success: false, error: `Cargo weight exceeds vehicle capacity (${vehicle.capacity}kg)` }
    }

    const tripRef = await db.collection('trips').add({
      ...data,
      status: 'Draft',
      etaMinutes: Math.round((data.distance / 60) * 60)
    })
    
    revalidatePath('/dispatcher')
    return { success: true, trip: { id: tripRef.id } }
  } catch (error) {
    console.error('Error creating trip:', error)
    return { success: false, error: 'Failed to create trip' }
  }
}

export async function dispatchTrip(tripId: string) {
  try {
    if (!db) throw new Error('Database not initialized');
    
    const tripRef = db.collection('trips').doc(tripId)
    const tripDoc = await tripRef.get()
    
    if (!tripDoc.exists) return { success: false, error: 'Trip not found' }
    const trip = tripDoc.data() as any

    const vehicleRef = db.collection('vehicles').doc(trip.vehicleId)
    const driverRef = db.collection('drivers').doc(trip.driverId)

    const batch = db.batch()
    batch.update(tripRef, { status: 'Dispatched' })
    batch.update(vehicleRef, { status: 'OnTrip' })
    batch.update(driverRef, { status: 'OnTrip' })
    await batch.commit()

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
    if (!db) throw new Error('Database not initialized');
    
    const tripRef = db.collection('trips').doc(tripId)
    const tripDoc = await tripRef.get()
    
    if (!tripDoc.exists) return { success: false, error: 'Trip not found' }
    const trip = tripDoc.data() as any

    const vehicleRef = db.collection('vehicles').doc(trip.vehicleId)
    const driverRef = db.collection('drivers').doc(trip.driverId)

    const batch = db.batch()
    batch.update(tripRef, { status: 'Completed' })
    batch.update(vehicleRef, { 
      status: 'Available',
      odometer: FieldValue.increment(trip.distance)
    })
    batch.update(driverRef, { status: 'Available' })
    await batch.commit()

    revalidatePath('/dispatcher')
    revalidatePath('/vehicles')
    revalidatePath('/drivers')
    revalidatePath('/dashboard')
    
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to complete trip' }
  }
}
