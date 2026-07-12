'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createFuelLog(data: {
  liters: number
  cost: number
  date: Date
  vehicleId: string
}) {
  try {
    const log = await prisma.fuelLog.create({
      data,
    })
    revalidatePath('/fuel')
    revalidatePath('/dashboard')
    revalidatePath('/reports')
    return { success: true, log }
  } catch (error) {
    console.error('Error creating fuel log:', error)
    return { success: false, error: 'Failed to create fuel log' }
  }
}
