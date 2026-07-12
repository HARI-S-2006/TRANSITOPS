'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createDriver(data: {
  name: string
  licenseNo: string
  licenseExpiry: Date
  contact: string
  safetyScore: number
}) {
  try {
    const driver = await prisma.driver.create({
      data: {
        ...data,
        status: 'Available',
      },
    })
    revalidatePath('/drivers')
    return { success: true, driver }
  } catch (error) {
    console.error('Error creating driver:', error)
    return { success: false, error: 'Failed to create driver' }
  }
}

export async function updateDriverStatus(id: string, status: string) {
  try {
    const driver = await prisma.driver.update({
      where: { id },
      data: { status },
    })
    revalidatePath('/drivers')
    return { success: true, driver }
  } catch (error) {
    return { success: false, error: 'Failed to update driver status' }
  }
}
