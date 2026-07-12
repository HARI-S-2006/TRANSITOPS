'use server'

import { db } from '@/lib/firebase'
import { revalidatePath } from 'next/cache'

export async function createVehicle(data: {
  regNo: string
  name: string
  type: string
  capacity: number
  odometer: number
  acqCost: number
}) {
  try {
    if (!db) throw new Error('Database not initialized');
    
    const docRef = await db.collection('vehicles').add({
      ...data,
      status: 'Available',
    })
    
    revalidatePath('/vehicles')
    revalidatePath('/dashboard')
    return { success: true, vehicle: { id: docRef.id, ...data, status: 'Available' } }
  } catch (error) {
    console.error('Error creating vehicle:', error)
    return { success: false, error: 'Failed to create vehicle' }
  }
}

export async function updateVehicleStatus(id: string, status: string) {
  try {
    if (!db) throw new Error('Database not initialized');
    
    await db.collection('vehicles').doc(id).update({ status })
    
    revalidatePath('/vehicles')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to update vehicle status' }
  }
}
