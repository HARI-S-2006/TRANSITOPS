'use server'

import { db } from '@/lib/firebase'
import { revalidatePath } from 'next/cache'

export async function createDriver(data: {
  name: string
  licenseNo: string
  licenseExpiry: Date
  contact: string
  safetyScore: number
}) {
  try {
    if (!db) throw new Error('Database not initialized');
    
    const docRef = await db.collection('drivers').add({
      ...data,
      status: 'Available',
    })
    revalidatePath('/drivers')
    return { success: true, driver: { id: docRef.id, ...data, status: 'Available' } }
  } catch (error) {
    console.error('Error creating driver:', error)
    return { success: false, error: 'Failed to create driver' }
  }
}

export async function updateDriverStatus(id: string, status: string) {
  try {
    if (!db) throw new Error('Database not initialized');
    
    await db.collection('drivers').doc(id).update({ status })
    revalidatePath('/drivers')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to update driver status' }
  }
}
