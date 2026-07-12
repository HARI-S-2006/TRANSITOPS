'use server'

import { db } from '@/lib/firebase'
import { revalidatePath } from 'next/cache'

export async function createFuelLog(data: {
  liters: number
  cost: number
  date: Date
  vehicleId: string
}) {
  try {
    if (!db) throw new Error('Database not initialized');

    const docRef = await db.collection('fuelLogs').add(data)
    
    revalidatePath('/fuel')
    revalidatePath('/dashboard')
    revalidatePath('/reports')
    return { success: true, log: { id: docRef.id, ...data } }
  } catch (error) {
    console.error('Error creating fuel log:', error)
    return { success: false, error: 'Failed to create fuel log' }
  }
}
